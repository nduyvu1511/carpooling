import { CheckCircleIcon, CheckIcon, WarningIcon } from "@/assets"
import { UserInfo } from "@/models"

interface AccountTagProps {
  userInfo: UserInfo
}

export const AccountTag = ({ userInfo }: AccountTagProps) => {
  return (
    <>
      {userInfo?.car_account_type === "customer" ||
      (userInfo?.car_account_type === "car_driver" &&
        userInfo.verified_car_driver_account === "active_account") ? (
        <>
          <div className="bg-bg-success text-success text-xs font-normal items-center p-[8px] rounded-[5px] hidden md:flex">
            <CheckIcon className="mr-[8px] w-16 h-16" stroke="#10B981" />
            Tài khoản {userInfo?.car_account_type === "customer" ? "khách hàng" : "tài xế"} đã xác
            thực
          </div>

          <CheckCircleIcon className="w-[20px] h-[20px] text-success md:hidden" />
        </>
      ) : (
        <>
          <div className="bg-[#FFF8F2] text-[#ED9526] text-xs font-normal items-center p-[8px] rounded-[5px] hidden md:flex">
            <WarningIcon className="w-16 h-16 mr-[8px]" />
            {userInfo.verified_car_driver_account === "inactive_account"
              ? "Tài khoản tài xế chưa kích hoạt"
              : "Tài khoản tài xế bị khóa"}
          </div>
          <WarningIcon className="w-[20px] h-[20px] text-success md:hidden" />
        </>
      )}
    </>
  )
}
