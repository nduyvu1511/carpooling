import {
  Alert,
  Countdown,
  PromotionForm,
  PromotionModal,
  RideToolTip,
  Spinner,
  SummaryItem,
  WalletBalanceAlert,
} from "@/components"
import { RootState } from "@/core/store"
import { formatMoneyVND, toggleBodyOverflow } from "@/helper"
import { usePayment } from "@/hooks"
import { CancelRideParams, PaymentRes } from "@/models"
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
  onCheckout?: (params: PaymentRes) => void
  onCancelCheckout?: (_: CancelRideParams) => void
  showCountdown?: boolean
  type?: "deposit" | "checkout"
  descRideTooltip?: string
  state?: string
  returnedUrl?: string
  onApplyPromotion?: (id: number) => void
  onCancelPromotion?: (id: number) => void
}

type ModalType = "confirm" | "cancel" | "alert" | "confirmWallet" | "promotion" | undefined

const Checkout = ({
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
  state,
  returnedUrl,
  onApplyPromotion,
  onCancelPromotion,
}: CheckoutProps) => {
  const router = useRouter()
  const {
    currentSelectPayment,
    isValidating: isPaymentLoading,
    paymentList,
    setCurrentSelectPayment,
  } = usePayment()

  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)
  const [isExpiredCountdown, setExpiredCountdown] = useState<boolean>(false)
  const [modalType, setModalType] = useState<ModalType>()

  useEffect(() => {
    return () => {
      toggleBodyOverflow("unset")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleModal = (type: ModalType | undefined) => {
    setModalType(type)
    if (type) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  return (
    <>
      {isExpiredCountdown && showCountdown ? (
        <div className="bg-bg-warning p-24 rounded-[5px] mb-24">
          <p className="text-14 font-medium">Hết hạn cho giao dịch này</p>
        </div>
      ) : (
        <div className={`${isPaymentLoading ? "cursor-default pointer-events-none" : ""}`}>
          <div className="">
            {percentage ? (
              <RideToolTip className="mb-24" percentage={percentage} desc={descRideTooltip} />
            ) : null}

            <div className="mb-[40px]">
              <p className="text-base font-semibold uppercase mb-16 md:mb-24">MÃ KHUYẾN MÃI</p>
              <PromotionForm promotionCode="" onFocus={() => toggleModal("promotion")} />
            </div>

            <ul className="mb-[40px]">
              <div className="flex items-center mb-16 md:mb-24  justify-between">
                <p className="text-base font-semibold uppercase">Giá trị chuyến đi</p>

                {showCountdown ? (
                  <div className="flex items-center">
                    <span className="mr-8 text-xs sm:text-sm text-error sm:text-error">
                      Hết hạn trong
                    </span>
                    <Countdown
                      className="bg-bg-error-2 text-14 font-semibold text-error rounded-[5px] whitespace-nowrap w-[56px] py-4 h-[28px] px-8"
                      onExpiredCoundown={() => {
                        setExpiredCountdown(true)
                      }}
                      secondsRemains={secondsRemains}
                    />
                  </div>
                ) : null}
              </div>
              {amount_total ? (
                <li className="flex items-center justify-between mb-12">
                  <span className="mr-[12px] text-xs">Giá vé</span>
                  <span className="text-sm md:text-base whitespace-nowrap">
                    {formatMoneyVND(amount_total)}
                  </span>
                </li>
              ) : null}
              {down_payment ? (
                <li className="flex items-center justify-between mb-12">
                  <span className="mr-[12px] text-base font-semibold">
                    {type === "checkout"
                      ? "Số tiền cần thanh toán"
                      : `Số tiền đặt cọc (${Number(percentage)}%)`}
                  </span>
                  <span className="text-14 md:text-16 whitespace-nowrap font-semibold text-error">
                    {formatMoneyVND(down_payment)}
                  </span>
                </li>
              ) : null}

              <SummaryItem
                label="Tổng tiền cần thanh toán"
                value={formatMoneyVND(amount_total || 0) + ""}
              />

              {amount_due ? (
                <SummaryItem label="Số tiền thanh toán sau" value={formatMoneyVND(amount_due)} />
              ) : null}

              <p className="text-xs text-error">
                (*) Chi phí trên chưa bao gồm phát sinh phí cầu đường, bến bãi.
              </p>
            </ul>

            <div className="mb-24">
              <p className="mb-16 md:mb-24 text-base uppercase font-semibold">
                Phương thức thanh toán
              </p>

              {isPaymentLoading ? (
                <Spinner className="my-[40px]" size={30} />
              ) : (
                <div className="flex mr-[-16px] md:mr-0 md:flex-wrap overflow-x-auto scrollbar-hide">
                  {paymentList.map((item) => (
                    <PaymentItem
                      key={item.acquirer_id}
                      className="mr-12 md:mb-16 md:mr-16 last:mr-24 w-[180px] shrink-0"
                      payment={item}
                      onChange={(val) => setCurrentSelectPayment(val)}
                      isActive={currentSelectPayment?.acquirer_id === item.acquirer_id}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-12 md:p-0 bg-white-color md:static flex items-center whitespace-nowrap">
              {/* {onCancelCheckout ? (
                <button
                  onClick={() => toggleModal("cancel")}
                  className="btn h-[40px] md:h-fit rounded-[5px] md:rounded-[30px] flex-1 md:flex-none bg-error mr-12 md:mr-16"
                >
                  <span className="hidden sm:block"> Hủy chuyến</span>
                  <span className="sm:hidden"> Hủy</span>
                </button>
              ) : null} */}

              <button
                onClick={() => {
                  if (!currentSelectPayment?.acquirer_id) return
                  if (currentSelectPayment.provider === "exxe_wallet") {
                    if (
                      currentSelectPayment?.money_in_cash_wallet === 0 ||
                      (currentSelectPayment?.money_in_cash_wallet || 0) < down_payment
                    ) {
                      toggleModal("alert")
                      return
                    }
                    toggleModal("confirmWallet")
                  } else {
                    toggleModal("confirm")
                    setCurrentSelectPayment(currentSelectPayment)
                  }
                }}
                className={`btn h-[40px] md:h-fit whitespace-nowrap rounded-[5px] md:rounded-[30px] flex-1 md:flex-none ${
                  currentSelectPayment?.acquirer_id ? "bg-primary" : "btn-disabled bg-disabled"
                }`}
              >
                Xác nhận
                {/* <span className="hidden sm:block">
                  {type === "checkout" ? "Tiến hành thanh toán" : "Tiến hành đặt cọc"}
                </span>
                <span className="sm:hidden">{type === "checkout" ? "Thanh toán" : "Đặt cọc"}</span> */}
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
        show={modalType === "confirm"}
        title={
          "Hệ thống sẽ chuyển đến liên kết của hình thức thanh toán bạn đã chọn. Vui lòng không tắt trình duyệt."
        }
        onClose={() => toggleModal(undefined)}
        onConfirm={() => {
          if (!currentSelectPayment) return
          onCheckout?.(currentSelectPayment)
          toggleModal(undefined)
        }}
        type={"info"}
      />

      {modalType === "alert" ? (
        <WalletBalanceAlert
          show={true}
          onClose={() => toggleModal(undefined)}
          onConfirm={() =>
            router.push(
              `/${userInfo?.car_account_type === "car_driver" ? "/d" : "/c"}/account/wallet?next=${
                returnedUrl || ""
              }&amount=${down_payment}`
            )
          }
        />
      ) : null}

      {/* {state && modalType === "cancel" ? (
        <RideCancelForm
          onSubmit={(data) => {
            onCancelCheckout?.(data)
            toggleModal(undefined)
          }}
          onClose={() => toggleModal(undefined)}
          params={{ compounding_car_customer_state: state }}
        />
      ) : null} */}

      {modalType === "promotion" ? (
        <PromotionModal
          onApply={(id) => onApplyPromotion?.(id)}
          onClose={() => toggleModal(undefined)}
        />
      ) : null}

      <Alert
        show={modalType === "confirmWallet"}
        onClose={() => setModalType(undefined)}
        title={`Xác nhận thanh toán số tiền ${formatMoneyVND(down_payment)} bằng ví EXXE`}
        onConfirm={() => {
          if (!currentSelectPayment) return
          onCheckout?.(currentSelectPayment)
          setModalType(undefined)
        }}
        type="info"
      />
    </>
  )
}

export { Checkout }
