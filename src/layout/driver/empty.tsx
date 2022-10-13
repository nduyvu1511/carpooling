import { RootState } from "@/core/store"
import { LayoutProps } from "@/models"
import { useRouter } from "next/router"
import { useLayoutEffect } from "react"
import { useSelector } from "react-redux"

const DriverEmptyLayout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)

  useLayoutEffect(() => {
    if (userInfo?.car_account_type !== "car_driver") {
      router.push("/")
    }
  }, [userInfo, router])

  return <>{children}</>
}

export { DriverEmptyLayout }
