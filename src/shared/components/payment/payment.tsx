import { Alert, Countdown } from "@/components"
import { formatMoneyVND } from "@/helper"
import { usePayment } from "@/hooks"
import { useState } from "react"
import { PaymentItem } from "./paymentItem"

interface CheckoutProps {
  secondsRemains: number
  amount_total: number
  onCheckout?: (acquirer_id: number) => void
  onCancelCheckout?: Function
  showCountdown?: boolean
}

const Payment = ({
  secondsRemains,
  amount_total,
  onCheckout,
  onCancelCheckout,
  showCountdown = true,
}: CheckoutProps) => {
  const {
    currentSelectPayment,
    isValidating: isPaymentLoading,
    paymentList,
    setCurrentSelectPayment,
  } = usePayment()
  const [isExpiredCountdown, setExpiredCountdown] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)

  return (
    <>
      {isExpiredCountdown && showCountdown ? (
        <div className="bg-bg-warning p-24 mt-24">
          <p className="text-14 font-medium">Hết hạn cho giao dịch này</p>
        </div>
      ) : (
        <div className={`${isPaymentLoading ? "cursor-default pointer-events-none" : ""}`}>
          <div className="bg-white-color p-24 pt-0">
            <div className="mb-[40px]">
              <div className="flex items-stretch">
                <div className="flex-1 mr-24">
                  <p className="text-xs mb-[12px]">
                    Số tiền cần cọc <span className="text-gray-color-2">(VND)</span>
                  </p>

                  <span className="text-xl text-error">{formatMoneyVND(amount_total)}</span>
                </div>

                {showCountdown ? (
                  <div className="px-[10px] flex items-center py-[8px] bg-bg-error whitespace-nowrap h-fit mt-auto text-sm text-error rounded-[5px]">
                    <span className="mr-[4px]">Hết hạn trong</span>

                    <Countdown
                      className="w-[42px]"
                      onExpiredCoundown={() => {
                        setExpiredCountdown(true)
                      }}
                      secondsRemains={secondsRemains}
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mb-[40px]">
              <p className="mb-24 text-base font-semibold">Lựa chọn phương thức thanh toán</p>

              {isPaymentLoading ? (
                <div className="mb-[16px]">
                  <div className="rounded-[5px] h-[36px] skeleton mb-[16px]"></div>
                  <div className="rounded-[5px] h-[36px] skeleton"></div>
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

            <div className="flex items-center">
              {onCancelCheckout ? (
                <button onClick={() => setShowAlert(true)} className="btn bg-error mr-24">
                  Hủy giao dịch
                </button>
              ) : null}

              <button
                onClick={() =>
                  currentSelectPayment?.acquirer_id &&
                  onCheckout?.(currentSelectPayment.acquirer_id)
                }
                className={`btn ${
                  currentSelectPayment?.acquirer_id ? "bg-primary" : "btn-disabled bg-disabled"
                }`}
              >
                Tiến hành thanh toán
              </button>
            </div>
          </div>
        </div>
      )}

      {showAlert ? (
        <Alert
          desc="Bạn có chắc chắc muốn hủy giao dịch này?"
          onClose={() => setShowAlert(false)}
          onConfirm={() => onCancelCheckout?.()}
          type="warning"
        />
      ) : null}
    </>
  )
}

export { Payment }
