import {
  ActivityIcon,
  blankAvatar,
  LockIcon,
  StarEmptyIcon,
  UserCircleIcon,
  WalletIcon,
} from "@/assets"
import { AccountSidebar } from "@/components"
import { RootState } from "@/core/store"
import { AccountLayoutProps, SidebarItem } from "@/models"
import { useMemo } from "react"
import { useSelector } from "react-redux"

const AccountLayout = ({ children, desc, title }: AccountLayoutProps) => {
  const { userInfo } = useSelector((state: RootState) => state.userInfo)

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

  if (!userInfo) return null
  return (
    <section className="container lg:py-24 py-0 px-0 md:px-24 md:py-24 flex-1">
      <div className="xl:grid xl:grid-cols-sidebar-grid gap-[24px]">
        <aside className="hidden xl:block block-element p-24 h-fit sticky top-[80px]">
          {userInfo ? (
            <AccountSidebar
              avatar={userInfo?.avatar_url?.image_url || blankAvatar || ""}
              name={userInfo.partner_name}
              phone={userInfo.phone}
              navList={navList}
            />
          ) : null}
        </aside>
        <div className="block-element pb-[12px] lg:pb-24">
          <div className="mx-12 md:mx-[16px] lg:mx-24 py-[12px] md:py-[16px] lg:py-24 mb-12 lg:mb-24 border-b border-solid border-border-color">
            {title ? <h4 className="h4 text-primary">{title}</h4> : null}
            {desc ? <p className="text-base mt-[4px] hidden md:block">{desc}</p> : null}
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}

export { AccountLayout }
