import { CheckIcon, WarningIcon } from "@/assets"
import { UserInfo } from "@/models"
import Link from "next/link"

interface AccountTagProps {
  userInfo: UserInfo
}

export const AccountTag = ({ userInfo }: AccountTagProps) => {
  return (
    <>
      {userInfo?.car_account_type === "customer" ||
      (userInfo?.car_account_type === "car_driver" &&
        userInfo.verified_car_driver_account === "active_account") ? (
        <div className="flex-1 bg-bg-success text-success text-xs flex items-center p-[8px] rounded-[5px]">
          <CheckIcon className="mr-[8px] w-16 h-16" stroke="#10B981" />
          Tài khoản {userInfo?.car_account_type === "customer" ? "khách hàng" : "tài xế"} đã xác
          thực
        </div>
      ) : (
        <>
          <div className="flex-1 bg-warning-opacity text-warning text-xs flex items-center p-[8px] mb-[8px] rounded-[5px]">
            <WarningIcon className="w-16 h-16 mr-[8px]" />
            Tài khoản tài xế chưa kích hoạt
          </div>

          <Link passHref href="/d/register">
            <a className="text-primary text-sm underline">Bổ sung thông tin tài xế</a>
          </Link>
        </>
      )}
    </>
  )
}
