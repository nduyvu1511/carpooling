import { CheckoutProcess, Seo } from "@/components"
import { CustomerLayout } from "@/layout"
import { VnpayStatus } from "@/models"
import { useRouter } from "next/router"

const CheckingCheckoutStatus = () => {
  const router = useRouter()
  const { compounding_car_customer_id, vnp_ResponseCode } = router.query

  return (
    <>
      <Seo
        title="Tiền hành thanh toán chuyến đi"
      url={`c/ride-detail/checkout/checking-checkout-status?compounding_car_customer_id=${compounding_car_customer_id}`}
      />

      {compounding_car_customer_id ? (
        <CheckoutProcess
          fetcher_type="customerConfirmPayFullCompoundingCar"
          compounding_car_customer_id={Number(compounding_car_customer_id)}
          vnp_ResponseCode={vnp_ResponseCode as VnpayStatus}
        />
      ) : null}
    </>
  )
}

CheckingCheckoutStatus.Layout = CustomerLayout
export default CheckingCheckoutStatus
