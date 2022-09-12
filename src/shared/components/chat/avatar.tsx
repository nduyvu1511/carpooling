import Image from "next/image"
import React from "react"

interface AvatarProps {
  avatar: string
  isOnline?: boolean
}

export const Avatar = ({ avatar, isOnline }: AvatarProps) => {
  return (
    <div className="w-[46px] h-[46px] rounded-[50%] relative">
      <Image src={avatar} alt="" className="rounded-[50%]" layout="fill" objectFit="cover" />
      <span className="absolute right-0 bottom-[4px] w-[8px] h-[8px] bg-[#22DF64] shadow-shadow-1 rounded-[50%]"></span>
    </div>
  )
}
