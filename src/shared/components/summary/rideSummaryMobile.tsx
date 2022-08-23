import { CalendarDoneIcon, CalendarIcon, LocationIcon3, LocationIcon4, ZoomInIcon } from "@/assets"
import { CompoundingCarCustomer, CompoundingCarDriverRes, CompoundingCarRes } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import moment from "moment"
import { useDispatch } from "react-redux"

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
    <div className={`bg-bg-primary p-custom rounded-[5px] shadow-shadow-1 ${className}`}>
      <p className="uppercase text-primary mb-16 md:mb-24 text-base font-semibold">
        Thông tin chuyến đi
      </p>
      <div className="flex items-start mb-12">
        <LocationIcon3 className="mt-4" />
        <p className="flex-1 text-sm ml-[10px]">
          {rides?.from_address || rides?.from_province?.province_name}
        </p>
      </div>
      {rides?.to_address ? (
        <div className="flex items-start mb-12">
          <LocationIcon4 className="mt-4" />
          <p className="flex-1 text-sm ml-[10px]">
            {rides?.to_address || rides?.from_province?.province_name}
          </p>
        </div>
      ) : null}
      <div className="flex xs:items-center flex-col xs:flex-row">
        <div className="flex items-start">
          <CalendarIcon className="mt-4" />
          <p className="flex-1 text-sm ml-[10px]">
            {moment(rides.expected_going_on_date).format("HH:mm DD/MM/YYYY")}{" "}
          </p>
        </div>
        {rides?.expected_picking_up_date ? (
          <div className="flex items-start xs:ml-16 mt-12 xs:mt-0">
            <CalendarDoneIcon className="mt-4" />
            <p className="flex-1 text-sm ml-[10px]">
              {moment(rides.expected_picking_up_date).format("HH:mm DD/MM/YYYY")}{" "}
            </p>
          </div>
        ) : null}
      </div>

      {showDetailBtn ? (
        <button
          onClick={() => dispatch(setShowSummaryDetail(true))}
          className="mt-12 flex items-center text-primary text-xs font-medium"
        >
          <ZoomInIcon className="text-primary" />
          <span className="ml-[10px]">Xem chi tiết</span>
        </button>
      ) : null}
    </div>
  )
}
