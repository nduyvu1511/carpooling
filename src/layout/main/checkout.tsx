import { LogoIcon } from "@/assets"
import { LayoutProps } from "@/models"

export const CheckoutLayout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-bg">
      <div className="bg-white-color">
        <div className="h-[80px] container shadow-shadow-1 flex items-center">
          <LogoIcon />
        </div>
      </div>

      <main className="min-h-[calc(100vh-80px)] flex flex-col md:py-16 lg:py-24">
        <div className="max-w-[760px] p-custom w-full mx-auto flex-1 block-element">{children}</div>
      </main>
    </div>
  )
}
