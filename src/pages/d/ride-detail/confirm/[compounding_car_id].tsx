import {
  Alert,
  CarpoolingCompoundingForm,
  OneWayCompoundingForm,
  RideCancelForm,
  RideCheckoutPopup,
  RideDetailLoading,
  RideProgress,
  RideSummary,
  RideSummaryModal,
  RideToolTip,
  Seo,
  TwoWayCompoundingForm,
} from "@/components"
import { RootState } from "@/core/store"
import { toggleBodyOverflow } from "@/helper"
import { useCompoundingCarDriver, useCompoundingForm, useDriverCheckout } from "@/hooks"
import { DriverBookingLayout } from "@/layout"
import { DepositCompoundingCarDriverFailureRes } from "@/models"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"

const RideConfirmCustomer = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const {
    compoundingCarResToCarpoolingForm,
    compoundingCarResToOneWayForm,
    compoundingCarResToTwoWayForm,
  } = useCompoundingForm()
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarDriver({
    compounding_car_id: Number(compounding_car_id),
    key: `confirm_booking_compounding_car_customer_${compounding_car_id}`,
    type: "once",
  })
  const { cancelDepositCompoundingCarDriver, fetchDepositCompoundingCarDriver } =
    useDriverCheckout()

  const [showAlertAccount, setShowAlertAccount] = useState<boolean>(false)
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<number | undefined>()
  const [depositFailure, setDepositFailure] = useState<
    DepositCompoundingCarDriverFailureRes | undefined
  >()

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
        rightNode={compoundingCar ? <RideSummary showFull={false} data={compoundingCar} /> : null}
        title="Chi tiết chuyến đi"
      >
        <Seo title="Chi tiết chuyến đi" url={`/d/ride-detail/confirm/${compounding_car_id}`} />
        <>
          {isInitialLoading ? (
            <RideDetailLoading />
          ) : compoundingCar?.compounding_car_id ? (
            <>
              <RideToolTip
                className="mb-24"
                title={`${Number(
                  compoundingCar.car_driver_deposit_percentage
                )}% phí đặt cọc là số tiền để xác nhận đảm bảo Tài xế nhận chuyến đi. Sau khi hoàn tất chuyến, ${Number(
                  compoundingCar.car_driver_deposit_percentage
                )}% đặt cọc này sẽ được chuyển lại Ví của Tài Xế.`}
              />

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

              <div className="fixed left-0 right-0 flex bottom-0 p-12 md:p-0 bg-white-color md:static md:bg-[transparent] mt-[40px]">
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

export default RideConfirmCustomer
