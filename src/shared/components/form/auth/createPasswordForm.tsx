import { createNewPasswordFormFields, createPasswordSchema } from "@/helper"
import { CreatePasswordFormParams, OnForwaredResetForm } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { forwardRef, useEffect, useImperativeHandle } from "react"
import { useForm } from "react-hook-form"
import { InputField } from "../fields"

interface ForgotPasswordProps {
  onSubmit: (props: CreatePasswordFormParams) => void
}

export const CreatePasswordForm = forwardRef(function Child(
  { onSubmit }: ForgotPasswordProps,
  ref: OnForwaredResetForm
) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CreatePasswordFormParams>({
    resolver: yupResolver(createPasswordSchema),
    mode: "all",
  })

  useImperativeHandle(ref, () => ({
    onReset() {
      reset()
    },
  }))

  useEffect(() => {
    ;(document?.querySelector(".form-input") as HTMLInputElement)?.focus()
  }, [])

  const onSubmitHandler = (data: CreatePasswordFormParams) => {
    onSubmit(data)
  }

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="mb-[40px]">
        {createNewPasswordFormFields.map((field) => (
          <InputField
            key={field.name}
            type="password"
            control={control}
            name={field.name}
            label={field.label}
            placeholder={field.label}
          />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 md:static p-12 md:p-0 bg-white-color md:bg-[transparent] create-pw-submit-btn">
        <button
          type="submit"
          className={`btn-primary mx-auto md:mx-0 ${isValid ? "" : "btn-disabled"}`}
        >
          Xác nhận
        </button>
      </div>
    </form>
  )
})
