import { ResetPassword } from "@/components"
import { CustomerLayout } from "@/layout"
import { useRouter } from "next/router"

const ResetPasswordP = () => {
  const router = useRouter()
  console.log(router.query)

  return (
    <section className="py-24">
      <div className="content-container block-element p-24">
        <h3 className="mb-24 h4">Đặt lại mật khẩu</h3>
        <ResetPassword onSuccess={() => router.push(router.query.next as string)} />
      </div>
    </section>
  )
}

ResetPasswordP.Layout = CustomerLayout
export default ResetPasswordP
