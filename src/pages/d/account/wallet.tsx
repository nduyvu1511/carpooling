import { HeaderMobile, Seo, Wallet } from "@/components"
import { DriverAccountLayout } from "@/layout"

const WalletDriver = () => {
  return (
    <DriverAccountLayout showHeaderMobile={false}>
      <Seo description="Tài khoản cá nhân" title="Tài khoản cá nhân" url="c/account/wallet" />
      <HeaderMobile title="Tài khoản cá nhân" className="lg:hidden" />
      <Wallet />
    </DriverAccountLayout>
  )
}

export default WalletDriver
