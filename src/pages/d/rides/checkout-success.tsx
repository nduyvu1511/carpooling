import { RidesSummary } from "@/components"
import { useCompoundingCarDriver } from "@/hooks"
import { DriverLayout } from "@/layout"
import { useRouter } from "next/router"

const CheckoutSuccess = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { data: compoundingCar, isValidating } = useCompoundingCarDriver({
    key: "get_compounding_car_customer_detail_checkout",
    type: "once",
    compounding_car_id: Number(compounding_car_id),
  })

  if (compoundingCar?.state !== "confirm_deposit") return null
  return (
    <div className="max-w-[684px] w-full mx-auto py-24 checkout-success">
      {isValidating ? (
        <div className="skeleton h-[calc(100vh-140px)]"></div>
      ) : (
        <div className="block-element">
          <RidesSummary type="bill" car_account_type="car_driver" rides={compoundingCar} />
        </div>
      )}
    </div>
  )
}

CheckoutSuccess.Layout = DriverLayout
export default CheckoutSuccess
