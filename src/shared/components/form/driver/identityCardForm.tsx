import { ButtonSubmit, InputImage } from "@/components"
import { identityCardSchema } from "@/core/schema"
import { idCardFormFields } from "@/helper"
import { useAddress } from "@/hooks"
import { IdCardName, IdCardParams, IdentityCardRes, OptionModel } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"

interface IdentityCardFormProps {
  onSubmit: (params: IdCardParams) => void
  defaultValues?: IdentityCardRes
  view?: "modal" | "page"
}

export const IdentityCardForm = ({
  onSubmit,
  defaultValues,
  view = "modal",
}: IdentityCardFormProps) => {
  const { provinceOptions } = useAddress()
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    control,
    getValues,
  } = useForm<IdCardParams>({
    resolver: yupResolver(identityCardSchema),
    mode: "all",
    defaultValues: {
      back_identity_card_image_url: defaultValues?.back_identity_card_image_url?.id || undefined,
      front_identity_card_image_url: defaultValues?.front_identity_card_image_url?.id || undefined,
      date_of_expiry: defaultValues?.date_of_expiry,
      date_of_issue: defaultValues?.date_of_issue,
      identity_number: defaultValues?.identity_number,
      place_of_issue: defaultValues?.place_of_issue,
      address: defaultValues?.address,
    },
  })

  const [frontImage, setFrontImage] = useState<string>()
  const [backImage, setBackImage] = useState<string>()

  const onSubmitHandler = (data: IdCardParams) => {
    onSubmit &&
      onSubmit({
        ...data,
        back_identity_card_image_url: Number(data.back_identity_card_image_url),
        front_identity_card_image_url: Number(data.front_identity_card_image_url),
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
      className={`${view === "modal" ? "pb-[64px]" : ""}`}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
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
                    image={
                      (field.name === "front_identity_card_image_url"
                        ? frontImage || defaultValues?.front_identity_card_image_url?.url
                        : backImage || defaultValues?.back_identity_card_image_url?.url) || ""
                    }
                    isError={!!errors?.[field.name]?.message}
                    getImage={(file) => {
                      field.name === "front_identity_card_image_url" &&
                        setFrontImage(file.attachment_url)
                      field.name === "back_identity_card_image_url" &&
                        setBackImage(file.attachment_url)
                      onChange(file.attachment_id)
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
            <div className="form-select">
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, onBlur } }) => (
                  <Select
                    defaultValue={
                      field.name === "place_of_issue" && defaultValues?.place_of_issue
                        ? {
                            value: defaultValues?.place_of_issue,
                            label: defaultValues?.place_of_issue,
                          }
                        : undefined
                    }
                    className={`${errors?.[field.name] ? "form-select-error" : ""}`}
                    placeholder={field.placeholder}
                    onChange={(val) => {
                      onChange(field.name === "place_of_issue" ? val?.label : val?.value)
                    }}
                    onBlur={onBlur}
                    id={field.name}
                    options={getOptionsSelect(field.name) as []}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
          ) : null}

          {field.type === "date" ? (
            <Controller
              control={control}
              name={field.name}
              render={({ field: { onChange, onBlur } }) => (
                <input
                  className={`form-input ${errors?.[field.name] ? "form-input-err" : ""}`}
                  defaultValue={getValues([field.name]) + ""}
                  id={field.name}
                  type="date"
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e.target.value)
                  }}
                />
              )}
              rules={{ required: true }}
            />
          ) : null}

          {errors[field.name] || dirtyFields[field.name] ? (
            <p className="form-err-msg">{errors[field.name]?.message}</p>
          ) : null}
        </div>
      ))}

      <div className="flex-center fixed bottom-[0] left-[0] right-[0] content-container">
        <ButtonSubmit
          className="form-upload-btn"
          view={view}
          isError={!isValid}
          title="Tiếp tục"
          onClick={() => handleSubmit(onSubmitHandler)}
        />
      </div>
    </form>
  )
}
