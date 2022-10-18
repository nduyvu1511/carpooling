import { ButtonSubmit, InputDate, InputImage } from "@/components"
import { idCardFormFields, identityCardSchema } from "@/helper"
import { useAddress } from "@/hooks"
import {
  IdCardName,
  IdCardParams,
  IdCardSchema,
  IdentityCardRes,
  ImageRes,
  OptionModel,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"

interface IdentityCardFormProps {
  onSubmit: (params: IdCardParams) => void
  defaultValues?: IdentityCardRes
  view?: "modal" | "page"
}

export const IdentityCardForm = ({ onSubmit, defaultValues, view }: IdentityCardFormProps) => {
  const { provinceOptions } = useAddress()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    getValues,
  } = useForm<IdCardSchema>({
    resolver: yupResolver(identityCardSchema),
    mode: "all",
    defaultValues: {
      back_identity_card_image_url: defaultValues?.back_identity_card_image_url?.id
        ? defaultValues.back_identity_card_image_url
        : undefined,
      front_identity_card_image_url: defaultValues?.front_identity_card_image_url?.id
        ? defaultValues.front_identity_card_image_url
        : undefined,
      date_of_expiry: defaultValues?.date_of_expiry,
      date_of_issue: defaultValues?.date_of_issue,
      identity_number: defaultValues?.identity_number,
      place_of_issue: defaultValues?.place_of_issue?.value
        ? defaultValues.place_of_issue
        : undefined,
      address: defaultValues?.address,
    },
  })

  const onSubmitHandler = (data: IdCardSchema) => {
    onSubmit?.({
      ...data,
      back_identity_card_image_url: Number(data.back_identity_card_image_url.id),
      front_identity_card_image_url: Number(data.front_identity_card_image_url.id),
      date_of_issue: data.date_of_issue,
      place_of_issue: Number(data.place_of_issue.value),
    })
  }

  const getOptionsSelect = (name: IdCardName): OptionModel[] => {
    if (name === "place_of_issue") {
      return provinceOptions
    }
    return []
  }

  return (
    <form
      className={`${view === "modal" ? "modal-form" : ""}`}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className={`${view === "modal" ? "modal-form-content" : ""}`}>
        {idCardFormFields.map((field) => (
          <div key={field.name} className="form-item">
            <label htmlFor={field.name} className="form-label">
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
                      image={(getValues(field.name) as ImageRes)?.url || ""}
                      isError={!!errors?.[field.name]}
                      getImage={(file) => {
                        onChange({ id: file.attachment_id, url: file.attachment_url })
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
              />
            ) : null}

            {field.type === "select" ? (
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, onBlur } }) => (
                  <div onBlur={onBlur} className="form-select">
                    <Select
                      value={getValues(field.name) || undefined}
                      className={`${errors?.[field.name] ? "form-select-error" : ""}`}
                      placeholder={field.placeholder}
                      onChange={(val) => {
                        onChange(val)
                      }}
                      onBlur={onBlur}
                      id={field.name}
                      options={getOptionsSelect(field.name) as []}
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
                    className={`form-date ${errors?.[field.name] ? "form-date-err" : ""}`}
                  >
                    <InputDate
                      value={getValues([field.name]) + ""}
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
      </div>

      <ButtonSubmit
        parentClassName={`flex-center ${view === "modal" ? "modal-form-btn" : ""}`}
        className="form-upload-btn"
        view={view}
        isError={!isValid}
        title="Tiếp tục"
        onClick={() => handleSubmit(onSubmitHandler)}
      />
    </form>
  )
}
