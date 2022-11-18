import {
  ActivityIcon,
  CouponIcon,
  GuideIcon,
  LockIcon,
  StarEmptyIcon,
  UserCircleIcon,
  WalletIcon,
} from "@/assets"
import { RootState } from "@/core/store"
import { SidebarItem } from "@/models"
import { useMemo } from "react"
import { useSelector } from "react-redux"

const iconClassName = "w-[20px] h-[20px]"

const useAccountNavList = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)
  const accountNavList: SidebarItem[] = useMemo(() => {
    if (!userInfo?.partner_id) return []

    if (userInfo.car_account_type === "car_driver")
      return [
        {
          icon: <UserCircleIcon className={iconClassName} />,
          label: "Hồ sơ cá nhân",
          path: `/d/account/profile`,
        },
        // {
        //   icon: <CalendarIcon className={iconClassName} />,
        //   label: "Lịch",
        //   path: `/d/account/schedules`,
        // },
        {
          icon: <ActivityIcon className={iconClassName} />,
          label: "Hoạt động",
          path: `/d/account/activities`,
        },
        {
          icon: <WalletIcon className={iconClassName} />,
          label: "Tài khoản cá nhân",
          path: `/d/account/wallet`,
        },
        {
          icon: <CouponIcon className={iconClassName} />,
          label: "Mã khuyến mãi",
          path: `/d/account/promotion`,
        },
        {
          icon: <StarEmptyIcon className={iconClassName} />,
          label: "Đánh giá",
          path: `/d/account/rating`,
        },
        {
          icon: <GuideIcon className={iconClassName} />,
          label: "Hướng dẫn",
          path: `/support`,
        },
        {
          icon: <LockIcon className={iconClassName} />,
          label: "Đổi mật khẩu",
          path: "/password",
        },
      ]

    return [
      {
        icon: <UserCircleIcon className={iconClassName} />,
        label: "Hồ sơ cá nhân",
        path: `/c/account/profile`,
      },
      {
        icon: <WalletIcon className={iconClassName} />,
        label: "Tài khoản cá nhân",
        path: `/c/account/wallet`,
      },
      {
        icon: <CouponIcon className={iconClassName} />,
        label: "Mã khuyến mãi",
        path: `/c/account/promotion`,
      },
      {
        icon: <ActivityIcon className={iconClassName} />,
        label: "Hoạt động",
        path: `/c/account/activities`,
      },
      {
        icon: <StarEmptyIcon className={iconClassName} />,
        label: "Đánh giá",
        path: `/c/account/rating`,
      },
      {
        icon: <GuideIcon className={iconClassName} />,
        label: "Hướng dẫn",
        path: "/support",
      },
      {
        icon: <LockIcon className={iconClassName} />,
        label: "Đổi mật khẩu",
        path: "/password",
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  return {
    accountNavList,
  }
}

export { useAccountNavList }
