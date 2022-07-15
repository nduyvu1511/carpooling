import { CheckoutDeposit, RidesSummary } from "@/components"
import { COMPOUNDING_VNPAY_CODE, setToSessionStorage } from "@/helper"
import { useCompoundingCarDriver, useDriverCheckout } from "@/hooks"
import { BookingLayout, DriverLayout } from "@/layout"
import { DepositCompoundingCarDriverRes } from "@/models"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Checkout = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarDriver({
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

  const handleCreatePayment = (acquirer_id: number) => {
    const { compounding_car_id } = compoundingCar || {}
    if (!compounding_car_id || !deposit?.payment_id) return

    createPaymentForDriver({
      params: {
        acquirer_id,
        returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/d/rides/checking-checkout-status?compounding_car_id=${compounding_car_id}`,
        compounding_car_id,
        payment_id: Number(deposit.payment_id),
      },
      onSuccess: (data) => {
        window.open(data.vnpay_payment_url, "name", "height=600,width=800")?.focus()
        setToSessionStorage(COMPOUNDING_VNPAY_CODE, data.vnpay_code)
      },
    })
  }

  useEffect(() => {
    if (compoundingCar?.state === "confirm_deposit") {
      router.push(`/d/rides/checkout-success?compounding_car_id=${compounding_car_id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

  return (
    <BookingLayout
      rightNode={
        compoundingCar ? (
          <RidesSummary car_account_type="car_driver" rides={compoundingCar as any} />
        ) : null
      }
      title="Đặt cọc chuyến đi"
    >
      {deposit ? (
        <CheckoutDeposit
          amount_total={+deposit.amount}
          secondsRemains={+deposit.second_remains}
          onCheckout={(id) => handleCreatePayment(id)}
          onCancelCheckout={() => {
            if (!compoundingCar?.compounding_car_id) return
            cancelDepositCompoundingCarDriver(compoundingCar.compounding_car_id, () => {
              router.push("/d")
            })
          }}
        />
      ) : null}
    </BookingLayout>
  )
}

Checkout.Layout = DriverLayout
export default Checkout
