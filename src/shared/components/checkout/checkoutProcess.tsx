import { ErrorCircleIcon } from "@/assets"
import { Countdown, Spinner } from "@/components"
import { VNPAY_STATUS_NAME } from "@/helper"
import { useEffectOnce } from "@/hooks"
import { CompoundingCarCustomer, CompoundingCarDriverRes, VnpayStatus } from "@/models"
import { ridesApi } from "@/services"
import { AxiosResponse } from "axios"
import { useState } from "react"

interface CheckoutProcessProps {
  vnp_ResponseCode: VnpayStatus
  fetcher_type:
    | "customerConfirmPayFullCompoundingCar"
    | "confirmDepositForDriver"
    | "confirmDepositCompoundingCarCustomer"
  compounding_car_customer_id?: number
  compounding_car_id?: number
}

const CheckoutProcess = ({
  vnp_ResponseCode,
  fetcher_type,
  compounding_car_customer_id,
  compounding_car_id,
}: CheckoutProcessProps) => {
  const [isValidating, setValidating] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number | undefined>(
    vnp_ResponseCode === "00" ? undefined : 30
  )

  useEffectOnce(() => {
    if (vnp_ResponseCode !== "00") return

    if (compounding_car_customer_id) {
      setValidating(true)
      ;(fetcher_type === "confirmDepositCompoundingCarCustomer"
        ? ridesApi.confirmDepositCompoundingCarCustomer
        : ridesApi.customerConfirmPayFullCompoundingCar)({ compounding_car_customer_id })
        .then((res: AxiosResponse<CompoundingCarCustomer>) => {
          setValidating(false)
          if (
            fetcher_type === "confirmDepositForDriver" ||
            fetcher_type === "confirmDepositCompoundingCarCustomer"
          ) {
            if (res.result.data.state === "deposit") {
              window.close()
            }
            return
          }
          if (res.result.data.state === "confirm_paid") {
            window.close()
          }
        })
        .catch(() => setValidating(false))
      return
    }
    if (compounding_car_id) {
      setValidating(true)
      ridesApi
        .confirmDepositForDriver({ compounding_car_id })
        .then((res: AxiosResponse<CompoundingCarDriverRes>) => {
          setValidating(false)
          if (res.result.data.state === "confirm_deposit") {
            window.close()
          }
        })
        .catch(() => setValidating(false))
    }
  })

  return (
    <div className="container flex-1 bg-white-color md:mt-24 block-element border border-solid border-border-color">
      {isValidating ? (
        <div className="flex flex-col items-center">
          <div className="py-[80px]">
            <p className="text-16 font-medium">Đang xử lý giao dịch...</p>
            <Spinner size={40} className="py-[20px]" />
          </div>
        </div>
      ) : (
        <div className="py-[40px] flex-center flex-col">
          <div className=" mb-[40px] p-12 md:p-[24px] bg-bg-error flex items-center rounded-[5px]">
            <ErrorCircleIcon className="w-[24px] h-[24px]" />
            <p className="text-sm ml-12 leading-[22px] flex-1">
              {VNPAY_STATUS_NAME[vnp_ResponseCode]}
            </p>
          </div>
          <button onClick={() => window.close()} className="btn-primary mb-[40px]">
            Trở về trang chủ
          </button>
          {countdown ? (
            <p className="text-sm">
              Tự động chuyển hướng sau{" "}
              <Countdown
                className="w-[50px] inline-block"
                onExpiredCoundown={() => window.close()}
                secondsRemains={countdown}
              />
            </p>
          ) : null}
        </div>
      )}
    </div>
  )
}
export { CheckoutProcess }

