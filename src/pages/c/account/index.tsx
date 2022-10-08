import { AccountDashboard, Seo } from "@/components"
import { RootState } from "@/core/store"
import { CustomerLayout } from "@/layout"
import { useSelector } from "react-redux"

const Account = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

  return (
    <div className="lg:max-w-content-container-width mx-auto w-full block-element lg:mt-24 flex-1 md:flex-none bg-white-color">
      <Seo description="Tài khoản" thumbnailUrl="" title="Tài khoản" url="c/account" />
      {userInfo ? <AccountDashboard userInfo={userInfo} /> : null}
    </div>
  )
}

Account.Layout = CustomerLayout
export default Account
