import { ArrowLineRightIcon } from "@/assets"
import { CompoundingType } from "@/models"
import moment from "moment"

interface RidesItemLocationProps {
  compounding_type: CompoundingType
  from_province_name: string
  to_province_name: string
  from_date: string
  to_date: string
}

const titleStyle =
  "text-[12px] leading-[22px] md:leading-[26px] md:text-[14px] lg:text-[20px] lg:leading-[32px] font-semibold lg:font-medium text-gray-color-4 line-clamp-1"

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
        <p className={titleStyle}>{from_province_name}</p>
        <p className="text-[10px] md:text-[12px] lg:text-[14px] text-gray-color-5 line-clamp-1">
          {moment(from_date).format("HH:mm")}
        </p>
      </div>

      <div className="mx-[8px] mt-[8px]">
        <ArrowLineRightIcon />
      </div>

      <div className="flex-1 flex flex-col items-end justify-between">
        <p className={titleStyle}>{to_province_name}</p>
        <p className="text-[10px] md:text-[12px] lg:text-[14px] text-gray-color-5 line-clamp-1">
          {moment(to_date).format("HH:mm")}
        </p>
      </div>
    </div>
  )
}

export { RidesItemLocation }
