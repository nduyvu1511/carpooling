import { CheckoutProcess, Seo } from "@/components"
import { CheckoutLayout } from "@/layout"
import { VnpayStatus } from "@/models"
import { useRouter } from "next/router"

const ConfirmCheckoutDriver = () => {
  const router = useRouter()
  const { compounding_car_id, vnp_ResponseCode } = router.query

  return (
    <>
      <Seo
        title="Đang tiên hành thanh toán"
        url={`/d/ride-detail/checkout/checking-checkout-status?compounding_car_id=${compounding_car_id}`}
      />

      {compounding_car_id ? (
        <CheckoutProcess
          onBack={() => router.push(`/d/ride-detail/checkout/${compounding_car_id}`)}
          fetcher_type="confirmDepositForDriver"
          compounding_car_id={Number(compounding_car_id)}
          vnp_ResponseCode={vnp_ResponseCode as VnpayStatus}
          onRedirect={() =>
            router.push(
              `/d/ride-detail/checkout/checkout-success?compounding_car_id=${compounding_car_id}`
            )
          }
        />
      ) : null}
    </>
  )
}

ConfirmCheckoutDriver.Layout = CheckoutLayout
export default ConfirmCheckoutDriver
