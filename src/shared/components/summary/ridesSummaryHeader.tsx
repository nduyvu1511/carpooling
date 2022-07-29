import { CheckCircleIcon } from "@/assets"
import React from "react"

const RidesSummaryHeader = () => {
  return (
    <div className="flex items-center flex-col sm:flex-row">
      <div className="sm:mr-[40px] mb-24 sm:mb-0">
        <CheckCircleIcon className="w-[80px] h-[80px]" />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-[22px] leading-[30px] sm:text-[28px] sm:leading-[36px] font-medium text-primary mb-[16px]">
          Đặt chuyến thành công
        </h3>
        <p className="text-14 sm:text-16 font-medium leading-26">
          Chuyến đi của bạn đã được đặt cọc thành công, vui lòng kiểm tra chi tiết hoá đơn qua email
        </p>
      </div>
    </div>
  )
}

export { RidesSummaryHeader }
