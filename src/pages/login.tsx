import { Header, LoginForm } from '@/components'
import { useAuth } from '@/hooks'
import { LoginFormParams } from '@/models'
import { setScreenLoading } from '@/modules'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

const LoginPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { loginToChatServer } = useAuth()

  const handleLoginWithPassword = async (params: LoginFormParams) => {
    dispatch(setScreenLoading({ show: true }))
    loginToChatServer(
      params,
      () => {
        dispatch(setScreenLoading({ show: false }))
        router.push('/chat')
      },
      () => dispatch(setScreenLoading({ show: false }))
    )
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
                // onClickResetPassword={() => dispatch(setAuthModalType('resetPassword'))}
                // onClickLoginSMS={() => dispatch(setAuthModalType('sms'))}
                // onClickRegister={() => dispatch(setAuthModalType('register'))}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
