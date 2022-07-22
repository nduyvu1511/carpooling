import { AuthHeader } from "@/components"
import { LayoutProps } from "@/models"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../core"

const CustomerLayout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)

  useEffect(() => {
    if (userInfo?.car_account_type !== "customer") {
      router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  return (
    <section className="">
      <AuthHeader />
      <main className="min-h-[calc(100vh-80px)] h-full bg-bg">{children}</main>
    </section>
  )
}

export { CustomerLayout }
