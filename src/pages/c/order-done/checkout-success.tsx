import { RidesSummary } from "@/components"
import { useCompoundingCarCustomer, useEffectOnce } from "@/hooks"
import { CustomerLayout } from "@/layout"
import { useRouter } from "next/router"
import { useEffect } from "react"

const CheckoutSuccess = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const {
    data: compoundingCar,
    mutate: mutateCompoundingCar,
    isInitialLoading,
  } = useCompoundingCarCustomer({
    key: "get_compounding_car_customer_detail_checkout",
    type: "once",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })

  useEffectOnce(() => {
    return () => {
      mutateCompoundingCar(undefined, false)
    }
  })

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        router.push("/c")
      }
      return true
    })

    return () => {
      router.beforePopState(() => true)
    }
  }, [router])

  return (
    <div className="max-w-[684px] w-full mx-auto py-24 checkout-success">
      {isInitialLoading ? (
        <div className="skeleton h-[calc(100vh-140px)]"></div>
      ) : (
        <div className="block-element">
          <RidesSummary type="bill" car_account_type="car_driver" rides={compoundingCar as any} />
        </div>
      )}
    </div>
  )
}

CheckoutSuccess.Layout = CustomerLayout
export default CheckoutSuccess
