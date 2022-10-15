import { CheckoutProcess, Seo } from "@/components"
import { DriverLayout } from "@/layout"
import { VnpayStatus } from "@/models"
import { useRouter } from "next/router"

const ConfirmCheckoutDriver = () => {
  const router = useRouter()
  const { compounding_car_id, vnp_ResponseCode } = router.query

  return (
    <DriverLayout showHeaderOnMobile>
      <Seo
        title="Đang tiên hành thanh toán"
        url={`/d/ride-detail/checking-checkout-status?compounding_car_id=${compounding_car_id}`}
      />

      {compounding_car_id ? (
        <CheckoutProcess
          fetcher_type="confirmDepositForDriver"
          compounding_car_id={Number(compounding_car_id)}
          vnp_ResponseCode={vnp_ResponseCode as VnpayStatus}
        />
      ) : null}
    </DriverLayout>
  )
}

export default ConfirmCheckoutDriver
