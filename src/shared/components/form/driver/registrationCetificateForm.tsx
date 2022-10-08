import { InputImage } from "@/components"

import { ButtonSubmit, InputDate } from "@/components"
import { certificatesRegistrationFormFields, inspectionCertificateSchema } from "@/helper"
import { CertificateInspectionParams, CertificateInspectionRes } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

interface RegistrationCetificateFormProps {
  defaultValues?: CertificateInspectionRes
  onSubmit: (params: CertificateInspectionParams) => void
  view?: "modal" | "page"
}

export const RegistrationCetificateForm = ({
  onSubmit,
  defaultValues,
  view = "modal",
}: RegistrationCetificateFormProps) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    control,
  } = useForm<CertificateInspectionParams>({
    resolver: yupResolver(inspectionCertificateSchema),
    mode: "all",
    defaultValues: {
      back_inspection_certificate_image_url: defaultValues?.back_inspection_certificate_image?.id,
      front_inspection_certificate_image_url: defaultValues?.front_inspection_certificate_image?.id,
      date_of_expiry: defaultValues?.date_of_expiry,
      identity_number: defaultValues?.identity_number,
    },
  })

  const [frontImage, setFrontImage] = useState<string>()
  const [backImage, setBackImage] = useState<string>()

  const onSubmitHandler = (data: CertificateInspectionParams) => {
    onSubmit &&
      onSubmit({
        ...data,
        back_inspection_certificate_image_url: Number(data.back_inspection_certificate_image_url),
        front_inspection_certificate_image_url: Number(data.front_inspection_certificate_image_url),
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {certificatesRegistrationFormFields.map((field) => (
        <div key={field.name} className="form-item">
          <label htmlFor={field.name} className="form-label">
            {field.label}{" "}
            {field?.isRequired ? <span className="form-label-warning">(*)</span> : null}
          </label>

          {field.type === "file" ? (
            <Controller
              control={control}
              name={field.name}
              render={({ field: { onChange } }) => (
                <div className="driver-bio__form-input">
                  <InputImage
                    id={field.name}
                    image={
                      field.name === "front_inspection_certificate_image_url"
                        ? frontImage || defaultValues?.front_inspection_certificate_image?.url
                        : backImage || defaultValues?.back_inspection_certificate_image?.url
                    }
                    isError={!!errors?.[field.name]?.message}
                    getImage={(img) => {
                      onChange(img.attachment_id)
                      field.name === "front_inspection_certificate_image_url"
                        ? setFrontImage(img.attachment_url)
                        : setBackImage(img.attachment_url)
                    }}
                  />
                </div>
              )}
              rules={{ required: true }}
            />
          ) : null}

          {field.type === "date" ? (
            <Controller
              control={control}
              name={field.name}
              render={({ field: { onChange, onBlur } }) => (
                <div
                  onBlur={onBlur}
                  className={`form-date form-date-reverse ${
                    errors?.[field.name] ? "form-date-err" : ""
                  }`}
                >
                  <InputDate
                    value={
                      field.name === "date_of_expiry" ? getValues("date_of_expiry") : undefined
                    }
                    placeholder="Ngày hết hạn"
                    onChange={(val) => onChange(val)}
                    disablePassDay={false}
                  />
                </div>
              )}
              rules={{ required: true }}
            />
          ) : null}

          {field.type === "text" ? (
            <input
              className={`form-input ${errors?.[field.name] ? "form-input-err" : ""}`}
              id={field.name}
              type="text"
              defaultValue={
                field.name === "identity_number" ? defaultValues?.identity_number : undefined
              }
              placeholder={field.label}
              {...register(field.name, {
                required: true,
              })}
            />
          ) : null}

          {errors[field.name] || dirtyFields[field.name] ? (
            <p className="form-err-msg">{errors[field.name]?.message}</p>
          ) : null}
        </div>
      ))}

      <ButtonSubmit
        className="form-upload-btn"
        title="Tiếp tục"
        view={view}
        onClick={() => handleSubmit(onSubmitHandler)}
      />
    </form>
  )
}
