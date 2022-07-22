import { AuthHeader } from "@/components"
import { LayoutProps } from "@/models"

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <AuthHeader />
      <main>{children}</main>
    </>
  )
}

export { MainLayout }
