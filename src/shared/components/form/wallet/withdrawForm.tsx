import { QuestionIcon } from "@/assets"
import { Alert } from "@/components/modal"
import { formatMoneyVND, toggleBodyOverflow } from "@/helper"
import { useState } from "react"
import CurrencyInput from "react-currency-input-field"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

interface WithdrawFormProps {
  onSubmit?: (_: number) => void
  accountBalance: number
}

export const WithdrawForm = ({ onSubmit, accountBalance }: WithdrawFormProps) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>("")
  const [showConfirmWithdraw, setShowConfirmWithdraw] = useState<boolean>(false)

  const toggleShowConfirmWithdraw = (status: boolean) => {
    setShowConfirmWithdraw(status)
    if (status) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  return (
    <>
      <div>
        <ul className="mb-24">
          <li className="flex items-center mb-[16px]">
            <p className="text-base font-semibold w-[200px] mr-24 uppercase">Số dư hiện có</p>
            <p className="text-base font-semibold text-primary">{formatMoneyVND(accountBalance)}</p>
          </li>
        </ul>

        <div className="mb-24">
          <label htmlFor="input" className="form-label">
            Số tiền muốn rút
          </label>
          <CurrencyInput
            id="input-example"
            name="input-name"
            className="form-input"
            placeholder="VNĐ"
            decimalsLimit={4}
            suffix=" VNĐ"
            onValueChange={(value, name) => value && setValue(value)}
            value={value}
          />
        </div>

        <ul className="mb-24">
          <li className="flex items-center mb-[16px]">
            <p className="text-xs w-[200px] mr-24">Phí rút tiền</p>
            <p className="text-sm md:text-base">Miễn phí</p>
          </li>
          <li className="flex items-center">
            <p className="text-xs w-[200px] mr-24">Thời gian xử lý</p>
            <p className="text-sm md:text-base">24 giờ </p>
          </li>
        </ul>

        <div className="flex items-center mb-[40px]">
          <QuestionIcon className="mr-8 w-[16px] text-primary" />
          <p className="text-xs text-blue-7">Xem hướng dẫn Rút tiền tại đây.</p>
        </div>

        <div className="absolute lg:static bottom-0 left-0 right-0 p-12 bg-white-color">
          <button
            onClick={() => {
              if (!value) return
              if (+value < 10000) {
                dispatch(notify("Số tiền cần rút phải lớn hơn 10,000 VNĐ!", "error"))
                return
              }
              if (+value > accountBalance) {
                dispatch(notify("Số tiền cần rút phải nhỏ hơn hoặc bằng số dư!", "error"))
                return
              }
              toggleShowConfirmWithdraw(true)
            }}
            className={`btn-primary mx-auto ${!value ? "btn-disabled" : ""}`}
          >
            Xác nhận
          </button>
        </div>
      </div>

      <Alert
        desc={`Xác nhận rút ${formatMoneyVND(value)}`}
        onConfirm={() => {
          toggleBodyOverflow("hidden")
          onSubmit?.(+value)
        }}
        type="info"
        show={showConfirmWithdraw}
        onClose={() => {
          toggleShowConfirmWithdraw(false)
          toggleBodyOverflow("hidden")
        }}
      />
    </>
  )
}
