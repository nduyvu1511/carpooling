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
import { isObjectHasValue } from "@/helper"
import { useCompoundingCarActions, useCustomerCheckout } from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import {
  CancelRideParams,
  CompoundingCarCustomer,
  CompoundingCarCustomerState,
  PaymentRes,
} from "@/models"
import { chatAPI, rideAPI } from "@/services"
import { AxiosResponse } from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"

const CheckoutCustomer = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { createPayment } = useCustomerCheckout()
  const { customerCancelCompoundingCarBeforeDeposit } = useCompoundingCarActions()
  const [state, setState] = useState<CompoundingCarCustomerState>()

  const {
    data: compoundingCar,
    error,
    mutate,
  } = useSWR<CompoundingCarCustomer>(
    compounding_car_customer_id ? `booking_checkout_customer_${compounding_car_customer_id}` : null,
    () =>
      rideAPI
        .getDetailCompoundingCarCustomer({
          compounding_car_customer_id: Number(compounding_car_customer_id),
        })
        .then((res: AxiosResponse<any>) => {
          const data = res?.result?.data
          if (isObjectHasValue(data)) {
            setState(data.state)
            return data
          }

          return null
        })
        .catch((err) => console.log(err)),

    {
      dedupingInterval: 1000,
      revalidateOnFocus: state === "confirm",
    }
  )

  const isInitialLoading = error === undefined && compoundingCar === undefined

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
        returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/c/booking/checking-checkout-status?compounding_car_customer_id=${compounding_car_customer_id}&compounding_type=${compoundingCar.compounding_type}&compounding_car_id=${compoundingCar.compounding_car_id}`,
        compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
      },
      onSuccess: (data) => {
        if (params.provider === "exxe_wallet") {
          chatAPI.joinRoomByCompoundingCarId(compoundingCar.compounding_car_id)
          redirectToCheckoutSuccess()
        } else {
          window.open(data.vnpay_payment_url, "name", "height=600,width=800")?.focus()
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
      showLoading={isInitialLoading}
      topNode={<RideProgress state={compoundingCar?.state} />}
      rightNode={compoundingCar ? <RideSummary data={compoundingCar} /> : null}
      title="Đặt cọc chuyến đi"
    >
      <Seo
        title="Đặt cọc chuyến đi"
        url={`c/booking/checkout?compounding_car_customer_id=${compounding_car_customer_id}`}
      />

      {isInitialLoading ? (
        <CheckoutLoading />
      ) : compoundingCar?.compounding_car_customer_id ? (
        <>
          <Checkout
            onConfirmCompoundingCar={(data) => {
              setState("confirm")
              mutate(data, false)
            }}
            promotion={
              <PromotionCheckout
                data={compoundingCar?.promotion}
                onCancelPromotion={() => mutate()}
                onApplyPromotion={() => mutate()}
                compounding_car_customer_id={compoundingCar.compounding_car_customer_id}
                accountType="customer"
                disabled={state === "confirm"}
              />
            }
            data={compoundingCar}
            checkoutData={{
              amount_due: compoundingCar.amount_due,
              amount_total: compoundingCar.amount_total,
              amount_undiscounted: compoundingCar?.amount_undiscounted,
              discount_after_tax: compoundingCar?.discount_after_tax,
              down_payment: compoundingCar.down_payment,
            }}
            secondsRemains={compoundingCar.second_remains}
            onCheckout={(_) => handleConfirmTransaction(_)}
            onCancelCheckout={handleCancelCompoundingCarCustomer}
            returnedUrl={`/c/booking/checkout?compounding_car_customer_id=${compoundingCar.compounding_car_customer_id}`}
          />
          <RideSummaryMobile rides={compoundingCar} className="lg:hidden mt-40 mb-24" />
        </>
      ) : null}
      {compoundingCar ? <RideSummaryModal data={compoundingCar} /> : null}
    </CustomerBookingLayout>
  )
}

export default CheckoutCustomer
