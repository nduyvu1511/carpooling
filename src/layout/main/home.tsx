import { AuthHeader, ButtonCall, Footer, Header } from "@/components"
import { RootState } from "@/core/store"
import { LayoutProps } from "@/models"
import { useSelector } from "react-redux"

const HomeLayout = ({ children }: LayoutProps) => {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)
  const isAuthAccount =
    userInfo?.car_account_type === "car_driver" || userInfo?.car_account_type === "customer"

  return (
    <>
      {isAuthAccount ? <AuthHeader /> : <Header />}

      {isAuthAccount ? (
        <main className="min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-80px)] flex flex-col h-full bg-bg">
          {children}
        </main>
      ) : (
        <main>{children}</main>
      )}

      {!isAuthAccount ? (
        <>
          <Footer />
          <ButtonCall />
        </>
      ) : null}
    </>
  )
}

export { HomeLayout }
