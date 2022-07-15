import { AccountLayoutProps } from "@/models"
import { AccountLayout } from "../common"
import { DriverLayout } from "./driver"

type DriverAccountLayoutProps = Omit<AccountLayoutProps, "navList">

const DriverAccountLayout = ({ children, desc, title }: DriverAccountLayoutProps) => {
  return (
    <DriverLayout>
      <AccountLayout desc={desc} title={title}>
        {children}
      </AccountLayout>
    </DriverLayout>
  )
}

export { DriverAccountLayout }
