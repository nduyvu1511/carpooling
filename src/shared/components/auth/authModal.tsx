import { CloseThickIcon } from "@/assets"
import { AuthBg, Login, LoginForm, Modal, Register, ResetPassword } from "@/components"
import { RootState } from "@/core/store"
import { AUTH_MODAL_HEADING } from "@/helper"
import { useAuth } from "@/hooks"
import { AuthModalType, AuthModalTypeSlice, LoginFormParams, UserInfo } from "@/models"
import { setAuthModalType, setProfile } from "@/modules"
import { userAPI } from "@/services"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"

const AuthModal = ({ show }: { show: AuthModalTypeSlice }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const authModalType = useSelector((state: RootState) => state.common.authModalType)
  const { loginWithPassword, getUserInfo, loginToChatServer, setToken } = useAuth()

  const redirectUser = (userInfo: UserInfo) => {
    if (!userInfo?.car_account_type) {
      dispatch(notify("Loại tài khoản không hợp lệ, vui lòng thử lại sau"))
      return
    }

    router.push(userInfo?.car_account_type === "car_driver" ? "/d" : "/c")
    dispatch(setAuthModalType(undefined))
  }

  // Call after add token to cookie
  const handleGetUserInfo = (shouldLoginChatServer = true) => {
    getUserInfo((userInfo) => {
      dispatch(setProfile(userInfo))
      if (shouldLoginChatServer) {
        loginToChatServer({ phone: userInfo.phone, user_id: userInfo.partner_id })
      }

      setTimeout(() => {
        redirectUser(userInfo)
      }, 200)
    })
  }

  const handleResetPassword = async (token: string) => {
    try {
      setToken({
        params: token,
        onSuccess: () => handleGetUserInfo(),
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoginWithPassword = (params: LoginFormParams) => {
    loginWithPassword({
      params,
      onSuccess: () => handleGetUserInfo(),
      config: { toggleOverFlow: false },
    })
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
      className="auth-modal"
      iconType={authModalType === "login" ? "close" : "back"}
      key="auth-modal"
      show={!!show}
      heading={AUTH_MODAL_HEADING[authModalType as AuthModalType]}
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
              onSubmit={handleLoginWithPassword}
              onClickResetPassword={() => dispatch(setAuthModalType("resetPassword"))}
              onClickLoginSMS={() => dispatch(setAuthModalType("sms"))}
              onClickRegister={() => dispatch(setAuthModalType("register"))}
            />
          ) : null}

          {authModalType === "resetPassword" ? (
            <ResetPassword view="modal" onSuccess={handleResetPassword} />
          ) : null}

          {authModalType === "sms" ? <Login onLoginSuccess={redirectUser} /> : null}

          {authModalType === "register" ? (
            <Register
              onSuccess={() => {
                router.push("/c")
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
