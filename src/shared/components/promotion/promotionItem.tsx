import { ArrowRightIcon, ClockIcon, promotionShape1, promotionShape2 } from "@/assets"
import Image from "next/image"
import React from "react"

export const PromotionItem = () => {
  return (
    <div className="p-[16px] md:p-24 rounded-[16px] bg-blue-10 relative">
      <span className="absolute top-[-4px] right-24 bg-[#FDF3F3] py-12 px-6 rounded-bl-[20px] rounded-br-[20px] rounded-tl-[3px] rounded-tr-[3px] text-[10px] font-medium text-error">
        85%
      </span>
      <div className="absolute inset-0 overflow-hidden rounded-[16px]">
        <span className="absolute-vertical z-10  h-[18px] w-[18px] bg-white-color left-[-9px] rounded-[50%]"></span>
        <span className="absolute-vertical z-10 h-[18px] w-[18px] bg-white-color right-[-9px] rounded-[50%]"></span>
        <div className="absolute h-[60%] left-0 right-0 bottom-0">
          <div className="absolute right-0 h-full bottom-0 w-full">
            <Image src={promotionShape1} alt="" objectFit="cover" layout="fill" />
          </div>
          <div className="absolute right-0 bottom-[-40px] w-full h-[116px]">
            <Image src={promotionShape2} alt="" objectFit="cover" layout="fill" />
          </div>
        </div>
      </div>

      <div className="z-10">
        <div className="flex items-center mb-8">
          <p className="text-16 lg:text-18 font-semibold text-primary line-clamp-1">
            Tài khoản tích luỹ
          </p>
          <p className="mx-8 border-r border-border-color-1 border-solid h-[14px]"></p>
          <p className="text-16 lg:text-18 font-semibold text-primary mr-8 line-clamp-1">
            Giảm 100k
          </p>
          <span className="bg-primary py-4 px-[10px] rounded-[5px] text-[10px] md:text-12 font-semibold text-white-color">
            APPEXXE
          </span>
        </div>

        <div className="flex items-center mb-8">
          <p className="text-xs mr-16 text-blue-8">Sử dụng với chuyến đi trên 3.000.000 đ </p>
          <ArrowRightIcon />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ClockIcon className="mr-8 z-10" />
            <p className="text-[10px] sm:text-12 font-normal mr-8 text-blue-8 z-10">31/08/2022</p>
            <span className="bg-white-color py-4 px-8 rounded-[5px] text-12 font-normal text-error z-10">
              còn 2 ngày
            </span>
          </div>

          <button className="text-sm md:text-base font-semibold text-primary z-10">Áp dụng</button>
        </div>
      </div>
    </div>
  )
}
