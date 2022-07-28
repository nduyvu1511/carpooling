import { ArrowLeftIcon, HomeIcon } from "@/assets"
import { RootState } from "@/core/store"
import { useScrollTop } from "@/hooks"
import { useRouter } from "next/router"
import { ReactNode, useState } from "react"
import { useSelector } from "react-redux"

interface HeaderMobileProps {
  onBackBtnClick?: Function
  title: string
  rightNode?: ReactNode
  showHomeBtn?: boolean
}

const HeaderMobile = ({
  onBackBtnClick,
  title,
  rightNode = null,
  showHomeBtn = true,
}: HeaderMobileProps) => {
  const router = useRouter()
  const height = useScrollTop()
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

  return (
    <div
      className={`flex items-center ${
        height > 56 ? "shadow-shadow-1" : ""
      } h-[56px] fixed bg-white-color py-[16px] z-[1000] left-0 right-0 top-0 px-24 border-b border-border-color border-solid`}
    >
      <button onClick={() => (onBackBtnClick ? onBackBtnClick() : router.back())}>
        <ArrowLeftIcon />
      </button>
      <h3 className="text-base flex-1 text-center font-semibold line-clamp-1 ml-[16px]">{title}</h3>
      {rightNode}
      {showHomeBtn ? (
        <button
          onClick={() => router.push(userInfo?.car_account_type === "car_driver" ? "/d" : "/c")}
        >
          <HomeIcon />
        </button>
      ) : null}
    </div>
  )
}

export { HeaderMobile }
