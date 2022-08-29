/* eslint-disable react/jsx-key */
import { CarpoolingIcon, ConvenientIcon, mapbanner, OneWayIcon, TwoWayIcon } from "@/assets"
import { toggleBodyOverflow } from "@/helper"
import { setAuthModalType } from "@/modules"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { Autoplay } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react"

export const HeroSection = () => {
  const dispatch = useDispatch()
  return (
    <>
      <div className="relative h-full w-full">
        <div className="relative w-full h-full">
          <Image src={mapbanner} alt="" className="" objectFit="cover" layout="fill" />
        </div>
        <div className="absolute inset-0 p-24">
          <div className="absolute w-[80%] xs:w-[55%] sm:w-[40%] md:w-[35%] lg:w-[40%] xl:w-[40%] top-2/3 sm:top-1/2 flex flex-col items-end transform -translate-y-1/2 right-16 sm:right-24">
            <Swiper
              className="w-full"
              slidesPerView={1}
              modules={[Autoplay]}
              autoplay={{ delay: 4000 }}
              loop
            >
              {[
                ["Đặt xe đường dài", "Ứng dụng gọi xe đường dài số 1 Việt Nam"],
                ["Tiết kiệm chi phí", "Tối ưu chi phí chuyến đi và đảm bảo chất lượng"],
                ["Nhiều mô hình chuyến đi", "Phù hợp với nhu cầu của hành khách"],
                ["Minh bạch về giá cả", "Lợi ích rõ ràng, chi tiết cho hành khách và đối tác"],
              ].map(([title, desc], index) => (
                <SwiperSlide key={index}>
                  <div className="flex items-start flex-col">
                    <h1 className="text-[20px] sm:text-24 md:text-[30px] xl:text-[40px] text-primary mb-[8px] md:mb-[12px] font-semibold lg:font-medium">
                      {title}
                    </h1>
                    <p className="text-text-color text-xs xs:text-14 leading-[22px] md:text-16 lg:text-[20px] lg:leading-[26px] xl:text-24 xl:leading-[28px]">
                      {desc}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="absolute bottom-24 xl:bottom-[80px] left-1/2 transform -translate-x-1/2 container hidden md:block">
          <div className="flex-center flex-col">
            <p className="text-base mb-16 font-semibold">Bạn muốn đi đâu?</p>
            <ul className="grid grid-cols-4 gap-x-16">
              {[
                ["Hai chiều", "two_way", <TwoWayIcon />],
                ["Một chiều", "one_way", <OneWayIcon />],
                ["Ghép chuyến", "compounding", <CarpoolingIcon />],
                ["Tiện chuyến", "convenient", <ConvenientIcon />],
              ].map(([label, _, icon], index) => (
                <li
                  onClick={() => {
                    dispatch(setAuthModalType("login"))
                    toggleBodyOverflow("hidden")
                  }}
                  className="cursor-pointer flex-center flex-col p-16 rounded-[10px] shadow-shadow-1 border border-solid border-border-color bg-white-color hover:bg-bg-primary transition-colors duration-300"
                  key={index}
                >
                  <span className="mb-8 flex-1 my-auto flex items-center">{icon}</span>
                  <span className="text-sm">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
