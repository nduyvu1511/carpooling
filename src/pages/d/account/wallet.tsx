import { HeaderMobile, Wallet } from "@/components"
import { DriverAccountLayout } from "@/layout"

const WalletDriver = () => {
  return (
    <DriverAccountLayout showHeaderMobile={false}>
      <HeaderMobile title="Ví cá nhân" className="lg:hidden" />
      <Wallet />
    </DriverAccountLayout>
  )
}

export default WalletDriver
