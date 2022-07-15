import { formatMoneyVND, getCompoundingCarName } from "@/helper"
import { CompoundingCarRes } from "@/models"
import moment from "moment"
import { RidesItemLocation } from "./ridesItemLocation"

interface RidesItemProps {
  onClick?: Function
  rides: CompoundingCarRes | null
}

const RidesItem = ({ onClick, rides }: RidesItemProps) => {
  if (rides === null) {
    return (
      <div className="min-h-[200px] block-element p-[18px]">
        <div className="flex items-center h-[70px] skeleton rounded-[4px] mb-[40px]"></div>

        <div className="mb-[40px]">
          <div className="flex justify-between">
            <div className="skeleton h-[8px] rounded-[4px] mb-[24px] w-[70px]"></div>
            <div className="skeleton h-[8px] rounded-[4px] mb-[24px] w-[120px]"></div>
          </div>
          <div className="flex justify-between">
            <div className="skeleton h-[8px] rounded-[4px] mb-[24px] w-[80px]"></div>
            <div className="skeleton h-[8px] rounded-[4px] mb-[24px] w-[100px]"></div>
          </div>
          <div className="flex justify-between">
            <div className="skeleton h-[8px] rounded-[4px] mb-[24px] w-[60px]"></div>
            <div className="skeleton h-[8px] rounded-[4px] mb-[24px] w-[80px]"></div>
          </div>
          <div className="flex justify-between">
            <div className="skeleton h-[8px] rounded-[4px] mb-[24px] w-[90px]"></div>
            <div className="skeleton h-[8px] rounded-[4px] mb-[24px] w-[150px]"></div>
          </div>
        </div>

        <div className="w-[80px] ml-auto h-[12px] skeleton rounded-[4px]"></div>
      </div>
    )
  }

  return (
    <div
      onClick={() => onClick?.()}
      className="p-[18px] flex flex-col h-full justify-between relative overflow-hidden cursor-pointer"
    >
      <RidesItemLocation
        compounding_type={rides.compounding_type}
        from_date={rides.expected_going_on_date}
        from_province_name={rides.from_province.province_brief_name}
        to_province_name={rides.to_province.province_brief_name}
        to_date={rides.expected_picking_up_date}
      />
      <div className="my-[24px] flex-1">
        <div className="flex items-center justify-between mb-[8px]">
          <p className="text-xs text-gray-90 w-[120px] mx-auto">Loại chuyến:</p>
          <p className="flex-1 text-sm">{getCompoundingCarName(rides.compounding_type)}</p>
        </div>

        <div className="flex items-center justify-between mb-[8px]">
          <p className="text-xs text-gray-90 w-[120px] mx-auto">Ngày đi:</p>
          <p className="flex-1 text-sm">
            {moment(rides.expected_going_on_date).format("HH:MM DD/MM/YYYY")}
          </p>
        </div>

        {rides?.expected_picking_up_date ? (
          <div className="flex items-center justify-between mb-[8px]">
            <p className="text-xs text-gray-90 w-[120px] mx-auto">Ngày về:</p>
            <p className="flex-1 text-sm">
              {moment(rides.expected_picking_up_date).format("HH:MM DD/MM/YYYY")}
            </p>
          </div>
        ) : null}

        <div className="flex items-center justify-between mb-[8px]">
          <p className="text-xs text-gray-90 w-[120px] mx-auto">Loại xe:</p>
          <p className="flex-1 text-sm lowercase capitalize">{rides.car.name}</p>
        </div>
        <div className="flex items-center justify-between mb-[8px]">
          <p className="text-xs text-gray-90 w-[120px] mx-auto">Số khách:</p>
          <p className="flex-1 text-sm">
            {rides.number_available_seat}/{rides.number_seat_in_car} khách
          </p>
        </div>
        <div className="flex items-center justify-between mb-[8px]">
          <p className="text-xs text-gray-90 w-[120px] mx-auto">Giá vé/khách:</p>
          <p className="flex-1 text-sm">{formatMoneyVND(rides.price_unit.price_unit)}</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="text-base font-semibold">Xem chi tiết</button>
      </div>

      {/* <div className="h-8 rounded-[20px] gradient absolute-horizontal bottom-0 w-[96%]"></div> */}
    </div>
  )
}

export { RidesItem }
