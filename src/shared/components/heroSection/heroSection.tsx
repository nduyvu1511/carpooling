/* eslint-disable react/jsx-key */
import { CarpoolingIcon, ConvenientIcon, mapbanner, OneWayIcon, TwoWayIcon } from "@/assets"
import { toggleBodyOverflow } from "@/helper"
import { useBackRouter } from "@/hooks"
import { CompoundingType } from "@/models"
import Image from "next/image"
import { useState } from "react"
import { Autoplay } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { BookingModal } from "../form"
import Fade from "react-reveal"

export const HeroSection = () => {
  const [modalType, setModalType] = useState<CompoundingType | undefined>()

  useBackRouter({
    cb: () => {
      setModalType(undefined)
      toggleBodyOverflow("unset")
    },
  })

  return (
    <>
      <div className="relative h-full w-full">
        <div className="relative w-full h-full">
          <Image src={mapbanner} alt="" className="" objectFit="cover" layout="fill" />
        </div>
        <div className="absolute inset-0 p-24">
          <div className="absolute w-[50%] xs:w-[52%] sm:w-[40%] md:w-[35%] lg:w-[50%] xl:w-[40%] top-2/3 sm:top-1/2 flex flex-col items-end transform -translate-y-1/2 right-[16px] sm:right-24">
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
                  <div className="flex items-baseline flex-col">
                    <Fade bottom delay={100}>
                      <h1 className="h2 text-primary mb-[8px] md:mb-[12px] font-semibold lg:font-medium">
                        {title}
                      </h1>
                    </Fade>
                    <Fade bottom delay={100}>
                      <p className="text-text-color text-xs xs:text-sm leading-[22px] sm:text-base lg:text-xl font-medium">
                        {desc}
                      </p>
                    </Fade>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* <div className="absolute w-1/2 top-2/3 sm:top-1/2 flex flex-col items-end transform -translate-y-1/2 right-[16px] sm:right-24">
            <h1 className="h1 text-primary mb-[8px] md:mb-[12px] font-semibold lg:font-medium">
              Đặt xe đường dài
            </h1>
            <p className="text-text-color text-sm leading-[22px] sm:text-base lg:text-xl">
              Ứng dụng gọi xe đường dài số 1 Việt Nam
            </p>
          </div> */}
        </div>

        <div className="absolute bottom-24 xl:bottom-[80px] left-1/2 transform -translate-x-1/2 container hidden md:block">
          <div className="flex-center flex-col">
            <p className="text-base mb-[16px] font-semibold">Bạn muốn đi đâu?</p>

            <ul className="grid grid-cols-4 gap-x-[16px]">
              {[
                ["Hai chiều", "two_way", <TwoWayIcon />],
                ["Một chiều", "one_way", <OneWayIcon />],
                ["Ghép chuyến", "compounding", <CarpoolingIcon />],
                ["Tiện chuyến", "convenient", <ConvenientIcon />],
              ].map(([label, value, icon], index) => (
                <li
                  onClick={() => {
                    setModalType(value as CompoundingType)
                    toggleBodyOverflow("hidden")
                  }}
                  className="cursor-pointer flex-center flex-col p-[16px] rounded-[10px] shadow-shadow-1 border border-solid border-border-color bg-white-color"
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

      <BookingModal
        show={modalType}
        formType={modalType as CompoundingType}
        onClose={() => {
          setModalType(undefined)
          toggleBodyOverflow("unset")
        }}
      />
    </>
  )
}
