import { CalendarDoneIcon, CalendarIcon, LocationIcon3, LocationIcon4, ZoomInIcon } from "@/assets"
import { CompoundingCarCustomer, CompoundingCarDriverRes, CompoundingCarRes } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import moment from "moment"
import { useDispatch } from "react-redux"
import { SummaryItem } from "./summaryItem"

interface RideSummaryMobileProps {
  rides: CompoundingCarCustomer | CompoundingCarRes | CompoundingCarDriverRes
  showDetailBtn?: boolean
  className?: string
}

export const RideSummaryMobile = ({
  rides,
  showDetailBtn = true,
  className = "",
}: RideSummaryMobileProps) => {
  const dispatch = useDispatch()

  return (
    <div className={`bg-gray-05 p-16 rounded-[5px] shadow-shadow-1 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="uppercase text-primary text-base font-semibold">Thông tin chuyến đi</p>
        {showDetailBtn ? (
          <button
            onClick={() => dispatch(setShowSummaryDetail(true))}
            className="flex items-center text--gray-color-7 text-xs font-medium p-4"
          >
            <span className="mr-[10px] hidden sm:block">Xem chi tiết</span>
            <ZoomInIcon className="text-gray-color-7 w-12 h-12" />
          </button>
        ) : null}
      </div>

      <div className="border-b border-solid border-border-color my-12"></div>

      <div className="flex items-start mb-12 justify-between">
        <p className="text-xs mr-16 leading-[20px] hidden sm:block">Điểm đón</p>
        <LocationIcon3 className="sm:hidden mt-4" />
        <p className="flex-1 flex justify-end text-sm text-right ml-[10px] sm:max-w-[70%] w-full">
          {rides?.from_address || rides?.from_province?.province_name}
        </p>
      </div>
      <div className="flex items-start mb-12 justify-between">
        <p className="text-xs mr-16 leading-[20px] hidden sm:block">Điểm đến</p>
        <LocationIcon4 className="sm:hidden mt-4" />
        <p className="flex-1 flex justify-end text-sm text-right ml-[10px] sm:max-w-[70%] w-full">
          {rides?.to_address || rides?.to_province?.province_name}
        </p>
      </div>

      <SummaryItem
        className="hidden sm:flex"
        label="Ngày đi"
        value={moment(rides.expected_going_on_date).format("HH:mm DD/MM/YYYY")}
      />

      {rides?.expected_picking_up_date ? (
        <SummaryItem
          label="Ngày về"
          value={moment(rides.expected_picking_up_date).format("HH:mm DD/MM/YYYY")}
        />
      ) : null}

      <div className="flex xs:items-center flex-col xs:flex-row sm:hidden">
        <div className="flex items-start">
          <CalendarIcon className="sm:hidden mt-4" />
          <p className="flex-1 text-sm ml-[10px]">
            {moment(rides.expected_going_on_date).format("HH:mm DD/MM/YYYY")}{" "}
          </p>
        </div>
        {rides?.expected_picking_up_date ? (
          <div className="flex items-start xs:ml-16 mt-12 xs:mt-0">
            <p className="text-xs "></p>
            <CalendarDoneIcon className="sm:hidden mt-4" />
            <p className="flex-1 text-sm ml-[10px]">
              {moment(rides.expected_picking_up_date).format("HH:mm DD/MM/YYYY")}{" "}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
