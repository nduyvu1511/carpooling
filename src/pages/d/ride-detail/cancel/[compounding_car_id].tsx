import { RideCanceled, RideProgress, RideSummary, Seo } from "@/components"
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
      <Seo title="Chi tiết hủy chuyến" url={`/d/ride-detail/cancel/${compounding_car_id}`} />

      <RideCanceled compoundingCar={compoundingCar} showLoading={isInitialLoading} />
      <div className="mt-40">
        <Link href="/d">
          <a className="btn-primary-outline mx-auto sm:mx-0">Về trang chủ</a>
        </Link>
      </div>
    </DriverBookingLayout>
  )
}

export default RideCanceledPage
