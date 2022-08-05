import { AccountLayoutProps } from "@/models"
import { AccountLayout } from "../common"
import { CustomerLayout } from "./customer"

type CustomerAccountLayoutProps = Omit<AccountLayoutProps, "navList">

const CustomerAccountLayout = ({
  children,
  desc,
  title,
  showHeaderMobile,
}: CustomerAccountLayoutProps) => {
  return (
    <CustomerLayout showHeaderOnMobile={false}>
      <AccountLayout showHeaderMobile={showHeaderMobile} desc={desc} title={title}>
        {children}
      </AccountLayout>
    </CustomerLayout>
  )
}

export { CustomerAccountLayout }

