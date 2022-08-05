import { HeaderMobile, ResetPassword } from "@/components"
import { AuthLayout } from "@/layout"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { RootState } from "../core"

const ResetPasswordP = () => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)

  return (
    <AuthLayout headerClassName="hidden lg:flex">
      <HeaderMobile className="lg:hidden" title="Đặt lại mật khẩu" />
      <section className="reset-password-page lg:py-24 bg-white-color lg:bg-[transparent] min-h-[calc(100vh-56px)] lg:min-h-[unset] pt-[56px]">
        <div className="content-container block-element py-24 px-12 md:p-24">
          <h3 className="hidden lg:block mb-24 md:font-medium md:normal-case md:h4">
            Đặt lại mật khẩu
          </h3>
          <ResetPassword
            view="page"
            defaultPhoneNumber={userInfo?.phone}
            onSuccess={() => router.push(router.query.next as string)}
          />
        </div>
      </section>
    </AuthLayout>
  )
}

export default ResetPasswordP
