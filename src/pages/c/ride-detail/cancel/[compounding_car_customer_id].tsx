import { RidesCanceled, RidesProgress, RidesSummary, RidesSummaryMobile } from "@/components"
import { useCompoundingCarCustomer, useEffectOnce } from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { useRouter } from "next/router"

const RideCanceledPage = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const {
    data: compoundingCar,
    isInitialLoading,
    mutate: mutateCompoundingCar,
  } = useCompoundingCarCustomer({
    key: "get_canceled_ride_driver",
    type: "once",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })

  useEffectOnce(() => {
    return () => {
      mutateCompoundingCar(undefined, false)
    }
  })

  return (
    <CustomerBookingLayout
      className="pb-0 min-h-[calc(100vh-56px)] h-full"
      reverse
      topNode={<RidesProgress state={compoundingCar?.state} />}
      showLoading={isInitialLoading}
      title="Thông tin hủy chuyến đi"
      rightNode={
        compoundingCar ? (
          <>
            <div className="hidden lg:block">
              <RidesSummary rides={compoundingCar} car_account_type="car_driver" />
            </div>
            <div className="lg:hidden mx-12 mb-12 md:mb-0 md:mx-24 rounded-[5px] overflow-hidden">
              <RidesSummaryMobile rides={compoundingCar} />
            </div>
          </>
        ) : null
      }
    >
      <div className="mt-12 md:mt-0">
        <RidesCanceled compoundingCar={compoundingCar} showLoading={isInitialLoading} />
      </div>
    </CustomerBookingLayout>
  )
}

export default RideCanceledPage
