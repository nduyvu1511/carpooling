import { EditIcon, SpinnerIcon } from "@/assets"
import { InputLoading, RatingTag, TextareaLoading, UserInfoForm } from "@/components"
import { EMAIL_REGEX, removeBase64Reader, toImageUrl } from "@/helper"
import { useAttachment, useProfile, useUploadAttachment } from "@/hooks"
import { CarAccountType, UpdateUserInfoParams } from "@/models"
import { setProfile } from "@/modules"
import Image from "next/image"
import { useRouter } from "next/router"
import { ChangeEvent } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { AccountTag } from "./accountTag"

interface ProfileProps {
  type?: CarAccountType
}

const Profile = ({ type }: ProfileProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    updateUserInfo,
    isValidating,
    data: userInfo,
    updateUserInfoIdentityCard,
  } = useProfile(true)

  const { getBase64Images } = useAttachment({ limit: 1, useState: false })
  const { uploadImages, isUploading } = useUploadAttachment()

  const handleUpdateUserInfo = (params: UpdateUserInfoParams, type = "update") => {
    updateUserInfo({
      params: {
        ...params,
        avatar_attachment_id:
          type === "avatar" ? params.avatar_attachment_id : userInfo?.avatar_url.image_id,
      },
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
        onSuccess: ([{ attachment_id }]) => {
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
          <div className="w-[80px] h-[80px] md:w-[160px] md:h-[160px] rounded-[50%] skeleton mr-[24px]"></div>
          <div className="flex-1">
            <div className="skeleton h-[20px] w-[140px] rounded-[5px] mb-16"></div>
            <div className="skeleton h-16 w-[200px] rounded-[5px] mb-16"></div>
            <div className="skeleton h-[8px] max-w-[300px] w-full rounded-[5px]"></div>
          </div>
        </div>

        <div className="">
          <InputLoading />
          <InputLoading />
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
      <div className="flex-center flex-col md:flex-row md:items-center md:justify-center mb-24">
        <div className="flex-col flex-center mb-16 md:mb-0">
          <div className="relative w-[105px] h-[105px] md:w-[160px] md:h-[160px] flex-center border border-solid border-border-color-1 rounded-[50%]">
            {isUploading ? (
              <div className="w-full h-full rounded-[50%] flex-center bg-bg">
                <SpinnerIcon className="animate-spin" />
              </div>
            ) : (
              <label htmlFor="avatar" className="cursor-pointer">
                <div className="w-[90px] h-[90px] md:w-[140px] md:h-[140px] relative rounded-[50%] overflow-hidden">
                  <Image
                    src={toImageUrl(userInfo?.avatar_url?.image_url)}
                    layout="fill"
                    alt=""
                    objectFit="cover"
                  />
                </div>
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

            <label
              htmlFor="avatar"
              className="w-24 h-24 md:w-[32px] md:h-[32px] cursor-pointer rounded-[50%] bg-primary flex-center absolute bottom-[8px] right-[8px]"
            >
              <EditIcon className="w-[12px] text-white-color" />
            </label>
          </div>
        </div>
        <div className="flex-1 md:ml-[48px]">
          <div className="flex-col flex-center md:items-start">
            <div className="flex items-center mb-[8px] md:mb-16">
              <p className="h3 line-clamp-1 word-wrap-anywhere font-semibold md:font-medium flex-1 mr-16 text-blue-7">
                {userInfo.partner_name}
              </p>

              {userInfo?.rating_number ? (
                <RatingTag
                  onClick={() => router.push("/d/account/rating")}
                  value={userInfo.rating_number}
                />
              ) : null}
            </div>

            <div className="mb-16 flex flex-col items-center md:items-start">
              <AccountTag userInfo={userInfo} />
            </div>

            <div className="flex items-center">
              <p className="text-xs line-clamp-1 word-wrap-anywhere">{userInfo.phone}</p>
              {userInfo?.email && EMAIL_REGEX.test(userInfo.email) ? (
                <>
                  <p className="mx-12 border-r h-[12px] border-solid border-border-color"></p>
                  <p className="text-xs line-clamp-1 word-wrap-anywhere">{userInfo.email}</p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <UserInfoForm
        onSubmitIdentityCard={(params) => updateUserInfoIdentityCard(params)}
        type={type}
        mode="update"
        showAvatar={false}
        defaultValues={{
          ...userInfo,
          email: EMAIL_REGEX.test(userInfo.email) ? userInfo.email : "",
        }}
        onSubmit={(data) => handleUpdateUserInfo(data)}
        view="page"
        btnLabel="Lưu"
      />
    </>
  )
}

export { Profile }
