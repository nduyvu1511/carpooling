import { AuthHeader } from "@/components"
import { ReactNode } from "react"
import { CustomerEmptyLayout } from "./empty"

interface CustomerLayoutProps {
  children: ReactNode
  showHeaderOnMobile?: boolean
  headerClassName?: string
}

const CustomerLayout = ({
  children,
  showHeaderOnMobile = true,
  headerClassName = "",
}: CustomerLayoutProps) => {
  return (
    <CustomerEmptyLayout>
      <AuthHeader className={`${showHeaderOnMobile ? "" : "hidden lg:flex"} ${headerClassName}`} />
      <main className="min-h-screen lg:min-h-[calc(100vh-80px)] flex flex-col h-full bg-bg">
        {children}
      </main>
    </CustomerEmptyLayout>
  )
}

export { CustomerLayout }
