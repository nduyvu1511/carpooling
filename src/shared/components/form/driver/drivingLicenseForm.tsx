import { ButtonSubmit, InputDate, InputImage } from "@/components"
import { drivingClassList, drivingLicenseFormFields, drivingLicenseSchema } from "@/helper"
import {
  DrivingLicenseFormParams,
  DrivingLicenseFormSchema,
  DrivingLicenseRes,
  ImageRes,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"

interface DrivingLicenseFormProps {
  defaultValues?: DrivingLicenseRes
  onSubmit: (params: DrivingLicenseFormParams) => void
  view?: "page" | "modal"
}

const DrivingLicenseForm = ({
  onSubmit,
  defaultValues,
  view = "modal",
}: DrivingLicenseFormProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    control,
  } = useForm<DrivingLicenseFormSchema>({
    resolver: yupResolver(drivingLicenseSchema),
    mode: "all",
    defaultValues: {
      back_license_image_url: defaultValues?.back_license_image_url?.id
        ? defaultValues.back_license_image_url
        : undefined,
      front_license_image_url: defaultValues?.front_license_image_url?.id
        ? defaultValues.front_license_image_url
        : undefined,
      date_of_expiry: defaultValues?.date_of_expiry,
      date_of_issue: defaultValues?.date_of_issue,
      identity_number: defaultValues?.identity_number,
      license_class: defaultValues?.license_class,
    },
  })

  const onSubmitHandler = (data: DrivingLicenseFormSchema) => {
    onSubmit?.({
      ...data,
      front_license_image_url: Number(data.front_license_image_url.id),
      back_license_image_url: Number(data.back_license_image_url.id),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {drivingLicenseFormFields.map((field) => (
        <div key={field.name} className="form-item">
          <label htmlFor={field.name} className="form-label">
            {field.placeholder}{" "}
            {field?.isRequired ? <span className="form-label-warning">(*)</span> : null}
          </label>

          {field.type === "file" ? (
            <Controller
              control={control}
              name={field.name}
              render={({ field: { onChange, onBlur } }) => (
                <div onBlur={onBlur} className="driver-bio__form-input">
                  <InputImage
                    onBlur={onBlur}
                    id={field.name}
                    image={(getValues(field.name) as ImageRes)?.url}
                    isError={!!errors?.[field.name]}
                    getImage={(img) => {
                      onChange({ id: img.attachment_id, url: img.attachment_url } as ImageRes)
                    }}
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

          {field.type === "select" ? (
            <Controller
              control={control}
              name={field.name}
              render={({ field: { onChange, onBlur } }) => (
                <div onBlur={onBlur} className="form-select">
                  <Select
                    defaultValue={
                      field.name === "license_class"
                        ? drivingClassList.find(
                            (item) => item.value === defaultValues?.license_class + ""
                          )
                        : undefined
                    }
                    className={`${errors?.[field.name] ? "form-select-error" : ""}`}
                    placeholder={field.placeholder}
                    onChange={(val) =>
                      val?.value &&
                      onChange(field.name === "license_class" ? val?.value.toString() : val)
                    }
                    options={field.name === "license_class" ? drivingClassList : []}
                    onBlur={onBlur}
                    id={field.name}
                    isSearchable={false}
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
                    value={getValues(field.name) + ""}
                    placeholder={field.placeholder}
                    onChange={(val) => onChange(val)}
                    disablePassDay={false}
                  />
                </div>
              )}
              rules={{ required: true }}
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

export default DrivingLicenseForm
