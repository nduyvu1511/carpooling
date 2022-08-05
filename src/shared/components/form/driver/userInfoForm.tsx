import {
  AddressForm,
  ButtonSubmit,
  IdentityCardForm,
  InputGender,
  InputImage,
  Modal,
} from "@/components"
import { userFormSchema } from "@/core/schema"
import { genderList, isObjectHasValue, toggleBodyOverflow, userInfoFormfields } from "@/helper"
import { useBackRouter, useIdentityCard } from "@/hooks"
import {
  CarAccountType,
  IdCardParams,
  IdentityCardRes,
  UserInfo,
  UserInfoFormParams,
  UserInfoFormSubmit,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, FieldError, useForm } from "react-hook-form"
import Select from "react-select"

interface UserInfoProps {
  defaultValues?: UserInfo
  onSubmit?: (val: UserInfoFormSubmit) => void
  view?: "modal" | "page"
  showAvatar?: boolean
  mode?: "create" | "update"
  btnClassName?: string
  type?: CarAccountType
  onSubmitIdentityCard?: (params: IdentityCardRes) => void
  btnLabel?: string
}

export const UserInfoForm = ({
  defaultValues,
  onSubmit,
  view = "modal",
  showAvatar = true,
  mode = "create",
  btnClassName = "",
  type,
  onSubmitIdentityCard,
  btnLabel = "Tiếp tục",
}: UserInfoProps) => {
  const { createIdentityCard, updateIdentityCard } = useIdentityCard(false)
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
    control,
    getValues,
    setValue,
  } = useForm<UserInfoFormParams>({
    resolver: yupResolver(userFormSchema),
    mode: "all",
    defaultValues: {
      avatar_attachment_id: Number(defaultValues?.avatar_url?.image_id),
      date_of_birth: defaultValues?.date_of_birth,
      gender: defaultValues?.gender,
      name: defaultValues?.partner_name,
      description: defaultValues?.description || "",
      country_id: {
        label: defaultValues?.country_id.country_name,
        value: defaultValues?.country_id.country_id,
      },
      district_id: {
        label: defaultValues?.district_id.district_name,
        value: defaultValues?.district_id.district_id,
      },
      ward_id: {
        label: defaultValues?.ward_id.ward_name,
        value: defaultValues?.ward_id.ward_id,
      },
      province_id: {
        label: defaultValues?.province_id.province_name,
        value: defaultValues?.province_id.province_id,
      },
      street: defaultValues?.street,
      identity_number: defaultValues?.identity_card_id?.identity_number,
    },
  })
  const [image, setImage] = useState<string>()
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false)
  const [showIdentityCardForm, setShowIdentityCardForm] = useState<boolean>(false)

  useBackRouter({
    cb: () => {
      toggleShowAddressModal(false)
    },
  })

  const onSubmitHandler = (params: UserInfoFormParams) => {
    const { district_id, ward_id, province_id, street } = params
    const data: UserInfoFormSubmit = {
      avatar_attachment_id: params.avatar_attachment_id,
      date_of_birth: params.date_of_birth,
      gender: params.gender,
      name: params.name,
      description: params?.description,
    }
    if (street) {
      data.street = street
    }
    if (ward_id?.value) {
      data.ward_id = +ward_id.value
    }
    if (province_id?.value) {
      data.province_id = +province_id.value
    }
    if (district_id?.value) {
      data.district_id = +district_id.value
      data.country_id = 241
    }

    onSubmit && onSubmit(data)
  }

  const toggleShowAddressModal = (status: boolean) => {
    setShowAddressModal(status)
    if (status) {
      view === "page" && toggleBodyOverflow("hidden")
    } else {
      view === "page" && toggleBodyOverflow("unset")
    }
  }

  const toggleShowIdentityCardForm = (status: boolean) => {
    setShowIdentityCardForm(status)
    if (status) {
      view === "page" && toggleBodyOverflow("hidden")
    } else {
      view === "page" && toggleBodyOverflow("unset")
    }
  }

  const handleAddIdentityCard = (params: IdCardParams) => {
    if (defaultValues?.identity_card_id?.identity_number) {
      updateIdentityCard({
        params: { ...params, identity_card_id: defaultValues.identity_card_id.identity_card_id },
        onSuccess: (res) => {
          onSubmitIdentityCard?.(res)
          toggleShowIdentityCardForm(false)
        },
      })
    } else {
      createIdentityCard({
        params,
        onSuccess: (res) => {
          onSubmitIdentityCard?.(res)
          toggleShowIdentityCardForm(false)
        },
      })
    }
  }

  return (
    <>
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
            ) : field.name === "identity_number" ? (
              type === "customer" ? (
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
                        isError={!!errors?.[field.name]}
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
              <>
                {field.name === "identity_number" ? (
                  type === "customer" ? (
                    <input
                      className={`form-input ${errors?.[field.name] ? "form-input-err" : ""}`}
                      id={field.name}
                      onClick={() => toggleShowIdentityCardForm(true)}
                      type="text"
                      readOnly={field.name === "identity_number"}
                      value={getValues("identity_number") || undefined}
                      placeholder={field.placeholder}
                      {...register(field.name, {
                        required: true,
                      })}
                    />
                  ) : null
                ) : (
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
                )}
              </>
            ) : null}

            {field.type === "radio" ? (
              <div className="form-item">
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: { onChange, onBlur } }) => (
                    <InputGender
                      value={getValues("gender")}
                      onChange={(gender) => {
                        onChange(gender)
                      }}
                    />
                  )}
                  rules={{ required: true }}
                />

                {errors?.[field.name] ? (
                  <p className="form-err-msg">Vui lòng nhập giới tính</p>
                ) : null}
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

            {field.type === "address" ? (
              <div className="form-item">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Địa chỉ cụ thể"
                  readOnly
                  value={
                    getValues("province_id.value")
                      ? `${getValues("street") || ""}, ${getValues("ward_id.label") || ""}, ${
                          getValues("district_id.label") || ""
                        }, ${getValues("province_id.label") || ""}`
                      : undefined
                  }
                  onClick={() => toggleShowAddressModal(true)}
                />
              </div>
            ) : null}

            {errors[field.name] || dirtyFields[field.name] ? (
              <p className="form-err-msg">{(errors[field.name] as FieldError)?.message}</p>
            ) : null}
          </div>
        ))}

        {view === "page" ? <div className="mb-[40px]"></div> : null}

        <ButtonSubmit
          parentClassName={btnClassName}
          showMargin={false}
          className="form-upload-btn"
          title={btnLabel}
          view={view}
          disabled={
            mode === "create" ? isObjectHasValue(errors) : !isDirty && isObjectHasValue(errors)
          }
          onClick={() => handleSubmit(onSubmitHandler)}
        />
      </form>

      <Modal
        show={showAddressModal}
        onClose={() => toggleShowAddressModal(false)}
        heading="Chọn địa chỉ cụ thể"
      >
        <div className="p-12 md:p-24">
          <AddressForm
            defaultValues={{
              district_id: getValues("district_id.value") ? getValues("district_id") : undefined,
              province_id: getValues("province_id.value") ? getValues("province_id") : undefined,
              ward_id: getValues("ward_id.value") ? getValues("ward_id") : undefined,
              street: getValues("street") ? getValues("street") : undefined,
            }}
            onSubmit={(data) => {
              setValue("district_id", data.district_id)
              setValue("ward_id", data.ward_id)
              setValue("province_id", data.province_id)
              setValue("street", data.street)
              toggleShowAddressModal(false)
            }}
          />
        </div>
      </Modal>

      <Modal
        show={showIdentityCardForm}
        onClose={() => toggleShowIdentityCardForm(false)}
        heading="Điền thông tin CCCD"
      >
        <div className="p-12 md:p-24">
          <IdentityCardForm
            defaultValues={
              defaultValues?.identity_card_id?.identity_number
                ? { ...defaultValues?.identity_card_id }
                : undefined
            }
            onSubmit={(data) => {
              handleAddIdentityCard(data)
              setValue("identity_number", data.identity_number)
            }}
            view="modal"
          />
        </div>
      </Modal>
    </>
  )
}
