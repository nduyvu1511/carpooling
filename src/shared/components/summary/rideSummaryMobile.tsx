import { CalendarDoneIcon, CalendarIcon, LocationIcon3, LocationIcon4, ZoomInIcon } from "@/assets"
import { CompoundingCarCustomer, CompoundingCarDriverRes, CompoundingCarRes } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import moment from "moment"
import { useDispatch } from "react-redux"

interface RidesSummaryMobileProps {
  rides: CompoundingCarCustomer | CompoundingCarRes | CompoundingCarDriverRes
}

export const RidesSummaryMobile = ({ rides }: RidesSummaryMobileProps) => {
  const dispatch = useDispatch()

  return (
    <div className="bg-bg-primary p-12 md:p-24">
      <p className="uppercase text-primary mb-24 text-base font-semibold">Thông tin chuyến đi</p>
      <div className="flex items-start mb-12">
        <LocationIcon3 />
        <p className="flex-1 text-sm ml-[10px]">{rides.from_address} </p>
      </div>
      {rides?.to_address ? (
        <div className="flex items-start mb-12">
          <LocationIcon4 />
          <p className="flex-1 text-sm ml-[10px]">{rides.to_address} </p>
        </div>
      ) : null}
      <div className="flex items-start mb-12">
        <CalendarIcon />
        <p className="flex-1 text-sm ml-[10px]">
          {moment(rides.expected_going_on_date).format("HH:mm DD/MM/YYYY")}{" "}
        </p>
      </div>
      {rides?.expected_picking_up_date ? (
        <div className="flex items-start">
          <CalendarDoneIcon />
          <p className="flex-1 text-sm ml-[10px]">
            {moment(rides.expected_picking_up_date).format("HH:mm DD/MM/YYYY")}{" "}
          </p>
        </div>
      ) : null}
      <button
        onClick={() => dispatch(setShowSummaryDetail(true))}
        className="mt-[24px] flex items-start text-primary text-xs font-medium"
      >
        <ZoomInIcon className="text-primary" />
        <span className="ml-[10px]">Xem chi tiết</span>
      </button>
    </div>
  )
}
