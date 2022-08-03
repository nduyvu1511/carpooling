import { AuthHeader, ButtonCall } from "@/components"
import { LayoutProps } from "@/models"

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <AuthHeader />
      <main>{children}</main>
      <div className="fixed bottom-[40px] right-[20px] z-[999]">
        <ButtonCall />
      </div>
    </>
  )
}

export { MainLayout }
