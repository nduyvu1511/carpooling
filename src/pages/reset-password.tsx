import { ArrowLeft2Icon } from "@/assets"
import { HeaderMobile, ResetPassword, Seo } from "@/components"
import { AuthLayout } from "@/layout"
import { userAPI } from "@/services"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { RootState } from "../core"

const ResetPasswordP = () => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)

  const handleResetPassword = async (token: string) => {
    await userAPI.setToken(token)
    router.push(router.query.next as string)
  }

  return (
    <AuthLayout
      headerClassName="hidden md:flex"
      className="bg-white-color sm:bg-white-color md:bg-bg min-h-[100vh] md:min-h-[calc(100vh-80px)] py-24"
    >
      <Seo description="" thumbnailUrl="" title="Đặt lại mật khẩu" url="reset-password" />
      <HeaderMobile className="md:hidden" title="Đặt lại mật khẩu" />

      <section className="reset-password-page md:py-24 content-container bg-white-color mt-[56px] md:mt-0 px-12 md:px-24 block-element">
        <div className="hidden md:flex items-center mb-24">
          <button onClick={() => router.back()} className="flex-center mr-24">
            <ArrowLeft2Icon className="h-12 w-8" />
          </button>
          <h3 className="md:font-medium md:normal-case md:h4">Đặt lại mật khẩu</h3>
        </div>

        <ResetPassword
          view="page"
          defaultPhoneNumber={userInfo?.phone}
          onSuccess={(token) => handleResetPassword(token)}
        />
      </section>
    </AuthLayout>
  )
}

export default ResetPasswordP
