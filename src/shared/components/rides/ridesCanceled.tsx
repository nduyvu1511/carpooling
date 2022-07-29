import { formatMoneyVND } from "@/helper"
import { CompoundingCancelCar, CompoundingCarCustomer, CompoundingCarRes } from "@/models"
import moment from "moment"
import React from "react"

interface RidesCanceledProps {
  showLoading?: boolean
  compoundingCar?: CompoundingCarRes | CompoundingCarCustomer
}

const RidesCanceled = ({ compoundingCar, showLoading }: RidesCanceledProps) => {
  if (!(compoundingCar as CompoundingCancelCar)?.down_payment) return null
  return (
    <div className="p-24 pt-0 bg-white-color block-element">
      {showLoading ? (
        <div>
          <div className="skeleton h-[18px] rounded-[5px] mb-[40px]"></div>
          <div className="mb-24 flex justify-between">
            <div className="skeleton w-[220px] h-[12px] rounded-[5px]"></div>
            <div className="skeleton w-[180px] h-[12px] rounded-[5px]"></div>
          </div>
          <div className="mb-24 flex justify-between">
            <div className="skeleton w-[180px] h-[12px] rounded-[5px]"></div>
            <div className="skeleton w-[140px] h-[12px] rounded-[5px]"></div>
          </div>
          <div className="mb-[40px] flex justify-between">
            <div className="skeleton w-[250px] h-[12px] rounded-[5px]"></div>
            <div className="skeleton w-[150px] h-[12px] rounded-[5px]"></div>
          </div>
          <div className="flex justify-between">
            <div className="skeleton w-[160px] h-[12px] rounded-[5px]"></div>
            <div className="skeleton w-[140px] h-[12px] rounded-[5px]"></div>
          </div>
        </div>
      ) : compoundingCar?.compounding_car_id ? (
        <div className="">
          <ul>
            <li className="flex items-center mb-[20px]">
              <span className="text-xs w-[150px] xs:w-[180px]">Ngày hủy chuyến:</span>
              <span className="text-base">
                {moment((compoundingCar as CompoundingCancelCar).cancel_date).format(
                  "HH:mm DD/MM/YYYY"
                )}
              </span>
            </li>
            <li className="flex items-center mb-[20px]">
              <span className="text-xs w-[150px] xs:w-[180px]">Tổng giá trị chuyến đi</span>
              <span className="text-base">
                {formatMoneyVND((compoundingCar as CompoundingCancelCar).amount_total)}
              </span>
            </li>
            <li className="flex items-center mb-[20px]">
              <span className="text-xs w-[150px] xs:w-[180px]">Đã đặt cọc</span>
              <span className="text-base">
                {formatMoneyVND((compoundingCar as CompoundingCancelCar).down_payment)}
              </span>
            </li>
            {(compoundingCar as CompoundingCancelCar)?.paid_date ? (
              <li className="flex items-center justify-between">
                <span className="text-xs">Đã đặt cọc</span>
                <span className="text-base">
                  {moment((compoundingCar as CompoundingCancelCar).paid_date).format(
                    "HH:mm DD/MM/YYYY"
                  )}
                </span>
              </li>
            ) : null}
            {/* 
            <li className="flex items-center justify-between mb-[20px] pt-[20px] border-t border-solid border-border-color">
              <span className="text-xs">
                Số tiền được hoàn trả <span className="text-gray-color-2">(VND)</span>
              </span>
              <span className="text-base text-error">1.000.000 VND</span>
            </li> */}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export { RidesCanceled }
