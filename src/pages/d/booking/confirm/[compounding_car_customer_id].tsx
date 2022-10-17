import {
  Alert,
  CarpoolingCompoundingForm,
  RideDetailLoading,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
  Seo,
} from "@/components"
import { RootState } from "@/core/store"
import { useCompoundingCarActions, useCompoundingCarCustomer, useCompoundingForm } from "@/hooks"
import { DriverBookingLayout } from "@/layout"
import { CreateCarpoolingCompoundingCar } from "@/models"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"

const CompoundingCarDriver = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { compounding_car_customer_id } = router.query

  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)
  const { confirmCompoundingCar, updateCompoundingCar } = useCompoundingCarActions()
  const { compoundingCarCustomerResToCarpoolingForm, clearCarpoolingWayCompoundingCar } =
    useCompoundingForm()
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarCustomer({
    compounding_car_customer_id: Number(compounding_car_customer_id),
    key: `confirm_booking_compounding_car_customer_driver_${compounding_car_customer_id}`,
    type: "once",
  })

  const [showAlertAccount, setShowAlertAccount] = useState<boolean>(false)

  const handleConfirmCompoundingCar = (params: CreateCarpoolingCompoundingCar) => {
    if (!compoundingCar?.compounding_car_customer_id) return

    if (userInfo?.verified_car_driver_account === "blocked_account") {
      dispatch(
        notify(
          "Tài khoản của bạn đã bị khóa, vui lòng liên hệ với bộ phận CSKH để giải quyết",
          "warning"
        )
      )
      return
    }
    if (userInfo?.verified_car_driver_account === "inactive_account") {
      setShowAlertAccount(true)
      return
    }

    if (compoundingCar.state === "confirm") {
      router.push(
        `/d/ride-detail/checkout/checkout-success?compounding_car_id=${compoundingCar.compounding_car_id}`
      )
      return
    }

    updateCompoundingCar({
      params: {
        ...params,
        compounding_car_customer_id: compoundingCar?.compounding_car_customer_id,
        compounding_type: "convenient",
      },
      onSuccess: () => {
        clearCarpoolingWayCompoundingCar()
        confirmCompoundingCar({
          params: { compounding_car_customer_id: compoundingCar.compounding_car_customer_id },
          onSuccess: () => {
            router.push(
              `/d/ride-detail/checkout/checkout-success?compounding_car_id=${compoundingCar.compounding_car_id}`
            )
          },
        })
      },
    })
  }

  return (
    <>
      <DriverBookingLayout
        showLoading={isInitialLoading}
        topNode={<RideProgress state={compoundingCar?.state} />}
        rightNode={compoundingCar ? <RideSummary data={compoundingCar} /> : null}
        title="Xác nhận chuyến đi"
      >
        <Seo
          description="Xác nhận chuyến đi"
          title="Xác nhận chuyến đi"
          url={`d/booking/confirm/${compounding_car_customer_id}`}
        />
        <>
          {isInitialLoading ? (
            <RideDetailLoading />
          ) : compoundingCar ? (
            <>
              <RideSummaryMobile className="lg:hidden mb-24" rides={compoundingCar} />
              <CarpoolingCompoundingForm
                compoundingType="convenient"
                defaultValues={compoundingCarCustomerResToCarpoolingForm(compoundingCar)}
                onSubmit={(data) => handleConfirmCompoundingCar(data)}
                view="page"
                mode="confirm"
              />
            </>
          ) : (
            <div className="py-[40px] text-center">
              <p className="text-base">Không tìm thấy chuyến đi này</p>
            </div>
          )}
        </>

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

        {compoundingCar ? <RideSummaryModal data={compoundingCar} /> : null}
      </DriverBookingLayout>
    </>
  )
}

export default CompoundingCarDriver
