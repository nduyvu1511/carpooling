import {
  Alert,
  CarpoolingCompoundingForm,
  Map,
  Modal,
  NoSSRWrapper,
  RatingForm,
  RatingItem,
  RidesSummary
} from "@/components"
import {
  useCompoundingCarActions,
  useCompoundingCarCustomer,
  useCompoundingForm,
  useRatingActions
} from "@/hooks"
import { BookingLayout, CustomerLayout } from "@/layout"
import { CreateRatingFormParams, RatingRes } from "@/models"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

const RidesDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { compounding_car_customer_id } = router.query
  const { confirmCompoundingCar, createCompoundingCar } = useCompoundingCarActions()
  const {
    data: compoundingCar,
    isInitialLoading,
    mutate,
  } = useCompoundingCarCustomer({
    compounding_car_customer_id: Number(compounding_car_customer_id),
    key: "get_compounding_car_customer",
    type: "once",
  })
  const { compoundingCarCustomerResToCarpoolingForm } = useCompoundingForm()
  const [showRatingForm, setShowRatingForm] = useState<boolean>(false)
  const [currentRatingUpdate, setCurrentRatingUpdate] = useState<RatingRes>()
  const { addRating, updateRating, deleteRating } = useRatingActions()
  const [currentDeleteRating, setCurrentDeleteRating] = useState<number | undefined>()

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
    if (compoundingCar.rating_state === "un_rating") {
      dispatch(notify("Bạn không thể đánh giá cho chuyến đi này", "error"))
      return
    }

    addRating({
      params: {
        ...params,
        compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
      },
      onSuccess: () => {
        mutate()
        setShowRatingForm(false)
      },
    })
  }

  const handleUpdateRating = (params: CreateRatingFormParams) => {
    if (!compoundingCar?.compounding_car_customer_id || !currentRatingUpdate?.rating_id) return
    if (compoundingCar.rating_state === "un_rating") {
      dispatch(notify("Bạn không thể chỉnh sửa cho chuyến đi này", "error"))
      return
    }

    updateRating({
      params: {
        ...params,
        rating_id: currentRatingUpdate?.rating_id,
      },
      onSuccess: () => {
        mutate()
        setCurrentRatingUpdate(undefined)
      },
    })
  }

  const handleDeleteRating = (rating_id: number) => {
    deleteRating({
      params: {
        rating_id,
      },
      onSuccess: () => {
        mutate()
        setCurrentDeleteRating(undefined)
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

            {compoundingCar?.rating?.compounding_car_customer_id ? (
              <div className="p-24">
                <RatingItem
                  onDelete={(id) => setCurrentDeleteRating(id)}
                  onUpdate={(params) => setCurrentRatingUpdate(params)}
                  rating={compoundingCar.rating}
                />
              </div>
            ) : null}

            {compoundingCar?.state === "confirm_paid" &&
            compoundingCar.rating_state === "no_rating" &&
            !compoundingCar?.rating?.compounding_car_customer_id ? (
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

      {currentRatingUpdate ? (
        <Modal onClose={() => setShowRatingForm(false)} heading="Thêm đánh giá">
          <div className="p-24">
            <RatingForm
              defaultValue={currentRatingUpdate}
              onSubmit={(data) => handleUpdateRating(data)}
            />
          </div>
      </Modal>
      ) : null}

      {currentDeleteRating ? (
        <Alert
          desc="Bạn có chắc chắn muốn xóa đánh giá này"
          onClose={() => setCurrentDeleteRating(undefined)}
          onConfirm={() => handleDeleteRating(currentDeleteRating)}
          type="warning"
        />
      ) : null}
    </NoSSRWrapper>
  )
}

RidesDetail.Layout = CustomerLayout
export default RidesDetail
