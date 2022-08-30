import { ArrowLeft2Icon, HomeIcon, ThreeDotsIcon } from "@/assets"
import { RootState } from "@/core/store"
import { useClickOutside, useScrollTop } from "@/hooks"
import { useRouter } from "next/router"
import { ReactNode, useRef, useState } from "react"
import { useSelector } from "react-redux"

interface HeaderMobileProps {
  onBackBtnClick?: Function
  title: string
  rightNode?: ReactNode
  showHomeBtn?: boolean
  className?: string
}

const HeaderMobile = ({
  onBackBtnClick,
  title,
  rightNode = null,
  showHomeBtn = true,
  className = "",
}: HeaderMobileProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const height = useScrollTop()
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)
  const [showMenu, setShowMenu] = useState<boolean>(false)

  useClickOutside([ref], () => {
    setShowMenu(false)
  })

  return (
    <div
      className={`flex items-center ${
        height > 56 ? "shadow-shadow-1" : ""
      } h-[56px] fixed bg-white-color py-16 z-[1000] left-0 right-0 top-0 px-24 border-b border-border-color border-solid ${className}`}
    >
      <button
        className="p-4 pl-0"
        onClick={() => (onBackBtnClick ? onBackBtnClick() : router.back())}
      >
        <ArrowLeft2Icon className="w-[10px] h-[16px]" />
      </button>
      <h3 className="text-base flex-1 text-center font-semibold line-clamp-1 ml-16">{title}</h3>
      {rightNode}
      {showHomeBtn ? (
        <div ref={ref} className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="ml-12 p-4 pr-0">
            <ThreeDotsIcon className="h-[18px]" />
          </button>

          {showMenu ? (
            <ul className="p-8 rounded-[5px] w-[220px] block-element border border-gray-color-1 border-solid absolute top-[calc(100%-0px)] right-0">
              <li
                onClick={() => {
                  router.push(userInfo?.car_account_type === "car_driver" ? "/d" : "/c")
                  setShowMenu(false)
                }}
                className="flex items-center p-12 cursor-pointer hover:bg-bg rounded-[5px]"
              >
                <HomeIcon className="w-[20px]" />
                <span className="text-sm whitespace-nowrap ml-[10px]">Trang chủ</span>
              </li>
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export { HeaderMobile }
