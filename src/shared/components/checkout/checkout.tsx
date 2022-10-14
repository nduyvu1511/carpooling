import {
  Alert,
  CheckoutInfo,
  RideCancelForm,
  RideToolTip,
  WalletBalanceAlert,
  PaymentSlide,
} from "@/components"
import { RootState } from "@/core/store"
import { formatMoneyVND, toggleBodyOverflow } from "@/helper"
import { useCompoundingCarActions, usePayment } from "@/hooks"
import {
  CancelRideParams,
  CompoundingCarCustomer,
  CompoundingCarDriverRes,
  IDepositSummaryOptional,
  PaymentRes,
} from "@/models"
import { useRouter } from "next/router"
import { ReactNode, useState } from "react"
import { useSelector } from "react-redux"

interface CheckoutProps {
  secondsRemains: number
  onCheckout?: (params: PaymentRes) => void
  onCancelCheckout?: (_: CancelRideParams) => void
  type?: "deposit" | "checkout"
  descRideTooltip?: string
  returnedUrl?: string
  snackbar?: ReactNode
  promotion?: ReactNode
  checkoutData: IDepositSummaryOptional
  data: CompoundingCarDriverRes | CompoundingCarCustomer
  onConfirmCompoundingCar?: (val: CompoundingCarCustomer) => void
}

type ModalType = "confirm" | "cancel" | "alert" | "confirmWallet" | undefined

const Checkout = ({
  secondsRemains,
  onCheckout,
  onCancelCheckout,
  type = "deposit",
  descRideTooltip = "Phần chi phí còn lại hành khách sẽ thanh toán cho tài xế sau khi hoàn tất chuyến đi.",
  returnedUrl,
  snackbar = null,
  promotion,
  data,
  checkoutData,
  onConfirmCompoundingCar,
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
  const { confirmCompoundingCar } = useCompoundingCarActions()

  const toggleModal = (type: ModalType | undefined) => {
    setModalType(type)
    if (type) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  const handleConfirmCompoundingCar = () => {
    if (!currentSelectPayment) return
    if ((data as CompoundingCarCustomer)?.compounding_car_customer_id && data.state === "draft") {
      confirmCompoundingCar({
        params: {
          compounding_car_customer_id: (data as CompoundingCarCustomer).compounding_car_customer_id,
        },
        onSuccess: (data) => {
          onConfirmCompoundingCar?.(data)
          onCheckout?.(currentSelectPayment)
          toggleModal(undefined)
        },
      })
    } else {
      onCheckout?.(currentSelectPayment)
      toggleModal(undefined)
    }
  }

  const showCountdown =
    data.state === "confirm" || data.state === "waiting" || data.state === "waiting_deposit"

  return (
    <>
      {showCountdown && isExpiredCountdown && type === "deposit" ? (
        <div className="bg-bg-warning p-24 rounded-[5px] mb-24">
          <p className="text-14 font-medium">Hết hạn cho giao dịch này</p>
        </div>
      ) : (
        <div className={`${isPaymentLoading ? "cursor-default pointer-events-none" : ""}`}>
          <div className="">
            {data?.down_payment?.percent ? (
              <RideToolTip
                className="mb-24"
                percentage={data?.down_payment?.percent * 100}
                desc={descRideTooltip}
              />
            ) : null}

            {promotion ? <div className="mb-40">{promotion}</div> : null}

            <div className="mb-40">
              <CheckoutInfo
                showCountdown={showCountdown}
                data={checkoutData}
                accountType={userInfo?.car_account_type}
                onExpiredCountdown={() => setExpiredCountdown(true)}
                secondsRemains={secondsRemains}
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

            {snackbar ? <div className="mb-24">{snackbar}</div> : null}

            {/* Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-12 md:p-0 bg-white-color md:static flex items-center whitespace-nowrap z-[100]">
              {onCancelCheckout ? (
                <button
                  onClick={() => toggleModal("cancel")}
                  className="btn rounded-[5px] md:rounded-[30px] flex-1 md:flex-none bg-gray-20 text-gray-color-8 mr-12 md:mr-16"
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
                      (currentSelectPayment?.money_in_cash_wallet || 0) <
                        (data?.down_payment?.total || 0)
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
                className={`btn whitespace-nowrap rounded-[5px] md:rounded-[30px] flex-1 md:flex-none ${
                  currentSelectPayment?.acquirer_id ? "bg-primary" : "btn-disabled"
                }`}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert deposit when time is due */}
      {showCountdown && isExpiredCountdown && type === "deposit" ? (
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

      {/* Confirm online payment redirect modal */}
      {modalType === "confirm" ? (
        <Alert
          show={modalType === "confirm"}
          title={
            "Hệ thống sẽ chuyển đến liên kết của hình thức thanh toán bạn đã chọn. Vui lòng không tắt trình duyệt."
          }
          onClose={() => toggleModal(undefined)}
          onConfirm={handleConfirmCompoundingCar}
          type={"info"}
        />
      ) : null}

      {/* Alert wallet amount balance */}
      {modalType === "alert" ? (
        <WalletBalanceAlert
          show={true}
          onClose={() => toggleModal(undefined)}
          onConfirm={() =>
            router.push(
              `/${userInfo?.car_account_type === "car_driver" ? "/d" : "/c"}/account/wallet?next=${
                returnedUrl || ""
              }`
            )
          }
        />
      ) : null}

      {/* Cancel form modal */}
      {modalType === "cancel" ? (
        <RideCancelForm
          onSubmit={(data) => {
            onCancelCheckout?.(data)
            toggleModal(undefined)
          }}
          onClose={() => toggleModal(undefined)}
          params={{ compounding_car_customer_state: data.state }}
        />
      ) : null}

      {/* Confirm payment by wallet */}
      {modalType === "confirmWallet" && checkoutData.down_payment?.total ? (
        <Alert
          show={modalType === "confirmWallet"}
          onClose={() => toggleModal(undefined)}
          title={`Xác nhận thanh toán số tiền ${formatMoneyVND(
            checkoutData.down_payment?.total
          )} bằng ví EXXE`}
          onConfirm={handleConfirmCompoundingCar}
          type="info"
        />
      ) : null}
    </>
  )
}

export { Checkout }
