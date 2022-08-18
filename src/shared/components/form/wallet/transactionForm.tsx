import { TrustIcon, WarningIcon } from "@/assets"
import { PaymentItem, Spinner } from "@/components"
import { formatMoneyVND, toggleBodyOverflow, transactionMoneySchema } from "@/helper"
import { usePayment } from "@/hooks"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import CurrencyInput from "react-currency-input-field"
import { useForm } from "react-hook-form"

interface SubmitParams {
  money: number
}

interface TransactionFormProps {
  accountBalance: number
  label: string
  onSubmit: (_: SubmitParams) => void
  view?: "page" | "modal"
}

export const TransactionForm = ({
  accountBalance,
  label,
  onSubmit,
  view = "modal",
}: TransactionFormProps) => {
  //   const [value, setValue] = useState<string>("")
  const [showConfirmWithdraw, setShowConfirmWithdraw] = useState<boolean>(false)
  const {
    paymentList,
    isValidating: isPaymentLoading,
    currentSelectPayment,
    setCurrentSelectPayment,
  } = usePayment()

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty, isValid },
    control,
    getValues,
    setValue,
  } = useForm<{ money: number }>({
    resolver: yupResolver(transactionMoneySchema),
    mode: "all",
  })

  const toggleShowConfirmWithdraw = (status: boolean) => {
    setShowConfirmWithdraw(status)
    if (status) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  const onSubmitHandler = ({ money }: { money: number }) => {
    if (!money || typeof money !== "number") return
    onSubmit({ money })
  }

  return (
    <form className="flex flex-1 flex-col">
      <div className={`flex-1 overflow-y-auto ${view === "modal" ? "pb-[64px]" : ""}`}>
        <div className="mb-24">
          <div className="flex items-center mb-[16px] justify-between">
            <p className="text-base font-semibold w-[200px] mr-24 uppercase">Số dư khả dụng</p>
            <p className="text-24 font-medium text-primary">{formatMoneyVND(accountBalance)}</p>
          </div>
        </div>

        <div className="mb-24">
          <label htmlFor="input" className="form-label">
            {label}
          </label>

          <CurrencyInput
            {...register("money", {
              required: true,
            })}
            id="input"
            name="money"
            className={`form-input ${errors?.money ? "form-input-err" : ""}`}
            placeholder={label}
            decimalsLimit={4}
            suffix=" đ"
            onValueChange={(value, name) => {
              setValue("money", Number(value))
            }}
            // value={getValues("money")}
          />
          {errors?.money ? (
            <p className="form-err-msg flex items-center mt-[6px]">
              <WarningIcon color="#FF3B30" className="mr-[10px] w-[20px] h-[20px]" />
              <span>{errors.money?.message}</span>
            </p>
          ) : null}
        </div>

        <div className="mb-24">
          <p className="form-label">Phương thức nạp tiền</p>

          {isPaymentLoading ? (
            <Spinner size={30} className="py-[20px]" />
          ) : (
            <ul className="flex">
              {paymentList?.map((item) => (
                <li className="mr-[16px] mb-[16px]" key={item.acquirer_id}>
                  <PaymentItem
                    isActive={currentSelectPayment?.acquirer_id === item.acquirer_id}
                    onChange={(val) => setCurrentSelectPayment(val)}
                    payment={item}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center">
          <TrustIcon className="mr-8" />
          <p className="text-xs">
            Mọi thông tin của bạn đều sẽ được chúng tôi mã hóa để bảo mật thông tin khách hàng
          </p>
        </div>
      </div>

      <div
        className={`flex-center ${
          view === "modal" ? "absolute bottom-0 right-0 left-0 p-12 md:p-[16px]" : ""
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
