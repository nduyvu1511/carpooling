import {
  CheckoutLoading,
  Payment,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
} from "@/components"
import { toggleBodyOverflow } from "@/helper"
import { useBackRouter, useCompoundingCarDriver, useDriverCheckout, useEffectOnce } from "@/hooks"
import { BookingLayout, DriverLayout } from "@/layout"
import { DepositCompoundingCarDriverRes } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const Checkout = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { compounding_car_id } = router.query
  const {
    data: compoundingCar,
    isInitialLoading,
    mutate,
  } = useCompoundingCarDriver({
    key: "compounding_car_driver_deposit_customer",
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

  useBackRouter({
    cb: () => {
      toggleBodyOverflow("unset")
    },
  })

  useEffectOnce(() => {
    return () => {
      mutate(undefined, false)
      dispatch(setShowSummaryDetail(false))
    }
  })

  useEffect(() => {
    if (!compoundingCar) return
    if (compoundingCar?.state === "confirm_deposit") {
      router.push(`/d/ride-detail/checkout-success?compounding_car_id=${compounding_car_id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

  const handleCreatePayment = (acquirer_id: number) => {
    const { compounding_car_id } = compoundingCar || {}
    if (!compounding_car_id || !deposit?.payment_id) return

    createPaymentForDriver({
      params: {
        acquirer_id,
        returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/d/ride-detail/checking-checkout-status?compounding_car_id=${compounding_car_id}`,
        compounding_car_id,
        payment_id: Number(deposit.payment_id),
      },
      onSuccess: (data) => {
        window.open(data.vnpay_payment_url, "name", "height=600,width=800")?.focus()
      },
    })
  }

  return (
    <BookingLayout
      reverse
      topNode={<RideProgress state={compoundingCar?.state} />}
      showLoading={isInitialLoading}
      rightNode={
        compoundingCar ? (
          <>
            <div className="hidden lg:block">
              <RideSummary data={compoundingCar} />
            </div>
            <div className="lg:hidden mx-12 mb-12 md:mb-24 md:mx-24 rounded-[5px] overflow-hidden">
              <RideSummaryMobile rides={compoundingCar} />
            </div>
          </>
        ) : null
      }
      title="Đặt cọc chuyến đi"
    >
      <div className="bg-white-color block-element overflow-hidden">
        {depositLoading ? (
          <CheckoutLoading />
        ) : (
          <>
            {/* <div className="mx-24 mb-24 border-b border-solid border-border-color "></div> */}
            {deposit ? (
              <Payment
                descRideTooltip="số tiền còn lại sẽ được hoàn trả sau khi hoàn thành chuyến đi."
                amount_due={deposit.amount_due}
                amount_total={deposit.amount_total}
                down_payment={+deposit.down_payment.total}
                secondsRemains={+deposit.second_remains}
                percentage={compoundingCar?.car_driver_deposit_percentage}
                onCheckout={(id) => handleCreatePayment(id)}
                onCancelCheckout={() => {
                  if (!compoundingCar?.compounding_car_id) return
                  cancelDepositCompoundingCarDriver(compoundingCar.compounding_car_id, () => {
                    router.push(`/d/ride-detail/cancel/${compoundingCar.compounding_car_id}`)
                  })
                }}
              />
            ) : null}
          </>
        )}
      </div>

      {compoundingCar ? <RideSummaryModal rides={compoundingCar} /> : null}
    </BookingLayout>
  )
}

Checkout.Layout = DriverLayout
export default Checkout
