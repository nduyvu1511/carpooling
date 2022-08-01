/* eslint-disable react/jsx-key */
import { CarpoolingIcon, ConvenientIcon, mapbanner, OneWayIcon, TwoWayIcon } from "@/assets"
import { toggleBodyOverflow } from "@/helper"
import { useBackRouter } from "@/hooks"
import { CompoundingType } from "@/models"
import Image from "next/image"
import { useState } from "react"
import "swiper/css"
import "swiper/css/navigation"
import { BookingModal } from "../form"

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
        <div className="absolute inset-0 container">
          <div className="absolute w-1/2 top-2/3 sm:top-1/2 flex flex-col items-end transform -translate-y-1/2 right-[16px] sm:right-24">
            <h1 className="h1 text-primary mb-[8px] md:mb-[12px] font-semibold lg:font-medium">
              Đặt xe đường dài
            </h1>
            <p className="text-text-color text-sm leading-[22px] sm:text-base lg:text-xl">
              Ứng dụng gọi xe đường dài số 1 Việt Nam
            </p>
          </div>
        </div>

        <div className="absolute bottom-24 xl:bottom-[80px] left-1/2 transform -translate-x-1/2 container hidden md:block">
          <div className="flex-center flex-col">
            <p className="text-base mb-[16px] font-semibold">Bạn muốn đi đâu?</p>

            <ul className="grid grid-cols-4 gap-x-[16px]">
              {[
                ["Hai chiều", "two_way", <TwoWayIcon />, "#EE542F"],
                ["Một chiều", "one_way", <OneWayIcon />, "#2E4CB7"],
                ["Ghép chuyến", "compounding", <CarpoolingIcon />, "#278EA5"],
                ["Tiện chuyến", "convenient", <ConvenientIcon />, "#7D27A5"],
              ].map(([label, value, icon, color], index) => (
                <li
                  onClick={() => {
                    setModalType(value as CompoundingType)
                    toggleBodyOverflow("hidden")
                  }}
                  className="cursor-pointer flex-center flex-col p-[16px] rounded-[10px] shadow-shadow-1 border border-solid border-border-color bg-white-color"
                  key={index}
                >
                  <span className="mb-8 flex-1 my-auto flex items-center">{icon}</span>
                  <span style={{ color: color as string }} className="text-base font-semibold">
                    {label}
                  </span>
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
