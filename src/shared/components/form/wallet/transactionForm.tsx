import { TrustIcon, WarningIcon } from "@/assets"
import { PaymentItem, Spinner } from "@/components"
import { formatMoneyVND, rechargeMoneySchema, toggleBodyOverflow } from "@/helper"
import { usePaymentMethodRechargeMoney } from "@/hooks"
import { RechargeRequestFormParams } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import NumberFormat from "react-number-format"

interface TransactionFormProps {
  accountBalance: number
  label: string
  onSubmit: (_: RechargeRequestFormParams) => void
  view?: "page" | "modal"
}

export const TransactionForm = ({
  accountBalance,
  label,
  onSubmit,
  view = "modal",
}: TransactionFormProps) => {
  const { data: paymentList, isValidating: isPaymentLoading } = usePaymentMethodRechargeMoney()
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    getValues,
    setValue,
    watch,
  } = useForm<RechargeRequestFormParams>({
    resolver: yupResolver(rechargeMoneySchema),
    mode: "all",
  })

  const currentAcquirerId = watch("acquirer_id")
  const [showConfirmWithdraw, setShowConfirmWithdraw] = useState<boolean>(false)

  const toggleShowConfirmWithdraw = (status: boolean) => {
    setShowConfirmWithdraw(status)
    if (status) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  useEffect(() => {
    ;(document?.querySelector(".form-input") as HTMLInputElement)?.focus()
  }, [])

  const onSubmitHandler = (params: RechargeRequestFormParams) => {
    if (!params.amount || typeof params.amount !== "number") return
    onSubmit(params)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-1 flex-col">
      <div className={`flex-1 overflow-y-auto ${view === "modal" ? "pb-[64px]" : ""}`}>
        <div className="mb-24">
          <div className="flex items-center mb-16 justify-between">
            <p className="text-base font-semibold w-[200px] mr-24 uppercase">Số dư khả dụng</p>
            <p className="text-24 font-medium text-primary">{formatMoneyVND(accountBalance)}</p>
          </div>
        </div>

        <div className="mb-24">
          <label htmlFor="input" className="form-label">
            {label}
          </label>

          <div className="relative">
            <Controller
              name="amount"
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <NumberFormat
                  onBlur={onBlur}
                  onValueChange={(val) => {
                    onChange(val.floatValue)
                  }}
                  placeholder="0 đ"
                  value={getValues("amount")}
                  className={`form-input ${errors?.amount ? "form-input-err" : ""}`}
                  suffix=" đ"
                  thousandSeparator={true}
                  allowNegative={false}
                />
              )}
              rules={{ required: true }}
            />
          </div>

          {errors?.amount ? (
            <p className="form-err-msg flex items-center mt-[6px]">
              <WarningIcon color="#FF3B30" className="mr-[10px] w-[20px] h-[20px]" />
              <span>{errors.amount?.message}</span>
            </p>
          ) : null}
        </div>

        <div className="mb-24">
          <p className="form-label">Phương thức nạp tiền</p>

          {isPaymentLoading ? (
            <Spinner size={30} className="py-[20px]" />
          ) : (
            <ul className="flex flex-wrap">
              {paymentList?.map((item) => (
                <li className="mr-16 mb-16" key={item.acquirer_id}>
                  <PaymentItem
                    isActive={currentAcquirerId === item.acquirer_id}
                    onChange={(val) => setValue("acquirer_id", val.acquirer_id)}
                    payment={item}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center">
          <TrustIcon className="mr-8 text-success" />
          <p className="text-xs">
            Mọi thông tin của bạn đều sẽ được chúng tôi mã hóa để bảo mật thông tin khách hàng
          </p>
        </div>
      </div>

      <div
        className={`flex-center ${
          view === "modal" ? "absolute bottom-0 right-0 left-0 p-12 md:p-16" : ""
        }`}
      >
        <button
          onClick={() => handleSubmit(onSubmitHandler)}
          className={`btn-primary ${!isValid ? "btn-disabled" : ""}`}
        >
          Xác nhận
        </button>
      </div>
    </form>
  )
}
