import { ArrowRightIcon, ArrowRightIcon2 } from "@/assets"
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
import { CompoundingCarICon } from "../common"

interface ActivityItemProps<T> {
  activity: T | null
}

const ActivityItem = <T extends DriverActivityRes | CustomerActivityRes>({
  activity,
}: ActivityItemProps<T>) => {
  if (!activity)
    return (
      <div className="p-custom rounded-[20px]">
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-24">
            <div className="flex items-center">
              <div className="skeleton rounded-[5px] w-[80px] mr-16 h-[14px]"></div>
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
            <div className="skeleton h-[20px] w-[200px] rounded-[4px] mb-16"></div>
            <div className="skeleton h-[12px] w-[200px] rounded-[4px]"></div>
          </div>

          <div className="flex flex-col items-center">
            <div className="skeleton h-[8px] rounded-[5px] w-[90px] mb-16"></div>
            <div className="skeleton h-16 rounded-[5px] w-[160px]"></div>
          </div>

          <div className="skeleton h-[10px] rounded-[5px] w-[100px]"></div>
        </div>
      </div>
    )

  const { from_province, to_province, state, expected_going_on_date, compounding_type, car } =
    activity
  return (
    <div className="p-12 md:p-[20px] lg:p-24">
      <div className="items-stretch justify-between hidden sm:flex">
        <div className="mr-[12px]">
          <div className="flex">
            <span className="mr-16 mt-[4px]">
              <CompoundingCarICon compounding_type={compounding_type} />
            </span>

            <div className="flex items-center mb-[12px]">
              <p className="text-base font-semibold lg:font-medium lg:text-lg xl:text-xl mr-16">
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

          <div className="flex items-center ml-[36px] lg:ml-[44px]">
            <p className="flex items-center">
              {(activity as DriverActivityRes).number_seat_in_car ? (
                <span className="text-xs text-gray-color-5">
                  {(activity as DriverActivityRes).number_seat_in_car} Khách
                </span>
              ) : (
                <span className="text-xs text-gray-color-5">
                  {car.name && toFirstUpperCase(car.name)}
                </span>
              )}
            </p>
            <p className="mx-12 border-r border-gray-10 border-solid h-[14px]"></p>

            <p className="flex items-center">
              <span className="text-xs text-gray-color-5">
                {moment(expected_going_on_date).format("HH:mm DD/MM/YYYY")}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col flex-center mr-[12px]">
          <p className="text-sm text-gray-color-5 mb-[4px]">Tổng giá phí</p>
          <p className="text-14 md:text-16 lg:text-18 xl:text-24 font-semibold text-error">
            {formatMoneyVND(
              (activity as DriverActivityRes).number_seat_in_car
                ? (activity as DriverActivityRes)?.price_unit?.price_unit
                : (activity as CustomerActivityRes).amount_total
            )}
          </p>
        </div>

        <div className="my-auto block">
          <button className="text-sm font-semibold text-blue-3 w-[44px] h-[44px] rounded-[5px] flex-center bg-gray-05">
            <ArrowRightIcon className="text-primary" />
          </button>
        </div>
      </div>

      <div className="sm:hidden">
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
          <span className="text-sm font-semibold text-blue-3 w-[32px] h-[32px] rounded-[5px] flex-center bg-gray-05">
            <ArrowRightIcon className="text-primary" />
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="">
            <div className="mb-[8px]">
              <p className="text-14 xs:text-18 leading-[20px] font-semibold mr-16 flex items-center">
                {from_province.province_brief_name} <ArrowRightIcon2 className="mx-[10px]" />{" "}
                {to_province.province_brief_name}
              </p>
            </div>

            <div className="flex items-center">
              <p className="flex items-center">
                {(activity as DriverActivityRes).number_seat_in_car ? (
                  <span className="text-[10px] xs:text-12 sm:text-14 font-medium text-gray-color-5">
                    {(activity as DriverActivityRes).number_seat_in_car} Khách
                  </span>
                ) : (
                  <span className="text-[10px] xs:text-12 sm:text-14 font-medium">
                    {car.name && toFirstUpperCase(car.name)}
                  </span>
                )}
              </p>
              <p className="mx-8 border-r border-solid border-gray-10 h-[12px]"></p>

              <p className="flex items-center text-[10px] xs:text-12 sm:text-14 font-medium text-gray-color-5">
                <span>{moment(activity.expected_going_on_date).format("HH:mm DD/MM/YYYY")}</span>
              </p>
            </div>
          </div>

          <div className="">
            <p className="text-[10px] xs:text-12 font-medium leading-[18px] mb-4 text-gray-color-5">
              Tổng giá phí
            </p>
            <p className="text-12 xs:text-14 font-semibold text-error">
              {formatMoneyVND(
                (activity as DriverActivityRes).number_seat_in_car
                  ? (activity as DriverActivityRes)?.price_unit?.price_unit
                  : (activity as CustomerActivityRes).amount_total
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ActivityItem }
