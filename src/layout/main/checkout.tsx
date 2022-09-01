import { LogoIcon } from "@/assets"
import { LayoutProps } from "@/models"

export const CheckoutLayout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-bg">
      <div className="bg-white-color">
        <div className="h-[80px] container shadow-shadow-1 flex items-center md:mb-24">
          <LogoIcon />
        </div>
      </div>

      <main className="min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-104px)] flex flex-col">
        <div className="content-container flex-1 md:mb-24">{children}</div>
      </main>
    </div>
  )
}
