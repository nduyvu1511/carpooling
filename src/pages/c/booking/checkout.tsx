import {
  Checkout,
  CheckoutLoading,
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
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarCustomer({
    key: `booking_checkout_customer_${compounding_car_customer_id}`,
    type: "autoFocus",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })

  const handleConfirmTransaction = (params: PaymentRes) => {
    const { compounding_car_customer_id } = compoundingCar || {}
    if (!compounding_car_customer_id) return

    createPayment({
      params: {
        acquirer_id: params.acquirer_id,
        returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/c/booking/checking-checkout-status?compounding_car_customer_id=${compounding_car_customer_id}`,
        compounding_car_customer_id,
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

  const redirectToCheckoutSuccess = () => {
    router.push(
      `/c/booking/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`
    )
  }

  useEffect(() => {
    if (compoundingCar === undefined) return

    if (compoundingCar?.state === "deposit") {
      redirectToCheckoutSuccess()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

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
              percentage={compoundingCar.customer_deposit_percentage}
              amount_due={compoundingCar?.amount_due}
              down_payment={compoundingCar?.down_payment?.total}
              amount_total={compoundingCar.amount_total || compoundingCar?.price_unit?.price_unit}
              secondsRemains={compoundingCar.second_remains}
              onCheckout={(_) => handleConfirmTransaction(_)}
              onCancelCheckout={handleCancelCompoundingCarCustomer}
              state={compoundingCar.state}
              returnedUrl={`/c/booking/confirm?compounding_car_customer_id=${compoundingCar.compounding_car_customer_id}`}
            />
            <RideSummaryMobile rides={compoundingCar} className="lg:hidden mt-[40px]" />
          </>
        )
      ) : null}
      {compoundingCar ? <RideSummaryModal data={compoundingCar} /> : null}
    </CustomerBookingLayout>
  )
}

export default CheckoutCustomer
