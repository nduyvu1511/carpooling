/* eslint-disable react/jsx-key */
import { CarpoolingIcon, mapbanner, OneWayIcon, TwoWayIcon } from "@/assets"
import { toggleBodyOverflow } from "@/helper"
import { CompoundingType } from "@/models"
import Image from "next/image"
import { useState } from "react"
import { BookingModal } from "../form"

export const HeroSection = () => {
  const [modalType, setModalType] = useState<CompoundingType | undefined>()

  return (
    <>
      <div className="relative h-full w-full">
        <div className="relative w-full h-full">
          <Image src={mapbanner} alt="" className="" objectFit="cover" layout="fill" />
        </div>
        <div className="absolute inset-0 container">
          <div className="absolute top-1/2 transform -translate-y-1/2 right-[0]">
            <h1 className="home-heading font-[700] mb-[24px]">GỌI XE ĐƯỜNG DÀI</h1>
            <p className="text-text-color text-[24px] font-[400] leading-[26px]">
              Ứng dụng gọi xe đường dài số 1 Việt Nam
            </p>
          </div>
        </div>

        <div className="absolute bottom-[80px] left-1/2 transform -translate-x-1/2 container">
          <div className="flex-center flex-col">
            <p className="text-base mb-[16px] font-semibold">Bạn muốn đi đâu?</p>

            <ul className="grid grid-cols-4 gap-x-[16px]">
              {[
                ["Hai chiều", "two_way", <TwoWayIcon />, "#EE542F"],
                ["Một chiều", "one_way", <OneWayIcon />, "#2E4CB7"],
                ["Ghép chuyến", "compounding", <CarpoolingIcon />, "#278EA5"],
                ["Tiện chuyến", "compounding", <CarpoolingIcon />, "#7D27A5"],
              ].map(([label, value, icon, color], index) => (
                <li
                  onClick={() => {
                    setModalType(value as CompoundingType)
                    toggleBodyOverflow("hidden")
                  }}
                  className="cursor-pointer flex-center flex-col p-[16px] rounded-[10px] shadow-shadow-1 border border-solid border-border-color bg-white-color"
                  key={index}
                >
                  <span className="mb-8">{icon}</span>
                  <span style={{ color: color as string }} className="text-base font-semibold">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {modalType ? (
        <BookingModal
          formType={modalType}
          onClose={() => {
            setModalType(undefined)
            toggleBodyOverflow("unset")
          }}
        />
      ) : null}
    </>
  )
}
