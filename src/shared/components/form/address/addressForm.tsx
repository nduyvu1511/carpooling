import { userFormAddressSchema } from "@/core/schema"
import { userInfoAddressData } from "@/helper"
import { useAddress } from "@/hooks"
import { OptionModel, UserInfoFormAddress, UserInfoFormAddressOptional } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"

interface AddressFormProps {
  defaultValues?: UserInfoFormAddressOptional
  onSubmit?: (params: UserInfoFormAddress) => void
}

const AddressForm = ({ defaultValues, onSubmit }: AddressFormProps) => {
  const { provinceOptions, districtOptions, wardOptions, getDistricts, getWards } = useAddress(
    Number(defaultValues?.province_id?.value),
    Number(defaultValues?.district_id?.value)
  )
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    getValues,
    setValue,
    setError,
  } = useForm<UserInfoFormAddress>({
    resolver: yupResolver(userFormAddressSchema),
    mode: "all",
    defaultValues,
  })

  const onSubmitHandler = (data: UserInfoFormAddress) => {
    onSubmit && onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {userInfoAddressData.map(({ name, placeholder, type }) => (
        <div key={name} className="form-item">
          <label htmlFor={name} className="form-label">
            {placeholder} <span className="form-label-warning">(*)</span>
          </label>

          {type === "select" ? (
            <div className="form-select">
              <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur } }) => (
                  <Select
                    maxMenuHeight={name === "ward_id" ? 200 : 300}
                    defaultValue={defaultValues?.[name]}
                    placeholder={placeholder}
                    options={
                      name === "province_id"
                        ? provinceOptions
                        : name === "ward_id"
                        ? wardOptions
                        : name === "district_id"
                        ? districtOptions
                        : undefined
                    }
                    onChange={(val) => {
                      onChange(val)
                      if (name === "province_id") {
                        if (getValues("district_id.value")) {
                          setValue("district_id", null as any)
                          setError("district_id", {})
                        }
                        if (getValues("ward_id.value")) {
                          setValue("ward_id", null as any)
                          setError("ward_id", {})
                        }

                        getDistricts(Number((val as OptionModel)?.value))
                      }

                      if (name === "district_id") {
                        getWards(Number((val as OptionModel)?.value))
                        if (getValues("ward_id.value")) {
                          setValue("ward_id", null as any)
                          setError("ward_id", {})
                        }
                      }
                    }}
                    value={getValues(name)}
                    onBlur={onBlur}
                    id={name}
                    className={`${errors?.[name] ? "form-select-error" : ""}`}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
          ) : null}

          {type === "text" ? (
            <input
              className={`form-input ${errors?.[name] ? "form-input-err" : ""}`}
              id={name}
              type="text"
              defaultValue={defaultValues?.street}
              placeholder={placeholder}
              {...register(name, {
                required: true,
              })}
            />
          ) : null}

          {errors[name] ? <p className="form-err-msg">Vui lòng nhập trường này</p> : null}
        </div>
      ))}

      <div className="mt-[40px] absolute bottom-0 left-0 right-0 p-12 bg-white-color">
        <button className={`btn-primary mx-auto ${isValid ? "" : "btn-disabled-clickable"}`}>
          Tiếp theo
        </button>
      </div>
    </form>
  )
}

export { AddressForm }
