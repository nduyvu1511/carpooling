import { RidesCanceled, RidesSummary } from "@/components"
import { useCompoundingCarCustomer, useEffectOnce } from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { CompoundingCarCustomer } from "@/models"
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
      showLoading={isInitialLoading}
      title="Thông tin hủy chuyến đi"
      rightNode={
        <RidesSummary
          rides={compoundingCar as CompoundingCarCustomer}
          car_account_type="car_driver"
        />
      }
    >
      <RidesCanceled compoundingCar={compoundingCar} showLoading={isInitialLoading} />
    </CustomerBookingLayout>
  )
}

export default RideCanceledPage
