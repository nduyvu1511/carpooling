import {
  CheckoutLoading,
  Payment,
  RidesProgress,
  RidesSummaryMobile, RideSummary, RideSummaryModal
} from "@/components"
import { useCompoundingCarCustomer, useCustomerCheckout, useEffectOnce } from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Checkout = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { createPayment } = useCustomerCheckout()
  const {
    data: compoundingCar,
    isInitialLoading,
    mutate: mutateCompoundingCar,
  } = useCompoundingCarCustomer({
    key: "get_compounding_car_customer_to_check_full",
    type: "autoFocus",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })

  // Check deposit status
  useEffect(() => {
    if (compoundingCar?.state === "confirm_paid") {
      router.push(
        `/c/ride-sharing/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

  useEffectOnce(() => {
    return () => {
      mutateCompoundingCar(undefined, false)
    }
  })

  const handleCreatePayment = (acquirer_id: number) => {
    if (!acquirer_id || !compoundingCar?.compounding_car_customer_id) return

    createPayment({
      params: {
        acquirer_id: acquirer_id,
        returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/c/ride-sharing/checking-checkout-status?compounding_car_customer_id=${compounding_car_customer_id}`,
        compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
      },
      onSuccess: (data) => {
        window.open(data.vnpay_payment_url, "name", "height=600,width=800")?.focus()
      },
    })
  }

  return (
    <CustomerBookingLayout
      reverse
      topNode={<RidesProgress state={compoundingCar?.state} />}
      showLoading={isInitialLoading}
      rightNode={
        compoundingCar ? (
          <>
            <div className="hidden lg:block">
              <RideSummary data={compoundingCar} />
            </div>
            <div className="lg:hidden mx-12 mb-12 md:mb-24 md:mx-24 rounded-[5px] overflow-hidden">
              <RidesSummaryMobile rides={compoundingCar} />
            </div>
          </>
        ) : null
      }
      title="Thanh toán cho chuyến đi"
    >
      {isInitialLoading ? (
        <CheckoutLoading />
      ) : compoundingCar ? (
        <Payment
          type="checkout"
          down_payment={compoundingCar.down_payment}
          amount_due={compoundingCar.amount_due}
          showCountdown={false}
          amount_total={+compoundingCar.amount_total}
          secondsRemains={+compoundingCar.second_remains}
          onCheckout={(id) => handleCreatePayment(id)}
        />
      ) : null}

      {compoundingCar ? <RideSummaryModal rides={compoundingCar} /> : null}
    </CustomerBookingLayout>
  )
}

export default Checkout
