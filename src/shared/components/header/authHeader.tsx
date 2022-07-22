import {
  blankAvatar,
  CarpoolingIcon,
  ConvenientIcon,
  LogoIcon,
  NotificationIcon,
  OneWayIcon,
  QuestionIcon,
  TwoWayIcon,
} from "@/assets"
import { Badge, BookingModal, HeaderWrapper, UserNavs } from "@/components"
import { RootState } from "@/core/store"
import { toggleBodyOverflow, toImageUrl } from "@/helper"
import { CarAccountType, CompoundingType } from "@/models"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSelector } from "react-redux"

const AuthHeader = () => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const [bookingType, setBookingType] = useState<CompoundingType | undefined>()

  return (
    <>
      <HeaderWrapper>
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
              <ul className="flex mr-[52px]">
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
                        setBookingType(value as CompoundingType)
                        toggleBodyOverflow("hidden")
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
                      setBookingType("convenient")
                      toggleBodyOverflow("hidden")
                    }}
                    className="text-16 font-semibold mr-[40px] last:mr-0 cursor-pointer flex items-center"
                  >
                    <ConvenientIcon />
                    <span className="ml-12">Tiện chuyến</span>
                  </li>
                )}
              </ul>

              <div className="flex items-center">
                <div className="mr-24">
                  <Link passHref href="/guide">
                    <span className="cursor-pointer">
                      <QuestionIcon className="w-[24px] h-[24px]" />
                    </span>
                  </Link>
                </div>

                <div className="mr-24">
                  <div className="relative">
                    <NotificationIcon className="" />
                    <Badge className="left-[10px]" count={9} />
                  </div>
                </div>

                <div
                  onClick={() => router.push("/profile")}
                  className="flex items-center max-w-[300px] w-full relative group cursor-pointer"
                >
                  <div className="relative w-[32px] h-[32px]">
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
                  <div className="ml-8 flex-1">
                    <p className="text-sm word-wrap-anywhere line-clamp-1">
                      <span>{userInfo?.partner_name}</span>
                    </p>
                  </div>

                  {/* hover */}
                  <div className="absolute w-[275px] shadow-md block-element border-gray-color-5 top-[100%] right-0 hidden group-hover:block z-10">
                    <UserNavs type={userInfo?.car_account_type as CarAccountType} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeaderWrapper>

      {bookingType ? (
        <BookingModal
          formType={bookingType}
          onClose={() => {
            toggleBodyOverflow("unset")
            setBookingType(undefined)
          }}
        />
      ) : null}
    </>
  )
}

export { AuthHeader }
