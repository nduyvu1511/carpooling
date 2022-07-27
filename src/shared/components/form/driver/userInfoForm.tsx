import { ButtonSubmit, InputImage } from "@/components"
import { InputGender } from "@/components/inputs/inputGender"
import { userFormSchema } from "@/core/schema"
import { genderList, userInfoFormfields } from "@/helper"
import { UserInfo, UserInfoFormParams } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"

interface UserInfoProps {
  defaultValues?: UserInfo
  onSubmit?: (val: UserInfoFormParams) => void
  view?: "modal" | "page"
  showAvatar?: boolean
  mode?: "create" | "update"
}

export const UserInfoForm = ({
  defaultValues,
  onSubmit,
  view = "modal",
  showAvatar = true,
  mode = "create",
}: UserInfoProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid, isDirty },
    control,
    getValues,
  } = useForm<UserInfoFormParams>({
    resolver: yupResolver(userFormSchema),
    mode: "all",
    defaultValues: {
      avatar_attachment_id: Number(defaultValues?.avatar_url?.image_id),
      date_of_birth: defaultValues?.date_of_birth,
      gender: defaultValues?.gender,
      name: defaultValues?.partner_name,
      description: defaultValues?.description || "",
    },
  })
  const [image, setImage] = useState<string>()

  const onSubmitHandler = (data: UserInfoFormParams) => {
    onSubmit && onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {userInfoFormfields.map((field) => (
        <div key={field.name} className="form-item">
          {field.name === "avatar_attachment_id" ? (
            showAvatar ? (
              <label htmlFor={field.name} className="form-label">
                {field.placeholder}{" "}
                {field?.isRequired ? <span className="form-label-warning">(*)</span> : null}
              </label>
            ) : null
          ) : (
            <label htmlFor={field.name} className="form-label">
              {field.placeholder}{" "}
              {field?.isRequired ? <span className="form-label-warning">(*)</span> : null}
            </label>
          )}

          {showAvatar ? (
            field.type === "file" ? (
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange } }) => (
                  <div className="driver-bio__form-input">
                    <InputImage
                      type="avatar"
                      id={field.name}
                      image={image || defaultValues?.avatar_url?.image_url || ""}
                      isError={!!errors?.[field.name]?.message}
                      getImage={(img) => {
                        onChange(img.attachment_id)
                        setImage(img.attachment_url)
                      }}
                    />
                  </div>
                )}
                rules={{ required: true }}
              />
            ) : null
          ) : null}

          {field.type === "textarea" ? (
            <textarea
              {...register(field.name, {
                required: true,
              })}
              id={field.name}
              placeholder={field.placeholder}
              className={`form-textarea ${errors?.[field.name] ? "form-input-err" : ""}`}
              name={field.name}
              rows={2}
              defaultValue={defaultValues?.description ? defaultValues.description : ""}
            ></textarea>
          ) : null}

          {field.type === "text" ? (
            <input
              className={`form-input ${errors?.[field.name] ? "form-input-err" : ""}`}
              id={field.name}
              type="text"
              defaultValue={defaultValues?.partner_name}
              placeholder={field.placeholder}
              {...register(field.name, {
                required: true,
              })}
            />
          ) : null}

          {field.type === "radio" ? (
            <div className="">
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, onBlur } }) => (
                  <InputGender
                    value={getValues("gender")}
                    isError={!!errors?.[field.name]}
                    onChange={(gender) => {
                      onChange(gender)
                    }}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
          ) : null}

          {field.type === "select" ? (
            <div className="form-select">
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, onBlur } }) => (
                  <Select
                    defaultValue={
                      defaultValues?.gender
                        ? defaultValues.gender === "male"
                          ? { label: "Nam", value: "male" }
                          : { label: "Nữ", value: "female" }
                        : undefined
                    }
                    className={`${errors?.[field.name] ? "form-select-error" : ""}`}
                    placeholder={field.placeholder}
                    options={genderList}
                    onChange={(val) => val?.value && onChange(val.value)}
                    onBlur={onBlur}
                    id={field.name}
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
                  defaultValue={defaultValues?.date_of_birth}
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

      <div className="mb-[40px]"></div>

      <ButtonSubmit
        showMargin={false}
        className="form-upload-btn"
        title="Tiếp tục"
        view={view}
        disabled={mode === "create" ? !isValid : !isDirty && isValid}
        onClick={() => handleSubmit(onSubmitHandler)}
      />
    </form>
  )
}
