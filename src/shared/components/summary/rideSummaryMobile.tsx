import { CalendarDoneIcon, CalendarIcon, LocationIcon3, LocationIcon4, ZoomInIcon } from "@/assets"
import { COMPOUNDING_TYPE_BG, COMPOUNDING_TYPE_COLOR, COMPOUNDING_TYPE_NAME } from "@/helper"
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
    <div className={`bg-gray-05 px-12 p-16 xs:px-16 rounded-[5px] shadow-shadow-1 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="uppercase text-primary text-base font-semibold">Thông tin chuyến đi</p>
        {showDetailBtn ? (
          <button
            onClick={() => dispatch(setShowSummaryDetail(true))}
            className="flex items-center text--gray-color-7 text-xs font-medium p-4"
          >
            <span className="mr-[10px] hidden xs:block">Xem chi tiết</span>
            <ZoomInIcon className="text-gray-color-7 w-12 h-12" />
          </button>
        ) : null}
      </div>

      <div className="border-b border-solid border-border-color my-12"></div>

      {/* <div className="flex items-start mb-12 justify-between">
        <p className="text-xs mr-16 leading-[20px] hidden xs:block">Loại chuyến</p>
        <LocationIcon3 className="xs:hidden mt-4" />
        <p
          style={{
            color: COMPOUNDING_TYPE_COLOR?.[rides.compounding_type],
            backgroundColor: COMPOUNDING_TYPE_BG?.[rides.compounding_type],
          }}
          className="text-[10px] sm:text-12 px-10 py-4 rounded-[8px] mr-auto ml-12 xs:ml-auto"
        >
          {COMPOUNDING_TYPE_NAME?.[rides.compounding_type]}
        </p>
      </div> */}
      <div className="flex items-start mb-12 justify-between">
        <p className="text-xs mr-16 leading-[20px] hidden xs:block">Điểm đón</p>
        <LocationIcon3 className="xs:hidden mt-4" />
        <p className="flex-1 flex xs:justify-end text-sm leading-[22px] xs:text-right ml-12 xs:max-w-[70%] w-full">
          {rides?.from_address || rides?.from_province?.province_name}
        </p>
      </div>
      <div className="flex items-start mb-12 justify-between">
        <p className="text-xs mr-16 leading-[20px] hidden xs:block">Điểm đến</p>
        <LocationIcon4 className="xs:hidden mt-4" />
        <p className="flex-1 flex xs:justify-end text-sm leading-[22px] xs:text-right ml-12 xs:max-w-[70%] w-full">
          {rides?.to_address || rides?.to_province?.province_name}
        </p>
      </div>

      <SummaryItem
        className="hidden xs:flex mb-0"
        label="Ngày đi"
        value={moment(rides.expected_going_on_date).format("HH:mm DD/MM/YYYY")}
      />

      {rides?.expected_picking_up_date ? (
        <SummaryItem
          className="my-12"
          label="Ngày về"
          value={moment(rides.expected_picking_up_date).format("HH:mm DD/MM/YYYY")}
        />
      ) : null}

      <div className="flex xs:items-center flex-col xs:flex-row xs:hidden">
        <div className="flex items-start">
          <CalendarIcon className="xs:hidden mt-4" />
          <p className="flex-1 text-sm ml-12 xs:text-right leading-[22px]">
            {moment(rides.expected_going_on_date).format("HH:mm DD/MM/YYYY")}{" "}
          </p>
        </div>
        {rides?.expected_picking_up_date ? (
          <div className="flex items-start xs:ml-16 mt-12 xs:mt-0">
            <p className="text-xs "></p>
            <CalendarDoneIcon className="xs:hidden mt-4" />
            <p className="flex-1 text-sm ml-12 leading-[22px]">
              {moment(rides.expected_picking_up_date).format("HH:mm DD/MM/YYYY")}{" "}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
