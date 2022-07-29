import { CheckoutProcess } from "@/components"
import { DriverLayout } from "@/layout"
import { VnpayStatus } from "@/models"
import { useRouter } from "next/router"

const ConfirmCheckoutDriver = () => {
  const router = useRouter()
  const { compounding_car_id, vnp_ResponseCode } = router.query

  return (
    <DriverLayout showHeaderOnMobile>
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
