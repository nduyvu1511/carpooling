import { HeaderMobile, Wallet, Seo } from "@/components"
import { CustomerAccountLayout } from "@/layout"

const WalletCustomer = () => {
  return (
    <CustomerAccountLayout showHeaderMobile={false}>
      <Seo
        description="Tài khoản cá nhân"
        thumbnailUrl=""
        title="Tài khoản cá nhân"
        url="c/account/wallet"
      />
      <HeaderMobile title="Tài khoản cá nhân" className="lg:hidden" />
      <Wallet />
    </CustomerAccountLayout>
  )
}

export default WalletCustomer
