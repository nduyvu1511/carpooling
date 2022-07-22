import { Spinner } from "@/components"
import { CustomerEmptyLayout } from "@/layout"
import { CompoundingCarCustomer } from "@/models"
import { ridesApi } from "@/services"
import { AxiosResponse } from "axios"
import { useRouter } from "next/router"
import { useEffect } from "react"
import useSWR from "swr"

const ConfirmedCheckout = () => {
  const router = useRouter()
  const { compounding_car_customer_id, vnp_ResponseCode } = router.query

  const { isValidating } = useSWR(
    compounding_car_customer_id && vnp_ResponseCode === "00"
      ? "checking_deposit_for_customer"
      : null,
    () =>
      ridesApi
        .confirmDepositCompoundingCarCustomer({
          compounding_car_customer_id: Number(compounding_car_customer_id),
        })
        .then((res: AxiosResponse<CompoundingCarCustomer>) => {
          if (res.result.data.state === "deposit") {
            window.close()
          }
        }),

    {
      dedupingInterval: 0,
      revalidateOnFocus: true,
    }
  )

  useEffect(() => {
    if (!router.isReady) return
    if (vnp_ResponseCode !== "00") {
      window.close()
    }
  }, [router, vnp_ResponseCode])

  return (
    <>
      {isValidating ? (
        <div className="flex flex-col items-center">
          <div className="py-[80px]">
            <p className="text-16 font-medium">Đang xử lý giao dịch...</p>
            <Spinner className="py-[20px]" />
          </div>
        </div>
      ) : null}
    </>
  )
}

ConfirmedCheckout.Layout = CustomerEmptyLayout
export default ConfirmedCheckout
