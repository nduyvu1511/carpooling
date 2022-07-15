import { RidesSummary } from "@/components"
import { useCompoundingCarCustomer } from "@/hooks"
import { CustomerLayout } from "@/layout"
import { useRouter } from "next/router"

const CheckoutSuccess = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { data: compoundingCarCustomer, isValidating } = useCompoundingCarCustomer({
    key: "get_compounding_car_customer_detail_checkout",
    type: "once",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })

  if (compoundingCarCustomer?.state !== "deposit") return null
  return (
    <div className="max-w-[684px] w-full mx-auto py-24 checkout-success">
      {isValidating ? (
        <div className="skeleton h-[calc(100vh-140px)]"></div>
      ) : (
        <div className="block-element">
          <RidesSummary type="bill" rides={compoundingCarCustomer as any} />
        </div>
      )}
    </div>
  )
}

CheckoutSuccess.Layout = CustomerLayout
export default CheckoutSuccess
