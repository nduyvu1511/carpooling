import { CalendarIcon, CarIcon, MultiUserIcon, OneWayIcon, PaymentIcon } from "@/assets"
import {
  COMPOUNDING_STATE_NAME,
  COMPOUNDING_TYPE_NAME,
  formatMoneyVND,
  STATE_BG_COLOR,
  STATE_COLOR,
  toFirstUpperCase,
} from "@/helper"
import { CustomerActivityRes, DriverActivityRes } from "@/models"
import moment from "moment"
import { CompoundingCarICon } from "../utilities"

interface ActivityItemProps<T> {
  activity: T | null
}

const ActivityItem = <T extends DriverActivityRes | CustomerActivityRes>({
  activity,
}: ActivityItemProps<T>) => {
  if (!activity)
    return (
      <div className="p-12 md:p-24 rounded-[20px]">
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-24">
            <div className="flex items-center">
              <div className="skeleton rounded-[5px] w-[80px] mr-[16px] h-[14px]"></div>
              <div className="hidden xs:block skeleton rounded-[4px] w-[120px] h-[14px]"></div>
            </div>
            <div className="skeleton rounded-[4px] h-[14px] w-[80px]"></div>
          </div>
          <div className="flex items-center justify-between mb-[12px]">
            <div className="skeleton rounded-[4px] h-[8px] w-[100px] xs:w-[140px]"></div>
            <div className="skeleton rounded-[4px] h-[8px] w-[120px]"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="skeleton rounded-[4px] h-[8px] w-[90px]"></div>
            <div className="skeleton rounded-[4px] h-[8px] w-[100px] xs:w-[140px]"></div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between">
          <div className="">
            <div className="skeleton h-[20px] w-[200px] rounded-[4px] mb-[16px]"></div>
            <div className="skeleton h-[12px] w-[200px] rounded-[4px]"></div>
          </div>

          <div className="flex flex-col items-center">
            <div className="skeleton h-[8px] rounded-[5px] w-[90px] mb-[16px]"></div>
            <div className="skeleton h-[16px] rounded-[5px] w-[160px]"></div>
          </div>

          <div className="skeleton h-[10px] rounded-[5px] w-[100px]"></div>
        </div>
      </div>
    )

  const { from_province, to_province, state, expected_going_on_date, compounding_type, car } =
    activity
  return (
    <div className="p-12 md:p-[20px] lg:p-24">
      <div className="items-stretch justify-between hidden md:flex">
        <div className="mr-[12px]">
          <div className="flex">
            <span className="mr-[16px] mt-[4px]">
              <CompoundingCarICon compounding_type={compounding_type} />
            </span>

            <div className="flex items-center mb-[12px]">
              <p className="md:text-base md:font-semibold lg:font-medium lg:text-lg xl:text-xl mr-[16px]">
                {from_province.province_brief_name} - {to_province.province_brief_name}
              </p>
              <span
                style={{
                  color: STATE_COLOR?.[state] || "",
                  backgroundColor: STATE_BG_COLOR?.[state],
                }}
                className="py-[4px] px-[8px] text-xs rounded-[5px] bg-white-color"
              >
                {COMPOUNDING_STATE_NAME[state]}
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <p className="flex items-center mr-[25px]">
              {(activity as DriverActivityRes).number_seat_in_car ? (
                <>
                  <MultiUserIcon className="w-[14px] h-[14px] mr-[5px]" />
                  <span className="text-sm text-gray-color-5">
                    {(activity as DriverActivityRes).number_seat_in_car} Khách
                  </span>
                </>
              ) : (
                <>
                  <CarIcon className="w-[14px] h-[14px] mr-[5px]" />
                  <span className="text-sm text-gray-color-5">{car.name}</span>
                </>
              )}
            </p>

            <p className="flex items-center">
              <CalendarIcon className="w-[14px] h-[14px] mr-[5px]" />
              <span className="text-sm text-gray-color-5">
                {moment(expected_going_on_date).format("HH:mm DD/MM/YYYY")}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col flex-center mr-[12px]">
          <p className="text-sm text-gray-color-5 mb-[4px]">Tổng giá phí</p>
          <p className="md:text-lg lg:text-lg xl:text-xl">
            {formatMoneyVND(
              (activity as DriverActivityRes).number_seat_in_car
                ? (activity as DriverActivityRes).price_unit.price_unit
                : (activity as CustomerActivityRes).amount_total
            )}
          </p>
        </div>

        <div className="my-auto block">
          <button className="text-sm font-semibold text-blue-3">Xem chi tiết</button>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-between mb-[12px] pb-[12px] border-b border-solid border-border-color">
          <div className="flex-1 flex items-center">
            <span className="mr-[8px]">
              <CompoundingCarICon compounding_type={compounding_type} />
            </span>
            <span className="text-[10px] leading-[18px] mr-[8px]">
              {COMPOUNDING_TYPE_NAME[activity.compounding_type]}
            </span>
            <span
              style={{
                color: STATE_COLOR?.[state] || "",
                backgroundColor: STATE_BG_COLOR[state || ""],
              }}
              className="py-[4px] px-[8px] text-[10px] rounded-[5px] bg-white-color"
            >
              {COMPOUNDING_STATE_NAME[state]}
            </span>
          </div>
          <span className="text-xs text-primary">Chi tiết</span>
        </div>

        <div className="flex items-center justify-between mb-[8px]">
          <p className="text-14 xs:text-18 leading-[20px] font-semibold mr-[16px]">
            {from_province.province_brief_name} - {to_province.province_brief_name}
          </p>
          <p className="flex items-center">
            {(activity as DriverActivityRes).number_seat_in_car ? (
              <>
                <MultiUserIcon className="w-[12px] h-[12px] xs:w-[14px] xs:h-[14px] mr-[4px] xs:mr-[8px]" />
                <span className="text-sm text-gray-color-5">
                  {(activity as DriverActivityRes).number_seat_in_car} Khách
                </span>
              </>
            ) : (
              <>
                <CarIcon className="w-[12px] h-[12px] xs:w-[14px] xs:h-[14px] mr-[4px] xs:mr-[8px]" />
                <span className="text-12 xs:text-14 xs:font-medium">
                  {toFirstUpperCase(car.name)}
                </span>
              </>
            )}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="flex items-center text-12 xs:text-14 xs:font-medium">
            <CalendarIcon className="w-[12px] h-[12px] xs:w-[14px] xs:h-[14px] mr-[4px] xs:mr-[8px]" />
            <span>{moment(activity.expected_going_on_date).format("HH:mm DD/MM/YYYY")}</span>
          </p>
          <p className="flex items-center">
            <PaymentIcon className="w-[12px] h-[12px] xs:w-[14px] xs:h-[14px] mr-[4px] xs:mr-[8px]" />
            <span className="text-12 xs:text-14 font-medium text-error">
              {formatMoneyVND(
                (activity as DriverActivityRes).number_seat_in_car
                  ? (activity as DriverActivityRes).price_unit.price_unit
                  : (activity as CustomerActivityRes).amount_total
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export { ActivityItem }
