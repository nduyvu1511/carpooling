import { getCompoundingCarName, getHoursName, toFirstUpperCase } from "@/helper"
import { CompoundingCarCustomer, CompoundingCarRes } from "@/models"
import moment from "moment"
import { SummaryItem } from "./summaryItem"

interface RideSummarInfoProps {
  data: CompoundingCarRes | CompoundingCarCustomer
}

const RideSummaryInfo = ({ data }: RideSummarInfoProps) => {
  return (
    <ul>
      <SummaryItem label="Loại chuyến" value={getCompoundingCarName(data.compounding_type)} />
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
      <SummaryItem label="Tổng lộ trình ước tính" value={`${data.distance} Km`} />

      {data.duration ? (
        <SummaryItem label="Thời gian ước tính" value={getHoursName(data.duration)} />
      ) : null}
      <SummaryItem
        className="mb-0"
        label="Loại xe"
        value={data?.car?.name && toFirstUpperCase(data.car.name)}
      />
      {data.compounding_type === "compounding" ? (
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
