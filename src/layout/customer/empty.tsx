import { RootState } from "@/core/store"
import { LayoutProps } from "@/models"
import { useRouter } from "next/router"
import { useEffect, useLayoutEffect } from "react"
import { useSelector } from "react-redux"

const CustomerEmptyLayout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)

  useLayoutEffect(() => {
    if (userInfo?.car_account_type !== "customer") {
      router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  return <>{children}</>
}

export { CustomerEmptyLayout }
