import {
  CheckoutLoading,
  Payment,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
} from "@/components"
import { toggleBodyOverflow } from "@/helper"
import {
  useBackRouter,
  useCompoundingCarCustomer,
  useCustomerCheckout,
  useEffectOnce,
} from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { setShowSummaryDetail } from "@/modules"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const Checkout = () => {
  const router = useRouter()
  const dispatch = useDispatch()
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
      dispatch(setShowSummaryDetail(false))
    }
  })

  useBackRouter({
    cb: () => {
      toggleBodyOverflow("unset")
    },
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
      topNode={<RideProgress state={compoundingCar?.state} />}
      showLoading={isInitialLoading}
      rightNode={
        compoundingCar ? (
          <>
            <div className="hidden lg:block">
              <RideSummary data={compoundingCar} />
            </div>
            <div className="lg:hidden mx-12 mb-0 md:mx-24 rounded-[5px] overflow-hidden">
              <RideSummaryMobile rides={compoundingCar} />
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
          down_payment={compoundingCar?.down_payment?.total}
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
