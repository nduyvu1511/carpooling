import {
  ArrowLineRightIcon,
  ArrowRightIcon,
  CarpoolingIcon,
  OneWayIcon,
  TwoWayIcon,
} from "@/assets"
import { CompoundingType } from "@/models"
import moment from "moment"
import React from "react"

interface RidesItemLocationProps {
  compounding_type: CompoundingType
  from_province_name: string
  to_province_name: string
  from_date: string
  to_date: string
}

const RidesItemLocation = ({
  compounding_type,
  from_date,
  from_province_name,
  to_date,
  to_province_name,
}: RidesItemLocationProps) => {
  return (
    <div className="flex items-stretch">
      <div className="flex-1 flex flex-col items-start justify-between">
        <p className="text-[20px] leading-[32px] font-medium text-gray-color-4 line-clamp-1">
          {from_province_name}
        </p>
        <p className="text-sm text-gray-color-5 line-clamp-1">
          {moment(from_date).format("HH:MM")}
        </p>
      </div>
      <div className="mx-[8px] mt-[8px]">
        <ArrowLineRightIcon />
        {/* {compounding_type === "one_way" ? (
          <OneWayIcon />
        ) : compounding_type === "two_way" ? (
          <TwoWayIcon />
        ) : (
          <CarpoolingIcon />
        )} */}
      </div>
      <div className="flex-1 flex flex-col items-end justify-between">
        <p className="text-[20px] leading-[32px] font-medium text-gray-color-4 line-clamp-1">
          {to_province_name}
        </p>
        <p className="text-sm text-gray-color-5 line-clamp-1">{moment(to_date).format("HH:MM")}</p>
      </div>
    </div>
  )
}

export { RidesItemLocation }
