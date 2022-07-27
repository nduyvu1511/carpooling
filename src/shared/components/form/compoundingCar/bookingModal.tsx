import { Modal } from "@/components/modal"
import { Tabs } from "@/components/tabs"
import { useCompoundingCarActions, useCompoundingForm } from "@/hooks"
import { CompoundingType, CreateCompoundingCarParams } from "@/models"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { CarpoolingCompoundingForm } from "./carpoolingCompoundingCarForm"
import { OneWayCompoundingForm } from "./oneWayCompoundingCarForm"
import { TwoWayCompoundingForm } from "./twoWayCompoundingCarForm"

interface BookingModalProps {
  onClose: Function
  formType: CompoundingType
  show: CompoundingType | undefined
}

interface HandleCreateCompoundingCarParams {
  params: CreateCompoundingCarParams
}

const BookingModal = ({ onClose, formType, show }: BookingModalProps) => {
  const router = useRouter()
  const {
    oneWayCompoundingCarFormFromLocalStorage,
    twoWayCompoundingCarFormFromLocalStorage,
    carpoolingCompoundingFormFromLocalStorage,
  } = useCompoundingForm()
  const { createCompoundingCar } = useCompoundingCarActions()
  const [compoundingType, setCompoundingType] = useState<CompoundingType | undefined>(formType)

  useEffect(() => {
    setCompoundingType(formType)
  }, [formType])

  const handleCreateCompoundingCar = ({ params }: HandleCreateCompoundingCarParams) => {
    createCompoundingCar({
      params,
      onSuccess: (data) => {
        onClose()
        router.push({
          pathname: "/c/booking/confirm",
          query: {
            compounding_car_customer_id: data.compounding_car_customer_id,
          },
        })
      },
    })
  }

  return (
    <Modal
      show={!!show}
      heading={
        compoundingType === "compounding"
          ? "Tạo chuyến đi ghép"
          : compoundingType === "one_way"
          ? "Tạo chuyến đi một chiều"
          : compoundingType === "convenient"
          ? "Tạo chuyến đi tiện chuyến"
          : "Tạo chuyến đi hai chiều"
      }
      onClose={onClose}
      headerNode={
        <Tabs
          type="full"
          list={[
            { label: "Một chiều", value: "one_way" },
            { label: "Hai chiều", value: "two_way" },
            { label: "Đi ghép", value: "compounding" },
          ]}
          tabActive={compoundingType || formType}
          onChange={(val) => setCompoundingType(val as CompoundingType)}
        />
      }
    >
      <div className="flex-1 w-full px-[16px] md:px-24 py-12 mb-[70px] sm:mb-[40px]">
        {compoundingType === "one_way" ? (
          <OneWayCompoundingForm
            defaultValues={oneWayCompoundingCarFormFromLocalStorage()}
            onSubmit={(params) => {
              handleCreateCompoundingCar({ params })
            }}
          />
        ) : compoundingType === "two_way" ? (
          <TwoWayCompoundingForm
            defaultValues={twoWayCompoundingCarFormFromLocalStorage()}
            onSubmit={(params) => {
              handleCreateCompoundingCar({ params })
            }}
          />
        ) : (
          <CarpoolingCompoundingForm
            defaultValues={carpoolingCompoundingFormFromLocalStorage()}
            onSubmit={(params) => {
              handleCreateCompoundingCar({ params })
            }}
          />
        )}
      </div>
    </Modal>
  )
}

export { BookingModal }
