import { RideCanceled, RideProgress, RideSummary } from "@/components"
import { useCompoundingCarDriver } from "@/hooks"
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
    key: `get_canceled_ride_driver_${compounding_car_id}`,
    type: "once",
    compounding_car_id: Number(compounding_car_id),
  })

  return (
    <DriverBookingLayout
      reverse
      showLoading={isInitialLoading}
      title="Thông tin hủy chuyến đi"
      topNode={<RideProgress state={compoundingCar?.state} />}
      rightNode={
        <div className="p-12 md:p-24 lg:p-0">
          <RideSummary data={compoundingCar as CompoundingCarDriverRes} />
        </div>
      }
    >
      <div className="">
        <RideCanceled compoundingCar={compoundingCar} showLoading={isInitialLoading} />
      </div>
    </DriverBookingLayout>
  )
}

export default RideCanceledPage
