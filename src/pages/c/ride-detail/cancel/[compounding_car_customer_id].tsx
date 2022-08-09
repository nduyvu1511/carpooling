import { RideCanceled, RideProgress, RideSummary, RideSummaryMobile } from "@/components"
import { useCompoundingCarCustomer } from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { useRouter } from "next/router"

const RideCanceledPage = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarCustomer({
    key: `get_canceled_ride_driver_${compounding_car_customer_id}`,
    type: "once",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })

  return (
    <CustomerBookingLayout
      className="pb- min-h-[calc(100vh-56px)] h-full"
      reverse
      topNode={<RideProgress state={compoundingCar?.state} />}
      showLoading={isInitialLoading}
      title="Thông tin hủy chuyến đi"
      rightNode={
        compoundingCar ? (
          <>
            <div className="hidden lg:block">
              <RideSummary data={compoundingCar} />
            </div>
            <div className="lg:hidden mx-12 mb-12 md:mb-0 md:mx-24 rounded-[5px] overflow-hidden mt-12">
              <RideSummaryMobile rides={compoundingCar} />
            </div>
          </>
        ) : null
      }
    >
      <div className="mt-12 md:mt-0">
        <RideCanceled compoundingCar={compoundingCar} showLoading={isInitialLoading} />
      </div>
    </CustomerBookingLayout>
  )
}

export default RideCanceledPage
