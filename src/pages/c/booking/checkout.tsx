import { Payment, CheckoutLoading, RidesProgress, RidesSummary } from "@/components"
import { COMPOUNDING_VNPAY_CODE, setToSessionStorage } from "@/helper"
import { useCompoundingCarActions, useCompoundingCarCustomer, useCustomerCheckout } from "@/hooks"
import { BookingLayout, CustomerLayout } from "@/layout"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Checkout = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarCustomer({
    key: "booking_checkout_customer",
    type: "autoFocus",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })
  const { createPayment } = useCustomerCheckout()
  const { customerCancelCompoundingCarBeforeDeposit } = useCompoundingCarActions()

  const handleConfirmTransaction = (acquirer_id: number) => {
    const { compounding_car_customer_id } = compoundingCar || {}
    if (!compounding_car_customer_id) return
    createPayment({
      params: {
        acquirer_id,
        returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/c/booking/checking-checkout-status?compounding_car_customer_id=${compounding_car_customer_id}`,
        compounding_car_customer_id,
      },
      onSuccess: (data) => {
        window.open(data.vnpay_payment_url, "name", "height=600,width=800")?.focus()
      },
    })
  }

  const handleCancelCompoundingCarCustomer = () => {
    if (!compoundingCar?.compounding_car_customer_id) return
    customerCancelCompoundingCarBeforeDeposit({
      params: { compounding_car_customer_id: compoundingCar.compounding_car_customer_id },
      onSuccess: () => {
        router.push("/c")
      },
    })
  }

  useEffect(() => {
    if (compoundingCar?.state === "draft") {
      router.push(`/c/booking/confirm?compounding_car_customer_id=${compounding_car_customer_id}`)
    }
    if (compoundingCar?.state === "deposit") {
      router.push(
        `/c/booking/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

  return (
    <BookingLayout
      topNode={<RidesProgress state={compoundingCar?.state || "confirm"} />}
      rightNode={compoundingCar ? <RidesSummary rides={compoundingCar} /> : null}
      title="Đặt cọc chuyến đi"
    >
      {isInitialLoading ? (
        <CheckoutLoading />
      ) : compoundingCar?.compounding_car_customer_id ? (
        <Payment
          amount_total={compoundingCar.amount_total}
          secondsRemains={compoundingCar.second_remains}
          onCheckout={(id) => handleConfirmTransaction(id)}
          onCancelCheckout={handleCancelCompoundingCarCustomer}
        />
      ) : null}
    </BookingLayout>
  )
}

Checkout.Layout = CustomerLayout
export default Checkout
