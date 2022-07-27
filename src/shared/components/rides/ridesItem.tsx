import { CalendarDoneIcon, CalendarIcon, CarIcon, MultiUserIcon, PaymentIcon } from "@/assets"
import {
  COMPOUNDING_TYPE_COLOR,
  COMPOUNDING_TYPE_NAME,
  formatMoneyVND,
  toFirstUpperCase,
} from "@/helper"
import { CompoundingCarRes } from "@/models"
import moment from "moment"
import { CompoundingCarICon } from "../utilities"
import { RidesItemLocation } from "./ridesItemLocation"

interface RidesItemProps {
  onClick?: Function
  rides: CompoundingCarRes | null
}

const RidesItem = ({ onClick, rides }: RidesItemProps) => {
  if (rides === null) {
    return (
      <div className="min-h-[200px] block-element p-[18px]">
        <div className="flex items-center justify-between mb-[24px]">
          <div className="w-[80px] h-[12px] skeleton rounded-[4px]"></div>
          <div className="w-[120px] h-[12px] skeleton rounded-[4px]"></div>
        </div>

        <div className="mb-[40px]">
          <div className="flex items-center justify-between mb-[40px]">
            <div className="">
              <div className="w-[50px] h-[12px] skeleton rounded-[4px] mb-[12px]"></div>
              <div className="w-[70px] h-[12px] skeleton rounded-[4px] ml-auto"></div>
            </div>
            <div className="flex items-end flex-col">
              <div className="w-[80px] h-[12px] skeleton rounded-[4px] mb-[12px]"></div>
              <div className="w-[100px] h-[12px] skeleton rounded-[4px]"></div>
            </div>
          </div>
          <div className="skeleton h-[8px] rounded-[4px] mb-[24px] w-[90%] mx-auto"></div>
          <div className="skeleton h-[8px] rounded-[4px] mb-[24px] w-[90%] mx-auto"></div>
          <div className="skeleton h-[8px] rounded-[4px] mb-[24px] w-[90%] mx-auto"></div>
          <div className="skeleton h-[8px] rounded-[4px] mb-[24px] w-[90%] mx-auto"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-[80px] h-[12px] skeleton rounded-[4px]"></div>
          <div className="w-[80px]  h-[12px] skeleton rounded-[4px]"></div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() => onClick?.()}
      className="p-[12px] sm:p-[16px] lg:p-[18px] flex flex-col h-full justify-between relative overflow-hidden cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <p className="flex items-center mr-[16px]">
          <CompoundingCarICon compounding_type={rides.compounding_type} />
          <span
            style={{ color: COMPOUNDING_TYPE_COLOR[rides.compounding_type] }}
            className="text-[10px] sm:text-xs lg:text-sm ml-[5px] lg:ml-[8px]"
          >
            {COMPOUNDING_TYPE_NAME[rides.compounding_type]}
          </span>
        </p>

        <p className="flex items-center sm:hidden">
          <MultiUserIcon className="w-[12px] h-[12px]" />
          <span className="text-[10px] font-semibold ml-[5px]">
            {rides.number_available_seat}/{rides.number_seat_in_car}
          </span>
        </p>
        <span className="text-xs hidden lg:block">Xem chi tiết</span>
      </div>

      <div className="my-[12px] md:my-[18px] border-b border-solid border-border-color"></div>

      <RidesItemLocation
        compounding_type={rides.compounding_type}
        from_date={rides.expected_going_on_date}
        from_province_name={rides.from_province.province_short_name}
        to_province_name={rides.to_province.province_short_name}
        to_date={moment(rides.expected_going_on_date)
          .add(rides?.duration || 0, "hours")
          .toString()}
      />
      <div className="mt-[18px] flex-1">
        {/* <div className="flex items-center justify-between mb-[8px]">
          <p className="text-xs text-gray-90 w-[120px] mx-auto">Loại chuyến:</p>
          <p className="flex-1 text-sm">{getCompoundingCarName(rides.compounding_type)}</p>
        </div> */}

        <div className="flex items-center justify-between mb-[8px]">
          <p className="text-xs text-gray-90 w-[120px] mx-auto hidden sm:block">Ngày đi:</p>
          <CalendarIcon className="sm:hidden w-[11px]" />
          <p className="flex-1 ml-[8px] sm:ml-0 text-[11px] sm:text-14 font-medium">
            {moment(rides.expected_going_on_date).format("HH:mm DD/MM/YYYY")}
          </p>
        </div>

        {rides?.expected_picking_up_date ? (
          <div className="flex items-center justify-between mb-[8px]">
            <p className="text-xs text-gray-90 w-[120px] mx-auto hidden sm:block">Ngày về:</p>
            <CalendarDoneIcon className="sm:hidden w-[12px]" />
            <p className="flex-1 ml-[8px] sm:ml-0 text-[11px] sm:text-14 font-medium">
              {moment(rides.expected_picking_up_date).format("HH:mm DD/MM/YYYY")}
            </p>
          </div>
        ) : null}

        <div className="flex items-center justify-between mb-[8px]">
          <CarIcon className="sm:hidden w-[12px]" />
          <p className="text-xs text-gray-90 w-[120px] mx-auto hidden sm:block">Loại xe:</p>
          <p className="flex-1 ml-[8px] sm:ml-0 text-[11px] sm:text-14 font-medium">
            {toFirstUpperCase(rides.car.name)}
          </p>
        </div>

        {/* <div className="flex items-center justify-between mb-[8px]">
          <p className="text-xs text-gray-90 w-[120px] mx-auto">Giá vé/khách:</p>
          <p className="flex-1 text-sm">{formatMoneyVND(rides.price_unit.price_unit)}</p>
        </div> */}
      </div>

      <div className="my-[12px] md:my-[18px] border-b border-solid border-border-color"></div>

      <div className="flex items-center justify-between">
        <p className="items-center flex">
          <MultiUserIcon className="w-[16px]" />
          <span className="text-sm font-medium sm:font-semibold sm:text-[14px] ml-[8px] text-[11px] leading-[18px]">
            {rides.number_available_seat}/{rides.number_seat_in_car}
          </span>
        </p>
        <p className="flex items-center">
          <PaymentIcon className="w-[16px]" />
          <span className="text-[12px] sm:text-[14px] font-semibold text-error ml-[8px]">
            {formatMoneyVND(rides.price_unit.price_unit)}
          </span>
        </p>
      </div>

      {/* <div className="flex justify-end">
        <button className="text-base font-semibold">Xem chi tiết</button>
      </div> */}

      {/* <div className="h-8 rounded-[20px] gradient absolute-horizontal bottom-0 w-[96%]"></div> */}
    </div>
  )
}

export { RidesItem }
