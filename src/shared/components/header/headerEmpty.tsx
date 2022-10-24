import { LogoIcon } from "@/assets"
import { RootState } from "@/core/store"
import { useRouter } from "next/router"
import React from "react"
import { useSelector } from "react-redux"

export const HeaderEmpty = () => {
  const router = useRouter()
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

  return (
    <div className="container flex items-center justify-start h-full">
      <div onClick={() => router.push("/")} className="">
        <LogoIcon className="cursor-pointer" />
      </div>
    </div>
  )
}
