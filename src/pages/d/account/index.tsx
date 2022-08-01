import { AccountDashboard } from "@/components"
import { RootState } from "@/core/store"
import { DriverLayout } from "@/layout"
import { useSelector } from "react-redux"

const Account = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

  return (
    <DriverLayout showHeaderOnMobile>
      <div className="lg:max-w-content-container-width mx-auto md:min-h-[calc(100vh-80px)] w-full block-element lg:mt-24 flex-1 md:flex-none bg-white-color">
        {userInfo ? <AccountDashboard userInfo={userInfo} /> : null}
      </div>
    </DriverLayout>
  )
}

export default Account
