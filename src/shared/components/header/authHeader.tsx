import {
  AddIcon,
  blankAvatar,
  CarpoolingIcon,
  LogoIcon,
  OneWayIcon,
  QuestionIcon,
  TwoWayIcon,
} from "@/assets"
import { BookingModal, HeaderWrapper } from "@/components"
import { RootState } from "@/core/store"
import { COMPOUNDING_TYPE_BG, toggleBodyOverflow, toImageUrl } from "@/helper"
import { useBackRouter } from "@/hooks"
import { CompoundingType } from "@/models"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSelector } from "react-redux"
import { AccountMenu } from "../menu"

interface AuthHeaderProps {
  className?: string
}

const AuthHeader = ({ className = "" }: AuthHeaderProps) => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const [bookingType, setBookingType] = useState<CompoundingType | undefined>()

  const toggleBookingModal = (status: CompoundingType | undefined) => {
    setBookingType(status)
    if (status) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  useBackRouter({
    cb: () => {
      if (bookingType) {
        setBookingType(undefined)
        toggleBodyOverflow("unset")
      }
    },
  })

  return (
    <>
      <HeaderWrapper className={className}>
        <div className="container">
          <div className="flex items-center justify-between">
            <div
              onClick={() =>
                router.push(
                  userInfo?.car_account_type === "car_driver"
                    ? "/d"
                    : userInfo?.car_account_type === "customer"
                    ? "/c"
                    : "/"
                )
              }
              className=""
            >
              <LogoIcon className="cursor-pointer" />
            </div>

            <div className="flex items-center">
              <button
                onClick={() =>
                  toggleBookingModal(
                    userInfo?.car_account_type === "customer" ? "one_way" : "convenient"
                  )
                }
                className="flex-center py-8 px-[10px] rounded-[8px] bg-bg-blue h-[38px] lg:h-[40px] flex lg:hidden mr-12 sm:mr-24"
              >
                <AddIcon className="mr-8 w-[20px] h-[20px] text-blue-7" />
                <p className="text-xs sm:text-sm text-blue-7 font-medium">
                  <span className="hidden sm:block">Đặt chuyến mới</span>
                  <span className="sm:hidden">Đặt chuyến</span>
                </p>
              </button>

              {userInfo?.car_account_type === "customer" ? (
                <ul className="mr-[40px] hidden lg:flex">
                  {[
                    {
                      icon: <OneWayIcon />,
                      label: "Một chiều",
                      value: "one_way",
                    },
                    {
                      icon: <TwoWayIcon />,
                      label: "Hai chiều",
                      value: "two_way",
                    },
                    {
                      icon: <CarpoolingIcon />,
                      label: "Ghép chuyến",
                      value: "compounding",
                    },
                  ].map(({ icon, label, value }, index) => (
                    <li
                      style={{ backgroundColor: COMPOUNDING_TYPE_BG[value as CompoundingType] }}
                      onClick={() => {
                        toggleBookingModal(value as CompoundingType)
                      }}
                      className="flex-center bg-[#EEEBFF] mr-16 p-[8px] h-[40px] w-[140px] rounded-[5px] last:mr-0 cursor-pointer flex items-center"
                      key={index}
                    >
                      {icon}
                      <span className="ml-8 text-xs text-blue-8">{label}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <button
                  onClick={() => {
                    toggleBookingModal("convenient")
                  }}
                  className="flex-center py-8 px-[10px] rounded-[8px] bg-bg-blue hidden sm:flex mr-24 h-[38px] lg:h-[40px]"
                >
                  <AddIcon className="mr-8 w-[20px] h-[20px] text-blue-7" />
                  <span className="text-blue-7 text-sm">Đặt chuyến mới</span>
                </button>
              )}

              <div className="flex items-center">
                <div className="mr-24 hidden">
                  <Link passHref href="/guide">
                    <span className="cursor-pointer">
                      <QuestionIcon className="w-[24px] h-[24px]" />
                    </span>
                  </Link>
                </div>

                <div className="flex items-center max-w-[150px] w-full relative group cursor-pointer">
                  <div
                    onClick={() =>
                      router.push(
                        `/${
                          userInfo?.car_account_type === "car_driver" ? "d/account" : "c/account"
                        }`
                      )
                    }
                    className="relative w-[32px] h-[32px]"
                  >
                    <Image
                      layout="fill"
                      src={
                        userInfo?.avatar_url?.image_url
                          ? toImageUrl(userInfo?.avatar_url?.image_url || "")
                          : blankAvatar
                      }
                      objectFit="cover"
                      alt=""
                      className="rounded-[50%]"
                    />
                  </div>
                  <div className="hidden sm:block ml-8 flex-1">
                    <p className="text-sm lg:text-base word-wrap-anywhere line-clamp-1">
                      {userInfo?.partner_name}
                    </p>
                  </div>

                  {/* hover */}
                  <div className="absolute w-[275px] shadow-md block-element border-gray-color-5 top-full right-0 hidden lg:group-hover:block z-[1000]">
                    <AccountMenu />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeaderWrapper>

      <BookingModal
        show={bookingType}
        formType={bookingType as CompoundingType}
        onClose={() => {
          toggleBookingModal(undefined)
        }}
        carAccountType={userInfo?.car_account_type}
      />
    </>
  )
}

export { AuthHeader }
