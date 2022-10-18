import { ButtonSubmit, InputDate, InputImage } from "@/components"
import { insuranceShema, vehicleInsuranceForm } from "@/helper"
import {
  ImageRes,
  VehicleInsuranceParams,
  VehicleInsuranceRes,
  VehicleInsuranceSchema,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"

interface VehicleInsuranceFormProps {
  defaultValues?: VehicleInsuranceRes
  onSubmit: (params: VehicleInsuranceParams) => void
  view?: "modal" | "page"
}

export const VehicleInsuranceForm = ({
  onSubmit,
  defaultValues,
  view = "modal",
}: VehicleInsuranceFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    register,
  } = useForm<VehicleInsuranceSchema>({
    resolver: yupResolver(insuranceShema),
    mode: "all",
    defaultValues: {
      back_insurance_image_url: defaultValues?.back_insurance_image_url?.id
        ? defaultValues?.back_insurance_image_url
        : undefined,
      date_of_expiry: defaultValues?.date_of_expiry,
      date_of_issue: defaultValues?.date_of_issue,
      identity_number: defaultValues?.identity_number,
      front_insurance_image_url: defaultValues?.front_insurance_image_url?.id
        ? defaultValues?.front_insurance_image_url
        : undefined,
    },
  })

  const onSubmitHandler = (data: VehicleInsuranceSchema) => {
    onSubmit?.({
      ...data,
      back_insurance_image_url: Number(data.back_insurance_image_url.id),
      front_insurance_image_url: Number(data.front_insurance_image_url.id),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {vehicleInsuranceForm.map((field) => (
        <div key={field.name} className="form-item">
          <label className="form-label">
            {field.placeholder}{" "}
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
                    isError={!!errors?.[field.name]}
                    image={(getValues(field.name) as ImageRes)?.url || ""}
                    getImage={(file) => {
                      onChange({ id: file.attachment_id, url: file.attachment_url } as ImageRes)
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
                      field.name === "date_of_expiry"
                        ? getValues("date_of_expiry")
                        : field.name === "date_of_issue"
                        ? getValues("date_of_issue")
                        : undefined
                    }
                    placeholder={field.placeholder}
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
              placeholder={field.placeholder}
              {...register(field.name, {
                required: true,
              })}
              defaultValue={
                field.name === "identity_number" ? defaultValues?.identity_number : undefined
              }
            />
          ) : null}

          {errors[field.name] ? (
            <p className="form-err-msg">
              {(errors[field.name] as any)?.message || "Vui lòng nhập trường này"}
            </p>
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
