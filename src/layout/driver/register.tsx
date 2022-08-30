import { ArrowLeft2Icon, HomeIcon } from "@/assets"
import { useScrollTop } from "@/hooks"
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

const Header = ({ onBackBtnClick, heading, rightHeaderElement, onRightBtnClick }: HeaderProps) => {
  const height = useScrollTop()
  const router = useRouter()

  return (
    <header
      className={`h-[60px] px-16 sm:px-24 md:px-0 sticky top-0 bg-white-color z-[100] ${
        height > 30 ? " border-b border-solid border-border-color shadow-shadow-1" : ""
      }`}
    >
      <div className="content-container flex items-center h-full">
        <button
          onClick={() => (!onBackBtnClick ? router.back() : onBackBtnClick())}
          className="w-[30px]"
        >
          <ArrowLeft2Icon className="w-[10px] h-[16px]" />
        </button>
        <h3 className="text-16 font-semibold flex-1 text-center">{heading}</h3>
        <div className="">
          {rightHeaderElement ||
            (onRightBtnClick ? (
              <button className="w-[30px] flex justify-end" onClick={() => onRightBtnClick?.()}>
                <HomeIcon />
              </button>
            ) : null)}
        </div>
      </div>
    </header>
  )
}

export const DriverRegisterLayout = ({
  children,
  heading,
  onBackBtnClick,
  rightHeaderElement,
  onRightBtnClick,
}: DriverRegisterLayout) => {
  return (
    <DriverEmptyLayout>
      <Header
        heading={heading}
        onBackBtnClick={onBackBtnClick}
        rightHeaderElement={rightHeaderElement}
        onRightBtnClick={onRightBtnClick}
      />
      <section className="content-container driver-register-layout pt-12">
        <main className="">{children}</main>
      </section>
    </DriverEmptyLayout>
  )
}
