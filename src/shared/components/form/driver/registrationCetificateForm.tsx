import { ButtonSubmit, InputDate, InputImage } from "@/components"
import { certificatesRegistrationFormFields, inspectionCertificateSchema } from "@/helper"
import {
  CertificateInspectionParams,
  CertificateInspectionRes,
  CertificateInspectionSchema,
  ImageRes,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
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
    formState: { errors },
    control,
  } = useForm<CertificateInspectionSchema>({
    resolver: yupResolver(inspectionCertificateSchema),
    mode: "all",
    defaultValues: {
      back_inspection_certificate_image_url: defaultValues?.back_inspection_certificate_image?.id
        ? defaultValues?.back_inspection_certificate_image
        : undefined,
      front_inspection_certificate_image_url: defaultValues?.front_inspection_certificate_image?.id
        ? defaultValues?.front_inspection_certificate_image
        : undefined,
      date_of_expiry: defaultValues?.date_of_expiry,
      identity_number: defaultValues?.identity_number,
    },
  })

  const onSubmitHandler = (data: CertificateInspectionSchema) => {
    onSubmit?.({
      ...data,
      back_inspection_certificate_image_url: Number(data.back_inspection_certificate_image_url.id),
      front_inspection_certificate_image_url: Number(
        data.front_inspection_certificate_image_url.id
      ),
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
              render={({ field: { onChange, onBlur } }) => (
                <div className="driver-bio__form-input">
                  <InputImage
                    onBlur={onBlur}
                    id={field.name}
                    image={(getValues(field.name) as ImageRes)?.url || ""}
                    isError={!!errors?.[field.name]}
                    getImage={(img) =>
                      onChange({ id: img.attachment_id, url: img.attachment_url } as ImageRes)
                    }
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
                    placeholder="Ngày hết hạn"
                    onChange={(val) => onChange(val)}
                    disablePassDay={false}
                    value={
                      field.name === "date_of_expiry" ? getValues("date_of_expiry") : undefined
                    }
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

          {errors[field.name] ? (
            <p className="form-err-msg">{(errors[field.name] as any)?.message}</p>
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
