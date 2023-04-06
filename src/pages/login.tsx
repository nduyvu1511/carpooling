import { Header, LoginForm } from '@/components'
import { useAuth } from '@/hooks'
import { LoginFormParams, UserInfo } from '@/models'
import { setAuthModalType, setProfile } from '@/modules'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { notify } from 'reapop'

const LoginPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loginWithPassword, getUserInfo, loginToChatServer, setToken } = useAuth()

  const redirectUser = (userInfo: UserInfo) => {
    if (!userInfo?.car_account_type) {
      dispatch(notify('Loại tài khoản không hợp lệ, vui lòng thử lại sau', 'error'))
      return
    }

    router.push('/')
  }

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

  const handleLoginWithPassword = (params: LoginFormParams) => {
    loginWithPassword({
      params,
      onSuccess: () => handleGetUserInfo(),
      config: { toggleOverFlow: false }
    })
  }

  return (
    <main className="bg-bg flex flex-col min-h-[calc(100vh)] h-full">
      <Header />
      <div className="px-12 md:px-16">
        <div className="content-container bg-white-color mt-12 md:mt-24 rounded-[10px]">
          <div className="w-full flex flex-col h-full overflow-auto scrollbar-hide">
            <div className="flex-1 px-12 sm:px-24 pt-24 z-[100] pb-[70px] ">
              <LoginForm
                view="modal"
                onSubmit={handleLoginWithPassword}
                onClickResetPassword={() => dispatch(setAuthModalType('resetPassword'))}
                onClickLoginSMS={() => dispatch(setAuthModalType('sms'))}
                onClickRegister={() => dispatch(setAuthModalType('register'))}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
