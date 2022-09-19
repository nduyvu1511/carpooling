import { AuthHeader } from "@/components"
import { RootState } from "@/core/store"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import { useSelector } from "react-redux"

interface DriverLayoutProps {
  children: ReactNode
  showHeaderOnMobile?: boolean
}

const DriverLayout = ({ children, showHeaderOnMobile = false }: DriverLayoutProps) => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)

  useEffect(() => {
    if (userInfo?.car_account_type !== "car_driver") {
      router.push("/")
    }
  }, [userInfo, router])

  return (
    <>
      <AuthHeader className={`${showHeaderOnMobile ? "" : "hidden lg:flex"}`} />
      <main className="min-h-screen h-full bg-bg flex flex-col">{children}</main>
    </>
  )
}

export { DriverLayout }
