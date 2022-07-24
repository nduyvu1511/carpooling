import { EditIcon, SpinnerIcon } from "@/assets"
import { UserInfoForm, InputLoading, TextareaLoading } from "@/components"
import { removeBase64Reader, toImageUrl } from "@/helper"
import { useAttachment, useProfile, useUploadAttachment } from "@/hooks"
import { UpdateUserInfoParams } from "@/models"
import { setProfile } from "@/modules"
import Image from "next/image"
import { ChangeEvent } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

const Profile = () => {
  const dispatch = useDispatch()
  const { updateUserInfo, isValidating, data: userInfo } = useProfile(true)
  const { getBase64Images } = useAttachment({ limit: 1, useState: false })
  const { uploadImages, isUploading } = useUploadAttachment()

  const handleUpdateUserInfo = (params: UpdateUserInfoParams, type = "update") => {
    updateUserInfo({
      params: params,
      onSuccess: (userInfo) => {
        dispatch(setProfile(userInfo))
        dispatch(
          notify(
            type === "update"
              ? "Chỉnh sửa thông tin thành công"
              : "Cập nhật ảnh đại diện thành công",
            "success"
          )
        )
      },
      showLoading: type === "update",
    })
  }

  const handleUpdateAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    getBase64Images(files, ([base64]) => {
      uploadImages({
        params: [{ file: removeBase64Reader(base64), type: "image" }],
        onSuccess: ([{ attachment_id, attachment_url }]) => {
          handleUpdateUserInfo({ avatar_attachment_id: attachment_id }, "avatar")
        },
        type: "avatar",
      })
    })
  }

  if (isValidating)
    return (
      <div className="">
        <div className="flex items-center mb-24">
          <div className="w-[160px] h-[160px] rounded-[50%] skeleton mr-[24px]"></div>
          <div>
            <div className="skeleton h-[20px] w-[140px] rounded-[5px] mb-[16px]"></div>
            <div className="skeleton h-[8px] w-[100px] rounded-[5px]"></div>
          </div>
        </div>

        <div className="">
          <InputLoading />
          <InputLoading />
          <InputLoading />
          <TextareaLoading />
        </div>
      </div>
    )
  if (!userInfo) return null
  return (
    <>
      <div className="flex-center">
        <div className="">
          <div className="relative w-[160px] h-[160px] rounded-[50%] overflow-hidden mb-[8px]">
            {isUploading ? (
              <div className="w-full h-full rounded-[50%] flex-center bg-bg">
                <SpinnerIcon className="animate-spin" />
              </div>
            ) : (
              <label htmlFor="avatar" className="cursor-pointer">
                <Image
                  src={toImageUrl(userInfo.avatar_url.image_url)}
                  layout="fill"
                  alt=""
                  objectFit="cover"
                />
              </label>
            )}
            <input
              type="file"
              name="avatar"
              hidden
              onChange={handleUpdateAvatar}
              accept="image/png, image/jpeg"
              id="avatar"
            />
          </div>

          <label htmlFor="avatar" className="flex-center cursor-pointer">
            <EditIcon className="mr-[8px]" />
            <span className="text-sm text-primary">Thay đổi ảnh đại diện</span>
          </label>
        </div>
        <div className="flex-1 ml-[48px]">
          <div className="">
            <p className="h3 mb-[16px] line-clamp-1 word-wrap-anywhere">{userInfo.partner_name}</p>
            <p className="text-sm text-gray-color-5 line-clamp-1 word-wrap-anywhere">
              {userInfo.phone}
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <UserInfoForm
          mode="update"
          showAvatar={false}
          defaultValues={userInfo}
          onSubmit={(data) => handleUpdateUserInfo(data)}
          view="page"
        />
      </div>
    </>
  )
}

export { Profile }
