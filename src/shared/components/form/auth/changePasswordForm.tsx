import { EyeHideIcon, EyeShowIcon } from "@/assets"
import { changePasswordFormFields, changePasswordSchema } from "@/helper"
import { ChangePasswordFormParams, OnForwaredResetForm } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/router"
import { forwardRef, useImperativeHandle, useState } from "react"
import { useForm } from "react-hook-form"

interface ForgotPasswordProps {
  onSubmit: (props: ChangePasswordFormParams) => void
}

export const ChangePasswordForm = forwardRef(function Child(
  { onSubmit }: ForgotPasswordProps,
  ref: OnForwaredResetForm
) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isValid },
  } = useForm<ChangePasswordFormParams>({
    resolver: yupResolver(changePasswordSchema),
    mode: "all",
  })
  const [inputs, setInputs] = useState<string[]>([])

  useImperativeHandle(ref, () => ({
    onReset() {
      reset()
    },
  }))

  const handleToggleInputType = (name: string) => {
    if (inputs.includes(name)) {
      setInputs([...inputs].filter((item) => item !== name))
    } else {
      setInputs([...inputs, name])
    }
  }

  const onSubmitHandler = (data: ChangePasswordFormParams) => {
    onSubmit(data)
  }

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      {changePasswordFormFields.map((field) => (
        <div key={field.name} className="form-item">
          <label htmlFor={field.name} className="form-label">
            {field.label} (*)
          </label>

          <div className="relative">
            <input
              className={`form-input pr-[50px] ${errors?.[field.name] ? "form-input-err" : ""}`}
              {...register(field.name, {
                required: true,
              })}
              id={field.name}
              type={inputs.includes(field.name) ? "text" : "password"}
              name={field.name}
              placeholder={field.label}
            />

            <span
              onClick={() => handleToggleInputType(field.name)}
              className="cursor-pointer absolute-vertical right-[12px]"
            >
              {inputs?.includes(field.name) ? <EyeHideIcon /> : <EyeShowIcon />}
            </span>
          </div>

          {errors?.[field.name] || dirtyFields?.[field.name] ? (
            <p className="form-err-msg">{errors?.[field.name]?.message}</p>
          ) : null}
        </div>
      ))}
      <div className="text-right mb-[40px]">
        <span
          onClick={() => router.push("/reset-password?next=/password")}
          className="cursor-pointer text-xs"
        >
          Quên mật khẩu?
        </span>
      </div>
      <div className="fixed bottom-0 left-0 right-0 md:static p-12 bg-white-color md:bg-[transparent]">
        <button type="submit" className={`mx-auto btn-primary  ${isValid ? "" : "btn-disabled"}`}>
          Xác nhận
        </button>
      </div>
    </form>
  )
})
