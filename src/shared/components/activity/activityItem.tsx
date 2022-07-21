import {
  CalendarIcon,
  CarIcon,
  CarpoolingIcon,
  MultiUserIcon,
  OneWayIcon,
  TwoWayIcon,
} from "@/assets"
import { formatMoneyVND, getCompoundingCarStateName, STATE_BG_COLOR, STATE_COLOR } from "@/helper"
import { CustomerActivityRes, DriverActivityRes } from "@/models"
import moment from "moment"

interface ActivityItemProps<T> {
  activity: T | null
}

const ActivityItem = <T extends DriverActivityRes | CustomerActivityRes>({
  activity,
}: ActivityItemProps<T>) => {
  if (!activity)
    return (
      <div className="p-24 block-element border border-solid border-border-color rounded-[20px] mb-[24px]">
        <div className="flex items-center justify-between">
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
    <div className="py-24 px-[30px]">
      <div className="flex items-stretch justify-between">
        <div className="mr-[12px]">
          <div className="flex">
            <span className="mr-[16px] mt-[4px]">
              {compounding_type === "one_way" ? (
                <OneWayIcon className="w-[26px] h-[26px]" />
              ) : compounding_type === "two_way" ? (
                <TwoWayIcon className="w-[26px] h-[26px]" />
              ) : (
                <CarpoolingIcon className="w-[26px] h-[26px]" />
              )}
            </span>

            <div className="flex items-center mb-[12px]">
              <p className="text-xl mr-[16px]">
                {from_province.province_brief_name} - {to_province.province_brief_name}
              </p>
              <span
                style={{
                  color: STATE_COLOR?.[state] || "",
                  border: `1px solid ${STATE_BG_COLOR[state || ""]}`,
                }}
                className="py-[4px] px-[8px] text-sm rounded-[5px] bg-white-color"
              >
                {getCompoundingCarStateName(state)}
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
                {moment(expected_going_on_date).format("HH:MM DD/MM/YYYY")}
              </span>
            </p>
          </div>
         </div>

        <div className="flex-col flex-center mr-[12px]">
          <p className="text-sm text-gray-color-5 mb-[4px]">Tổng giá phí</p>
          <p className="text-xl">
            {formatMoneyVND(
              (activity as DriverActivityRes).number_seat_in_car
                ? (activity as DriverActivityRes).price_unit.price_unit
                : (activity as CustomerActivityRes).amount_total
            )}
          </p>
        </div>

        <div className="my-auto">
          <button className="text-sm font-semibold text-blue-3">Xem chi tiết</button>
        </div>
      </div>
    </div>
  )
}

export { ActivityItem }
