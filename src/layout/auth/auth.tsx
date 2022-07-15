import { AuthHeader } from "@/components"
import { RootState } from "@/core/store"
import { LayoutProps } from "@/models"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { App } from "../main"

const AuthLayout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)

  useEffect(() => {
    if (!userInfo?.car_account_type) {
      router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  return (
    <App>
      <AuthHeader />
      <main className="min-h-[calc(100vh-80px)] h-full bg-bg">{children}</main>
    </App>
  )
}

export { AuthLayout }
