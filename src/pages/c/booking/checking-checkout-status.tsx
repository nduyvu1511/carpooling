import { CheckoutProcess, Seo } from "@/components"
import { CheckoutLayout } from "@/layout"
import { CompoundingType, VnpayStatus } from "@/models"
import { useRouter } from "next/router"

const ConfirmedCheckout = () => {
  const router = useRouter()
  const { compounding_car_customer_id, vnp_ResponseCode, compounding_car_id, compounding_type } =
    router.query

  return (
    <>
      <Seo
        title="Đang tiến hành thanh toán"
        url={`c/booking/checking-checkout-status?compounding_car_customer_id=${compounding_car_customer_id}`}
      />
      {compounding_car_customer_id ? (
        <CheckoutProcess
          fetcher_type="confirmDepositCompoundingCarCustomer"
          compounding_car_customer_id={Number(compounding_car_customer_id)}
          compounding_car_id={Number(compounding_car_id)}
          vnp_ResponseCode={vnp_ResponseCode as VnpayStatus}
          compounding_type={compounding_type as CompoundingType}
        />
      ) : null}
    </>
  )
}

ConfirmedCheckout.Layout = CheckoutLayout
export default ConfirmedCheckout
