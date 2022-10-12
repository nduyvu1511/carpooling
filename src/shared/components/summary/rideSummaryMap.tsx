import { ArrowLineRightIcon } from "@/assets"
import {
  COMPOUNDING_TYPE_BG,
  COMPOUNDING_TYPE_COLOR,
  COMPOUNDING_TYPE_NAME,
  getHoursName,
} from "@/helper"
import { CompoundingCarCustomer, CompoundingCarRes } from "@/models"
import moment from "moment"
import { memo } from "react"
import { Map } from "../map"
import { SummaryItem } from "./summaryItem"

interface RideSummaryMapProps {
  data: CompoundingCarCustomer | CompoundingCarRes
  showMap?: boolean
  className?: string
  showInfo?: boolean
}

export const RideSummaryMap = memo(function Child({
  data,
  showMap = true,
  className = "",
  showInfo = true,
}: RideSummaryMapProps) {
  return (
    <div className={`${showInfo ? "bg-gray-05 rounded-[5px] p-custom" : ""} ${className}`}>
      {showInfo ? (
        <div className="flex items-center mb-16">
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
      ) : null}

      {showMap ? (
        <div
          onClick={() =>
            window.open(
              `https://www.google.com/maps/dir/?api=1&origin=${data.from_province.latitude},${data.from_province.longitude}&destination=${data.to_province.latitude},${data.to_province.longitude}`,
              "_blank"
            )
          }
          className="h-[200px]"
        >
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

      {showInfo ? (
        <ul className="mt-16">
          <div className={`flex items-start justify-between mb-12 ${className}`}>
            <span className={`mr-16 ${"leading-[20px] text-12 font-medium text-gray-color-7"}`}>
              Loại chuyến
            </span>
            <span
              style={{
                color: COMPOUNDING_TYPE_COLOR[data.compounding_type],
                backgroundColor: COMPOUNDING_TYPE_BG[data.compounding_type],
              }}
              className="text-12 px-[10px] py-4 rounded-[8px]"
            >
              {COMPOUNDING_TYPE_NAME[data.compounding_type]}
            </span>
          </div>
          <SummaryItem label="Thời gian dự kiến" value={getHoursName(data.duration || 0)} />
          <SummaryItem className="mb-0" label="Lộ trình ước tính" value={`${data.distance} Km`} />
        </ul>
      ) : null}
    </div>
  )
},
areEqual)

function areEqual(prevProps: RideSummaryMapProps, nextProps: RideSummaryMapProps) {
  return (
    prevProps.data.from_province.longitude === nextProps.data.from_province.longitude &&
    prevProps.data.from_province.latitude === nextProps.data.from_province.latitude &&
    prevProps.data.to_province.longitude === nextProps.data.to_province.longitude &&
    prevProps.data.to_province.latitude === nextProps.data.to_province.latitude
  )
}
