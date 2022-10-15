import { Modal, Tabs } from "@/components"
import { useCompoundingCarActions, useCompoundingForm } from "@/hooks"
import { CarAccountType, CompoundingType, CreateCompoundingCarParams } from "@/models"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { CarpoolingCompoundingForm } from "./carpoolingCompoundingCarForm"
import { OneWayCompoundingForm } from "./oneWayCompoundingCarForm"
import { TwoWayCompoundingForm } from "./twoWayCompoundingCarForm"

interface BookingModalProps {
  onClose: Function
  formType: CompoundingType
  show: CompoundingType | undefined
  carAccountType?: CarAccountType
}

interface HandleCreateCompoundingCarParams {
  params: CreateCompoundingCarParams
}

const BookingModal = ({
  onClose,
  formType,
  show,
  carAccountType = "customer",
}: BookingModalProps) => {
  const router = useRouter()
  const {
    clearCarpoolingWayCompoundingCar,
    clearOneWayCompoundingCar,
    clearTwoWayCompoundingCar,
    oneWayCompoundingCarFormFromLocalStorage,
    twoWayCompoundingCarFormFromLocalStorage,
    carpoolingCompoundingFormFromLocalStorage,
  } = useCompoundingForm()
  const { createCompoundingCar } = useCompoundingCarActions()
  const [compoundingType, setCompoundingType] = useState<CompoundingType | undefined>(formType)

  useEffect(() => {
    setCompoundingType(formType)
  }, [formType])

  console.log("booking re render")

  const handleCreateCompoundingCar = ({ params }: HandleCreateCompoundingCarParams) => {
    if (!compoundingType) return

    createCompoundingCar({
      params: { ...params, compounding_type: compoundingType },
      onSuccess: (data) => {
        onClose()

        // Clear form from localstorage
        if (data?.compounding_type === "compounding" || data?.compounding_type === "convenient") {
          clearCarpoolingWayCompoundingCar()
        } else if (data?.compounding_type === "one_way") {
          clearOneWayCompoundingCar()
        } else {
          clearTwoWayCompoundingCar()
        }

        if (data.compounding_type === "convenient") {
          router.push(`/d/booking/confirm/${data.compounding_car_customer_id}`)
        } else {
          router.push({
            pathname: "/c/booking/confirm",
            query: {
              compounding_car_customer_id: data.compounding_car_customer_id,
            },
          })
        }
      },
      config: { toggleOverFlow: false },
    })
  }

  return (
    <Modal
      key="booking-modal"
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
        carAccountType === "customer" ? (
          <div className="lg:hidden">
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
          </div>
        ) : null
      }
    >
      <div className="flex-1 w-full overflow-auto px-custom py-custom pb-[64px] sm:pb-[78px]">
        {compoundingType === "one_way" ? (
          <OneWayCompoundingForm
            defaultValues={oneWayCompoundingCarFormFromLocalStorage()}
            onSubmit={(params) => {
              handleCreateCompoundingCar({ params })
            }}
            view="modal"
            mode="create"
          />
        ) : compoundingType === "two_way" ? (
          <TwoWayCompoundingForm
            defaultValues={twoWayCompoundingCarFormFromLocalStorage()}
            onSubmit={(params) => {
              handleCreateCompoundingCar({ params })
            }}
            view="modal"
            mode="create"
          />
        ) : (
          <CarpoolingCompoundingForm
            compoundingType={compoundingType}
            defaultValues={carpoolingCompoundingFormFromLocalStorage()}
            onSubmit={(params) => {
              handleCreateCompoundingCar({ params })
            }}
            view="modal"
            mode="create"
          />
        )}
      </div>
    </Modal>
  )
}

export { BookingModal }
