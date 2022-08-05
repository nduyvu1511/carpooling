import { AccountLayoutProps } from "@/models"
import { AccountLayout } from "../common"
import { DriverLayout } from "./driver"

type DriverAccountLayoutProps = Omit<AccountLayoutProps, "navList">

const DriverAccountLayout = ({
  children,
  desc,
  title,
  showHeaderMobile,
}: DriverAccountLayoutProps) => {
  return (
    <DriverLayout>
      <AccountLayout showHeaderMobile={showHeaderMobile} desc={desc} title={title}>
        {children}
      </AccountLayout>
    </DriverLayout>
  )
}

export { DriverAccountLayout }
