import { CompoundingCarCustomer } from "@/models"
import moment from "moment"
import React from "react"

interface RidesPassengerItemProps {
  rides: CompoundingCarCustomer
  onClickViewMap?: Function
  onClickPickUp?: Function
  onClickCancel?: Function
}

const RidesPassengerItem = ({
  rides,
  onClickCancel,
  onClickPickUp,
  onClickViewMap,
}: RidesPassengerItemProps) => {
  const { partner, from_address, expected_going_on_date } = rides
  return (
    <div className="p-24 relative">
      <span
        className={`absolute top-0 right-0 px-[8px] py-[4px] text-white-color text-sm text-13 rounded-tr-[20px] ${
          rides.state === "done" ? "bg-success" : "bg-error "
        }`}
      >
        {rides.state === "done" ? "Đã đón khách" : "Chưa đón khách"}
      </span>
      <ul className="mb-24">
        <li className="flex items-baseline mb-8">
          <span className="text-xs w-[150px]">Tên khách hàng:</span>
          <span className="text-sm flex-1">{partner.partner_name}</span>
        </li>

        <li className="flex items-baseline mb-8">
          <span className="text-xs w-[150px]">Số điện thoại: </span>
          <span className="text-sm flex-1">{partner.phone}</span>
        </li>

        <li className="flex items-baseline mb-8">
          <span className="text-xs w-[150px]">Điểm đến: </span>
          <span className="text-sm flex-1">{from_address}</span>
        </li>

        <li className="flex items-baseline mb-8">
          <span className="text-xs w-[150px]">Giờ đi: </span>
          <span className="text-sm flex-1">
            {moment(expected_going_on_date).format("HH:MM DD/MM/YYYY")}
          </span>
        </li>
      </ul>

      <div className="flex items-center justify-between">
        <div className="">
          <button onClick={() => onClickCancel?.()} className="text-base ">
            Hủy chuyến
          </button>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => onClickViewMap?.()}
            className="btn-primary-outline px-[16px] mr-24"
          >
            Xem Điểm đến
          </button>
          <button onClick={() => onClickPickUp?.()} className="btn-primary px-[16px]">
            Xác nhận đón khách
          </button>
        </div>
      </div>
    </div>
  )
}

export { RidesPassengerItem }
