import {
  COMPOUNDING_TYPE_BG,
  COMPOUNDING_TYPE_COLOR,
  COMPOUNDING_TYPE_NAME,
  getHoursName,
  toFirstUpperCase,
} from "@/helper"
import { CompoundingCarCustomer, CompoundingCarRes } from "@/models"
import moment from "moment"
import { SummaryItem } from "./summaryItem"

interface RideSummarInfoProps {
  data: CompoundingCarRes | CompoundingCarCustomer
  showRideType?: boolean
}

const RideSummaryInfo = ({ data, showRideType = true }: RideSummarInfoProps) => {
  return (
    <ul>
      {showRideType ? (
        <div className="flex items-start justify-between mb-12">
          <span className="mr-16 leading-[20px] text-12 font-medium text-gray-color-7">
            Loại chuyến
          </span>
          <span
            style={{
              color: COMPOUNDING_TYPE_COLOR?.[data.compounding_type],
              backgroundColor: COMPOUNDING_TYPE_BG?.[data.compounding_type],
            }}
            className="py-4 px-10 rounded-[8px] text-12"
          >
            {COMPOUNDING_TYPE_NAME?.[data.compounding_type]}
          </span>
        </div>
      ) : null}
      <SummaryItem
        label="Điểm đón"
        value={data?.from_address || data.from_province?.province_name}
      />
      <SummaryItem label="Điểm đến" value={data?.to_address || data.to_province?.province_name} />
      <SummaryItem
        label="Ngày đi"
        value={moment(data.expected_going_on_date).format("HH:mm DD/MM/YYYY")}
      />
      {data.expected_picking_up_date ? (
        <SummaryItem
          label="Ngày về"
          value={moment(data.expected_picking_up_date).format("HH:mm DD/MM/YYYY")}
        />
      ) : null}
      <SummaryItem label="Loại xe" value={data?.car?.name && toFirstUpperCase(data.car.name)} />
      <SummaryItem label="Tổng lộ trình ước tính" value={`${data.distance} Km`} />
      {data.duration ? (
        <SummaryItem label="Thời gian ước tính" value={getHoursName(data.duration)} />
      ) : null}
      {data.compounding_type === "compounding" && data?.number_available_seat ? (
        <SummaryItem
          className="mb-0 mt-12"
          label="Số hành khách"
          value={
            (data as CompoundingCarRes)?.number_seat_in_car
              ? (data as CompoundingCarRes)?.number_seat_in_car - data?.number_available_seat
              : (data as CompoundingCarCustomer).number_seat || data.number_available_seat
          }
        />
      ) : null}
    </ul>
  )
}

export { RideSummaryInfo }
