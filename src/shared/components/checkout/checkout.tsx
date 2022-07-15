import { DepositCountdown, ItemSelect, Spinner, Alert } from "@/components"
import { formatMoneyVND } from "@/helper"
import { usePayment } from "@/hooks"
import { useState } from "react"

interface CheckoutProps {
  secondsRemains: number
  amount_total: number
  onCheckout?: (acquirer_id: number) => void
  onCancelCheckout?: Function
  showCountdown?: boolean
}

const CheckoutDeposit = ({
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

  if (isPaymentLoading)
    return (
      <div className="h-[400px] bg-white-color rounded-[5px] shadow-shadow-1">
        <Spinner size={50} />
      </div>
    )
  return (
    <>
      {isExpiredCountdown && showCountdown ? (
        <div className="bg-bg-warning p-24 mt-24">
          <p className="text-14 font-medium">Hết hạn cho giao dịch này</p>
        </div>
      ) : (
        <div className="">
          <div className="bg-white-color p-24 pt-0 rounded-[5px] shadow-shadow-1">
            <div className="mb-[24px]">
              <p className="text-16 font-semibold leading-[26px] text-warning">
                Vui lòng đặt cọc số tiền {formatMoneyVND(amount_total)} để hoàn tất giao dịch.
              </p>
            </div>

            <ul className="mb-[40px]">
              {paymentList.map((item) => (
                <li className="mb-[16px] last:mb-0" key={item.acquirer_id}>
                  <ItemSelect
                    onChange={() => setCurrentSelectPayment(item)}
                    title={item.name}
                    isActive={currentSelectPayment?.acquirer_id === item.acquirer_id}
                  />
                </li>
              ))}
            </ul>

            <div className="flex items-center">
              <button
                onClick={() =>
                  currentSelectPayment?.acquirer_id &&
                  onCheckout?.(currentSelectPayment.acquirer_id)
                }
                className={`btn px-[16px] mr-24 ${
                  currentSelectPayment?.acquirer_id ? "bg-primary" : "btn-disabled bg-disabled"
                }`}
              >
                Tiến hành thanh toán
              </button>

              {onCancelCheckout ? (
                <button onClick={() => setShowAlert(true)} className="btn bg-error px-[16px]">
                  Hủy giao dịch
                </button>
              ) : null}
            </div>
          </div>

          {showCountdown ? (
            <div className="shadow-shadow mt-24 p-24 bg-white-color rounded-[5px] shadow-shadow-1">
              <DepositCountdown
                className="text-[40px] leading-[48px] font-medium"
                onExpiredCoundown={() => {
                  setExpiredCountdown(true)
                }}
                secondsRemains={secondsRemains}
              />
            </div>
          ) : null}
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

export { CheckoutDeposit }
