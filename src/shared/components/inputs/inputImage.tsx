import { SpinnerIcon, UploadIcon } from "@/assets"
import { removeBase64Reader } from "@/helper"
import { useAttachment, useUploadAttachment } from "@/hooks"
import { AttachmentItem, AttachmentRouteType } from "@/models"
import Image from "next/image"
import { ChangeEvent } from "react"

interface InputImageProps {
  getImage?: (params: AttachmentItem) => void
  isError?: boolean
  image?: string | undefined
  id: string
  type?: AttachmentRouteType
  onBlur?: Function
}

export const InputImage = ({
  getImage,
  isError,
  image,
  id,
  type = "common",
  onBlur,
}: InputImageProps) => {
  const { isUploading, uploadImages } = useUploadAttachment()
  const { getBase64Images } = useAttachment({
    limit: 1,
    useState: false,
  })
  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    getBase64Images(files, (imgs) => {
      if (!imgs?.[0]) return
      const image = imgs?.[0] || ""
      if (!image) return

      const btnDOM = document.querySelector(".form-upload-btn")
      const labelImage = document.querySelector(`.file-image-picker-${id}`)

      labelImage?.classList.remove("form-input-err")
      btnDOM?.classList.add("btn-disabled-2")
      uploadImages({
        params: [{ file: removeBase64Reader(image), type: "image" }],
        type,
        onSuccess: (files) => {
          btnDOM?.classList.remove("btn-disabled-2")
          getImage &&
            getImage({
              attachment_id: files[0].attachment_id,
              attachment_url: files[0].attachment_url,
            })
        },
        onError: () => {
          btnDOM?.classList.remove("btn-disabled-2")
          labelImage?.classList.add("form-input-err")
        },
      })
    })
  }

  return (
    <div
      className="flex-center flex-col"
      style={{
        pointerEvents: isUploading ? "none" : "unset",
        userSelect: "none",
      }}
    >
      <input onChange={uploadImage} id={id} hidden type="file" name="" accept="image/*" />
      <label
        onBlur={() => onBlur?.()}
        htmlFor={id}
        className={`flex-center flex-col h-[100px] overflow-hidden w-[148px] rounded-[5px] border border-dashed border-border-color-2 cursor-pointer relative flex-center file-image-picker mb-[4px] ${
          image && !isUploading ? "border-none" : ""
        } ${
          isError ? "form-input-err border-error" : "border-gray-color-2"
        } file-image-picker-${id}`}
      >
        {isUploading ? (
          <span className="absolute inset-0 w-full h-full flex-center bg-gray-color-1 z-[100]">
            <SpinnerIcon className="animate-spin w-[18px] h-[18px]" />
          </span>
        ) : null}

        <UploadIcon className="text-gray-color-3" />
        <label className="text-gray-color-2 text-12 font-normal" htmlFor={id}>
          {image ? "Thay đổi hình ảnh" : "Tải ảnh lên"}
        </label>

        {image ? (
          <Image
            className="z-10 absolute"
            src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
            alt=""
            layout="fill"
            objectFit="cover"
          />
        ) : null}
      </label>
    </div>
  )
}
