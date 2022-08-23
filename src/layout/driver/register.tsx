import { ArrowLeftIcon, HomeIcon } from "@/assets"
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
      className={`flex items-center h-[60px] px-16 sm:px-0 sticky top-0 bg-white-color z-[100] ${
        height > 60 ? " border-b border-solid border-border-color" : ""
      }`}
    >
      <button
        onClick={() => (!onBackBtnClick ? router.back() : onBackBtnClick())}
        className="w-[30px]"
      >
        <ArrowLeftIcon />
      </button>
      <h3 className="text-16 font-semibold flex-1 ml-[24px] text-center">{heading}</h3>
      <div className="">
        {rightHeaderElement ||
          (onRightBtnClick ? (
            <button onClick={() => onRightBtnClick?.()}>
              <HomeIcon />
            </button>
          ) : null)}
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
      <section className="content-container driver-register-layout">
        <Header
          heading={heading}
          onBackBtnClick={onBackBtnClick}
          rightHeaderElement={rightHeaderElement}
          onRightBtnClick={onRightBtnClick}
        />
        <main className="">{children}</main>
      </section>
    </DriverEmptyLayout>
  )
}
