import { CheckCircleIcon } from "@/assets"
import { RootState } from "@/core/store"
import Link from "next/link"
import { ReactNode } from "react"
import { useSelector } from "react-redux"

interface RidesSummaryHeaderProps {
  title?: string | ReactNode
  desc?: string | ReactNode
}

const RidesSummaryHeader = ({ desc, title }: RidesSummaryHeaderProps) => {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

  return (
    <div className="flex items-center flex-col sm:flex-row lg:flex-row">
      <div className="sm:mr-[40px] mb-16 sm:mb-0 lg:mb-0 lg:mr-[40px]">
        <CheckCircleIcon className="w-[66px] h-[66px] md:w-[80px] md:h-[80px] text-success" />
      </div>
      <div className="flex-1 text-center sm:text-left ">
        <h3 className="text-[22px] leading-[30px] sm:text-[28px] sm:leading-[36px] font-medium text-primary">
          {title || "Đặt chuyến thành công"}
        </h3>
        <div className="text-14 sm:text-16 font-medium leading-26 mt-16">
          {desc || (
            <span>
              Chuyến đi của bạn đã được đặt cọc thành công, vui lòng kiểm tra chi tiết hoá đơn qua
              email hoặc qua trang{" "}
              <Link
                href={
                  userInfo?.car_account_type === "car_driver"
                    ? `/d/account/activities`
                    : `/c/account/activities`
                }
              >
                <a className="text-primary font-semibold">Hoạt động</a>
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export { RidesSummaryHeader }
