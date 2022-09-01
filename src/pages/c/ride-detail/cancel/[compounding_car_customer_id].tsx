import { RideCanceled, RideProgress, RideSummary } from "@/components"
import { useCompoundingCarCustomer } from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { useRouter } from "next/router"

const RideCanceledPage = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarCustomer({
    key: `get_canceled_ride_customer_${compounding_car_customer_id}`,
    type: "once",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })

  return (
    <CustomerBookingLayout
      className="pmin-h-[calc(100vh-56px)] h-full pb-0"
      topNode={<RideProgress state={compoundingCar?.state} />}
      showLoading={isInitialLoading}
      title="Thông tin hủy chuyến đi"
      rightNode={compoundingCar ? <RideSummary data={compoundingCar} /> : null}
    >
      {compoundingCar ? (
        <RideCanceled compoundingCar={compoundingCar} showLoading={isInitialLoading} />
      ) : null}

      <div className="flex justify-center md:justify-start mt-40">
        <button onClick={() => router.push("/c")} className="btn-primary-outline">
          Về trang chủ
        </button>
      </div>
    </CustomerBookingLayout>
  )
}

export default RideCanceledPage
