import { ButtonSubmit, InputImage, InputRadio } from "@/components"
import { vehicleDetailFormFields, vehicleDetailSchema } from "@/helper"
import { useCompoundingForm, useFetchCarBrand } from "@/hooks"
import {
  ImageRes,
  RegistrationCertificateRes,
  VehicleDetailFormParams,
  VehicleDetailFormSchema,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"

interface VehicleFormProps {
  defaultValues?: RegistrationCertificateRes
  onSubmit: (params: VehicleDetailFormParams) => void
  view?: "modal" | "page"
}

export const VehicleForm = ({ onSubmit, defaultValues, view = "modal" }: VehicleFormProps) => {
  const { vehicleTypeOptions } = useCompoundingForm()
  const { data: vehicleBrandList } = useFetchCarBrand()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    control,
  } = useForm<VehicleDetailFormSchema>({
    resolver: yupResolver(vehicleDetailSchema),
    mode: "all",
    defaultValues: {
      back_car_image_url: defaultValues?.back_car_image?.id
        ? defaultValues?.back_car_image
        : undefined,
      front_car_image_url: defaultValues?.front_car_image?.id
        ? defaultValues?.front_car_image
        : undefined,
      year_of_issue: defaultValues?.year_of_issue,
      car_id: defaultValues?.car?.car_id
        ? { label: defaultValues.car.name, value: defaultValues.car.car_id }
        : undefined,
      car_name: defaultValues?.car_name,
      license_plates: defaultValues?.license_plates,
      car_brand_id: defaultValues?.car_brand?.brand_id
        ? { label: defaultValues.car_brand.brand_name, value: defaultValues.car_brand.brand_id }
        : undefined,
      back_registration_image_url: defaultValues?.back_registration_image_url?.id
        ? defaultValues?.back_registration_image_url
        : undefined,
      front_registration_image_url: defaultValues?.front_registration_image_url?.id
        ? defaultValues?.front_registration_image_url
        : undefined,
      owner_address: defaultValues?.owner_address || undefined,
      owner_name: defaultValues?.owner_name || undefined,
      ownership_type: defaultValues?.ownership_type || undefined,
      sign_image_url: defaultValues?.sign_image_url?.id ? defaultValues?.sign_image_url : undefined,
    },
  })

  const onSubmitHandler = (data: VehicleDetailFormSchema) => {
    onSubmit?.({
      ...data,
      back_registration_image_url: Number(data.back_registration_image_url.id),
      back_car_image_url: Number(data.back_car_image_url.id),
      front_car_image_url: Number(data.front_car_image_url.id),
      car_id: Number(data.car_id.value),
      car_brand_id: Number(data.car_brand_id.value),
      front_registration_image_url: Number(data.front_registration_image_url.id),
      sign_image_url: Number(data.sign_image_url.id),
    })
  }

  const vehicleBrandOptions = useMemo(() => {
    return vehicleBrandList?.map((item) => ({
      label: item.brand_name,
      value: item.brand_id,
    }))
  }, [vehicleBrandList])

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      {vehicleDetailFormFields.map((field) => (
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
                    getImage={(img) => {
                      onChange({ id: img.attachment_id, url: img.attachment_url })
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

          {field.type === "radio" ? (
            <Controller
              control={control}
              name={field.name}
              render={({ field: { onChange, onBlur } }) => (
                <div className="flex items-center">
                  <div onBlur={onBlur} className="flex items-center mr-24">
                    <InputRadio
                      isChecked={getValues("ownership_type") === "car_owner"}
                      onCheck={() => {
                        onChange("car_owner")
                      }}
                    />
                    <label
                      onClick={() => onChange("car_owner")}
                      htmlFor=""
                      className="ml-8 text-sm cursor-pointer select-none"
                    >
                      Chủ xe
                    </label>
                  </div>

                  <div onBlur={onBlur} className="flex items-center">
                    <InputRadio
                      isChecked={getValues("ownership_type") === "rental_car"}
                      onCheck={() => {
                        onChange("rental_car")
                      }}
                    />
                    <label
                      onClick={() => onChange("rental_car")}
                      htmlFor=""
                      className="ml-8 text-sm cursor-pointer select-none"
                    >
                      Thuê xe
                    </label>
                  </div>
                </div>
              )}
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
                      field.name === "car_id" && defaultValues?.car
                        ? {
                            label: defaultValues?.car?.name,
                            value: defaultValues?.car?.car_id,
                          }
                        : field.name === "car_brand_id" && defaultValues?.car_brand
                        ? {
                            label: defaultValues?.car_brand?.brand_name,
                            value: defaultValues?.car_brand?.brand_id,
                          }
                        : undefined
                    }
                    placeholder={field.placeholder}
                    options={
                      field.name === "car_id"
                        ? vehicleTypeOptions
                        : field.name === "car_brand_id"
                        ? vehicleBrandOptions
                        : undefined
                    }
                    onChange={(val) => val?.value && onChange(val)}
                    onBlur={onBlur}
                    id={field.name}
                    className={`${errors?.[field.name] ? "form-select-error" : ""}`}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
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
