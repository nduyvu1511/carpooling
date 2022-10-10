import { contactFormFields, contactSchema } from "@/helper"
import { ContactParams, OnForwaredResetForm } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { forwardRef, useImperativeHandle } from "react"
import { useForm } from "react-hook-form"
import { CheckboxField } from "../fields"

interface ContactFormProps {
  onSubmit?: (params: ContactParams) => void
}

export const ContactForm = forwardRef(function ContactChild(
  { onSubmit }: ContactFormProps,
  ref: OnForwaredResetForm
) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, dirtyFields, isValid },
  } = useForm<ContactParams>({
    resolver: yupResolver(contactSchema),
    mode: "all",
  })

  useImperativeHandle(ref, () => ({
    onReset() {
      reset()
    },
  }))

  const onSubmitHandler = (data: ContactParams) => {
    onSubmit?.(data)
  }

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      {contactFormFields.map((field) => (
        <div key={field.name} className="form-item mb-16">
          {field.type === "text" ? (
            <input
              className={`form-input h-[50px] border-[transparent] bg-bg-primary ${
                errors?.[field.name] ? "form-input-err" : ""
              }`}
              {...register(field.name, {
                required: true,
              })}
              id={field.name}
              type={field.name === "email" ? "email" : "text"}
              name={field.name}
              placeholder={field.label}
            />
          ) : null}

          {field.type === "textarea" ? (
            <textarea
              maxLength={300}
              className={`form-textarea mb-24 bg-bg-primary border-none ${
                errors?.[field.name] ? "form-input-err" : ""
              }`}
              {...register(field.name, {
                required: true,
              })}
              placeholder={field.label}
              id={field.name}
              name={field.name}
              rows={3}
            ></textarea>
          ) : null}

          {errors?.[field.name] || dirtyFields?.[field.name] ? (
            <p className="form-err-msg">{errors?.[field.name]?.message}</p>
          ) : null}
        </div>
      ))}

      <CheckboxField
        size={20}
        control={control}
        label="Tôi đồng ý nhận bản tin từ Exxe.vn về các chương trình khuyến mãi sắp tới, ưu đãi độc
          quyền và tiến hành các hoạt động tiếp thị."
        name="receive_news"
      />

      <div className="mt-[40px]">
        <button
          type="submit"
          className={`ml-auto btn-primary  ${isValid ? "" : "btn-disabled-clickable"}`}
        >
          Gửi ngay
        </button>
      </div>
    </form>
  )
})
