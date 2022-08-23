import { ErrorCircleIcon, WarningIcon } from "@/assets"
import { Countdown, Spinner } from "@/components"
import { VNPAY_STATUS_NAME } from "@/helper"
import { useEffectOnce } from "@/hooks"
import {
  CompoundingCarCustomer,
  CompoundingCarDriverRes,
  TransactionRes,
  VnpayStatus,
} from "@/models"
import { ridesApi, userApi } from "@/services"
import { AxiosResponse } from "axios"
import { useState } from "react"

interface CheckoutProcessProps {
  vnp_ResponseCode: VnpayStatus
  fetcher_type:
    | "customerConfirmPayFullCompoundingCar"
    | "confirmDepositForDriver"
    | "confirmDepositCompoundingCarCustomer"
    | "confirmRechargeRequest"
  compounding_car_customer_id?: number
  compounding_car_id?: number
  payment_id?: number
}

const CheckoutProcess = ({
  vnp_ResponseCode,
  fetcher_type,
  compounding_car_customer_id,
  compounding_car_id,
  payment_id,
}: CheckoutProcessProps) => {
  const [isValidating, setValidating] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number | undefined>(30)

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
    } else if (compounding_car_id) {
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
    } else if (payment_id) {
      setValidating(true)
      userApi
        .confirmRechargeRequest({ payment_id })
        .then((res: AxiosResponse<TransactionRes>) => {
          setValidating(false)
          if (res.result.data?.state === "posted") {
            window.close()
          }
        })
        .catch(() => setValidating(false))
    }
  })

  return (
    <div className="container flex-1 bg-white-color md:mt-24">
      {isValidating ? (
        <div className="flex flex-col items-center">
          <div className=" flex-center flex-col">
            <Spinner size={40} className="py-[20px]" />

            <p className="text-sm md:text-base">Đang xử lý giao dịch...</p>
          </div>
        </div>
      ) : vnp_ResponseCode !== "00" ? (
        <div className="">
          <div className="p-[32px] flex-center flex-col bg-[#FDF3F3] mb-24 rounded-[8px]">
            <ErrorCircleIcon className="w-[66px] h-[66px] mb-24" />

            <p className="text-[22px] text-error font-semibold">Giao dịch không thành công</p>

            <div className="my-16 border-b border-[#F2A0A0] border-solid w-full"></div>

            <p className="text-sm ml-12 leading-[22px] flex-1">
              {VNPAY_STATUS_NAME[vnp_ResponseCode]}
            </p>
          </div>

          <div className="flex-center flex-col">
            <button onClick={() => window.close()} className="btn-primary mb-24">
              Trở về trang chủ
            </button>

            {countdown ? (
              <p className="text-sm">
                <span className="font-normal">Tự động chuyển hướng sau </span>
                <Countdown
                  className="w-[50px] inline-block font-semibold text-primary"
                  onExpiredCoundown={() => window.close()}
                  secondsRemains={countdown}
                />
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
export { CheckoutProcess }
