import {
  AddressForm,
  ButtonSubmit,
  IdentityCardForm,
  InputDate,
  InputGender,
  InputImage,
  Modal,
} from "@/components"
import {
  EMAIL_REGEX,
  isObjectHasValue,
  toggleBodyOverflow,
  userFormSchema,
  userInfoFormfields,
} from "@/helper"
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
      avatar_attachment_id: Number(defaultValues?.avatar_url?.image_id) || undefined,
      date_of_birth: defaultValues?.date_of_birth || undefined,
      gender: defaultValues?.gender || undefined,
      name: defaultValues?.partner_name || undefined,
      description: defaultValues?.description || "",
      country_id: defaultValues?.country_id.country_id
        ? {
            label: defaultValues?.country_id.country_name,
            value: defaultValues?.country_id.country_id,
          }
        : undefined,
      district_id: defaultValues?.district_id?.district_id
        ? {
            label: defaultValues?.district_id.district_name,
            value: defaultValues?.district_id.district_id,
          }
        : undefined,
      ward_id: defaultValues?.ward_id?.ward_id
        ? {
            label: defaultValues?.ward_id.ward_name,
            value: defaultValues?.ward_id.ward_id,
          }
        : undefined,
      province_id: defaultValues?.province_id?.province_id
        ? {
            label: defaultValues?.province_id.province_name,
            value: defaultValues?.province_id.province_id,
          }
        : undefined,
      street: defaultValues?.street || undefined,
      identity_number: defaultValues?.identity_card_id?.identity_number || undefined,
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
      avatar_attachment_id: +params.avatar_attachment_id,
      date_of_birth: params.date_of_birth,
      gender: params.gender,
      name: params.name,
      description: params?.description,
      email: params?.email || "",
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
      <form className="user-info-form" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="user-info-form-content">
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
                  maxLength={300}
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
                      defaultValue={
                        field.name === "name"
                          ? defaultValues?.partner_name
                          : field.name === "email" && EMAIL_REGEX.test(defaultValues?.email || "")
                          ? defaultValues?.email
                          : undefined
                      }
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
                </div>
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
                        value={getValues("date_of_birth")}
                        placeholder="Ngày sinh"
                        onChange={(val) => onChange(val)}
                        disablePassDay={false}
                      />
                    </div>
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

          {view === "page" ? <div className="mb-[64px] md:mb-[40px]"></div> : null}
        </div>

        <ButtonSubmit
          parentClassName={`${btnClassName} user-info-form-btn`}
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
        key="address-modal"
        show={showAddressModal}
        onClose={() => toggleShowAddressModal(false)}
        heading="Chọn địa chỉ cụ thể"
      >
        <AddressForm
          className="flex-1"
          defaultValues={{
            district_id: getValues("district_id.value") ? getValues("district_id") : undefined,
            province_id: getValues("province_id.value") ? getValues("province_id") : undefined,
            ward_id: getValues("ward_id.value") ? getValues("ward_id") : undefined,
            street: getValues("street") || undefined,
          }}
          onSubmit={(data) => {
            setValue("district_id", data.district_id)
            setValue("ward_id", data.ward_id)
            setValue("province_id", data.province_id)
            setValue("street", data.street)
            toggleShowAddressModal(false)
          }}
        />
      </Modal>

      <Modal
        key="identity-modal"
        show={showIdentityCardForm}
        onClose={() => toggleShowIdentityCardForm(false)}
        heading="Điền thông tin CCCD"
      >
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
      </Modal>
    </>
  )
}
