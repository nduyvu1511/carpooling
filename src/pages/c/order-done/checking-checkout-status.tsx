import { Spinner } from "@/components"
import { CompoundingCarCustomer } from "@/models"
import { ridesApi } from "@/services"
import { AxiosResponse } from "axios"
import { useRouter } from "next/router"
import { useEffect } from "react"
import useSWR from "swr"

const CheckingCheckoutStatus = () => {
  const router = useRouter()
  const { compounding_car_customer_id, vnp_ResponseCode } = router.query

  const { isValidating } = useSWR(
    compounding_car_customer_id && vnp_ResponseCode === "00"
      ? "checking_payfull_for_customer"
      : null,
    () =>
      ridesApi
        .customerConfirmPayFullCompoundingCar({
          compounding_car_customer_id: Number(compounding_car_customer_id),
        })
        .then((res: AxiosResponse<CompoundingCarCustomer>) => {
          if (res.result.data?.state === "confirm_paid") {
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
        <div className="flex-center flex-col py-[80px]">
          <span className="text-sm">Đang xử lý giao dịch</span>
          <Spinner size={40} />
        </div>
      ) : null}
    </>
  )
}

export default CheckingCheckoutStatus
