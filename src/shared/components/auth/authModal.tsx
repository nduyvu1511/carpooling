import { CloseThickIcon } from "@/assets"
import { AuthBg, Login, LoginForm, Modal, Register, ResetPassword } from "@/components"
import { RootState } from "@/core/store"
import { useAuth } from "@/hooks"
import { AuthModalType, LoginFormParams, UserInfo } from "@/models"
import { setAuthModalType, setProfile } from "@/modules"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"

const AuthModal = ({ show }: { show: AuthModalType }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const authModalType = useSelector((state: RootState) => state.common.authModalType)
  const { loginWithPassword, getUserInfo } = useAuth()

  const redirectUser = (userInfo: UserInfo) => {
    if (!userInfo?.car_account_type) {
      dispatch(notify("Loại tài khoản không hợp lệ, vui lòng liên hệ với bộ phận CSKH"))
      return
    }

    router.push(userInfo?.car_account_type === "car_driver" ? "/d" : "/c")
    dispatch(setAuthModalType(undefined))
  }

  const handleLoginWithPassword = (params: LoginFormParams) => {
    loginWithPassword({
      params,
      onSuccess: () => {
        getUserInfo((userInfo) => {
          dispatch(setProfile(userInfo))
          setTimeout(() => {
            redirectUser(userInfo)
          }, 200)
        })
      },
      config: { toggleOverFlow: false },
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

  const handleRedirectModal = () => {
    if (authModalType === "login") {
      dispatch(setAuthModalType(undefined))
    } else {
      dispatch(setAuthModalType("login"))
    }
  }

  if (authModalType === "updateProfile") return null
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
            <CloseThickIcon className="text-blue-8 w-[14px] h-[14px]" />
          </span>
        ) : null
      }
    >
      <div className="w-full flex flex-col h-full overflow-auto scrollbar-hide">
        <div className="flex-1 px-12 sm:px-24 pt-24 z-[100] pb-[70px] ">
          {authModalType === "login" ? (
            <LoginForm
              view="modal"
              onSubmit={(data) => handleLoginWithPassword(data)}
              onClickResetPassword={() => dispatch(setAuthModalType("resetPassword"))}
              onClickLoginSMS={() => dispatch(setAuthModalType("sms"))}
              onClickRegister={() => dispatch(setAuthModalType("register"))}
            />
          ) : null}

          {authModalType === "resetPassword" ? (
            <ResetPassword view="modal" onSuccess={() => dispatch(setAuthModalType("login"))} />
          ) : null}

          {authModalType === "sms" ? <Login onLoginSuccess={redirectUser} /> : null}

          {authModalType === "register" ? (
            <Register
              onSuccess={() => {
                dispatch(setAuthModalType("updateProfile"))
              }}
            />
          ) : null}
        </div>
        {authModalType !== "register" ? <AuthBg /> : null}
      </div>
    </Modal>
  )
}

export { AuthModal }

