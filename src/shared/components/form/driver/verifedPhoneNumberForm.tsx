import { ButtonSubmit, InputImage, InputField } from "@/components"
import { verifiedPhoneNumberSchema } from "@/helper"
import {
  CreateVerifiedPhoneNumber,
  ImageRes,
  VefifiedPhoneNumberForm,
  VerifiedPhoneNumberRes,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"

interface VerifiedPhoneNumberFormProps {
  defaultValues?: VerifiedPhoneNumberRes
  onSubmit: (params: CreateVerifiedPhoneNumber) => void
  view?: "modal" | "page"
}

export const VerifiedPhoneNumberForm = ({
  onSubmit,
  defaultValues,
  view = "modal",
}: VerifiedPhoneNumberFormProps) => {
  const {
    handleSubmit,
    getValues,
    formState: { errors },
    control,
  } = useForm<VefifiedPhoneNumberForm>({
    resolver: yupResolver(verifiedPhoneNumberSchema),
    mode: "all",
    defaultValues: {
      phone: defaultValues?.phone,
      verified_number_phone_image_url: defaultValues?.verified_number_phone_image?.id
        ? defaultValues?.verified_number_phone_image
        : undefined,
    },
  })

  const onSubmitHandler = (data: VefifiedPhoneNumberForm) => {
    onSubmit?.({ verified_number_phone_image_url: +data.verified_number_phone_image_url.id })
  }

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      <InputField readOnly label="Số điện thoại" required control={control} name="phone" />

      <div className="form-item">
        <label htmlFor="verified_number_phone_image_url" className="form-label">
          Hình ảnh chụp màn hình xác minh
          <span className="form-label-warning">(*)</span>
        </label>
        <Controller
          control={control}
          name="verified_number_phone_image_url"
          render={({ field: { onChange } }) => (
            <div className="driver-bio__form-input">
              <InputImage
                id="verified_number_phone_image_url"
                image={(getValues("verified_number_phone_image_url") as ImageRes)?.url || ""}
                isError={!!errors?.verified_number_phone_image_url}
                getImage={(img) => {
                  onChange({ id: img.attachment_id, url: img.attachment_url })
                }}
              />
            </div>
          )}
          rules={{ required: true }}
        />

        {errors["verified_number_phone_image_url"] ? (
          <p className="form-err-msg">
            {(errors.verified_number_phone_image_url as any)?.message || "Vui lòng nhập trường này"}
          </p>
        ) : null}
      </div>

      <ButtonSubmit
        className="form-upload-btn"
        title="Tiếp tục"
        view={view}
        onClick={() => handleSubmit(onSubmitHandler)}
      />
    </form>
  )
}
