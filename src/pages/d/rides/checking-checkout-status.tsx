import { Spinner } from "@/components"
import { DriverEmptyLayout } from "@/layout"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import useSWR from "swr"

const ConfirmCheckoutDriver = () => {
  const router = useRouter()
  const { compounding_car_id, vnp_ResponseCode } = router.query

  const { isValidating } = useSWR(
    compounding_car_id && vnp_ResponseCode === "00" ? "confirm_deposit_for_driver" : null,
    () =>
      ridesApi
        .confirmDepositForDriver({
          compounding_car_id: Number(compounding_car_id),
        })
        .then((res) => {
          if (router.query.vnp_ResponseCode !== "00") return
          if (res.result.data?.state === "confirm_deposit") {
            window.close()
          }
        }),
    {
      dedupingInterval: 0,
      revalidateOnFocus: true,
    }
  )

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

ConfirmCheckoutDriver.Layout = DriverEmptyLayout
export default ConfirmCheckoutDriver
