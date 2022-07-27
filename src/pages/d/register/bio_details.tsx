import { ImageFileLoading, InputLoading, TextareaLoading, UserInfoForm } from "@/components"
import { useEffectOnce, useProfile } from "@/hooks"
import { DriverEmptyLayout, DriverRegisterLayout } from "@/layout"
import { UserInfoFormParams } from "@/models"
import { setProfile } from "@/modules"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

const BioDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data: userInfo, isValidating, createUserInfo } = useProfile(true)

  useEffectOnce(() => {
    dispatch(notify("Vui lòng nhập tên hợp lệ để tiếp tục", "info"))
  })

  const onSubmitHandler = (data: UserInfoFormParams) => {
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
        router.push("/d/register")
      },
      onError: () => {
        dispatch(notify("Có lỗi xảy ra, vui lòng thử lại", "error"))
      },
    })
  }

  return (
    <DriverRegisterLayout heading="Thông tin người dùng">
      <div className="content-container px-[16px] sm:px-0">
        {!isValidating ? (
          <UserInfoForm onSubmit={onSubmitHandler} defaultValues={userInfo} />
        ) : (
          <>
            <ImageFileLoading />
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
