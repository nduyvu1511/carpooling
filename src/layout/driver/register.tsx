import { ArrowLeftIcon } from "@/assets"
import { useRouter } from "next/router"
import { ReactNode } from "react"

interface DriverRegisterLayout {
  children: ReactNode
  heading: string
  onBackBtnClick?: Function
  rightHeaderElement?: ReactNode
}

export const DriverRegisterLayout = ({
  children,
  heading,
  onBackBtnClick,
  rightHeaderElement,
}: DriverRegisterLayout) => {
  const router = useRouter()

  return (
    <section className="content-container">
      <header className="flex items-center h-[60px]">
        <button
          onClick={() => (!onBackBtnClick ? router.back() : onBackBtnClick())}
          className="w-[30px]"
        >
          <ArrowLeftIcon />
        </button>
        <h3 className="text-16 font-semibold flex-1 ml-[24px] text-center">{heading}</h3>
        <div className="">{rightHeaderElement || null}</div>
      </header>
      <div className="">{children}</div>
    </section>
  )
}
