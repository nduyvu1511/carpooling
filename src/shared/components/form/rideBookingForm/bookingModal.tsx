import { ConvenientForm, Modal, Tabs } from "@/components"
import { compoundingTypeFilters, COMPOUNDING_TYPE_HEADING } from "@/helper"
import { useCompoundingCarActions, useCompoundingForm } from "@/hooks"
import {
  CarAccountType,
  CompoundingType,
  CreateCompoundingCarParams,
  CreateConvenientCompoundingCar,
} from "@/models"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { CarpoolingForm } from "./carpoolingForm"
import { OneWayForm } from "./oneWayForm"
import { TwoWayForm } from "./twoWayForm"

interface BookingModalProps {
  onClose: Function
  formType: CompoundingType
  show: CompoundingType | undefined
  carAccountType?: CarAccountType
}

const BookingModal = ({
  onClose,
  formType,
  show,
  carAccountType = "customer",
}: BookingModalProps) => {
  const router = useRouter()
  const {
    clearCarpoolingForm,
    clearOneWayForm,
    clearTwoWayForm,
    clearConvenientForm,
    getOneWayFormFromStorage,
    getTwoWayFormFromStorage,
    getCarpoolingFormFromStorage,
    getConvenientFormFromStorage,
  } = useCompoundingForm()
  const { createCompoundingCar, createCompoundingCarForDriver } = useCompoundingCarActions()
  const [compoundingType, setCompoundingType] = useState<CompoundingType | undefined>(formType)

  useEffect(() => {
    setCompoundingType(formType)
  }, [formType])

  const handleCreateConvenientCompoundingCar = (params: CreateConvenientCompoundingCar) => {
    createCompoundingCarForDriver({
      params,
      onSuccess: (data) => {
        onClose()
        clearConvenientForm()
        router.push(`/d/booking/confirm/${data.compounding_car_id}`)
      },
      config: { toggleOverFlow: false },
    })
  }

  const handleCreateCompoundingCar = (params: CreateCompoundingCarParams) => {
    createCompoundingCar({
      params,
      onSuccess: (data) => {
        onClose()

        // Clear form from localstorage
        if (data?.compounding_type === "compounding") {
          clearCarpoolingForm()
        } else if (data?.compounding_type === "one_way") {
          clearOneWayForm()
        } else {
          clearTwoWayForm()
        }

        router.push({
          pathname: "/c/booking/confirm",
          query: {
            compounding_car_customer_id: data.compounding_car_customer_id,
          },
        })
      },
      config: { toggleOverFlow: false },
    })
  }

  const renderForm = () => {
    const view = "modal"
    const mode = "create"

    if (compoundingType === "compounding")
      return (
        <CarpoolingForm
          view={view}
          mode={mode}
          defaultValues={getCarpoolingFormFromStorage()}
          onSubmit={handleCreateCompoundingCar}
        />
      )

    if (compoundingType === "one_way")
      return (
        <OneWayForm
          view={view}
          mode={mode}
          defaultValues={getOneWayFormFromStorage()}
          onSubmit={handleCreateCompoundingCar}
        />
      )

    if (compoundingType === "two_way")
      return (
        <TwoWayForm
          view={view}
          mode={mode}
          defaultValues={getTwoWayFormFromStorage()}
          onSubmit={handleCreateCompoundingCar}
        />
      )

    if (compoundingType === "convenient")
      return (
        <ConvenientForm
          view={view}
          mode={mode}
          defaultValues={getConvenientFormFromStorage()}
          onSubmit={handleCreateConvenientCompoundingCar}
        />
      )
  }

  return (
    <>
      <Modal
        key="booking-modal"
        transitionType="down"
        show={!!show}
        heading={COMPOUNDING_TYPE_HEADING[compoundingType as CompoundingType]}
        onClose={onClose}
        headerNode={
          carAccountType === "customer" ? (
            <div className="lg:hidden">
              <Tabs
                type="full"
                list={compoundingTypeFilters}
                tabActive={compoundingType || formType}
                onChange={(val) => setCompoundingType(val as CompoundingType)}
              />
            </div>
          ) : null
        }
      >
        <div className="flex-1 w-full overflow-auto px-custom py-custom pb-[64px] sm:pb-[78px]">
          {renderForm()}
        </div>
      </Modal>
    </>
  )
}

export { BookingModal }
