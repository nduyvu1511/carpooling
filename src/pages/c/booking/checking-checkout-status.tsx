import { CheckoutProcess } from "@/components"
import { CheckoutLayout } from "@/layout"
import { VnpayStatus } from "@/models"
import { useRouter } from "next/router"

const ConfirmedCheckout = () => {
  const router = useRouter()
  const { compounding_car_customer_id, vnp_ResponseCode, sale_order_id } = router.query

  return (
    <>
      {compounding_car_customer_id ? (
        <CheckoutProcess
          fetcher_type="confirmDepositCompoundingCarCustomer"
          compounding_car_customer_id={Number(compounding_car_customer_id)}
          vnp_ResponseCode={vnp_ResponseCode as VnpayStatus}
          sale_order_id={Number(sale_order_id)}
        />
      ) : null}
    </>
  )
}

ConfirmedCheckout.Layout = CheckoutLayout
export default ConfirmedCheckout
