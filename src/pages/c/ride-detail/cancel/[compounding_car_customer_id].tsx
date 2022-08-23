import { RideCanceled, RideProgress, RideSummary, RideSummaryMobile } from "@/components"
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
    </CustomerBookingLayout>
  )
}

export default RideCanceledPage
