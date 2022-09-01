import {
  Alert,
  CarpoolingCompoundingForm,
  OneWayCompoundingForm,
  RideCheckoutPopup,
  RideProgress,
  RideDetailLoading,
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
} from "@/hooks"
import { DriverBookingLayout } from "@/layout"
import { DepositCompoundingCarDriverFailureRes } from "@/models"
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

  useBackRouter({
    cb: () => {
      setShowAlert(undefined)
      toggleBodyOverflow("unset")
    },
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
        rightNode={compoundingCar ? <RideSummary showFull={false} data={compoundingCar} /> : null}
        title="Chi tiết chuyến đi"
      >
        {compoundingCar?.car_driver_deposit_percentage && compoundingCar.state !== "done" ? (
          <RideToolTip
            percentage={Math.round(compoundingCar?.car_driver_deposit_percentage)}
            className="hidden lg:flex mb-24"
            desc="số tiền còn lại sẽ được hoàn trả sau khi hoàn thành chuyến đi."
          />
        ) : null}

        {compoundingCar?.state === "done" ? (
          <div className="px-custom md:mt-12 lg:mt-0 mb-24 md:mb-0">
            <Link href={`/d/ride-detail/done/${compoundingCar.compounding_car_id}`} passHref>
              <a className="text-sm text-primary underline">Xem chi tiết trong hóa đơn</a>
            </Link>
          </div>
        ) : null}

        <>
          {isInitialLoading ? (
            <RideDetailLoading />
          ) : compoundingCar?.compounding_car_id ? (
            <>
              <div className="">
                <RideSummaryMobile
                  className="mb-24 lg:hidden"
                  showDetailBtn={false}
                  rides={compoundingCar}
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
              </div>

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
