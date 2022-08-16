import { CloseIcon } from "@/assets"
import { AuthBg, LoginForm, Modal, OTP, Register, ResetPassword, UserInfoForm } from "@/components"
import { RootState } from "@/core/store"
import { toggleBodyOverflow } from "@/helper"
import { useAuth, useEffectOnce, useProfile } from "@/hooks"
import { AuthModalType, LoginFormParams, UpdateUserInfoParams, UserInfoFormSubmit } from "@/models"
import { setAuthModalType, setProfile } from "@/modules"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"

const AuthModal = ({ show }: { show: AuthModalType }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { updateUserInfo } = useProfile()
  const { loginWithPassword, getUserInfo, loginWithPhoneNumber, loginWithGoogle } = useAuth()
  const authModalType = useSelector((state: RootState) => state.common.authModalType)

  const handleGetUserInfo = () => {
    getUserInfo((userInfo) => {
      dispatch(setProfile(userInfo))
      router.push(userInfo.car_account_type === "car_driver" ? "/d" : "/c")
      setTimeout(() => {
        dispatch(setAuthModalType(undefined))
      }, 250)
    })
  }

  const handleLoginWithPassword = (params: LoginFormParams) => {
    loginWithPassword({
      params,
      onSuccess: () => handleGetUserInfo(),
      config: { toggleOverFlow: false },
    })
  }

  const handleLoginWithOTP = (params: string) => {
    loginWithPhoneNumber({
      params,
      onSuccess: () => {
        handleGetUserInfo()
      },
      config: { toggleOverFlow: false },
    })
  }

  const handleUpdateUserInfo = async (params: UserInfoFormSubmit) => {
    updateUserInfo({
      params: params as UpdateUserInfoParams,
      onSuccess: (userInfo) => {
        dispatch(setProfile(userInfo))
        dispatch(notify("Cập nhật thông tin thành công!", "success"))
        setTimeout(() => {
          dispatch(setAuthModalType(undefined))
        }, 250)
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

  useEffectOnce(() => {
    toggleBodyOverflow("unset")
  })

  const handleRedirectModal = () => {
    if (authModalType === "login") {
      dispatch(setAuthModalType(undefined))
    } else {
      dispatch(setAuthModalType("login"))
    }
  }

  return (
    <Modal
      iconType={authModalType === "login" ? "close" : "back"}
      key="auth-modal"
      show={!!show}
      heading={getModalHeading()}
      onClose={handleRedirectModal}
      rightHeaderNode={
        authModalType !== "login" ? (
          <span
            onClick={() => dispatch(setAuthModalType(undefined))}
            className="w-[30px] cursor-pointer"
          >
            <CloseIcon className="text-blue-8 w-[26px] h-[26px]" />
          </span>
        ) : null
      }
    >
      <div className="w-full flex flex-col h-full overflow-auto scrollbar-hide">
        <div className="flex-1 px-12 sm:px-24 pt-[24px] z-[100] pb-[70px] ">
          {authModalType === "login" ? (
            <LoginForm
              view="modal"
              onSubmit={(data) => handleLoginWithPassword(data)}
              onClickResetPassword={() => dispatch(setAuthModalType("resetPassword"))}
              onClickLoginSMS={() => dispatch(setAuthModalType("sms"))}
              onClickRegister={() => dispatch(setAuthModalType("register"))}
              onClickLoginWithGoogle={handleLoginWithGoogle}
            />
          ) : null}

          {authModalType === "resetPassword" ? (
            <ResetPassword view="modal" onSuccess={() => dispatch(setAuthModalType("login"))} />
          ) : null}

          {authModalType === "sms" ? (
            <OTP
              view="modal"
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
            <UserInfoForm view="modal" onSubmit={(data) => handleUpdateUserInfo(data)} />
          ) : null}
        </div>
        {authModalType !== "updateProfile" && authModalType !== "register" ? <AuthBg /> : null}
      </div>
    </Modal>
  )
}

export { AuthModal }
