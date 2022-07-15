import { LoginForm, Modal, OTP, Register, ResetPassword, UserInfoForm } from "@/components"
import { RootState } from "@/core/store"
import { useAuth, useProfile } from "@/hooks"
import { loginFormParams, UpdateUserInfoParams, UserInfoFormParams } from "@/models"
import { setAuthModalType, setProfile } from "@/modules"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"

const AuthModal = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { updateUserInfo } = useProfile()
  const { loginWithPassword, getUserInfo, loginWithPhoneNumber, loginWithGoogle } = useAuth()
  const { authModalType } = useSelector((state: RootState) => state.common)

  const handleGetUserInfo = () => {
    getUserInfo((userInfo) => {
      dispatch(setProfile(userInfo))
      dispatch(setAuthModalType(undefined))
      router.push(userInfo.car_account_type === "car_driver" ? "/d" : "/c")
    })
  }

  const handleLoginWithPassword = (params: loginFormParams) => {
    loginWithPassword(params, () => {
      handleGetUserInfo()
    })
  }

  const handleLoginWithOTP = (firebaseToken: string) => {
    loginWithPhoneNumber({
      firebaseToken,
      onSuccess: () => {
        handleGetUserInfo()
      },
    })
  }

  const handleUpdateUserInfo = async (params: UserInfoFormParams) => {
    updateUserInfo({
      params: params as UpdateUserInfoParams,
      onSuccess: (userInfo) => {
        dispatch(setProfile(userInfo))
        dispatch(notify("Cập nhật thông tin thành công!", "success"))
        dispatch(setAuthModalType(undefined))
        router.push(userInfo.car_account_type === "car_driver" ? "/d" : "/c")
      },
    })
  }

  const handleLoginWithGoogle = () => {
    loginWithGoogle((token) => {
      console.log(token)
    })
  }

  const getModalHeading = (): string => {
    if (authModalType === "login") return "Đăng nhập"
    if (authModalType === "register") return "Đăng ký"
    if (authModalType === "resetPassword") return "Quên mật khẩu"
    if (authModalType === "sms") return "Đăng nhập bằng SMS"
    if (authModalType === "updateProfile") return "Cập nhật thông tin"
    return "Đăng nhập"
  }

  return (
    <Modal heading={getModalHeading()} onClose={() => dispatch(setAuthModalType(undefined))}>
      <div className="px-24 pt-[24px] pb-[40px] h-full overflow-auto scrollbar-hide">
        {authModalType === "login" ? (
          <LoginForm
            onSubmit={(data) => handleLoginWithPassword(data)}
            onClickResetPassword={() => dispatch(setAuthModalType("resetPassword"))}
            onClickLoginSMS={() => dispatch(setAuthModalType("sms"))}
            onClickRegister={() => dispatch(setAuthModalType("register"))}
            onClickLoginWithGoogle={handleLoginWithGoogle}
          />
        ) : null}

        {authModalType === "resetPassword" ? (
          <ResetPassword onSuccess={() => dispatch(setAuthModalType("login"))} />
        ) : null}

        {authModalType === "sms" ? (
          <OTP
            type="login"
            onVerifyOTP={(token) => {
              handleLoginWithOTP(token)
            }}
          />
        ) : null}

        {authModalType === "register" ? (
          <Register
            onSuccess={() => {
              dispatch(setAuthModalType("updateProfile"))
            }}
          />
        ) : null}

        {authModalType === "updateProfile" ? (
          <UserInfoForm onSubmit={(data) => handleUpdateUserInfo(data)} />
        ) : null}
      </div>
    </Modal>
  )
}

export { AuthModal }
