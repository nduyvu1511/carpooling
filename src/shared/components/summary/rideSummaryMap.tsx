import { ArrowLineRightIcon } from "@/assets"
import { COMPOUNDING_TYPE_NAME, getHoursName } from "@/helper"
import { CompoundingCarCustomer, CompoundingCarRes } from "@/models"
import moment from "moment"
import { memo } from "react"
import { Map } from "../map"
import { SummaryItem } from "./summaryItem"

interface RideSummaryMapProps {
  data: CompoundingCarCustomer | CompoundingCarRes
  showMap?: boolean
  className?: string
}

export const RideSummaryMap = memo(function Child({
  data,
  showMap = true,
  className = "",
}: RideSummaryMapProps) {
  return (
    <div className={`bg-gray-05 rounded-[5px] p-custom ${className}`}>
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

      {showMap ? (
        <div className="h-[200px] mb-16">
          {/* <Map
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
          /> */}
        </div>
      ) : null}

      <ul>
        <SummaryItem label="Loại chuyến" value={COMPOUNDING_TYPE_NAME[data.compounding_type]} />
        <SummaryItem label="Thời gian dự kiến" value={getHoursName(data.duration || 0)} />
        <SummaryItem className="mb-0" label="Lộ trình ước tính" value={`${data.distance} Km`} />
      </ul>
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
