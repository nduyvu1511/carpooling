import { RidesCanceled, RidesSummary } from "@/components"
import { useCompoundingCarDriver, useEffectOnce } from "@/hooks"
import { DriverBookingLayout } from "@/layout"
import { CompoundingCarDriverRes } from "@/models"
import { useRouter } from "next/router"

const RideCanceledPage = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const {
    data: compoundingCar,
    isInitialLoading,
    mutate,
  } = useCompoundingCarDriver({
    key: "get_canceled_ride_driver",
    type: "once",
    compounding_car_id: Number(compounding_car_id),
  })

  useEffectOnce(() => {
    return () => {
      mutate(undefined, false)
    }
  })

  return (
    <DriverBookingLayout
      showLoading={isInitialLoading}
      title="Thông tin hủy chuyến đi"
      rightNode={
        <RidesSummary
          rides={compoundingCar as CompoundingCarDriverRes}
          car_account_type="car_driver"
        />
      }
    >
      <RidesCanceled compoundingCar={compoundingCar} showLoading={isInitialLoading} />
    </DriverBookingLayout>
  )
}

export default RideCanceledPage
