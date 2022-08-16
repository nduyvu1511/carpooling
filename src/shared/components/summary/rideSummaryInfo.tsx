import { getCompoundingCarName, getHoursName, toFirstUpperCase } from "@/helper"
import { CompoundingCarCustomer, CompoundingCarRes } from "@/models"
import moment from "moment"

const item =
  "flex-1 flex justify-end ml-24 text-14 text-right md:text-16 font-medium leading-26 text-blue-8"
const titleClassName = "text-12 font-normal leading-[18px] w-[90px]"

interface RideSummarInfoProps {
  data: CompoundingCarRes | CompoundingCarCustomer
}

const RideSummaryInfo = ({ data }: RideSummarInfoProps) => {
  return (
    <ul>
      <li className="flex items-baseline justify-between mb-[16px]">
        <p className={titleClassName}>Loại chuyến:</p>
        <p className={item}>{getCompoundingCarName(data.compounding_type)}</p>
      </li>
      <li className="flex items-start justify-between mb-[16px]">
        <p className="text-xs">Điểm đón</p>
        <p className="text-sm md:text-base ml-24 flex-1 text-right">
          {data?.from_address || data.from_province?.province_name}
        </p>
      </li>
      <li className="flex items-start justify-between mb-[16px]">
        <p className="text-xs">Điểm đến</p>
        <p className="text-sm md:text-base ml-24 flex-1 text-right">
          {data?.to_address || data.to_province?.province_name}
        </p>
      </li>
      <li className="flex items-start justify-between mb-[16px]">
        <p className="text-xs">Ngày đi</p>
        <p className="text-sm md:text-base ml-24 flex-1 text-right">
          {moment(data.expected_going_on_date).format("HH:mm DD/MM/YYYY")}
        </p>
      </li>
      {data.expected_picking_up_date ? (
        <li className="flex items-start justify-between mb-[16px]">
          <p className="text-xs">Ngày về</p>
          <p className="text-sm md:text-base ml-24 flex-1 text-right">
            {moment(data.expected_picking_up_date).format("HH:mm DD/MM/YYYY")}
          </p>
        </li>
      ) : null}
      <li className="flex items-start justify-between mb-[16px]">
        <p className="text-xs">Tổng lộ trình ước tính</p>
        <p className="text-sm md:text-base ml-24 flex-1 text-right">{data.distance} Km</p>
      </li>
      {data.duration ? (
        <li className="flex items-start justify-between mb-[16px]">
          <p className="text-xs">Thời gian ước tính</p>
          <p className="text-sm md:text-base ml-24 flex-1 text-right">
            {getHoursName(data.duration)}
          </p>
        </li>
      ) : null}
      <li className="flex items-start justify-between mb-[16px]">
        <p className="text-xs">Loại xe</p>
        <p className="text-sm md:text-base ml-24 flex-1 text-right">
          {toFirstUpperCase(data.car.name)}
        </p>
      </li>
      {(data as CompoundingCarCustomer)?.number_seat ? (
        <li className="flex items-start justify-between mb-[16px]">
          <p className="text-xs">Số hành khách</p>
          <p className="text-sm md:text-base ml-24 flex-1 text-right">
            {(data as CompoundingCarCustomer).number_seat}
          </p>
        </li>
      ) : null}
    </ul>
  )
}

export { RideSummaryInfo }
