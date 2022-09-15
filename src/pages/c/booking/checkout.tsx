import {
  Checkout,
  CheckoutLoading,
  PromotionCheckout,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
  Seo,
} from "@/components"
import { useCompoundingCarActions, useCompoundingCarCustomer, useCustomerCheckout } from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { PaymentRes } from "@/models"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"

const CheckoutCustomer = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { createPayment } = useCustomerCheckout()
  const { customerCancelCompoundingCarBeforeDeposit } = useCompoundingCarActions()
  const {
    data: compoundingCar,
    isInitialLoading,
    mutate,
  } = useCompoundingCarCustomer({
    key: `booking_checkout_customer_${compounding_car_customer_id}`,
    type: "autoFocus",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })

  useEffect(() => {
    if (compoundingCar === undefined) return

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
        returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/c/booking/checking-checkout-status?compounding_car_customer_id=${compounding_car_customer_id}&sale_order_id=${compoundingCar.sale_order_id}`,
        compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
      },
      onSuccess: (data) => {
        if (params.provider === "exxe_wallet") {
          redirectToCheckoutSuccess()
        } else {
          window.open(data.vnpay_payment_url, "name", "height=600,width=800")?.focus()
        }
      },
    })
  }

  const handleCancelCompoundingCarCustomer = () => {
    if (!compoundingCar?.compounding_car_customer_id) return
    customerCancelCompoundingCarBeforeDeposit({
      params: { compounding_car_customer_id: compoundingCar.compounding_car_customer_id },
      onSuccess: () => {
        router.push(`/c/ride-detail/cancel/${compoundingCar.compounding_car_customer_id}`)
      },
    })
  }

  return (
    <CustomerBookingLayout
      showLoading={isInitialLoading}
      topNode={<RideProgress state={compoundingCar?.state} />}
      rightNode={compoundingCar ? <RideSummary data={compoundingCar} /> : null}
      title="Đặt cọc chuyến đi"
    >
      <Seo
        title="Đặt cọc cho chuyến đi"
        description="Đặt cọc cho chuyến đi"
        url=""
        thumbnailUrl=""
      />
      {isInitialLoading ? (
        <CheckoutLoading />
      ) : compoundingCar?.compounding_car_customer_id ? (
        compoundingCar?.state === "draft" ? (
          <p className="text-sm">
            Vui lòng xác nhận
            <Link
              href={`/c/booking/confirm?compounding_car_customer_id=${compounding_car_customer_id}`}
            >
              <a className="text-primary"> chuyến đi này </a>
            </Link>
            trước khi thực hiện đặt cọc
          </p>
        ) : (
          <>
            <Checkout
              promotion={
                <PromotionCheckout
                  data={compoundingCar?.promotion}
                  onCancelPromotion={() => mutate()}
                  onApplyPromotion={() => mutate()}
                  compounding_car_customer_id={compoundingCar.compounding_car_customer_id}
                  accountType="customer"
                />
              }
              data={{
                amount_due: compoundingCar.amount_due,
                amount_total: compoundingCar.amount_total,
                amount_undiscounted: compoundingCar?.amount_undiscounted,
                discount_after_tax: compoundingCar?.discount_after_tax,
                down_payment: compoundingCar.down_payment,
              }}
              secondsRemains={compoundingCar.second_remains}
              onCheckout={(_) => handleConfirmTransaction(_)}
              onCancelCheckout={handleCancelCompoundingCarCustomer}
              state={compoundingCar.state}
              returnedUrl={`/c/booking/checkout?compounding_car_customer_id=${compoundingCar.compounding_car_customer_id}`}
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
