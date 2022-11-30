import {
  Checkout,
  CheckoutLoading,
  CheckoutPaid,
  PromotionCheckout,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
  Seo,
} from "@/components"
import { compareCompoundingCarCustomerState } from "@/helper"
import { useCompoundingCarActions, useCompoundingCarCustomer, useCustomerCheckout } from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { CancelRideParams, PaymentRes } from "@/models"
import { chatAPI, rideAPI } from "@/services"
import { useRouter } from "next/router"
import { useEffect } from "react"
import useSWR from "swr"

const CheckoutCustomer = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { createPayment } = useCustomerCheckout()
  const { customerCancelCompoundingCarBeforeDeposit } = useCompoundingCarActions()

  const { data: amount_wallet } = useSWR<number>("get_amount_balance_in_cash_wallet", () =>
    rideAPI
      .getAmountBalanceInCashWallet()
      .then((res) => res?.result?.data?.money_in_cash_wallet || 0)
      .catch((err) => console.log(err))
  )

  const {
    data: compoundingCar,
    mutate,
    isInitialLoading,
  } = useCompoundingCarCustomer({
    key: `booking_checkout_customer_${compounding_car_customer_id}`,
    type: "once",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })

  useEffect(() => {
    if (!compoundingCar?.compounding_car_id) return

    if (compoundingCar?.state === "deposit") {
      redirectToCheckoutSuccess()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

  const redirectToCheckoutSuccess = () => {
    router.push(
      `/c/booking/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`
    )
  }

  const handleConfirmTransaction = (params: PaymentRes) => {
    if (!compoundingCar?.compounding_car_customer_id) return

    createPayment({
      params: {
        acquirer_id: params.acquirer_id,
        returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/c/booking/checking-checkout-status?compounding_car_customer_id=${compounding_car_customer_id}&compounding_type=${compoundingCar.compounding_type}&compounding_car_id=${compoundingCar.compounding_car_id}`,
        compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
      },
      onSuccess: (data) => {
        if (params.provider === "exxe_wallet") {
          chatAPI.joinRoomByCompoundingCarId(compoundingCar.compounding_car_id)
          redirectToCheckoutSuccess()
        } else {
          router.replace(data.vnpay_payment_url)
        }
      },
    })
  }

  const handleCancelCompoundingCarCustomer = (params: CancelRideParams) => {
    if (!compoundingCar?.compounding_car_customer_id) return
    customerCancelCompoundingCarBeforeDeposit({
      params: {
        compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
        ...params,
      },
      onSuccess: () => {
        router.push(`/c/ride-detail/cancel/${compoundingCar.compounding_car_customer_id}`)
      },
    })
  }

  return (
    <CustomerBookingLayout
      title="Đặt cọc chuyến đi"
      showLoading={isInitialLoading}
      topNode={<RideProgress state={compoundingCar?.state} />}
      rightNode={
        compoundingCar ? <RideSummary amount_wallet={amount_wallet} data={compoundingCar} /> : null
      }
    >
      <Seo
        title="Đặt cọc chuyến đi"
        url={`c/booking/checkout?compounding_car_customer_id=${compounding_car_customer_id}`}
      />

      {isInitialLoading ? (
        <CheckoutLoading />
      ) : compoundingCar?.compounding_car_customer_id ? (
        compareCompoundingCarCustomerState({
          currentState: compoundingCar?.state,
          targetState: "deposit",
        }) === "greater" ? (
          <CheckoutPaid
            link={`/c/booking/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`}
          />
        ) : (
          <>
            <Checkout
              secondsRemains={compoundingCar.second_remains}
              onCheckout={(_) => handleConfirmTransaction(_)}
              onCancelCheckout={handleCancelCompoundingCarCustomer}
              returnedUrl={`/c/booking/checkout?compounding_car_customer_id=${compoundingCar.compounding_car_customer_id}`}
              data={compoundingCar}
              promotion={
                <PromotionCheckout
                  data={compoundingCar?.promotion}
                  onCancelPromotion={() => mutate()}
                  onApplyPromotion={() => mutate()}
                  compounding_car_customer_id={compoundingCar.compounding_car_customer_id}
                  accountType="customer"
                  disabled={compoundingCar?.state === "confirm"}
                />
              }
              checkoutData={{
                amount_due: compoundingCar.amount_due,
                amount_total: compoundingCar.amount_total,
                amount_undiscounted: compoundingCar?.amount_undiscounted,
                discount_after_tax: compoundingCar?.discount_after_tax,
                down_payment: compoundingCar.down_payment,
              }}
            />

            <RideSummaryMobile rides={compoundingCar} className="lg:hidden mt-40 mb-24" />
          </>
        )
      ) : null}
      {compoundingCar ? <RideSummaryModal data={compoundingCar} /> : null}
    </CustomerBookingLayout>
  )
}

export default CheckoutCustomer
