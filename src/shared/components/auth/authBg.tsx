import { driverImage } from "@/assets"
import Image from "next/image"

export const AuthBg = () => {
  return (
    <div className="absolute w-full h-[324px] mx-auto mb-[24px] bottom-0">
      <div className="absolute inset-0 bg-linear-gradient z-10"></div>
      <Image src={driverImage} alt="" objectFit="contain" layout="fill" className="" />
    </div>
  )
}
