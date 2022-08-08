import {
  CheckoutLoading,
  Payment,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
} from "@/components"
import {
  useCompoundingCarActions,
  useCompoundingCarCustomer,
  useCustomerCheckout,
  useEffectOnce,
} from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { setShowSummaryDetail } from "@/modules"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const Checkout = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { compounding_car_customer_id } = router.query
  const { createPayment } = useCustomerCheckout()
  const { customerCancelCompoundingCarBeforeDeposit } = useCompoundingCarActions()
  const {
    data: compoundingCar,
    isInitialLoading,
    mutate: mutateCompoundingCar,
  } = useCompoundingCarCustomer({
    key: "booking_checkout_customer",
    type: "autoFocus",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })

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
        router.push(`/c/ride-detail/cancel/${compoundingCar.compounding_car_customer_id}`)
      },
    })
  }

  useEffectOnce(() => {
    return () => {
      mutateCompoundingCar(undefined, false)
      dispatch(setShowSummaryDetail(false))
    }
  })

  useEffect(() => {
    if (compoundingCar === undefined) return

    if (compoundingCar?.state === "deposit") {
      router.push(
        `/c/booking/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

  return (
    <CustomerBookingLayout
      reverse={true}
      showLoading={isInitialLoading}
      topNode={<RideProgress state={compoundingCar?.state} />}
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
      title="Đặt cọc chuyến đi"
    >
      {isInitialLoading ? (
        <CheckoutLoading />
      ) : compoundingCar?.compounding_car_customer_id ? (
        compoundingCar?.state === "draft" ? (
          <p className="m-24 -[40px] text-base">
            Vui lòng xác nhận
            <Link
              href={`/c/booking/confirm?compounding_car_customer_id=${compounding_car_customer_id}`}
            >
              <a className="text-primary"> chuyến đi này </a>
            </Link>
            trước khi thực hiện đặt cọc
          </p>
        ) : (
          <Payment
            percentage={compoundingCar.customer_deposit_percentage}
            amount_due={compoundingCar?.amount_due}
            down_payment={compoundingCar?.down_payment?.total}
            amount_total={compoundingCar?.price_unit?.price_unit}
            secondsRemains={compoundingCar.second_remains}
            onCheckout={(id) => handleConfirmTransaction(id)}
            onCancelCheckout={handleCancelCompoundingCarCustomer}
          />
        )
      ) : null}
      {compoundingCar ? <RideSummaryModal rides={compoundingCar} /> : null}
    </CustomerBookingLayout>
  )
}

export default Checkout
