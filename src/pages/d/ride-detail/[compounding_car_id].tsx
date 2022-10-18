import {
  AccordionItem,
  DriverDepositInfo,
  Modal,
  RatingItem,
  RatingReport,
  RideCancelForm,
  RideCancelSnackbar,
  RideDetailLoading,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
  RideSummaryPassengerItem,
  Seo,
} from "@/components"
import { toggleBodyOverflow } from "@/helper"
import {
  useChatActions,
  useCompoundingCarDriver,
  useDriverCheckout,
  useRatingActions,
} from "@/hooks"
import { DriverBookingLayout } from "@/layout"
import { CancelCompoundingCarDriverParams, DownPayment, ReportRatingParams } from "@/models"
import { chatAPI } from "@/services"
import { useRouter } from "next/router"
import { useState } from "react"

const ConfirmBookingCustomer = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const {
    data: compoundingCar,
    isInitialLoading,
    mutate,
  } = useCompoundingCarDriver({
    compounding_car_id: Number(compounding_car_id),
    key: `confirm_booking_compounding_car_customer_${compounding_car_id}`,
    type: "once",
  })
  const { createSingleChat } = useChatActions()
  const { reportRating } = useRatingActions()
  const { cancelDepositCompoundingCarDriver } = useDriverCheckout()
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false)
  const [showCustomerList, setShowCustomerList] = useState<boolean>(false)
  const [currentReportRatingId, setCurrentReportRatingId] = useState<number | undefined>()

  const handleReportRating = (params: ReportRatingParams) => {
    reportRating({
      params,
      onSuccess() {
        handleSetCurrentReportRating(undefined)
        mutate()
      },
    })
  }

  const hanleCancelCompoundingCar = (params: CancelCompoundingCarDriverParams) => {
    cancelDepositCompoundingCarDriver({
      params,
      onSuccess: () => {
        handleSetShowCancelModal(false)
        router.push(`/d/ride-detail/cancel/${params.compounding_car_id}`)
        chatAPI.softDeleteRoomByCompoundingCarId(params.compounding_car_id)
      },
    })
  }

  const handleSetCurrentReportRating = (id: number | undefined) => {
    setCurrentReportRatingId(id)
    if (id) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  const handleSetShowCancelModal = (status: boolean) => {
    setShowCancelModal(status)
    if (status) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  return (
    <>
      <DriverBookingLayout
        showLoading={isInitialLoading}
        topNode={<RideProgress state={compoundingCar?.state} />}
        rightNode={compoundingCar ? <RideSummary data={compoundingCar} /> : null}
        title="Chi tiết chuyến đi"
      >
        <Seo title="Bắt đầu chuyến đi" url={`/d/ride-detail/in-process/${compounding_car_id}`} />
        <>
          {isInitialLoading ? (
            <RideDetailLoading />
          ) : compoundingCar?.compounding_car_id ? (
            !compoundingCar?.compounding_car_customers?.length ? (
              <div className="flex-center py-24">
                <p className="text-sm">Chuyến đi này chưa có khách hàng</p>
              </div>
            ) : (
              <>
                <div className="mb-40">
                  <RideSummaryMobile className="mb-24 lg:hidden" rides={compoundingCar} />
                  <AccordionItem
                    isActive={showCustomerList}
                    onClick={() => setShowCustomerList(!showCustomerList)}
                    className="px-24 py-[16px] bg-bg-primary border-none rounded-[5px] mb-24"
                    titleClassName="text-base text-blue-7 font-semibold"
                    title="DANH SÁCH HÀNH KHÁCH"
                    allowTransition={false}
                  >
                    {compoundingCar?.compounding_car_customers?.length &&
                      compoundingCar?.compounding_car_customers?.map((item, index) => (
                        <div
                          className="border-b border-solid border-border-color py-12 last:border-none"
                          key={item.compounding_car_customer_id}
                        >
                          <RideSummaryPassengerItem
                            onChat={(partner_id) =>
                              createSingleChat({
                                params: { partner_id, compounding_car_id: item.compounding_car_id },
                                onSuccess: () => {},
                              })
                            }
                            data={item}
                          />
                        </div>
                      ))}
                  </AccordionItem>

                  <div className="ride-detail-driver mb-24">
                    <p className="text-base font-semibold uppercase mb-16 md:mb-24">Hóa đơn</p>
                    <DriverDepositInfo
                      discount_after_tax={compoundingCar?.discount_after_tax}
                      down_payment={compoundingCar.down_payment as DownPayment}
                      deposit_date={compoundingCar.deposit_date}
                      amount_total={
                        compoundingCar?.amount_undiscounted || compoundingCar.amount_total || 0
                      }
                    />
                  </div>

                  <RideCancelSnackbar expectedGoingOnDate={compoundingCar.expected_going_on_date} />
                </div>

                {/* Passenger ratings */}
                {compoundingCar.rating_ids?.length > 0 ? (
                  <div className="mt-24 border-t border-solid border-border-color pt-24">
                    <p className="text-base font-semibold uppercase mb-[12px]">
                      Đánh giá của khách hàng:{" "}
                    </p>
                    {compoundingCar.rating_ids.map((item) => (
                      <RatingItem
                        key={item?.rating_id}
                        rating={item}
                        onReport={() => handleSetCurrentReportRating(item.rating_id)}
                        car_account_type="car_driver"
                      />
                    ))}
                  </div>
                ) : null}

                {/* Button actions  */}
                <div className="fixed left-0 right-0 flex bottom-0 p-12 md:p-0 bg-white-color md:static md:bg-[transparent]">
                  {compoundingCar.state === "waiting_deposit" ||
                  compoundingCar.state === "confirm_deposit" ||
                  compoundingCar.state === "confirm" ? (
                    <button
                      onClick={() => handleSetShowCancelModal(true)}
                      className={`btn bg-gray-20 text-gray-color-7 px-12 sm:px-[28px] md:text-gray-color-7 mr-12 sm:mr-16  whitespace-nowrap line-clamp-1`}
                    >
                      Hủy chuyến
                    </button>
                  ) : null}

                  {compoundingCar.state === "start_running" ||
                  compoundingCar.state === "stop_picking" ||
                  compoundingCar.state === "confirm_deposit" ? (
                    <button
                      onClick={() => {
                        router.push(
                          `/d/ride-detail/in-process/${compoundingCar.compounding_car_id}`
                        )
                      }}
                      className={`btn-primary px-12 sm:px-[28px]`}
                    >
                      Bắt đầu
                    </button>
                  ) : null}
                </div>
              </>
            )
          ) : null}
        </>

        {compoundingCar ? <RideSummaryModal data={compoundingCar} /> : null}
      </DriverBookingLayout>

      {showCancelModal && compoundingCar?.compounding_car_id ? (
        <RideCancelForm
          expectedGoingOnDate={compoundingCar.expected_going_on_date}
          onSubmit={(data) =>
            compoundingCar?.compounding_car_id &&
            hanleCancelCompoundingCar({
              ...data,
              compounding_car_id: compoundingCar.compounding_car_id,
            })
          }
          onClose={() => handleSetShowCancelModal(false)}
          params={{
            compounding_car_state: compoundingCar.state,
          }}
        />
      ) : null}

      {currentReportRatingId ? (
        <Modal
          key="report-compounding-car-modal"
          show={true}
          className="h-auto"
          onClose={() => handleSetCurrentReportRating(undefined)}
          heading="Báo cáo đánh giá"
        >
          <RatingReport
            onSubmit={(params) =>
              currentReportRatingId &&
              handleReportRating({ ...params, rating_id: currentReportRatingId })
            }
          />
        </Modal>
      ) : null}
    </>
  )
}

export default ConfirmBookingCustomer
