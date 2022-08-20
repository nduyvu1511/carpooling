import {
  Alert,
  CarpoolingCompoundingForm,
  Modal,
  OneWayCompoundingForm,
  RatingItem,
  RatingReport,
  RideCancelForm,
  RideCheckoutPopup,
  RideProgress,
  RidesDetailLoading,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
  RideToolTip,
  TwoWayCompoundingForm,
} from "@/components"
import { RootState } from "@/core/store"
import { toggleBodyOverflow } from "@/helper"
import {
  useBackRouter,
  useCompoundingCarDriver,
  useCompoundingForm,
  useDriverCheckout,
  useEffectOnce,
  useRatingActions,
} from "@/hooks"
import { DriverBookingLayout } from "@/layout"
import {
  CancelCompoundingCarDriverParams,
  DepositCompoundingCarDriverFailureRes,
  ReportRatingParams,
} from "@/models"
import { setShowSummaryDetail } from "@/modules"
import Link from "next/link"
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
  const {
    compoundingCarResToCarpoolingForm,
    compoundingCarResToOneWayForm,
    compoundingCarResToTwoWayForm,
  } = useCompoundingForm()
  const { cancelDepositCompoundingCarDriver, fetchDepositCompoundingCarDriver } =
    useDriverCheckout()
  const [showAlert, setShowAlert] = useState<number | undefined>()
  const [depositFailure, setDepositFailure] = useState<
    DepositCompoundingCarDriverFailureRes | undefined
  >()
  const [showAlertAccount, setShowAlertAccount] = useState<boolean>(false)
  const [currentReportRatingId, setCurrentReportRatingId] = useState<number | undefined>()
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false)

  useBackRouter({
    cb: () => {
      setShowAlert(undefined)
      toggleBodyOverflow("unset")
    },
  })

  useEffectOnce(() => {
    return () => {
      dispatch(setShowSummaryDetail(false))
    }
  })

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
        router.push(`/d/ride-detail/checkout?compounding_car_id=${compounding_car_id}`)
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
        topNode={
          <div>
            <RideProgress state={compoundingCar?.state} />
            {compoundingCar?.car_driver_deposit_percentage && compoundingCar.state !== "done" ? (
              <RideToolTip
                percentage={Math.round(compoundingCar?.car_driver_deposit_percentage)}
                className="mt-12 lg:hidden mr-12 md:ml-12 md:mr-24 mb-[-12px] md:mb-0 md:mt-24"
                desc="Phần chi phí còn lại sẽ được hoàn trả sau khi hoàn thành chuyến đi"
              />
            ) : null}
          </div>
        }
        rightNode={
          compoundingCar ? (
            <>
              <div className="hidden lg:block">
                <RideSummary showFull={false} data={compoundingCar} />
              </div>
              <div className="lg:hidden mx-12 mb-12 md:mb-0 md:mx-24 rounded-[5px] overflow-hidden mt-12">
                <RideSummaryMobile showDetailBtn={false} rides={compoundingCar} />
              </div>
            </>
          ) : null
        }
        title="Chi tiết chuyến đi"
      >
        {compoundingCar?.car_driver_deposit_percentage && compoundingCar.state !== "done" ? (
          <RideToolTip
            percentage={Math.round(compoundingCar?.car_driver_deposit_percentage)}
            className="hidden lg:flex mx-24"
            desc="số tiền còn lại sẽ được hoàn trả sau khi hoàn thành chuyến đi."
          />
        ) : null}

        {compoundingCar?.state === "done" ? (
          <div className="px-12 md:px-24 md:mt-12 lg:mt-0 mb-24 md:mb-0">
            <Link href={`/d/ride-detail/done/${compoundingCar.compounding_car_id}`} passHref>
              <a className="text-sm text-primary underline">Xem chi tiết trong hóa đơn</a>
            </Link>
          </div>
        ) : null}

        <div className="p-12 md:p-24 pt-0 bg-white-color rounded-[5px] shadow-shadow-1 h-fit">
          {isInitialLoading ? (
            <RidesDetailLoading />
          ) : compoundingCar?.compounding_car_id ? (
            <>
              <div className="">
                {compoundingCar?.compounding_type ? (
                  <>
                    {compoundingCar.compounding_type === "one_way" ? (
                      <OneWayCompoundingForm
                        defaultValues={compoundingCarResToOneWayForm(compoundingCar)}
                        disabled
                      />
                    ) : compoundingCar.compounding_type === "two_way" ? (
                      <TwoWayCompoundingForm
                        defaultValues={compoundingCarResToTwoWayForm(compoundingCar)}
                        disabled
                      />
                    ) : (
                      <CarpoolingCompoundingForm
                        defaultValues={compoundingCarResToCarpoolingForm(compoundingCar)}
                        disabled
                      />
                    )}
                  </>
                ) : null}
              </div>
              {compoundingCar.rating_ids?.length > 0 ? (
                <ul className="mt-[40px] border-t border-solid border-border-color pt-24">
                  <p className="text-base mb-[12px]">Đánh giá của khách hàng: </p>
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
                    className={`btn bg-error mr-[16px]`}
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
        </div>
        {compoundingCar ? <RideSummaryModal rides={compoundingCar} /> : null}
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
              router.push(
                `/d/ride-detail/checkout?compounding_car_id=${compoundingCar.compounding_car_id}`
              )
            },
          })
        }
      />

      {depositFailure ? (
        <RideCheckoutPopup
          onCheckout={(id) => {
            router.push(`/d/ride-detail/checkout?compounding_car_id=${id}`)
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
