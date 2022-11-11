import { ButtonSubmit, InputImage, MultipleImageField } from "@/components"
import { carColorOptions, carInformationFormFields, carInformationSchema } from "@/helper"
import { useFetchCarBrand } from "@/hooks"
import {
  CarInformationRes,
  CreateCarInformation,
  CreateCarInformationForm,
  ImageRes,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"

interface CarInformationFormProps {
  defaultValues?: CarInformationRes
  onSubmit: (params: CreateCarInformation) => void
  view?: "modal" | "page"
}

export const CarInformationForm = ({
  onSubmit,
  defaultValues,
  view = "modal",
}: CarInformationFormProps) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateCarInformationForm>({
    resolver: yupResolver(carInformationSchema),
    mode: "all",
    defaultValues: {
      car_name: defaultValues?.car_name,
      car_brand_id: defaultValues?.car_brand?.brand_id
        ? {
            label: defaultValues?.car_brand?.brand_name,
            value: defaultValues?.car_brand?.brand_id,
          }
        : undefined,
      car_front_image_id: defaultValues?.car_front_image?.id
        ? {
            id: defaultValues?.car_front_image?.id,
            url: defaultValues?.car_front_image?.url,
          }
        : undefined,
      car_back_image_id: defaultValues?.car_front_image?.id
        ? {
            id: defaultValues?.car_front_image?.id,
            url: defaultValues?.car_front_image?.url,
          }
        : undefined,
      car_image_ids: defaultValues?.car_images?.filter(
        (item) =>
          item.id !== defaultValues?.car_back_image?.id ||
          item.id !== defaultValues?.car_back_image?.id
      ),
    },
  })
  const { data } = useFetchCarBrand()

  const onSubmitHandler = (data: CreateCarInformationForm) => {
    onSubmit?.({
      ...data,
      car_back_image_id: +data?.car_back_image_id?.id,
      car_front_image_id: +data?.car_front_image_id?.id,
      main_color: data?.main_color,
      car_name: data?.car_name,
      car_image_ids: data?.car_image_ids?.map((item) => item.id) || [],
      car_brand_id: data?.car_brand_id?.value ? +data?.car_brand_id?.value : undefined,
    })
  }
  // const { data: utilities } = useSWR("get_car_utilities", () =>
  //   userAPI.getCarUtilities().then((res) => res?.result?.data)
  // )
  // const { data: standards } = useSWR("get_car_utilities", () =>
  //   userAPI.getCarQualityStandards().then((res) => res?.result?.data)
  // )

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {carInformationFormFields.map((field) => (
        <div key={field.name} className="form-item">
          <label htmlFor={field.name} className="form-label">
            {field.label}{" "}
            {field?.isRequired ? <span className="form-label-warning">(*)</span> : null}
          </label>

          {field.type === "select" ? (
            <Controller
              control={control}
              name={field.name}
              render={({ field: { onChange, onBlur } }) => (
                <div onBlur={onBlur} className="form-select">
                  <Select
                    menuShouldScrollIntoView={false}
                    value={(getValues(field.name) as string) || undefined}
                    className={`${errors?.[field.name] ? "form-select-error" : ""}`}
                    placeholder={field.label}
                    onBlur={onBlur}
                    id={field.name}
                    options={field.name === "main_color" ? carColorOptions : (data as any)}
                    onChange={(val) => {
                      onChange(val)
                    }}
                  />
                </div>
              )}
              rules={{ required: true }}
            />
          ) : null}

          {field.type === "file" ? (
            <Controller
              control={control}
              name={field.name}
              render={({ field: { onChange, onBlur } }) => (
                <div className="driver-bio__form-input">
                  <InputImage
                    onBlur={onBlur}
                    id={field.name}
                    image={(getValues(field?.name) as any)?.url || ""}
                    isError={!!errors?.[field.name]}
                    getImage={(img) =>
                      onChange({ id: img.attachment_id, url: img.attachment_url } as ImageRes)
                    }
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
              defaultValue={getValues(field.name) as string}
              placeholder={field.label}
              {...register(field.name, {
                required: true,
              })}
            />
          ) : null}

          {field.type === "multipleFile" ? (
            <MultipleImageField control={control} name="car_image_ids" />
          ) : null}

          {errors[field.name] ? (
            <p className="form-err-msg">{(errors[field.name] as any)?.message}</p>
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
