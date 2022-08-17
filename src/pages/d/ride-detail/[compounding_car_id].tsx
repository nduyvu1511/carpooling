import { WarningIcon } from "@/assets"
import {
  Alert,
  CarpoolingCompoundingForm,
  CheckoutExistsItem,
  Modal,
  OneWayCompoundingForm,
  RatingItem,
  RatingReport,
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
import { DepositCompoundingCarDriverFailureRes } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import moment from "moment"
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
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<number | undefined>()
  const [depositFailure, setDepositFailure] = useState<
    DepositCompoundingCarDriverFailureRes | undefined
  >()
  const [showAlertAccount, setShowAlertAccount] = useState<boolean>(false)
  const [currentReportRatingId, setCurrentReportRatingId] = useState<number | undefined>()

  const handleReportRating = (rating_id: number) => {
    reportRating({
      params: { rating_id },
      onSuccess() {
        setCurrentReportRatingId(undefined)
        mutate()
      },
    })
  }

  useBackRouter({
    cb: () => {
      setShowAlert(undefined)
      setShowModal(false)
      toggleBodyOverflow("unset")
    },
  })

  useEffectOnce(() => {
    return () => {
      dispatch(setShowSummaryDetail(false))
    }
  })

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
        setShowModal(true)
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
                    <li key={item.rating_id}>
                      <RatingItem
                        rating={item}
                        onReport={() => setCurrentReportRatingId(item.rating_id)}
                        car_account_type="car_driver"
                      />
                    </li>
                  ))}
                </ul>
              ) : null}

              {compoundingCar.state === "waiting_deposit" || compoundingCar.state === "waiting" ? (
                <div className="fixed left-0 right-0 bottom-0 p-12 md:p-0 bg-white-color md:static md:bg-[transparent] mt-[40px]">
                  {/* ${moment(compoundingCar?.expected_going_on_date).isBefore(moment(new Date()))
                ? "btn-disabled"
                : ""} */}
                  <button
                    onClick={() => handleConfirmCheckout(compoundingCar.compounding_car_id)}
                    className={`btn-primary mx-auto md:mx-[unset]`}
                  >
                    Nhận chuyến đi
                  </button>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
        {compoundingCar ? <RideSummaryModal rides={compoundingCar} /> : null}
      </DriverBookingLayout>

      <Alert
        show={!!(showAlert && compoundingCar?.compounding_car_id)}
        type="warning"
        desc="Bạn có chắc chắn muốn hủy giao dịch này?"
        onClose={() => setShowAlert(undefined)}
        onConfirm={() =>
          compoundingCar?.compounding_car_id &&
          showAlert &&
          cancelDepositCompoundingCarDriver(showAlert, () => {
            setShowAlert(undefined)
            setShowModal(false)
            toggleBodyOverflow("unset")
            setDepositFailure(undefined)
            router.push(
              `/d/ride-detail/checkout?compounding_car_id=${compoundingCar.compounding_car_id}`
            )
          })
        }
      />

      <Modal
        key="alert-compounding-car-modal"
        show={showModal && !!depositFailure}
        onClose={() => {
          setShowModal(false)
          toggleBodyOverflow("unset")
        }}
        heading="Cảnh báo"
      >
        <div className="p-12 md:p-24 pb-0 w-full h-full overflow-y-auto">
          <div className="mb-[40px] flex items-start">
            <span>
              <WarningIcon className="mb-auto w-[40px] h-[40px] mr-[24px]" />
            </span>
            <h3 className="text-base flex-1">{depositFailure?.message}</h3>
          </div>

          {depositFailure && depositFailure.data?.length > 0 ? (
            <ul className="">
              {depositFailure?.data.map((item, index) => (
                <li
                  className="border-b border-solid border-border-color last:border-none mb-24"
                  key={index}
                >
                  <CheckoutExistsItem
                    amount={item.amount}
                    compounding_car_name={item.compounding_car.compounding_car_name}
                    date={item.date}
                    second_remains={item.second_remains}
                    onClickCancel={() => setShowAlert(item.compounding_car.compounding_car_id)}
                    onClickCheckout={() => {
                      router.push(
                        `/d/ride-detail/checkout?compounding_car_id=${item.compounding_car.compounding_car_id}`
                      )
                      setShowModal(false)
                      toggleBodyOverflow("unset")
                      setDepositFailure(undefined)
                    }}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Modal>

      <Modal
        key="report-compounding-car-modal"
        show={!!currentReportRatingId}
        className="h-auto"
        onClose={() => setCurrentReportRatingId(undefined)}
        heading="Báo cáo đánh giá"
      >
        <div className="p-24">
          <p className="text-sm mb-[24px]">Vui lòng chọn lý do để báo cáo:</p>
          <RatingReport
            list={[{ id: 1, label: "Người dùng spam" }]}
            onSubmit={() => currentReportRatingId && handleReportRating(currentReportRatingId)}
          />
        </div>
      </Modal>

      <Alert
        show={showAlertAccount}
        onClose={() => setShowAlertAccount(false)}
        onConfirm={() => {
          setShowAlertAccount(false)
          router.push("/d/register")
        }}
        desc="Tài khoản của bạn chưa được kích hoạt, vui lòng nhập đầy đủ thông tin đăng ký tài xế để Exxe xét duyệt hồ sơ"
        type="warning"
      />
    </>
  )
}

export default ConfirmBookingCustomer
