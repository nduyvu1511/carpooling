import { AuthHeader } from "@/components"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../core"

interface CustomerLayoutProps {
  children: ReactNode
  showHeaderOnMobile?: boolean
}

const CustomerLayout = ({ children, showHeaderOnMobile = true }: CustomerLayoutProps) => {
  const router = useRouter()
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

  useEffect(() => {
    if (userInfo?.car_account_type !== "customer") {
      router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  return (
    <>
      <AuthHeader className={`${showHeaderOnMobile ? "" : "hidden lg:flex"}`} />
      <main className="min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-80px)] flex flex-col h-full bg-bg">
        {children}
      </main>
    </>
  )
}

export { CustomerLayout }
