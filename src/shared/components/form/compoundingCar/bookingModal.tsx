import { Modal } from "@/components/modal"
import { useCompoundingCarActions, useCompoundingForm } from "@/hooks"
import { CompoundingType, CreateCompoundingCarParams } from "@/models"
import { useRouter } from "next/router"
import { CarpoolingCompoundingForm } from "./carpoolingCompoundingCarForm"
import { OneWayCompoundingForm } from "./oneWayCompoundingCarForm"
import { TwoWayCompoundingForm } from "./twoWayCompoundingCarForm"

interface BookingModalProps {
  onClose: Function
  formType: CompoundingType
}

interface HandleCreateCompoundingCarParams {
  params: CreateCompoundingCarParams
}

const BookingModal = ({ onClose, formType }: BookingModalProps) => {
  const router = useRouter()
  const {
    oneWayCompoundingCarFormFromLocalStorage,
    twoWayCompoundingCarFormFromLocalStorage,
    carpoolingCompoundingFormFromLocalStorage,
  } = useCompoundingForm()
  const { createCompoundingCar } = useCompoundingCarActions()

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
      className="relative"
      heading={
        formType === "compounding"
          ? "Tạo chuyến đi ghép"
          : formType === "one_way"
          ? "Tạo chuyến đi một chiều"
          : "Tạo chuyến đi hai chiều"
      }
      onClose={onClose}
    >
      <div className="px-24 py-12 pb-[40px] h-full overflow-auto">
        {formType === "one_way" ? (
          <OneWayCompoundingForm
            defaultValues={oneWayCompoundingCarFormFromLocalStorage()}
            onSubmit={(params) => {
              handleCreateCompoundingCar({ params })
            }}
          />
        ) : formType === "two_way" ? (
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
