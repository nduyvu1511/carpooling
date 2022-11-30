import {
  Alert,
  ConvenientForm,
  RideDetailLoading,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
  Seo,
} from "@/components"
import { RootState } from "@/core/store"
import { useCompoundingCar, useCompoundingCarActions, useCompoundingForm } from "@/hooks"
import { DriverBookingLayout } from "@/layout"
import { CreateConvenientCompoundingCar } from "@/models"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"

const CompoundingCarDriver = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { compounding_car_id } = router.query

  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)
  const { driverConfirmCompoundingCar, updateDriverCompoundingCar } = useCompoundingCarActions()
  const { compoundingCarResToConvenientForm, clearCarpoolingForm } = useCompoundingForm()
  const { data: compoundingCar, isInitialLoading } = useCompoundingCar({
    compounding_car_id: Number(compounding_car_id),
    key: `confirm_booking_compounding_car_driver_${compounding_car_id}`,
    type: "once",
  })

  const [showAlertAccount, setShowAlertAccount] = useState<boolean>(false)

  const handleConfirmCompoundingCar = (params: CreateConvenientCompoundingCar) => {
    if (!compoundingCar?.compounding_car_id) return

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

    updateDriverCompoundingCar({
      params: {
        ...params,
        compounding_car_id: compoundingCar?.compounding_car_id,
        compounding_type: "convenient",
      },
      onSuccess: () => {
        clearCarpoolingForm()
        driverConfirmCompoundingCar({
          params: { compounding_car_id: compoundingCar.compounding_car_id },
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
          url={`d/booking/confirm/${compounding_car_id}`}
        />
        <>
          {isInitialLoading ? (
            <RideDetailLoading />
          ) : compoundingCar ? (
            <>
              <RideSummaryMobile className="lg:hidden mb-24" rides={compoundingCar} />
              <ConvenientForm
                defaultValues={compoundingCarResToConvenientForm(compoundingCar)}
                onSubmit={handleConfirmCompoundingCar}
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
