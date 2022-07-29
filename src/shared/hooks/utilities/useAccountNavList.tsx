import { ActivityIcon, LockIcon, StarEmptyIcon, UserCircleIcon, WalletIcon } from "@/assets"
import { RootState } from "@/core/store"
import { SidebarItem } from "@/models"
import { useMemo } from "react"
import { useSelector } from "react-redux"

const useAccountNavList = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)
  const accountNavList: SidebarItem[] = useMemo(() => {
    return [
      {
        icon: <UserCircleIcon className="w-[20px] h-[20px]" />,
        label: "Hồ sơ cá nhân",
        path: `/${userInfo?.car_account_type === "car_driver" ? "d" : "c"}/account/profile`,
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
  return {
    accountNavList,
  }
}

export { useAccountNavList }
