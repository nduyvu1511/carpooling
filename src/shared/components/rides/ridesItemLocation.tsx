import { ArrowLineRightIcon, MinusIcon } from "@/assets"
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
  "text-[12px] leading-[22px] sm:text-[18px] sm:leading-[30px] md:text-[24px] font-semibold sm:font-medium text-gray-color-4 line-clamp-1"

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
        <p className="text-[10px] sm:text-[14px] sm:font-medium text-gray-color-5 line-clamp-1">
          {moment(from_date).format("HH:mm")}
        </p>
      </div>

      <div className="mx-[8px]">
        <ArrowLineRightIcon className="w-[8px] sm:w-[12px] sm:block" />
      </div>

      <div className="flex-1 flex flex-col items-end justify-between">
        <p className={titleStyle}>{to_province_name}</p>
        <p className="text-[10px] sm:text-[14px] sm:font-medium text-gray-color-5 line-clamp-1">
          {moment(to_date).format("HH:mm")}
        </p>
      </div>
    </div>
  )
}

export { RidesItemLocation }
