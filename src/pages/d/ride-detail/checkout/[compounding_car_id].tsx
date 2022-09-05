import {
  Checkout,
  CheckoutLoading,
  PromotionCheckout,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
} from "@/components"
import { useCompoundingCarDriver, useDriverCheckout } from "@/hooks"
import { BookingLayout, DriverLayout } from "@/layout"
import { CancelRideParams, DepositCompoundingCarDriverRes, PaymentRes } from "@/models"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const CheckoutDriver = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const {
    data: compoundingCar,
    isInitialLoading,
    mutate,
  } = useCompoundingCarDriver({
    key: `compounding_car_driver_deposit_customer_${compounding_car_id}`,
    type: "autoFocus",
    compounding_car_id: Number(compounding_car_id),
  })
  const {
    cancelDepositCompoundingCarDriver,
    createPaymentForDriver,
    fetchDepositCompoundingCarDriver,
  } = useDriverCheckout()
  const [deposit, setDeposit] = useState<DepositCompoundingCarDriverRes>()
  const [depositLoading, setDepositLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!compounding_car_id) return
    setDepositLoading(true)
    fetchDepositCompoundingCarDriver({
      compounding_car_id: Number(compounding_car_id),
      onSuccess: (data) => {
        setDepositLoading(false)
        setDeposit(data)
      },
      onError: () => {
        setDepositLoading(false)
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compounding_car_id])

  const redirectToCheckoutSuccess = () => {
    router.push(`/d/ride-detail/checkout/checkout-success?compounding_car_id=${compounding_car_id}`)
  }

  useEffect(() => {
    if (!compoundingCar) return
    if (compoundingCar?.state === "confirm_deposit") {
      redirectToCheckoutSuccess()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

  const handleCreatePayment = (params: PaymentRes) => {
    const { compounding_car_id } = compoundingCar || {}
    if (!compounding_car_id || !deposit?.payment_id) return

    createPaymentForDriver({
      params: {
        acquirer_id: params.acquirer_id,
        returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/d/ride-detail/checkout/checking-checkout-status?compounding_car_id=${compounding_car_id}`,
        compounding_car_id,
        payment_id: Number(deposit.payment_id),
      },
      onSuccess: (data) => {
        if (params.provider === "exxe_wallet") {
          redirectToCheckoutSuccess()
          mutate()
        } else {
          window.open(data.vnpay_payment_url, "name", "height=600,width=800")?.focus()
        }
      },
    })
  }

  const handleCancelCompoundingCar = (data: CancelRideParams) => {
    if (!compoundingCar?.compounding_car_id) return
    cancelDepositCompoundingCarDriver({
      params: { compounding_car_id: compoundingCar.compounding_car_id, ...data },
      onSuccess: () => {
        router.push(`/d/ride-detail/cancel/${compoundingCar.compounding_car_id}`)
      },
    })
  }

  return (
    <BookingLayout
      topNode={<RideProgress state={compoundingCar?.state} />}
      showLoading={isInitialLoading}
      rightNode={compoundingCar ? <RideSummary data={compoundingCar} /> : null}
      title="Đặt cọc chuyến đi"
    >
      {depositLoading ? (
        <CheckoutLoading />
      ) : (
        <>
          {compoundingCar ? (
            <RideSummaryMobile className="lg:hidden mb-24" rides={compoundingCar} />
          ) : null}

          {deposit ? (
            <Checkout
              promotion={
                <PromotionCheckout
                  data={compoundingCar?.promotion}
                  onCancelPromotion={() => mutate()}
                  onApplyPromotion={() => mutate()}
                  compounding_car_id={compoundingCar?.compounding_car_id}
                  accountType="car_driver"
                />
              }
              data={{
                amount_due: deposit.amount_due,
                amount_total: deposit.amount_total,
                amount_undiscounted: deposit?.amount_undiscounted,
                discount_after_tax: deposit?.discount_after_tax,
                down_payment: deposit.down_payment,
              }}
              descRideTooltip="số tiền còn lại sẽ được hoàn trả sau khi hoàn thành chuyến đi."
              secondsRemains={+deposit.second_remains}
              onCheckout={(id) => handleCreatePayment(id)}
              state={compoundingCar?.state}
              onCancelCheckout={handleCancelCompoundingCar}
              returnedUrl={`/d/ride-detail/checkout/${compoundingCar?.compounding_car_id}`}
            />
          ) : null}
        </>
      )}

      {compoundingCar ? <RideSummaryModal data={compoundingCar} /> : null}
    </BookingLayout>
  )
}

CheckoutDriver.Layout = DriverLayout
export default CheckoutDriver
