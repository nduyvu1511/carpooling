import { AuthHeader } from "@/components"
import { ReactNode } from "react"
import { DriverEmptyLayout } from "./empty"

interface DriverLayoutProps {
  children: ReactNode
  showHeaderOnMobile?: boolean
}

const DriverLayout = ({ children, showHeaderOnMobile = false }: DriverLayoutProps) => {
  return (
    <DriverEmptyLayout>
      <AuthHeader className={`${showHeaderOnMobile ? "" : "hidden lg:flex"}`} />
      <main className="min-h-screen h-full bg-bg flex flex-col">{children}</main>
    </DriverEmptyLayout>
  )
}

export { DriverLayout }
