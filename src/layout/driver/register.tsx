import { ArrowLeft2Icon } from "@/assets"
import { HeaderEmpty, HeaderWrapper } from "@/components"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { DriverEmptyLayout } from "."

interface HeaderProps {
  onBackBtnClick?: Function
  heading: string
  rightHeaderElement?: ReactNode
  onRightBtnClick?: Function
}

interface DriverRegisterLayout extends HeaderProps {
  children: ReactNode
}

export const DriverRegisterLayout = ({
  children,
  heading,
  onBackBtnClick,
}: DriverRegisterLayout) => {
  const router = useRouter()
  return (
    <DriverEmptyLayout>
      <HeaderWrapper className="hidden md:block">
        <HeaderEmpty />
      </HeaderWrapper>

      <section className="driver-register-layout bg-white-color md:bg-bg md:py-16 lg:py-24 min-h-[calc(100vh-60px)] md:min-h-[calc(100vh-80px)]">
        <main className="content-container block-element">
          <div className="fixed z-[1000] md:z-0 md:static left-0 right-0 top-0 bg-white-color flex px-12 sm:px-24 md:pt-24 items-center mb-24 md:mb-40 h-[56px] md:h-fit border-b border-border-color border-solid md:border-none">
            <button
              onClick={() => (!onBackBtnClick ? router.back() : onBackBtnClick())}
              className="w-24 h-24 md:w-[40px] md:h-[40px] mr-12 md:mr-16 flex-center"
            >
              <ArrowLeft2Icon className="w-[8px] h-[12px]" />
            </button>
            <h3 className="text-16 md:text-18 font-semibold leading-[22px] md:leading-[24px] flex-1 text-center md:text-left line-clamp-1">
              {heading}
            </h3>
            <span className="w-24"></span>
          </div>

          <div className="px-12 pt-24 pb-12 md:pt-0 md:px-24 md:pb-24 mt-[56px] md:mt-0">
            {children}
          </div>
        </main>
      </section>
    </DriverEmptyLayout>
  )
}
