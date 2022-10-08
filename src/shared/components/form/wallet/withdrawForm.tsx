import { TrustIcon, WarningIcon } from "@/assets"
import { withdrawSchema } from "@/helper"
import { WithdrawFormParams } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import NumberFormat from "react-number-format"

interface WithdrawFormProps {
  onSubmit?: (_: WithdrawFormParams) => void
  view?: "page" | "modal"
}

export const WithdrawForm = ({ onSubmit, view = "modal" }: WithdrawFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<WithdrawFormParams>({
    resolver: yupResolver(withdrawSchema),
    mode: "all",
  })

  const onSubmitHandler = (params: WithdrawFormParams) => {
    onSubmit?.(params)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="flex-1 flex-col flex">
      <div className="flex-1">
        <div className="mb-24">
          <label htmlFor="input" className="form-label">
            Số tiền muốn rút
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
                  id="input"
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

        <div className="flex items-start p-8 bg-[#F4FDF7] rounded-[8px]">
          <TrustIcon className="mr-8 text-success" />
          <p className="text-xs text-success flex-1">
            Mọi thông tin của bạn đều sẽ được chúng tôi mã hóa để bảo mật thông tin khách hàng
          </p>
        </div>
      </div>

      <div
        className={`flex-center bg-white-color ${
          view === "modal" ? "absolute bottom-0 right-0 left-0 p-12 md:p-16" : ""
        }`}
      >
        <button
          onClick={() => handleSubmit(onSubmitHandler)}
          className={`btn-primary ${!getValues("amount") ? "btn-disabled" : ""}`}
        >
          Xác nhận
        </button>
      </div>
    </form>
  )
}
