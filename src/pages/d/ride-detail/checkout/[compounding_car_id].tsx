import {
  Checkout,
  CheckoutLoading,
  CheckoutPaid,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
  Seo,
} from "@/components"
import { compareCompoundingCarDriverState } from "@/helper"
import { useCompoundingCarDriver, useDriverCheckout } from "@/hooks"
import { BookingLayout, DriverLayout } from "@/layout"
import { CancelRideParams, DepositCompoundingCarDriverRes, PaymentRes } from "@/models"
import { rideAPI } from "@/services"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const CheckoutDriver = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarDriver({
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

  // useEffect(() => {
  //   if (!compoundingCar) return
  //   if (compoundingCar?.state === "confirm_deposit") {
  //     redirectToCheckoutSuccess()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [compoundingCar])

  const redirectToCheckoutSuccess = () => {
    router.push(`/d/ride-detail/checkout/checkout-success?compounding_car_id=${compounding_car_id}`)
  }

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
          if (!compoundingCar?.compounding_car_id) return

          rideAPI
            .getDetailCompoundingCar({ compounding_car_id })
            .then((res) => {
              const data = res?.result?.data
              if (data?.state !== "confirm_deposit") return

              // If ride type is carpooling, then create new group chat
              // if (
              //   data?.compounding_type === "compounding" &&
              //   data?.compounding_car_customers?.length > 0
              // ) {
              //   chatAPI.createGroupChat({
              //     room_name: data.compounding_car_name,
              //     compounding_car_id: data.compounding_car_id,
              //     member_ids: data.compounding_car_customers?.map(
              //       (item) => item.partner.partner_id
              //     ),
              //   })
              // }

              redirectToCheckoutSuccess()
            })
            .catch((err) => console.log(err))
        } else {
          router.replace(data.vnpay_payment_url)
          // window.open(data.vnpay_payment_url, "name", "height=600,width=800")?.focus()
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
      <Seo title="Đặt cọc chuyến đi" url={`/d/ride-detail/checkout/${compounding_car_id}`} />

      {depositLoading ? (
        <CheckoutLoading />
      ) : (
        <>
          {deposit?.payment_id && compoundingCar?.compounding_car_id ? (
            <>
              {compareCompoundingCarDriverState({
                currentState: compoundingCar?.state,
                targetState: "confirm_deposit",
              }) === "greater" ? (
                <CheckoutPaid
                  link={`/d/booking/checkout-success?compounding_car_id=${compounding_car_id}`}
                />
              ) : (
                <>
                  <RideSummaryMobile className="lg:hidden mb-24" rides={compoundingCar} />

                  <Checkout
                    type="deposit"
                    checkoutData={{
                      amount_due: deposit.amount_due,
                      amount_total: deposit.amount_total,
                      down_payment: deposit.down_payment,
                    }}
                    data={compoundingCar}
                    descRideTooltip="số tiền còn lại sẽ được hoàn trả sau khi hoàn thành chuyến đi."
                    secondsRemains={+deposit.second_remains}
                    onCheckout={(id) => handleCreatePayment(id)}
                    onCancelCheckout={handleCancelCompoundingCar}
                    returnedUrl={`/d/ride-detail/checkout/${compoundingCar?.compounding_car_id}`}
                  />
                </>
              )}
            </>
          ) : null}
        </>
      )}

      {compoundingCar ? <RideSummaryModal data={compoundingCar} /> : null}
    </BookingLayout>
  )
}

CheckoutDriver.Layout = DriverLayout
export default CheckoutDriver
