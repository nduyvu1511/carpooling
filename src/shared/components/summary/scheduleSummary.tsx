import { CompoundingType, DirectionLngLat } from "@/models"
import { Map } from "../map"
import { RideItemLocation } from "../ride"

interface ScheduleSummary {
  from_province_name: string
  to_province_name: string
  from_address: string
  to_address: string
  expected_going_on_date: string
  expected_picking_up_date: string
  distance: number
  duration: number
  compounding_type: CompoundingType
  number_seat: number
  number_seat_in_car: number
  direction: DirectionLngLat
}

const ScheduleSummary = ({
  compounding_type,
  distance,
  duration,
  expected_going_on_date,
  expected_picking_up_date,
  from_province_name,
  to_province_name,
  number_seat_in_car,
  number_seat,
  direction,
  from_address,
  to_address,
}: ScheduleSummary) => {
  if (!compounding_type) return null
  return (
    <div className="">
      {/* <div className="p-24">
        <h3 className="text-18 leading-[26px] font-medium text-primary">Thông tin chuyến đi</h3>
      </div> */}

      <div className="bg-bg-primary">
        <div className=" h-[200px] relative">
          <Map
            directions={{
              destination: direction.destination,
              origin: direction.origin,
            }}
            viewOnly
          />
        </div>
        <div className="p-24 mb-24">
          <RideItemLocation
            hasDate
            compounding_type={compounding_type}
            from_date={expected_going_on_date}
            from_province_name={from_province_name}
            to_province_name={to_province_name}
            to_date={expected_picking_up_date}
          />
        </div>
      </div>
      <div className="">
        <p className="text-16 font-semibold mb-12">Thông tin lộ trình:</p>

        <ul className="">
          {/* <li className="flex items-baseline justify-between py-8">
            <span className="mr-8 text-xs">Ngày đi:</span>
            <span className="text-sm">
              {moment(expected_going_on_date).format("HH:mm DD/MM/YYYY")}
            </span>
          </li> */}
          <li className="flex items-baseline justify-between py-8">
            <span className="mr-8 text-xs">Điểm đón:</span>
            <span className="text-sm md:text-base flex-1 ml-12 text-right">{from_address}</span>
          </li>
          <li className="flex items-baseline justify-between py-8">
            <span className="mr-8 text-xs">Điểm đến:</span>
            <span className="text-sm md:text-base flex-1 ml-12 text-right">{to_address}</span>
          </li>

          {/* {expected_picking_up_date ? (
            <li className="flex items-baseline justify-between py-8">
              <span className="mr-8 text-xs">Ngày về:</span>
              <span className="text-sm md:text-base flex-1 ml-12 text-right">
                {moment(expected_picking_up_date).format("HH:mm DD/MM/YYYY")}
              </span>
            </li>
          ) : null} */}
          <li className="flex items-baseline justify-between py-8">
            <span className="mr-8 text-xs">Tổng lộ trình ước tính:</span>
            <span className="text-sm md:text-base flex-1 ml-12 text-right">{distance} km</span>
          </li>

          <li className="flex items-baseline justify-between py-8">
            <span className="mr-8 text-xs">Thời gian di chuyển dự kiến:</span>
            <span className="text-sm md:text-base flex-1 ml-12 text-right">{duration || 0}</span>
          </li>

          <li className="flex items-baseline justify-between py-8">
            <span className="mr-8 text-xs">Số khách:</span>
            <span className="text-sm md:text-base flex-1 ml-12 text-right">
              {number_seat_in_car}/{number_seat} khách
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export { ScheduleSummary }
