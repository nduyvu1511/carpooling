import {
  AddIcon,
  AddIcon2,
  blankAvatar,
  CarpoolingIcon,
  ConvenientIcon,
  LogoIcon,
  OneWayIcon,
  QuestionIcon,
  TwoWayIcon,
} from "@/assets"
import { BookingModal, HeaderWrapper, UserNavs } from "@/components"
import { RootState } from "@/core/store"
import { toggleBodyOverflow, toImageUrl } from "@/helper"
import { useBackRouter } from "@/hooks"
import { CarAccountType, CompoundingType } from "@/models"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSelector } from "react-redux"

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
      setBookingType(undefined)
      toggleBodyOverflow("unset")
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
              <LogoIcon className="cursor-pointer h-[40px] w-[72px] lg:h-[50px] lg:w-[90px]" />
            </div>

            <div className="flex items-center">
              <button
                onClick={() =>
                  toggleBookingModal(
                    userInfo?.car_account_type === "customer" ? "one_way" : "convenient"
                  )
                }
                className="hidden sm:flex h-[40px] btn text-[14px] leading-[22px] bg-[#DAE2FD] font-medium text-primary rounded-[10px] p-[10px] w-fit md:hidden mr-24"
              >
                <AddIcon2 className="mr-[10px]" />
                Đặt chuyến mới
              </button>

              <button
                onClick={() =>
                  toggleBookingModal(
                    userInfo?.car_account_type === "customer" ? "one_way" : "convenient"
                  )
                }
                className="sm:hidden"
              >
                <AddIcon className="text-[#354BB1] w-[36px] h-[36px] mr-24 fill-[#354BB1]" />
              </button>

              <ul className="mr-[52px] hidden md:flex">
                {userInfo?.car_account_type === "customer" ? (
                  [
                    {
                      icon: <OneWayIcon />,
                      label: "Một chiều",
                      value: "one_way",
                      color: "#2E4CB7",
                    },
                    {
                      icon: <TwoWayIcon />,
                      label: "Hai chiều",
                      value: "two_way",
                      color: "#EE542F",
                    },
                    {
                      icon: <CarpoolingIcon />,
                      label: "Ghép chuyến",
                      value: "compounding",
                      color: "#278EA5 ",
                    },
                  ].map(({ icon, label, value }, index) => (
                    <li
                      onClick={() => {
                        toggleBookingModal(value as CompoundingType)
                      }}
                      className="text-16 font-semibold mr-[40px] last:mr-0 cursor-pointer flex items-center"
                      key={index}
                    >
                      {icon}
                      <span className="ml-12">{label}</span>
                    </li>
                  ))
                ) : (
                  <li
                    onClick={() => {
                      toggleBookingModal("convenient")
                    }}
                    className="text-16 font-semibold mr-[40px] last:mr-0 cursor-pointer flex items-center"
                  >
                    <ConvenientIcon />
                    <span className="ml-12">Tiện chuyến</span>
                  </li>
                )}
              </ul>

              <div className="flex items-center">
                <div className="mr-24 hidden">
                  <Link passHref href="/guide">
                    <span className="cursor-pointer">
                      <QuestionIcon className="w-[24px] h-[24px]" />
                    </span>
                  </Link>
                </div>

                <div
                  onClick={() =>
                    router.push(
                      `/${userInfo?.car_account_type === "car_driver" ? "d/account" : "c/account"}`
                    )
                  }
                  className="flex items-center max-w-[150px] w-full relative group cursor-pointer"
                >
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
                    <p className="text-sm word-wrap-anywhere line-clamp-1">
                      <span>{userInfo?.partner_name}</span>
                    </p>
                  </div>

                  {/* hover */}
                  <div className="absolute w-[275px] shadow-md block-element border-gray-color-5 top-[100%] right-0 hidden lg:group-hover:block z-10">
                    <UserNavs type={userInfo?.car_account_type as CarAccountType} />
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
