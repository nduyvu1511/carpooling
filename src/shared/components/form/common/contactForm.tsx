import { InputCheckbox } from "@/components/inputs"
import { contactSchema } from "@/core/schema"
import { contactFormFields } from "@/helper"
import { ContactParams } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

interface ContactFormProps {
  onSubmit?: (params: ContactParams) => void
}

export const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors, dirtyFields, isValid },
  } = useForm<ContactParams>({
    resolver: yupResolver(contactSchema),
    mode: "all",
  })

  const onSubmitHandler = (data: ContactParams) => {
    console.log({ data })
    onSubmit?.(data)
  }
  const isReceived = watch("isReceived")

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      {contactFormFields.map((field) => (
        <div key={field.name} className="form-item mb-[16px]">
          {field.type === "text" ? (
            <input
              className={`form-input h-[50px] border-[transparent] bg-bg-primary ${
                errors?.[field.name] ? "form-input-err" : ""
              }`}
              {...register(field.name, {
                required: true,
              })}
              id={field.name}
              type={"text"}
              name={field.name}
              placeholder={field.label}
            />
          ) : null}

          {field.type === "textarea" ? (
            <textarea
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

      <div className="flex items-start">
        <InputCheckbox
          isChecked={!!isReceived}
          onCheck={() => {
            setValue("isReceived", !getValues("isReceived"))
          }}
          type="circle"
        />
        <p
          onClick={() => setValue("isReceived", !getValues("isReceived"))}
          className="cursor-default flex-1 ml-[14px] text-xs leading-[18px]"
        >
          Tôi đồng ý nhận bản tin từ Exxe.vn về các chương trình khuyến mãi sắp tới, ưu đãi độc
          quyền và tiến hành các hoạt động tiếp thị.
        </p>
      </div>

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
}
