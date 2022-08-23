import { RideCanceled, RideProgress, RideSummary } from "@/components"
import { useBackRouter, useCompoundingCarDriver } from "@/hooks"
import { DriverBookingLayout } from "@/layout"
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
      if (as.includes("c/ride-detail")) {
        router.push("/c")
      }
    },
  })

  return (
    <DriverBookingLayout
      className="mb-[40px]"
      showLoading={isInitialLoading}
      title="Thông tin hủy chuyến đi"
      topNode={<RideProgress state={compoundingCar?.state} />}
      rightNode={compoundingCar ? <RideSummary data={compoundingCar} /> : null}
    >
      <div>
        <RideCanceled compoundingCar={compoundingCar} showLoading={isInitialLoading} />
        <div className="container fixed lg:static bottom-0 right-0 left-0 bg-white-color z-10">
          <Link href="/d">
            <a className="btn-primary-outline mx-auto">Về trang chủ</a>
          </Link>
        </div>
      </div>
    </DriverBookingLayout>
  )
}

export default RideCanceledPage
