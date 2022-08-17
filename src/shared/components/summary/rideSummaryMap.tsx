import { ArrowLineRightIcon } from "@/assets"
import { COMPOUNDING_TYPE_NAME, getHoursName } from "@/helper"
import { CompoundingCarCustomer, CompoundingCarRes } from "@/models"
import moment from "moment"
import { Map } from "../map"

interface RideSummaryMapProps {
  data: CompoundingCarCustomer | CompoundingCarRes
  showMap?: boolean
  className?: string
}

export const RideSummaryMap = ({ data, showMap = true, className = "" }: RideSummaryMapProps) => {
  return (
    <div className={`bg-bg-primary rounded-[5px] p-12 md:p-24 ${className}`}>
      <div className="flex items-center mb-[16px]">
        <div className="flex-1">
          <p className="text-[22px] xl:text-28 font-medium leading-[36px] mb-4 line-clamp-1">
            {data?.from_province.province_brief_name}
          </p>
          <p className="text-12 md:text-14 font-medium leading-26">
            {moment(data?.expected_going_on_date).format("HH:mm DD/MM/YYYY")}
          </p>
        </div>
        <div className="mx-8 flex-center flex-col">
          <ArrowLineRightIcon className="w-[14px] mb-12" />
        </div>
        <div className="flex-1 flex items-end flex-col">
          <p className="text-[22px] xl:text-28 font-medium leading-[36px] mb-4 line-clamp-1">
            {data?.to_province.province_brief_name}
          </p>
          <p className="text-12 md:text-14 font-medium leading-26">
            {moment(data?.expected_going_on_date)
              .add(data.duration, "hours")
              .format("HH:mm DD/MM/YYYY")}
          </p>
        </div>
      </div>

      {showMap ? (
        <div className="h-[200px] mb-[16px]">
          <Map
            viewOnly
            directions={{
              destination: {
                lat: Number(data.from_province.latitude),
                lng: Number(data.from_province.longitude),
              },
              origin: {
                lat: Number(data.to_province.latitude),
                lng: Number(data.to_province.longitude),
              },
            }}
          />
        </div>
      ) : null}

      <ul>
        <li className="flex items-center justify-between mb-12">
          <p className="text-xs">Loại chuyến</p>
          <p className="ml-[16px] flex-1 text-right text-sm md:text-base">
            {COMPOUNDING_TYPE_NAME[data.compounding_type]}
          </p>
        </li>
        <li className="flex items-center justify-between mb-12">
          <p className="text-xs">Thời gian dự kiến</p>
          <p className="ml-[16px] flex-1 text-right text-sm md:text-base">
            {getHoursName(data.duration || 0)}
          </p>
        </li>
        <li className="flex items-center justify-between">
          <p className="text-xs">Lộ trình ước tính</p>
          <p className="ml-[16px] flex-1 text-right text-sm md:text-base">{data.distance} Km</p>
        </li>
      </ul>
    </div>
  )
}
