import { AuthHeader, ResetPassword } from "@/components"
import { CustomerLayout } from "@/layout"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../core"

const ResetPasswordP = () => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)

  useEffect(() => {
    if (!userInfo) {
      router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  return (
    <section className="">
      <AuthHeader />
      <main className="min-h-[calc(100vh-80px)] h-full bg-bg">
        <section className="py-24">
          <div className="content-container block-element p-24">
            <h3 className="mb-24 h4">Đặt lại mật khẩu</h3>
            <ResetPassword onSuccess={() => router.push(router.query.next as string)} />
          </div>
        </section>
      </main>
    </section>
  )
}

ResetPasswordP.Layout = CustomerLayout
export default ResetPasswordP
