import { RootState } from "@/core/store"
import { LayoutProps } from "@/models"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const DriverEmptyLayout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)

  useEffect(() => {
    if (userInfo?.car_account_type !== "car_driver") {
      router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  return <>{children}</>
}

export { DriverEmptyLayout }
