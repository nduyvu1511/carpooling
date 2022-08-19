import { CheckoutProcess } from "@/components"
import { CheckoutLayout } from "@/layout"
import { VnpayStatus } from "@/models"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { RootState } from "../core"

const CheckingRechargeStatus = () => {
  const router = useRouter()
  const { vnp_ResponseCode } = router.query
  const currentPaymentId = useSelector((state: RootState) => state.checkout.currentPaymentId)

  return (
    <>
      {currentPaymentId && vnp_ResponseCode ? (
        <CheckoutProcess
          fetcher_type="confirmRechargeRequest"
          vnp_ResponseCode={vnp_ResponseCode as VnpayStatus}
          payment_id={currentPaymentId}
        />
      ) : null}
    </>
  )
}

CheckingRechargeStatus.Layout = CheckoutLayout
export default CheckingRechargeStatus
