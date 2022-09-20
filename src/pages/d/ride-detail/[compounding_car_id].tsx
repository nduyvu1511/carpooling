import {
  AccordionItem,
  Alert,
  DriverDepositInfo,
  Modal,
  RatingItem,
  RatingReport,
  RideCancelForm,
  RideCancelSnackbar,
  RideCheckoutPopup,
  RideDetailLoading,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
  RideSummaryPassengerItem,
} from "@/components"
import { RootState } from "@/core/store"
import { toggleBodyOverflow } from "@/helper"
import { useCompoundingCarDriver, useDriverCheckout, useRatingActions } from "@/hooks"
import { DriverBookingLayout } from "@/layout"
import { DepositCompoundingCarDriverFailureRes, DownPayment, ReportRatingParams } from "@/models"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"

const ConfirmBookingCustomer = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const {
    data: compoundingCar,
    isInitialLoading,
    mutate,
  } = useCompoundingCarDriver({
    compounding_car_id: Number(compounding_car_id),
    key: `confirm_booking_compounding_car_customer_${compounding_car_id}`,
    type: "once",
  })
  const { reportRating } = useRatingActions()
  const { cancelDepositCompoundingCarDriver, fetchDepositCompoundingCarDriver } =
    useDriverCheckout()
  const [showAlert, setShowAlert] = useState<number | undefined>()
  const [depositFailure, setDepositFailure] = useState<
    DepositCompoundingCarDriverFailureRes | undefined
  >()
  const [showAlertAccount, setShowAlertAccount] = useState<boolean>(false)
  const [currentReportRatingId, setCurrentReportRatingId] = useState<number | undefined>()
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false)
  const [showCustomerList, setShowCustomerList] = useState<boolean>(false)

  const handleReportRating = (params: ReportRatingParams) => {
    reportRating({
      params,
      onSuccess() {
        setCurrentReportRatingId(undefined)
        mutate()
      },
    })
  }

  const handleConfirmCheckout = (compounding_car_id: number) => {
    if (userInfo?.verified_car_driver_account === "blocked_account") {
      dispatch(
        notify("Tài khoản của bạn đã bị khóa, vui lòng liên hệ với Exxe để giải quyết", "warning")
      )
      return
    }
    if (userInfo?.verified_car_driver_account === "inactive_account") {
      setShowAlertAccount(true)
      return
    }

    fetchDepositCompoundingCarDriver({
      compounding_car_id,
      onSuccess: () => {
        router.push(`/d/ride-detail/checkout/${compounding_car_id}`)
      },
      onError: (data) => {
        setDepositFailure(data)
        setTimeout(() => {
          toggleBodyOverflow("unset")
        }, 0)
      },
      showLoading: true,
    })
  }

  return (
    <>
      <DriverBookingLayout
        showLoading={isInitialLoading}
        topNode={<RideProgress state={compoundingCar?.state} />}
        rightNode={compoundingCar ? <RideSummary data={compoundingCar} /> : null}
        title="Chi tiết chuyến đi"
      >
        <>
          {isInitialLoading ? (
            <RideDetailLoading />
          ) : compoundingCar?.compounding_car_id ? (
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
                        <RideSummaryPassengerItem data={item} />
                      </div>
                    ))}
                </AccordionItem>

                <div className="ride-detail-driver mb-24">
                  <p className="text-base font-semibold uppercase mb-16 md:mb-24">Hóa đơn</p>
                  <DriverDepositInfo
                    discount_after_tax={compoundingCar?.discount_after_tax}
                    amount_total={
                      compoundingCar?.amount_undiscounted || compoundingCar.amount_total || 0
                    }
                    down_payment={compoundingCar.down_payment as DownPayment}
                    deposit_date={compoundingCar.deposit_date}
                  />
                </div>

                <RideCancelSnackbar expectedGoingOnDate={compoundingCar.expected_going_on_date} />
              </div>

              {compoundingCar.rating_ids?.length > 0 ? (
                <ul className="mt-24 border-t border-solid border-border-color pt-24">
                  <p className="text-base font-semibold uppercase mb-[12px]">
                    Đánh giá của khách hàng:{" "}
                  </p>
                  {compoundingCar.rating_ids.map((item) => (
                    <li key={item?.rating_id}>
                      <RatingItem
                        rating={item}
                        onReport={() => setCurrentReportRatingId(item.rating_id)}
                        car_account_type="car_driver"
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="fixed left-0 right-0 flex bottom-0 p-12 md:p-0 bg-white-color md:static md:bg-[transparent]">
                {compoundingCar.state === "waiting_deposit" ||
                compoundingCar.state === "confirm_deposit" ||
                compoundingCar.state === "confirm" ? (
                  <button
                    onClick={() => {
                      setShowCancelModal(true)
                      toggleBodyOverflow("hidden")
                    }}
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
                      router.push(`/d/ride-detail/in-process/${compoundingCar.compounding_car_id}`)
                    }}
                    className={`btn-primary px-12 sm:px-[28px]`}
                  >
                    Bắt đầu
                  </button>
                ) : null}

                {compoundingCar.state === "waiting_deposit" ||
                compoundingCar.state === "waiting" ? (
                  <button
                    onClick={() => handleConfirmCheckout(compoundingCar.compounding_car_id)}
                    className={`btn-primary whitespace-nowrap line-clamp-1`}
                  >
                    Nhận chuyến đi
                  </button>
                ) : null}
              </div>
            </>
          ) : null}
        </>
        {compoundingCar ? <RideSummaryModal data={compoundingCar} /> : null}
      </DriverBookingLayout>

      {showCancelModal && compoundingCar?.compounding_car_id ? (
        <RideCancelForm
          expectedGoingOnDate={compoundingCar.expected_going_on_date}
          onSubmit={(data) =>
            cancelDepositCompoundingCarDriver({
              params: {
                ...data,
                compounding_car_id: compoundingCar.compounding_car_id,
              },
              onSuccess: () => {
                setShowCancelModal(false)
                toggleBodyOverflow("unset")
                setDepositFailure(undefined)
                router.push(`/d/ride-detail/cancel/${compoundingCar.compounding_car_id}`)
              },
            })
          }
          onClose={() => {
            toggleBodyOverflow("unset")
            setShowCancelModal(false)
          }}
          params={{
            compounding_car_state: compoundingCar.state,
          }}
        />
      ) : null}

      {showAlert && compoundingCar?.compounding_car_id ? (
        <Alert
          show={true}
          type="warning"
          title="Bạn có chắc chắn muốn hủy giao dịch này?"
          onClose={() => setShowAlert(undefined)}
          onConfirm={() =>
            compoundingCar?.compounding_car_id &&
            showAlert &&
            cancelDepositCompoundingCarDriver({
              params: { compounding_car_id: showAlert },
              onSuccess: () => {
                setShowAlert(undefined)
                toggleBodyOverflow("unset")
                setDepositFailure(undefined)
                router.push(`/d/ride-detail/checkout/${compoundingCar.compounding_car_id}`)
              },
            })
          }
        />
      ) : null}

      {depositFailure ? (
        <RideCheckoutPopup
          onCheckout={(id) => {
            router.push(`/d/ride-detail/checkout/${id}`)
            toggleBodyOverflow("unset")
            setDepositFailure(undefined)
          }}
          onCancelRide={(id) => setShowAlert(id)}
          data={depositFailure}
          onClose={() => {
            toggleBodyOverflow("unset")
            setDepositFailure(undefined)
          }}
        />
      ) : null}

      {currentReportRatingId ? (
        <Modal
          key="report-compounding-car-modal"
          show={true}
          className="h-auto"
          onClose={() => setCurrentReportRatingId(undefined)}
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

      <Alert
        show={showAlertAccount}
        onClose={() => setShowAlertAccount(false)}
        onConfirm={() => {
          setShowAlertAccount(false)
          router.push("/d/register")
        }}
        title="Tài khoản của bạn chưa được kích hoạt, vui lòng nhập đầy đủ thông tin đăng ký tài xế để Exxe xét duyệt hồ sơ"
        type="warning"
      />
    </>
  )
}

export default ConfirmBookingCustomer
