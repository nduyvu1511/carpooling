import { CalendarDoneIcon, CalendarIcon, CarIcon, MultiUserIcon, PaymentIcon } from "@/assets"
import {
  COMPOUNDING_TYPE_BG,
  COMPOUNDING_TYPE_COLOR,
  COMPOUNDING_TYPE_NAME,
  formatMoneyVND,
  toFirstUpperCase,
} from "@/helper"
import { CompoundingCarRes } from "@/models"
import moment from "moment"
import { CompoundingCarICon } from "../common"
import { RideItemLocation } from "./rideItemLocation"

interface RidesItemProps {
  onClick?: Function
  rides: CompoundingCarRes | null
}

const RideItem = ({ onClick, rides }: RidesItemProps) => {
  if (rides === null) {
    return (
      <div className="p-12 md:p-[18px]">
        <div className="flex items-center justify-between mb-[24px]">
          <div className="w-[60px] xs:w-[90px] h-[20px] skeleton rounded-[4px]"></div>
          <div className="w-[40px] xs:w-[50px] sm:w-[60px] h-[14px] skeleton rounded-[4px]"></div>
        </div>

        <div className="mb-[40px]">
          <div className="flex items-center justify-between mb-[8px]">
            <div className="w-[40%] h-16 skeleton rounded-[4px]"></div>
            <div className="w-[35%] h-16 skeleton rounded-[4px]"></div>
          </div>

          <div className="flex items-center justify-between mb-[24px]">
            <div className="w-[35%] h-16 skeleton rounded-[4px]"></div>
            <div className="w-[40%] h-16 skeleton rounded-[4px]"></div>
          </div>

          <div className="mx-auto h-[65px] skeleton rounded-[4px] mb-[12px]"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-[30px] h-[12px] skeleton rounded-[4px]"></div>
          <div className="w-[80px] xs:aspect-h-8w-[100px] h-16 skeleton rounded-[4px]"></div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() => onClick?.()}
      className="p-[12px] sm:p-16 lg:p-[18px] flex flex-col h-full justify-between relative overflow-hidden cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <p
          style={{
            background: COMPOUNDING_TYPE_BG[rides.compounding_type],
          }}
          className="flex items-center mr-8 md:mr-16 h-[22px] md:h-[28px] lg:h-[32px] px-4 md:px-8 py-2 md:py-4 rounded-[5px]"
        >
          <CompoundingCarICon
            className="hidden md:block mr-8"
            compounding_type={rides.compounding_type}
          />
          <span
            style={{ color: COMPOUNDING_TYPE_COLOR[rides.compounding_type] }}
            className="text-[10px] md:text-12 leading-[18px] font-normal line-clamp-1"
          >
            {COMPOUNDING_TYPE_NAME[rides.compounding_type]}
          </span>
        </p>
        <p className="items-center flex">
          <MultiUserIcon className="w-[12px] sm:w-16" />
          <span className="text-sm font-medium sm:font-semibold sm:text-[14px] ml-[4px] sm:ml-[8px] text-[11px] leading-[18px]">
            {rides.number_seat_in_car - rides.number_available_seat}/{rides.number_seat_in_car}
          </span>
        </p>
      </div>

      <div className="my-12 lg:my-[18px] border-b border-solid border-border-color"></div>

      <RideItemLocation
        compounding_type={rides.compounding_type}
        from_date={rides.expected_going_on_date}
        from_province_name={rides.from_province.province_short_name}
        to_province_name={rides.to_province.province_short_name}
        to_date={moment(rides.expected_going_on_date)
          .add(rides?.duration || 0, "hours")
          .toString()}
      />
      <div className="mt-12 lg:mt-[18px] flex-1">
        <div className="flex items-center justify-between mb-[8px]">
          <p className="text-xs text-gray-90 w-[120px] mx-auto hidden lg:block">Ngày đi:</p>
          <CalendarIcon className="lg:hidden w-[13px] text-gray-color-7 mr-8 md:mr-[10px]" />
          <p className="flex-1 text-[11px] sm:text-12 md:text-14 font-medium">
            {moment(rides.expected_going_on_date).format("HH:mm DD/MM/YYYY")}
          </p>
        </div>

        {rides?.expected_picking_up_date ? (
          <div className="flex items-center justify-between mb-[8px]">
            <p className="text-xs text-gray-90 w-[120px] mx-auto hidden lg:block">Ngày về:</p>
            <CalendarDoneIcon className="lg:hidden w-[13px] text-gray-color-7 mr-8 md:mr-[10px]" />
            <p className="flex-1 text-[11px] sm:text-12 md:text-14 font-medium">
              {moment(rides.expected_picking_up_date).format("HH:mm DD/MM/YYYY")}
            </p>
          </div>
        ) : null}

        <div className="flex items-center justify-between">
          <CarIcon className="lg:hidden w-[13px] text-gray-color-7 mr-8 md:mr-[10px]" />
          <p className="text-xs text-gray-90 w-[120px] mx-auto hidden lg:block">Loại xe:</p>
          <p className="flex-1 text-[11px] sm:text-12 md:text-14 font-medium">
            {rides.car.name ? toFirstUpperCase(rides.car.name) : ""}
          </p>
        </div>
      </div>

      <div className="my-12 lg:my-[18px] border-b border-solid border-border-color"></div>

      <div className="flex items-center justify-between">
        <p className="flex items-center">
          <PaymentIcon className="w-[13px] text-gray-color-7 mr-8 md:mr-[10px]" />
          <span className="text-[12px] sm:text-[14px] md:text-16 font-semibold text-error">
            {formatMoneyVND(rides.price_unit.price_unit)}
          </span>
        </p>
      </div>
    </div>
  )
}

export { RideItem }
