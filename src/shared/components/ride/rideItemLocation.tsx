import { ArrowLineRightIcon } from "@/assets"
import { CompoundingType } from "@/models"
import moment from "moment"

interface RideItemLocationProps {
  compounding_type: CompoundingType
  from_province_name: string
  to_province_name: string
  from_date: string
  to_date: string
  hasDate?: boolean
}

const titleStyle =
  "text-[12px] leading-[22px] sm:text-[18px] mb-4 sm:leading-[30px] md:text-[24px] font-semibold sm:font-medium text-blue-8 line-clamp-1"

const RideItemLocation = ({
  from_date,
  from_province_name,
  to_date,
  to_province_name,
  hasDate,
}: RideItemLocationProps) => {
  return (
    <div className="flex items-stretch">
      <div className="flex-1 flex flex-col items-start justify-between">
        <p className={titleStyle}>{from_province_name}</p>
        <p className="text-[10px] sm:text-[14px] sm:font-medium text-gray-color-5 line-clamp-1">
          {moment(from_date).format(hasDate ? "HH:mm DD/MM/YYYY" : "HH:mm")}
        </p>
      </div>

      <div className="mx-[8px]">
        <ArrowLineRightIcon className="w-[8px] sm:w-[12px] sm:block" />
      </div>

      <div className="flex-1 flex flex-col items-end justify-between">
        <p className={titleStyle}>{to_province_name}</p>
        <p className="text-[10px] sm:text-[14px] sm:font-medium text-gray-color-5 line-clamp-1">
          {moment(to_date).format(hasDate ? "HH:mm DD/MM/YYYY" : "HH:mm")}
        </p>
      </div>
    </div>
  )
}

export { RideItemLocation }
