import { HeaderMobile, Seo, Wallet } from "@/components"
import { DriverAccountLayout } from "@/layout"

const WalletDriver = () => {
  return (
    <DriverAccountLayout showHeaderMobile={false}>
      <Seo description="Ví cá nhân" title="Ví cá nhân" url="c/account/wallet" />
      <HeaderMobile title="Ví cá nhân" className="lg:hidden" />
      <Wallet />
    </DriverAccountLayout>
  )
}

export default WalletDriver
