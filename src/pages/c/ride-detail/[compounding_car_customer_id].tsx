import { ErrorCircleIcon } from "@/assets"
import {
  Alert,
  ButtonSubmit,
  Modal,
  RatingForm,
  RatingItem,
  RideCancelForm,
  RideDetailInfo,
  RideDetailLoading,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
  Seo,
} from "@/components"
import { toggleBodyOverflow } from "@/helper"
import { useCompoundingCarCustomer, useFetcher, useRatingActions } from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { CancelCompoundingFormParams, CreateRatingFormParams, RatingRes } from "@/models"
import { chatAPI, rideAPI } from "@/services"
import moment from "moment"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

const RidesDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { compounding_car_customer_id } = router.query
  const { addRating, updateRating, deleteRating } = useRatingActions()
  const { fetcherHandler } = useFetcher()
  const {
    data: compoundingCar,
    isInitialLoading,
    mutate,
  } = useCompoundingCarCustomer({
    compounding_car_customer_id: Number(compounding_car_customer_id),
    key: `get_detail_compounding_car_customer_${compounding_car_customer_id}`,
    type: "once",
  })

  const [showCancelModal, setShowCancelModal] = useState<boolean>(false)
  const [showRatingModal, setShowRatingModal] = useState<boolean>(false)
  const [currentRatingUpdate, setCurrentRatingUpdate] = useState<RatingRes>()
  const [currentDeleteRating, setCurrentDeleteRating] = useState<number | undefined>()

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
        toggleRatingModal(false)
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
        toggleBodyOverflow("unset")
      },
    })
  }

  const toggleRatingModal = (status: boolean) => {
    setShowRatingModal(status)
    if (status) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  const toggleCancelModal = (status: boolean) => {
    setShowCancelModal(status)
    if (status) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  const handleCancelCompoundingCar = (params: CancelCompoundingFormParams) => {
    if (!compoundingCar?.compounding_car_customer_id) return
    fetcherHandler({
      fetcher: rideAPI.cancelCompoundingCar({
        ...params,
        compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
      }),
      onSuccess: () => {
        setShowCancelModal(false)
        chatAPI.leaveRoomByCompoundingCarId(compoundingCar.compounding_car_customer_id)
        router.push(`/c/ride-detail/cancel/${compoundingCar.compounding_car_customer_id}`)
      },
    })
  }

  return (
    <>
      <CustomerBookingLayout
        showLoading={isInitialLoading}
        topNode={<RideProgress state={compoundingCar?.state} />}
        rightNode={compoundingCar ? <RideSummary data={compoundingCar} /> : null}
        title="Chi tiết chuyến đi"
      >
        <Seo title="Chi tiết chuyến đi" url={`c/ride-detail/${compounding_car_customer_id}`} />

        <>
          {isInitialLoading ? (
            <RideDetailLoading />
          ) : !compoundingCar?.compounding_car_id ? (
            <div className="py-[40px] text-center">
              <p className="text-base">Không tìm thấy chuyến đi này</p>
            </div>
          ) : (
            <>
              {compoundingCar.state === "draft" &&
              moment(compoundingCar.expected_going_on_date).isBefore(Date.now()) ? (
                <div className="mb-24 flex items-center bg-bg-error rounded-[5px] p-12">
                  <ErrorCircleIcon className="mr-12 h-[18px] w-[18px]" />{" "}
                  <span className="text-xs text-error">Chuyến đi này đã hết hạn</span>
                </div>
              ) : null}

              <RideSummaryMobile className="lg:hidden mb-24" rides={compoundingCar} />

              <div className="mb-24 md:mb-40">
                <RideDetailInfo data={compoundingCar} />
              </div>

              {compoundingCar?.state === "waiting" ||
              compoundingCar?.state === "deposit" ||
              compoundingCar?.state === "confirm" ||
              compoundingCar?.state === "waiting_customer" ||
              compoundingCar?.state === "assign" ? (
                <div className="flex items-center md:mb-24">
                  <button
                    onClick={() => toggleCancelModal(true)}
                    className="btn bg-gray-20 text-gray-color-8"
                  >
                    Hủy chuyến
                  </button>
                </div>
              ) : null}

              {compoundingCar?.rating?.compounding_car_customer_id ? (
                <div className="pt-24 border-t border-border-color border-solid">
                  <p className="text-base uppercase font-semibold mb-8">Đánh giá của bạn</p>
                  <RatingItem
                    onDelete={(id) => {
                      toggleBodyOverflow("hidden")
                      setCurrentDeleteRating(id)
                    }}
                    onUpdate={(params) => setCurrentRatingUpdate(params)}
                    rating={compoundingCar.rating}
                  />
                </div>
              ) : (
                <div className="ml-12"></div>
              )}

              {compoundingCar.state === "confirm_paid" &&
              compoundingCar.rating_state === "no_rating" &&
              !compoundingCar?.rating?.compounding_car_customer_id ? (
                <ButtonSubmit title="Thêm đánh giá" onClick={() => toggleRatingModal(true)} />
              ) : null}

              {compoundingCar.state === "done" || compoundingCar.state === "customer_pay" ? (
                <p className="text-sm">Vui lòng chờ tài xế kết thúc chuyến đi để đánh giá</p>
              ) : null}
            </>
          )}
        </>
      </CustomerBookingLayout>

      {/* Modal... */}
      {compoundingCar?.compounding_car_id ? (
        <>
          <Modal
            key="rating-compounding-car-modal"
            show={showRatingModal}
            onClose={() => toggleRatingModal(false)}
            heading="Thêm đánh giá"
          >
            <div className="w-full p-custom">
              <RatingForm onSubmit={(data) => handleAddRating(data)} />
            </div>
          </Modal>

          <Modal
            key="rating-modify-compounding-car-modal"
            show={!!currentRatingUpdate}
            onClose={() => setCurrentRatingUpdate(undefined)}
            heading="Chỉnh sửa đánh giá"
          >
            <div className="w-full p-custom">
              <RatingForm
                defaultValue={currentRatingUpdate}
                onSubmit={(data) => handleUpdateRating(data)}
              />
            </div>
          </Modal>

          <Alert
            show={!!currentDeleteRating}
            title="Bạn có chắc chắn muốn xóa đánh giá này"
            onClose={() => {
              setCurrentDeleteRating(undefined)
              toggleBodyOverflow("unset")
            }}
            onConfirm={() => currentDeleteRating && handleDeleteRating(currentDeleteRating)}
            type="warning"
          />

          <RideSummaryModal data={compoundingCar} />

          {showCancelModal ? (
            <RideCancelForm
              onClose={() => toggleCancelModal(false)}
              params={{
                compounding_car_customer_state: compoundingCar.state,
              }}
              expectedGoingOnDate={compoundingCar.expected_going_on_date}
              onSubmit={(data) => handleCancelCompoundingCar(data)}
            />
          ) : null}
        </>
      ) : null}
    </>
  )
}

export default RidesDetail
