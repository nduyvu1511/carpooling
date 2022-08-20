import { RideCanceled, RideProgress, RideSummary } from "@/components"
import { useBackRouter, useCompoundingCarDriver } from "@/hooks"
import { DriverBookingLayout } from "@/layout"
import { CompoundingCarDriverRes } from "@/models"
import Link from "next/link"
import { useRouter } from "next/router"

const RideCanceledPage = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarDriver({
    key: `get_canceled_ride_driver_${compounding_car_id}`,
    type: "once",
    compounding_car_id: Number(compounding_car_id),
  })

  useBackRouter({
    cb: (as) => {
      if (as.includes("d/ride-detail/deposit")) {
        router.push("/d")
      }
    },
  })

  return (
    <DriverBookingLayout
      className="mb-[40px]"
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
      <div>
        <RideCanceled compoundingCar={compoundingCar} showLoading={isInitialLoading} />
        <div className="container fixed lg:static bottom-0 right-0 left-0 bg-white-color z-10 p-12">
          <Link href="/d">
            <a className="btn-primary-outline mx-auto">Về trang chủ</a>
          </Link>
        </div>
      </div>
    </DriverBookingLayout>
  )
}

export default RideCanceledPage
