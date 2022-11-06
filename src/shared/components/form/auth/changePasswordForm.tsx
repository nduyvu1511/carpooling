import { changePasswordFormFields, changePasswordSchema } from "@/helper"
import { ChangePasswordFormParams, OnForwaredResetForm } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/router"
import { forwardRef, useImperativeHandle } from "react"
import { useForm } from "react-hook-form"
import { InputField } from "../fields"

interface ForgotPasswordProps {
  onSubmit: (props: ChangePasswordFormParams) => void
}

export const ChangePasswordForm = forwardRef(function Child(
  { onSubmit }: ForgotPasswordProps,
  ref: OnForwaredResetForm
) {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ChangePasswordFormParams>({
    resolver: yupResolver(changePasswordSchema),
    mode: "all",
  })

  useImperativeHandle(ref, () => ({
    onReset() {
      reset({ old_password: "", password: "", re_password: "" })
    },
  }))

  const onSubmitHandler = (data: ChangePasswordFormParams) => {
    onSubmit(data)
  }

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      {changePasswordFormFields.map((field) => (
        <InputField
          key={field.name}
          type="password"
          control={control}
          name={field.name}
          label={field.label}
          placeholder={field.label}
        />
      ))}
      <div className="text-right mb-[40px]">
        <span
          onClick={() => router.push("/reset-password?next=/password")}
          className="cursor-pointer text-xs text-primary underline"
        >
          Quên mật khẩu?
        </span>
      </div>
      <div className="fixed bottom-0 left-0 right-0 md:static p-12 md:p-0 bg-white-color md:bg-[transparent] change-pw-submit-btn">
        <button
          type="submit"
          className={`mx-auto md:mx-0 btn-primary  ${isValid ? "" : "btn-disabled"}`}
        >
          Xác nhận
        </button>
      </div>
    </form>
  )
})
