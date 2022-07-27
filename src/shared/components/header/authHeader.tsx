import {
  ActivityIcon,
  AddIcon,
  blankAvatar,
  CarpoolingIcon,
  CloseIcon,
  ConvenientIcon,
  LockIcon,
  LogoIcon,
  OneWayIcon,
  QuestionIcon,
  StarEmptyIcon,
  TwoWayIcon,
  UserCircleIcon,
  WalletIcon,
} from "@/assets"
import { AccountSidebar, BookingModal, Drawer, HeaderWrapper, UserNavs } from "@/components"
import { RootState } from "@/core/store"
import { toggleBodyOverflow, toImageUrl } from "@/helper"
import { CarAccountType, CompoundingType, SidebarItem } from "@/models"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"

const AuthHeader = () => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const [bookingType, setBookingType] = useState<CompoundingType | undefined>()
  const [showUserNav, setShowUserNav] = useState<boolean>(false)

  const navList: SidebarItem[] = useMemo(() => {
    return [
      {
        icon: <UserCircleIcon className="w-[20px] h-[20px]" />,
        label: "Hồ sơ cá nhân",
        path: "/profile",
      },
      // {
      //   icon: <CalendarIcon className="w-[20px] h-[20px]" />,
      //   label: "Lịch",
      //   path: `/${userInfo?.car_account_type === "car_driver" ? "d" : "c"}/account/schedules`,
      // },
      {
        icon: <ActivityIcon className="w-[20px] h-[20px]" />,
        label: "Hoạt động",
        path: `/${userInfo?.car_account_type === "car_driver" ? "d" : "c"}/account/activities`,
      },
      {
        icon: <WalletIcon className="w-[20px] h-[20px]" />,
        label: "Ví cá nhân",
        path: `/${userInfo?.car_account_type === "car_driver" ? "d" : "c"}/account/wallet`,
      },
      {
        icon: <StarEmptyIcon className="w-[20px] h-[20px]" />,
        label: "Đánh giá",
        path: `/${userInfo?.car_account_type === "car_driver" ? "d" : "c"}/account/rating`,
      },
      {
        icon: <LockIcon className="w-[20px] h-[20px]" />,
        label: "Đổi mật khẩu",
        path: "/password",
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              <LogoIcon className="cursor-pointer h-[40px] w-[72px] lg:h-[50px] lg:w-[90px]" />
            </div>

            <div className="flex items-center">
              <button
                onClick={() => setBookingType("one_way")}
                className="hidden sm:block btn-primary-outline text-[14px] leading-[22px] rounded-[10px] p-[10px] h-fit w-fit lg:hidden mr-24"
              >
                Đặt chuyến mới
              </button>

              <button onClick={() => setBookingType("one_way")} className="sm:hidden">
                <AddIcon className="text-primary w-[36px] h-[36px] mr-24 fill-[#354BB1]" />
              </button>

              <ul className="mr-[52px] hidden lg:flex">
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
                <div className="mr-24 hidden">
                  <Link passHref href="/guide">
                    <span className="cursor-pointer">
                      <QuestionIcon className="w-[24px] h-[24px]" />
                    </span>
                  </Link>
                </div>

                {/* <div className="mr-24">
                  <div className="relative">
                    <NotificationIcon className="" />
                    <Badge className="left-[10px]" count={9} />
                  </div>
                </div> */}

                <div
                  onClick={() => {
                    setShowUserNav(true)
                    toggleBodyOverflow("hidden")
                  }}
                  className="relative lg:hidden w-[32px] h-[32px] cursor-pointer "
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

                <div
                  onClick={() => router.push("/profile")}
                  className="hidden lg:flex items-center max-w-[300px] w-full relative group cursor-pointer"
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
                  <div className="absolute w-[275px] shadow-md block-element border-gray-color-5 top-[100%] right-0 hidden lg:group-hover:block z-10">
                    <UserNavs type={userInfo?.car_account_type as CarAccountType} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeaderWrapper>

      <Drawer
        isShow={showUserNav}
        onClose={() => {
          setShowUserNav(false)
          toggleBodyOverflow("unset")
        }}
      >
        <div className="">
          <button
            onClick={() => {
              setShowUserNav(false)
              toggleBodyOverflow("unset")
            }}
            className="ml-auto mr-[10px] mt-[10px] absolute right-0 top-0"
          >
            <CloseIcon />
          </button>

          {userInfo?.partner_id ? (
            <div className="px-[16px]">
              <AccountSidebar
                onClick={() => {
                  setShowUserNav(false)
                  toggleBodyOverflow("unset")
                }}
                avatar={userInfo.avatar_url.image_url}
                name={userInfo.partner_name}
                navList={navList}
                phone={userInfo.phone}
              />
            </div>
          ) : null}
        </div>
      </Drawer>

      <BookingModal
        show={bookingType}
        formType={bookingType as CompoundingType}
        onClose={() => {
          toggleBodyOverflow("unset")
          setBookingType(undefined)
        }}
      />
    </>
  )
}

export { AuthHeader }
