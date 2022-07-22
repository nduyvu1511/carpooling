import { Footer, Header } from "@/components"
import { LayoutProps } from "@/models"

const GuestLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export { GuestLayout }
