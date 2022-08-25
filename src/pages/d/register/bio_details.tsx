import { ImageFileLoading, InputLoading, TextareaLoading, UserInfoForm } from "@/components"
import { useProfile } from "@/hooks"
import { DriverEmptyLayout, DriverRegisterLayout } from "@/layout"
import { UserInfoFormSubmit } from "@/models"
import { setProfile } from "@/modules"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

const BioDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data: userInfo, isValidating, createUserInfo } = useProfile(true)

  useEffect(() => {
    if (userInfo?.partner_name === `USER-${userInfo?.phone}`) {
      dispatch(notify("Vui lòng nhập tên hợp lệ để tiếp tục", "info"))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmitHandler = (data: UserInfoFormSubmit) => {
    if (data.name === `USER-${userInfo?.phone}`) {
      dispatch(notify("Vui lòng nhập tên hợp lệ để tiếp tục", "warning"))
      return
    }
    createUserInfo({
      params: {
        ...data,
        car_account_type: "car_driver",
      },
      onSuccess: (userInfo) => {
        dispatch(setProfile(userInfo))
        router.push("/d/register/identity_card_details")
      },
      onError: () => {
        dispatch(notify("Có lỗi xảy ra, vui lòng thử lại", "error"))
      },
    })
  }

  return (
    <DriverRegisterLayout
      onRightBtnClick={() => router.push("/d/register")}
      heading="Thông tin người dùng"
    >
      <div className="content-container px-16 sm:px-0">
        {!isValidating ? (
          <UserInfoForm onSubmit={onSubmitHandler} defaultValues={userInfo} />
        ) : (
          <>
            <ImageFileLoading />
            <InputLoading />
            <InputLoading />
            <InputLoading />
            <InputLoading />
            <TextareaLoading />
          </>
        )}
      </div>
    </DriverRegisterLayout>
  )
}

BioDetail.Layout = DriverEmptyLayout
export default BioDetail
