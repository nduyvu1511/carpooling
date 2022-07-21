import { CheckCircleIcon } from "@/assets"
import React from "react"

const RidesSummaryHeader = () => {
  return (
    <div className="flex items-center">
      <div className="mr-[40px]">
        <CheckCircleIcon className="w-[80px] h-[80px]" />
      </div>
      <div className="flex-1">
        <h3 className="text-[28px] leading-[36px] font-medium text-primary mb-[16px]">
          Đặt chuyến thành công
        </h3>
        <p className="text-16 font-medium leading-26">
          Chuyến đi của bạn đã được đặt cọc thành công, vui lòng kiểm tra chi tiết hoá đơn qua email
        </p>
      </div>
    </div>
  )
}

export { RidesSummaryHeader }
