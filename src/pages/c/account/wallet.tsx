import { HeaderMobile, Journal } from "@/components"
import { CustomerAccountLayout } from "@/layout"

const WalletCustomer = () => {
  return (
    <CustomerAccountLayout showHeaderMobile={false}>
    <HeaderMobile title="Ví cá nhân" className="lg:hidden" />
      <Journal />
    </CustomerAccountLayout>
  )
}

export default WalletCustomer
