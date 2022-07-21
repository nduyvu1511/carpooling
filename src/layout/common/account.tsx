import {
  ActivityIcon,
  blankAvatar,
  CalendarIcon,
  ListIcon,
  LockIcon,
  UserCircleIcon,
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
        icon: <ListIcon className="w-[20px] h-[20px]" />,
        label: "Đánh giá",
        path: `/${userInfo?.car_account_type === "car_driver" ? "d" : "c"}/account/rating`,
      },
      {
        icon: <LockIcon className="w-[20px] h-[20px]" />,
        label: "Đổi mật khẩu",
        path: "/password",
      },
    ]
  }, [])

  if (!userInfo) return null
  return (
    <section className="container py-24">
      <div className="grid grid-cols-sidebar-grid gap-[24px]">
        <aside className="block-element p-24 h-fit sticky top-[80px]">
          {userInfo ? (
            <AccountSidebar
              avatar={userInfo?.avatar_url?.image_url || blankAvatar || ""}
              name={userInfo.partner_name}
              phone={userInfo.phone}
              navList={navList}
            />
          ) : null}
        </aside>
        <div className="block-element pb-24">
          <div className="mx-24 py-24 mb-24 border-b border-t border-solid border-border-color">
            {title ? <h4 className="h4 text-primary">{title}</h4> : null}
            {desc ? <p className="text-base mt-[4px]">{desc}</p> : null}
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}

export { AccountLayout }
