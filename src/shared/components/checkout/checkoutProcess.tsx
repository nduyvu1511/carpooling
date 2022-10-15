import { ErrorCircleIcon, WarningIcon } from "@/assets"
import { Countdown, Spinner } from "@/components"
import { VNPAY_STATUS_NAME } from "@/helper"
import {
  CompoundingCarCustomer,
  CompoundingCarDriverRes,
  CompoundingType,
  TransactionRes,
  VnpayStatus,
} from "@/models"
import { setCheckoutPaymentId } from "@/modules"
import { chatAPI, rideAPI, userAPI } from "@/services"
import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

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
  sale_order_id?: number
  compounding_type?: CompoundingType
}

const CheckoutProcess = ({
  vnp_ResponseCode,
  fetcher_type,
  compounding_car_customer_id,
  compounding_car_id,
  payment_id,
  compounding_type,
}: CheckoutProcessProps) => {
  const dispatch = useDispatch()
  const [isValidating, setValidating] = useState<boolean>(false)
  const [countdown, _] = useState<number | undefined>(30)

  useEffect(() => {
    return () => {
      if (fetcher_type === "confirmRechargeRequest" && vnp_ResponseCode !== "00") {
        dispatch(setCheckoutPaymentId(undefined))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (vnp_ResponseCode !== "00") return

    // Confirm deposit for passenger
    if (compounding_car_customer_id) {
      setValidating(true)
      rideAPI
        .confirmDepositCompoundingCarCustomer({
          compounding_car_customer_id,
        })
        .then((res: AxiosResponse<CompoundingCarCustomer>) => {
          setValidating(false)

          if (res.result.success || res.result.data.state === "confirm_paid") {
            // Join to chat
            if (compounding_car_id && compounding_type === "compounding") {
              chatAPI.joinRoomByCompoundingCarId(Number(compounding_car_id))
            }
            window.close()
          }
        })
        .catch(() => setValidating(false))
    } else if (compounding_car_id) {
      // Confirm deposit for driver
      setValidating(true)
      rideAPI
        .confirmDepositForDriver({ compounding_car_id })
        .then((res: AxiosResponse<CompoundingCarDriverRes>) => {
          setValidating(false)
          const data = res?.result?.data

          if (data?.state === "confirm_deposit") {
            // Create group chat for this ride if it is carpooling
            if (
              data?.compounding_car_id &&
              data?.compounding_type === "compounding" &&
              data?.compounding_car_customers?.length > 0
            ) {
              chatAPI.createGroupChat({
                member_ids: data.compounding_car_customers?.map((item) => item.partner.partner_id),
                room_name: data.compounding_car_name,
                compounding_car_id: data.compounding_car_id,
              })
            }

            window.close()
          }
        })
        .catch(() => setValidating(false))
    } else if (payment_id) {
      // Confirm deposit for wallet
      setValidating(true)
      userAPI
        .confirmRechargeRequest({ payment_id })
        .then((res: AxiosResponse<TransactionRes>) => {
          setValidating(false)
          if (res.result.data?.state === "posted") {
            window.close()
          }
        })
        .catch(() => setValidating(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container flex-1 block-element p-custom py-24">
      {isValidating ? (
        <div className="flex flex-col bg-info-10 rounded-[8px] p-custom">
          <div className=" flex-center flex-col">
            <WarningIcon
              color="#007BFF"
              className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] mb-12 sm:mb-24"
            />
            <p className="text-18 md:text-[22px] text-center text-info font-semibold">
              Đang xử lý giao dịch
            </p>
            <div className="my-16 border-b border-info border-solid w-full"></div>

            <p className="text-sm md:text-base text-center">
              Giao dịch đang trong quá trình thanh toán, vui lòng chờ thông tin hoặc liên hệ Tổng
              đài ExxeVn nếu cần thêm hỗ trợ
            </p>
          </div>
        </div>
      ) : vnp_ResponseCode !== "00" ? (
        <div className="">
          <div className="p-16 sm:p-[32px] flex-center flex-col bg-[#FDF3F3] mb-24 rounded-[8px]">
            <ErrorCircleIcon className="w-[66px] h-[66px] mb-24" />

            <p className="text-18 md:text-[22px] text-center text-error font-semibold">
              Giao dịch không thành công
            </p>

            <div className="my-16 border-b border-[#F2A0A0] border-solid w-full"></div>

            <p className="text-sm ml-12 leading-[22px] flex-1 text-center">
              {VNPAY_STATUS_NAME[vnp_ResponseCode]}
            </p>
          </div>

          <div className="flex-center flex-col">
            <button onClick={() => window.close()} className="btn-primary mb-24">
              Trở về trang thanh toán
            </button>

            {countdown ? (
              <p className="text-sm">
                <span className="text-sm text-gray-color-7">Tự động chuyển hướng sau </span>
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

      {isValidating ? (
        <div className="fixed z-[2000] bg-[rgba(0,0,0,0.2)] inset-0 flex-center">
          <Spinner className="z-10" size={40} />
        </div>
      ) : null}
    </div>
  )
}
export { CheckoutProcess }
