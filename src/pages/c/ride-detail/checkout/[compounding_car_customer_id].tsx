import {
  Alert,
  CheckoutLoading,
  PaymentCheckoutSlide,
  RideDetailInfo,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
  Seo,
} from "@/components"
import { formatMoneyVND, toggleBodyOverflow } from "@/helper"
import { useCompoundingCarCustomer, useCustomerCheckout } from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { PaymentMethod } from "@/models"
import { rideAPI } from "@/services"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"

type ModalType = "confirmCheckout" | "walletBalanceAlert"

const CheckoutCustomer = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { confirmPayFullForCompoundingCarCustomer } = useCustomerCheckout()
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarCustomer({
    key: `get_compounding_car_customer_to_check_full_${compounding_car_customer_id}`,
    type: "once",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })
  const { isValidating: isAmountBalanceLoading, data: amountBalance } = useSWR<number>(
    "get_amount_balance_in_cash_wallet",
    () =>
      rideAPI
        .getAmountBalanceInCashWallet()
        .then((res) => res?.result?.data?.money_in_cash_wallet || 0)
        .catch((err) => console.log(err))
  )
  const [paymentMethod, setPaymenMethod] = useState<PaymentMethod | undefined>(undefined)
  const [modalType, setModalType] = useState<ModalType | undefined>()

  // Check deposit status
  useEffect(() => {
    if (compoundingCar?.state === "confirm_paid") {
      redirectToCheckoutSuccess()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

  const redirectToCheckoutSuccess = () => {
    router.push(
      `/c/ride-detail/checkout/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`
    )
  }

  const handleConfirmPayFull = () => {
    if (
      !compoundingCar?.compounding_car_customer_id ||
      !paymentMethod ||
      paymentMethod === "transfer"
    )
      return

    confirmPayFullForCompoundingCarCustomer({
      params: {
        compounding_car_customer_id: compoundingCar?.compounding_car_customer_id,
        payment_method: paymentMethod,
      },
      onSuccess: () => {
        redirectToCheckoutSuccess()
      },
    })
  }

  const toggleModal = (type: ModalType | undefined) => {
    setModalType(type)
    if (type) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  return (
    <CustomerBookingLayout
      topNode={<RideProgress state={compoundingCar?.state} />}
      showLoading={isInitialLoading}
      rightNode={compoundingCar ? <RideSummary data={compoundingCar} /> : null}
      title="Thanh toán cho chuyến đi"
    >
      <Seo
        title="Thanh toán cho chuyến đi"
        url={`c/ride-detail/checkout/${compounding_car_customer_id}`}
      />

      {isInitialLoading ? (
        <CheckoutLoading />
      ) : compoundingCar ? (
        <>
          <RideSummaryMobile className="lg:hidden mb-24" rides={compoundingCar} />

          {compoundingCar.state === "done" ||
          compoundingCar.state === "customer_pay" ||
          compoundingCar.state === "confirm_paid" ? (
            <div className="mb-24 md:mb-40">
              <p className="text-sm">
                Chuyến đi đã được thanh toán{" "}
                <Link
                  href={`/c/ride-detail/checkout/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`}
                >
                  <a className="text-primary hover:underline">Xem chi tiết trong hóa đơn</a>
                </Link>
              </p>
            </div>
          ) : null}

          <RideDetailInfo showSnackbar={false} data={compoundingCar} />

          <div className="my-24 border-b border-solid border-border-color"></div>

          {compoundingCar.state === "in_process" ||
          compoundingCar.state === "waiting" ||
          compoundingCar.state === "deposit" ? (
            <>
              <div className="mb-[40px]">
                <p className="uppercase text-base font-semibold mb-16 md:mb-24">
                  Phương thức thanh toán
                </p>
                <PaymentCheckoutSlide
                  amountBalance={amountBalance || 0}
                  isLoading={isAmountBalanceLoading}
                  onChange={(val) => setPaymenMethod(val)}
                  currentValue={paymentMethod}
                />
              </div>

              <button
                onClick={() => {
                  if (
                    paymentMethod === "exxe_wallet" &&
                    (amountBalance || 0) < compoundingCar.amount_due
                  ) {
                    toggleModal("walletBalanceAlert")
                    return
                  }
                  toggleModal("confirmCheckout")
                }}
                className={`btn-primary ${!paymentMethod ? "btn-disabled" : ""}`}
              >
                Tiến hành thanh toán
              </button>
            </>
          ) : null}
        </>
      ) : null}

      {compoundingCar?.down_payment?.total ? (
        <>
          {modalType === "confirmCheckout" ? (
            <Alert
              show={modalType === "confirmCheckout"}
              onConfirm={() => {
                handleConfirmPayFull()
                toggleModal(undefined)
              }}
              onClose={() => toggleModal(undefined)}
              title={`Xác nhận thanh toán số tiền ${formatMoneyVND(
                compoundingCar?.down_payment?.total
              )} cho chuyến đi này`}
              type="info"
            />
          ) : null}

          {modalType === "walletBalanceAlert" ? (
            <Alert
              show={modalType === "walletBalanceAlert"}
              onConfirm={() => {
                router.push(
                  `/c/account/wallet?next=/c/ride-detail/checkout/${compoundingCar.compounding_car_customer_id}`
                )
                toggleModal(undefined)
              }}
              onClose={() => toggleModal(undefined)}
              title="Số tiền trong ví không đủ để thanh toán cho chuyến đi này"
              type="warning"
              rightBtnLabel="Nạp tiền"
            />
          ) : null}
        </>
      ) : null}

      {compoundingCar ? <RideSummaryModal data={compoundingCar} /> : null}
    </CustomerBookingLayout>
  )
}

export default CheckoutCustomer
