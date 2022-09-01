import {
  Alert,
  DepositSummary,
  PromotionForm,
  PromotionModal,
  RideCancelForm,
  RideToolTip,
  WalletBalanceAlert,
} from "@/components"
import { RootState } from "@/core/store"
import { formatMoneyVND, toggleBodyOverflow } from "@/helper"
import { usePayment } from "@/hooks"
import { CancelRideParams, PaymentRes } from "@/models"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { PaymentSlide } from "./paymentSlide"

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

            <div className="mb-[40px]">
              <DepositSummary
                down_payment={down_payment}
                onExpiredCountdown={() => setExpiredCountdown(true)}
                secondsRemains={secondsRemains}
                amount_due={amount_due}
                amount_total={amount_total}
                percentage={percentage}
                showCountdown={showCountdown}
                type={type}
              />
            </div>

            <div className="mb-40">
              <p className="mb-16 md:mb-24 text-base uppercase font-semibold">
                Phương thức thanh toán
              </p>

              <PaymentSlide
                isLoading={isPaymentLoading}
                data={paymentList}
                currentPaymentSelected={currentSelectPayment?.acquirer_id}
                onChange={(val) => setCurrentSelectPayment(val)}
              />
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-12 md:p-0 bg-white-color md:static flex items-center whitespace-nowrap z-[100]">
              {onCancelCheckout ? (
                <button
                  onClick={() => toggleModal("cancel")}
                  className="btn h-[40px] md:h-fit rounded-[5px] md:rounded-[30px] flex-1 md:flex-none bg-gray-20 text-gray-color-8 mr-12 md:mr-16"
                >
                  <span className="hidden sm:block"> Hủy chuyến</span>
                  <span className="sm:hidden"> Hủy</span>
                </button>
              ) : null}

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
                  currentSelectPayment?.acquirer_id ? "bg-primary" : "btn-disabled"
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

      {modalType === "confirm" ? (
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
      ) : null}

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

      {state && modalType === "cancel" ? (
        <RideCancelForm
          onSubmit={(data) => {
            onCancelCheckout?.(data)
            toggleModal(undefined)
          }}
          onClose={() => toggleModal(undefined)}
          params={{ compounding_car_customer_state: state }}
        />
      ) : null}

      {modalType === "promotion" ? (
        <PromotionModal
          onApply={(id) => onApplyPromotion?.(id)}
          onClose={() => toggleModal(undefined)}
        />
      ) : null}

      {modalType == "confirmWallet" ? (
        <Alert
          show={modalType === "confirmWallet"}
          onClose={() => toggleModal(undefined)}
          title={`Xác nhận thanh toán số tiền ${formatMoneyVND(down_payment)} bằng ví EXXE`}
          onConfirm={() => {
            if (!currentSelectPayment) return
            onCheckout?.(currentSelectPayment)
            toggleModal(undefined)
          }}
          type="info"
        />
      ) : null}
    </>
  )
}

export { Checkout }
