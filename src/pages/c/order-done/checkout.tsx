import { Payment, RidesSummary } from "@/components"
import { COMPOUNDING_VNPAY_CODE, setToSessionStorage } from "@/helper"
import { useCompoundingCarCustomer, useCustomerCheckout } from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Checkout = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { createPayment } = useCustomerCheckout()
  const { data: compoundingCar, isValidating } = useCompoundingCarCustomer({
    key: "get_compounding_car_customer_to_check_full",
    type: "autoFocus",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })

  // Check deposit status
  useEffect(() => {
    if (compoundingCar?.state === "confirm_paid") {
      router.push(
        `/c/order-done/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

  const handleCreatePayment = (acquirer_id: number) => {
    if (!acquirer_id || !compoundingCar?.compounding_car_customer_id) return

    createPayment({
      params: {
        acquirer_id: acquirer_id,
        returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/c/order-done/checking-checkout-status?compounding_car_customer_id=${compounding_car_customer_id}`,
        compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
      },
      onSuccess: (data) => {
        window.open(data.vnpay_payment_url, "name", "height=600,width=800")?.focus()
      },
    })
  }

  return (
    <CustomerBookingLayout
      rightNode={
        compoundingCar ? <RidesSummary car_account_type="customer" rides={compoundingCar} /> : null
      }
      title="Thanh toán cho chuyến đi"
    >
      {compoundingCar ? (
        <Payment
          showCountdown={false}
          amount_total={+compoundingCar.down_payment}
          secondsRemains={+compoundingCar.second_remains}
          onCheckout={(id) => handleCreatePayment(id)}
        />
      ) : null}
    </CustomerBookingLayout>
  )
}

export default Checkout
