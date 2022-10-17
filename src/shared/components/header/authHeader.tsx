import {
  AddIcon,
  blankAvatar,
  CarpoolingIcon,
  LogoIcon,
  MessageIcon,
  OneWayIcon,
  QuestionIcon,
  TwoWayIcon,
} from "@/assets"
import { Badge, BookingModal, HeaderWrapper } from "@/components"
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
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)
  const msgUnreadCount = useSelector(
    (state: RootState) => state.chat.messageUnreadCount?.message_unread_count || 0
  )
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
        toggleBookingModal(undefined)
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

            {router.pathname !== "/d/register" ? (
              <div className="flex items-center">
                <button
                  onClick={() =>
                    toggleBookingModal(
                      userInfo?.car_account_type === "customer" ? "one_way" : "convenient"
                    )
                  }
                  className={`flex-center py-8 px-[10px] rounded-[8px] bg-bg-blue h-[38px] lg:h-[40px] mr-12 sm:mr-24 ${
                    userInfo?.car_account_type === "customer" ? "flex lg:hidden" : "flex"
                  }`}
                >
                  <AddIcon className="mr-8 w-[20px] h-[20px] text-blue-7" />
                  <p className="text-xs sm:text-sm font-medium">
                    <span className="hidden sm:block text-blue-7">Đặt chuyến mới</span>
                    <span className="sm:hidden text-blue-7">Đặt chuyến</span>
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
                        key={index}
                        onClick={() => toggleBookingModal(value as CompoundingType)}
                        style={{ backgroundColor: COMPOUNDING_TYPE_BG?.[value as CompoundingType] }}
                        className={`flex-center mr-16 p-[8px] h-[40px] w-[140px] rounded-[5px] last:mr-0 cursor-pointer flex items-center`}
                      >
                        {icon}
                        <span className="ml-8 text-xs text-blue-8">{label}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="flex items-center mr-12 md:mr-16">
                  <div className="relative">
                    <button
                      onClick={() => {
                        router.push("/chat")
                      }}
                      className={`w-[32px] h-[32px] flex-center rounded-[8px] ${
                        router.pathname === "/chat" ? "bg-bg-blue" : ""
                      }`}
                    >
                      <div className="relative">
                        {msgUnreadCount ? (
                          <Badge
                            size={13}
                            count={msgUnreadCount}
                            className="absolute top-[-2px] right-[-2px]"
                          />
                        ) : null}
                        <MessageIcon />
                      </div>
                    </button>
                  </div>

                  {/* <div className="relative">
                    <button className="w-[32px] h-[32px] flex-center bg-bg-blue rounded-[8px]">
                      <div className="relative">
                        <Badge size={13} count={8} className="absolute top-[-2px] right-[-2px]" />
                        <NotificationIcon />
                      </div>
                    </button>

                    <NotificationPopup className="right-0" />
                  </div> */}
                </div>
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
                    <div className="absolute w-[275px] shadow-md block-element border-gray-color-5 top-full right-0 hidden xl:group-hover:block z-[1001]">
                      <AccountMenu />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
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
