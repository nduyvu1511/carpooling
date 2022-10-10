import { phoneNumberSchema } from "@/helper"
import { yupResolver } from "@hookform/resolvers/yup"
import { ReactNode, useEffect } from "react"
import { useForm } from "react-hook-form"
import { InputField } from "../fields"

interface OtpFormProps {
  onSubmit: (phoneNumber: string) => void
  phone?: string
  children?: ReactNode
}

export const PhoneForm = ({ onSubmit, phone, children }: OtpFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ phone: string }>({
    resolver: yupResolver(phoneNumberSchema),
    mode: "all",
    defaultValues: {
      phone: phone || "",
    },
  })

  useEffect(() => {
    ;(document.querySelector(".form-input") as HTMLInputElement)?.focus()
  }, [])

  const onSubmitHandler = ({ phone }: { phone: string }) => {
    onSubmit && onSubmit(phone)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <InputField
        label="Số điện thoại"
        required
        placeholder="+84"
        control={control}
        name="phone"
        inputMode="numeric"
        type="number"
      />

      {children || null}

      <div className="flex justify-center phone-form-btn mt-40">
        <button
          type="submit"
          className={`btn-primary btn-submit-fixed ${isValid ? "" : "btn-disabled"}`}
        >
          Xác nhận
        </button>
      </div>
    </form>
  )
}
