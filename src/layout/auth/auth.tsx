import { AuthHeader } from "@/components"
import { RootState } from "@/core/store"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import { useSelector } from "react-redux"

interface AuthLayoutProps {
  children: ReactNode
  headerClassName?: string
}

const AuthLayout = ({ children, headerClassName = "" }: AuthLayoutProps) => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)

  useEffect(() => {
    if (!userInfo?.car_account_type) {
      router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  return (
    <>
      <AuthHeader className={headerClassName} />
      <main className="min-h-[calc(100vh-80px)] h-full bg-bg flex flex-col">{children}</main>
    </>
  )
}

export { AuthLayout }
