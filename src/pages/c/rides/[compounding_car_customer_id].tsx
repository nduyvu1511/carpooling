import {
  CarpoolingCompoundingForm,
  Map,
  Modal,
  NoSSRWrapper,
  RatingForm,
  RidesSummary,
} from "@/components"
import {
  useCompoundingCarActions,
  useCompoundingCarCustomer,
  useCompoundingForm,
  useRatingActions,
} from "@/hooks"
import { BookingLayout, CustomerLayout } from "@/layout"
import { CreateRatingFormParams } from "@/models"
import { useRouter } from "next/router"
import { useState } from "react"

const RidesDetail = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { confirmCompoundingCar, createCompoundingCar } = useCompoundingCarActions()
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarCustomer({
    compounding_car_customer_id: Number(compounding_car_customer_id),
    key: "get_compounding_car_customer",
    type: "once",
  })
  const { compoundingCarCustomerResToCarpoolingForm } = useCompoundingForm()
  const [showRatingForm, setShowRatingForm] = useState<boolean>(false)
  const { addRating } = useRatingActions()

  const handleConfirmCompoundingCar = () => {
    if (!compoundingCar?.compounding_car_customer_id) return

    confirmCompoundingCar({
      params: { compounding_car_customer_id: compoundingCar.compounding_car_customer_id },
      onSuccess: () => {
        router.push(
          `/c/booking/checkout?compounding_car_customer_id=${compoundingCar.compounding_car_customer_id}`
        )
      },
    })
  }

  const handleAddRating = (params: CreateRatingFormParams) => {
    if (!compoundingCar?.compounding_car_customer_id) return
    addRating({
      params: {
        ...params, 
        compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
      },
      onSuccess: () => {

      },
    })
  }

  if (!compoundingCar?.compounding_car_id) return null
  return (
    <NoSSRWrapper>
      <BookingLayout
        rightNode={
          compoundingCar ? (
            <RidesSummary rides={compoundingCar} car_account_type="customer" />
          ) : null
        }
        title="Xác nhận chuyến đi"
      >
        <div className="p-24 pt-0 bg-white-color rounded-[5px] shadow-shadow-1 h-fit">
          <div className="h-[300px] mb-12">
            <Map viewOnly />
          </div>

          <div className="">
            <div className="mb-[40px]">
              <CarpoolingCompoundingForm
                viewButtonModal={false}
                defaultValues={compoundingCarCustomerResToCarpoolingForm(compoundingCar)}
                onSubmit={handleConfirmCompoundingCar}
                disabled
                showButon={false}
              />
            </div>

            {compoundingCar?.state === "confirm_paid" ? (
              <button onClick={() => setShowRatingForm(true)} className="btn-primary">
                Thêm đánh giá
              </button>
            ) : null}
          </div>
        </div>
      </BookingLayout>

      {showRatingForm ? (
        <Modal onClose={() => setShowRatingForm(false)} heading="Thêm đánh giá">
          <div className="p-24">
            <RatingForm onSubmit={(data) => handleAddRating(data)} />
          </div>
        </Modal>
      ) : null}
    </NoSSRWrapper>
  )
}

RidesDetail.Layout = CustomerLayout
export default RidesDetail
