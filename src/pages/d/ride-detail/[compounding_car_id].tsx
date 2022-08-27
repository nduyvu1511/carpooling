import {
  AccordionItem,
  Alert,
  Modal,
  RatingItem,
  RatingReport,
  RideCancelForm,
  RideCheckoutPopup,
  RideProgress,
  RidesDetailLoading,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
  RideSummaryPassengerItem,
  RideToolTip,
} from "@/components"
import { RootState } from "@/core/store"
import { toggleBodyOverflow } from "@/helper"
import { useCompoundingCarDriver, useDriverCheckout, useRatingActions } from "@/hooks"
import { DriverBookingLayout } from "@/layout"
import { DepositCompoundingCarDriverFailureRes, ReportRatingParams } from "@/models"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
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

  useEffect(() => {
    return () => {
      toggleBodyOverflow("unset")
    }
  }, [])

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
            <RidesDetailLoading />
          ) : compoundingCar?.compounding_car_id ? (
            <>
              <div className="">
                {compoundingCar?.car_driver_deposit_percentage &&
                compoundingCar.state !== "done" ? (
                  <RideToolTip
                    className="mb-24"
                    title={`${Number(
                      compoundingCar.car_driver_deposit_percentage
                    )}% phí đặt cọc là số tiền để xác nhận đảm bảo Tài xế nhận chuyến đi. Sau khi hoàn tất chuyến, ${Number(
                      compoundingCar.car_driver_deposit_percentage
                    )}% đặt cọc này sẽ đc chuyển lại Ví của Tài Xế.`}
                  />
                ) : null}

                <RideSummaryMobile className="mb-24 lg:hidden" rides={compoundingCar} />

                <AccordionItem
                  isActive={showCustomerList}
                  onClick={() => setShowCustomerList(!showCustomerList)}
                  className="px-24 py-[16px] bg-bg-primary border-none rounded-[5px]"
                  titleClassName="text-base text-blue-7 font-semibold"
                  title="DANH SÁCH HÀNH KHÁCH"
                >
                  {compoundingCar?.compounding_car_customers?.length &&
                    compoundingCar?.compounding_car_customers?.map((item, index) => (
                      <div
                        className="border-b border-solid border-border-color py-12 last:border-none"
                        key={item.compounding_car_customer_id}
                      >
                        <p className="mb-12 text-xs">{index + 1},</p>
                        <RideSummaryPassengerItem data={item} />
                      </div>
                    ))}
                </AccordionItem>
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
              <div className="fixed left-0 right-0 flex bottom-0 p-12 md:p-0 bg-white-color md:static md:bg-[transparent] mt-[40px]">
                {compoundingCar.state === "waiting_deposit" ||
                compoundingCar.state === "confirm_deposit" ||
                compoundingCar.state === "confirm" ? (
                  <button
                    onClick={() => {
                      setShowCancelModal(true)
                      toggleBodyOverflow("hidden")
                    }}
                    className={`btn bg-error mr-16`}
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
                    className={`btn-primary`}
                  >
                    Bắt đầu chuyến đi
                  </button>
                ) : null}

                {compoundingCar.state === "waiting_deposit" ||
                compoundingCar.state === "waiting" ? (
                  <button
                    onClick={() => handleConfirmCheckout(compoundingCar.compounding_car_id)}
                    className={`btn-primary`}
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

      <Alert
        show={!!(showAlert && compoundingCar?.compounding_car_id)}
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
