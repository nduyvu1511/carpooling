import { Alert, Countdown, RideToolTip } from "@/components"
import { RootState } from "@/core/store"
import { formatMoneyVND, toggleBodyOverflow } from "@/helper"
import { usePayment } from "@/hooks"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { PaymentItem } from "./paymentItem"

interface CheckoutProps {
  secondsRemains: number
  amount_total?: number
  down_payment: number
  amount_due?: number
  percentage?: number
  onCheckout?: (acquirer_id: number) => void
  onCancelCheckout?: Function
  showCountdown?: boolean
  type?: "deposit" | "checkout"
  descRideTooltip?: string
}

const Payment = ({
  secondsRemains,
  amount_total,
  onCheckout,
  onCancelCheckout,
  showCountdown = true,
  type = "deposit",
  amount_due,
  down_payment,
  percentage,
  descRideTooltip = "Phần chi phí còn lại hành khách sẽ thanh toán cho tài xế sau khi hoàn tất chuyến đi.",
}: CheckoutProps) => {
  const router = useRouter()
  const {
    currentSelectPayment,
    isValidating: isPaymentLoading,
    paymentList,
    setCurrentSelectPayment,
  } = usePayment()
  const [isExpiredCountdown, setExpiredCountdown] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

  useEffect(() => {
    return () => {
      if (showAlert) {
        toggleBodyOverflow("unset")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isExpiredCountdown && showCountdown ? (
        <div className="bg-bg-warning p-24 rounded-[5px] mb-24 mx-12 md:mx-24">
          <p className="text-14 font-medium">Hết hạn cho giao dịch này</p>
        </div>
      ) : (
        <div className={`${isPaymentLoading ? "cursor-default pointer-events-none" : ""}`}>
          <div className="p-12 md:p-24 lg:pt-0">
            {percentage ? (
              <RideToolTip className="mb-[40px]" percentage={percentage} desc={descRideTooltip} />
            ) : null}

            <ul className="">
              <p className="text-base font-semibold mb-24 uppercase">Giá trị chuyến đi</p>
              {amount_total ? (
                <li className="flex items-center justify-between mb-12">
                  <span className="text-xs mr-[12px]">Tổng tiền</span>
                  <span className="text-sm md:text-base whitespace-nowrap">
                    {formatMoneyVND(amount_total)}
                  </span>
                </li>
              ) : null}
              {down_payment ? (
                <li className="flex items-center justify-between mb-12">
                  <span className="text-xs mr-[12px]">Số tiền đặt cọc</span>
                  <span className="text-sm md:text-base whitespace-nowrap">
                    {formatMoneyVND(down_payment)}
                  </span>
                </li>
              ) : null}
              {amount_due ? (
                <li className="flex items-center justify-between">
                  <span className="text-xs mr-[12px]">Số tiền còn lại</span>
                  <span className="text-sm md:text-base whitespace-nowrap">
                    {formatMoneyVND(amount_due)}
                  </span>
                </li>
              ) : null}
            </ul>
            <div className="my-[16px] border-b border-border-color border-solid"></div>
            <div className="flex items-stretch mb-[40px]">
              <div className="flex-1 mr-24">
                <p className="text-xs mb-[12px]">
                  {type === "checkout" ? "Số tiền cần thanh toán" : "Số tiền cần cọc"}{" "}
                  <span className="text-gray-color-2">(VND)</span>
                </p>

                <span className="text-18 sm:text-24 text-error font-medium">
                  {formatMoneyVND(down_payment)}
                </span>
              </div>

              {showCountdown ? (
                <div className="px-[10px] flex items-center py-[8px] font-medium bg-bg-error whitespace-nowrap h-fit mt-auto text-12 text-error rounded-[5px]">
                  <span className="mr-[4px]">Hết hạn trong</span>

                  <Countdown
                    className="w-[36px]"
                    onExpiredCoundown={() => {
                      setExpiredCountdown(true)
                    }}
                    secondsRemains={secondsRemains}
                  />
                </div>
              ) : null}
            </div>

            <div className="mb-[40px]">
              <p className="mb-24 text-base uppercase font-semibold">Chọn phương thức thanh toán</p>

              {isPaymentLoading ? (
                <div className="mb-[16px]">
                  <div className="rounded-[5px] h-[42px] skeleton mb-[16px]"></div>
                  <div className="rounded-[5px] h-[42px] skeleton"></div>
                </div>
              ) : (
                <ul className="mb-[16px]">
                  {paymentList.map((item) => (
                    <li
                      onClick={() => setCurrentSelectPayment(item)}
                      className="mb-[16px]"
                      key={item.acquirer_id}
                    >
                      <PaymentItem
                        payment={item}
                        onChange={(val) => setCurrentSelectPayment(val)}
                        isActive={currentSelectPayment?.acquirer_id === item.acquirer_id}
                      />
                    </li>
                  ))}
                </ul>
              )}

              <p className="text-xs text-error">
                *Số tiền cọc sẽ được hoàn trả về phương thức thanh toán ban đầu sau khi kết thúc
                chuyến đi sau 24 ngày....
              </p>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-12 md:p-0 bg-white-color md:static flex items-center whitespace-nowrap">
              {onCancelCheckout ? (
                <button
                  onClick={() => {
                    setShowAlert(true)
                    toggleBodyOverflow("hidden")
                  }}
                  className="btn h-[40px] md:h-fit rounded-[5px] md:rounded-[30px] flex-1 md:flex-none bg-error mr-12 md:mr-[16px]"
                >
                  <span className="hidden sm:block"> Hủy giao dịch</span>
                  <span className="sm:hidden"> Hủy</span>
                </button>
              ) : null}

              <button
                onClick={() =>
                  currentSelectPayment?.acquirer_id &&
                  onCheckout?.(currentSelectPayment.acquirer_id)
                }
                className={`btn h-[40px] md:h-fit whitespace-nowrap rounded-[5px] md:rounded-[30px] flex-1 md:flex-none ${
                  currentSelectPayment?.acquirer_id ? "bg-primary" : "btn-disabled bg-disabled"
                }`}
              >
                <span className="hidden sm:block">
                  {type === "checkout" ? "Tiến hành thanh toán" : "Tiến hành đặt cọc"}
                </span>
                <span className="sm:hidden">{type === "checkout" ? "Thanh toán" : "Đặt cọc"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {isExpiredCountdown && showCountdown ? (
        <Alert
          show={true}
          title="Giao dịch này đã quá hạn thanh toán, vui lòng đặt chuyến mới"
          onConfirm={() =>
            router.push(`${userInfo?.car_account_type === "car_driver" ? "/d" : "/c"}`)
          }
          type="error"
          showLeftBtn={false}
        />
      ) : null}

      <Alert
        show={showAlert}
        title="Bạn có chắc chắc muốn hủy giao dịch này?"
        onClose={() => {
          setShowAlert(false)
          toggleBodyOverflow("unset")
        }}
        onConfirm={() => onCancelCheckout?.()}
        type="warning"
      />
    </>
  )
}

export { Payment }
