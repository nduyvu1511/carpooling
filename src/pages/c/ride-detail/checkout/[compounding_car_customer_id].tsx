import { PaymentIcon, WalletIcon } from "@/assets"
import {
  CheckoutLoading,
  PaymentMethodItem,
  RideDetailInfo,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
} from "@/components"
import { formatMoneyVND, toggleBodyOverflow } from "@/helper"
import { useCompoundingCarCustomer, useCustomerCheckout, useEffectOnce } from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { PaymentMethod, PaymentMethodItem as PaymentMethodItemType } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import useSWR from "swr"

const Checkout = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { compounding_car_customer_id } = router.query
  const { confirmPayFullForCompoundingCarCustomer } = useCustomerCheckout()
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarCustomer({
    key: `get_compounding_car_customer_to_check_full_${compounding_car_customer_id}`,
    type: "once",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })
  const { isValidating: isAmountBalanceLoading, data: amountBalance } = useSWR<number>(
    "get_amount_balance_in_cash_wallet",
    () =>
      ridesApi
        .getAmountBalanceInCashWallet()
        .then((res) => res?.result?.data?.money_in_cash_wallet || 0)
        .catch((err) => console.log(err))
  )

  const [paymentMethod, setPaymenMethod] = useState<PaymentMethod | undefined>(undefined)

  // Check deposit status
  useEffect(() => {
    if (compoundingCar?.state === "confirm_paid") {
      redirectToCheckoutSuccess()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

  useEffectOnce(() => {
    return () => {
      dispatch(setShowSummaryDetail(false))
      toggleBodyOverflow("unset")
    }
  })

  const redirectToCheckoutSuccess = () => {
    router.push(
      `/c/ride-detail/checkout/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`
    )
  }

  const handleConfirmPayFull = () => {
    if (
      !compoundingCar?.compounding_car_customer_id ||
      !paymentMethod ||
      paymentMethod === "transfer"
    )
      return
    confirmPayFullForCompoundingCarCustomer({
      params: {
        compounding_car_customer_id: compoundingCar?.compounding_car_customer_id,
        payment_method: paymentMethod,
      },
      onSuccess: () => {
        router.push(
          `/c/ride-detail/checkout/checkout-success?compounding_car_customer_id=${compoundingCar.compounding_car_customer_id}`
        )
      },
    })
  }

  const data: PaymentMethodItemType[] = useMemo(() => {
    return [
      {
        value: "exxe_wallet",
        label: "Ví EXXE",
        icon: <WalletIcon className="w-16" />,
        brief: `Số dư: ${formatMoneyVND(amountBalance || 0)}`,
      },
      {
        value: "cash",
        label: "Tiền mặt",
        icon: <PaymentIcon className="w-16" />,
        brief: "Thanh toán cho tài xế",
      },
      {
        value: "transfer",
        label: "Chuyển khoản",
        icon: <WalletIcon className="w-16" />,
        brief: `Thẻ ATM/NAPAS `,
      },
    ] as PaymentMethodItemType[]
  }, [amountBalance])

  return (
    <CustomerBookingLayout
      topNode={<RideProgress state={compoundingCar?.state} />}
      showLoading={isInitialLoading}
      rightNode={compoundingCar ? <RideSummary data={compoundingCar} /> : null}
      title="Thanh toán cho chuyến đi"
    >
      {isInitialLoading ? (
        <CheckoutLoading />
      ) : compoundingCar ? (
        <>
          <RideSummaryMobile className="lg:hidden mb-24" rides={compoundingCar} />
          <div className="mb-[40px]">
            <RideDetailInfo data={compoundingCar} />
          </div>

          <div className="mb-[40px]">
            <p className="uppercase text-base font-semibold mb-16 md:mb-24">
              PHƯƠNG THỨC THANH TOÁN
            </p>
            <div className="flex overflow-x-auto scrollbar-hide mr-[-12px] md:mr-[-16px]">
              {isAmountBalanceLoading ? (
                <>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      className="w-[180px] shrink-0 h-[90px] skeleton rounded-[5px] mr-12 md:mr-16"
                      key={index}
                    ></div>
                  ))}
                </>
              ) : (
                data.map((data) => (
                  <PaymentMethodItem
                    key={data.value}
                    data={data}
                    onChange={(val) => setPaymenMethod(val)}
                    value={paymentMethod}
                    className={`w-[180px] mr-12 md:mr-16 shrink-0 ${
                      data.value === "transfer" ? "bg-bg pointer-events-none opacity-30" : ""
                    }`}
                  />
                ))
              )}
            </div>
          </div>

          <div className="">
            <button
              onClick={handleConfirmPayFull}
              className={`btn-primary ${!paymentMethod ? "btn-disabled" : ""}`}
            >
              Tiến hành thanh toán
            </button>
          </div>
        </>
      ) : null}

      {compoundingCar ? <RideSummaryModal data={compoundingCar} /> : null}
    </CustomerBookingLayout>
  )
}

export default Checkout
