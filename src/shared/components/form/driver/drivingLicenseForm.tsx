import { ButtonSubmit, InputDate, InputImage } from "@/components"
import { drivingClassList, drivingLicenseFormFields, drivingLicenseSchema } from "@/helper"
import { DrivingLicenseFormParams, DrivingLicenseRes } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
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
    formState: { errors, dirtyFields, isValid },
    control,
  } = useForm<DrivingLicenseFormParams>({
    resolver: yupResolver(drivingLicenseSchema),
    mode: "all",
    defaultValues: {
      back_license_image_url: defaultValues?.back_license_image_url?.id,
      front_license_image_url: defaultValues?.front_license_image_url?.id,
      date_of_expiry: defaultValues?.date_of_expiry,
      date_of_issue: defaultValues?.date_of_issue,
      identity_number: defaultValues?.identity_number,
      license_class: defaultValues?.license_class,
    },
  })

  const [frontImage, setFrontImage] = useState<string>()
  const [backImage, setBackImage] = useState<string>()

  const onSubmitHandler = (data: DrivingLicenseFormParams) => {
    onSubmit &&
      onSubmit({
        ...data,
        front_license_image_url: Number(data.front_license_image_url),
        back_license_image_url: Number(data.back_license_image_url),
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
                    image={
                      field.name === "front_license_image_url"
                        ? frontImage || defaultValues?.front_license_image_url?.url
                        : backImage || defaultValues?.back_license_image_url?.url
                    }
                    isError={!!errors?.[field.name]?.message}
                    getImage={(img) => {
                      onChange(img.attachment_id)
                      field.name === "front_license_image_url"
                        ? setFrontImage(img.attachment_url)
                        : setBackImage(img.attachment_url)
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
                    onChange={(val) => val?.value && onChange(val.value + "")}
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

export default DrivingLicenseForm
