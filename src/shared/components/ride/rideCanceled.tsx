import { InfoIcon } from "@/assets"
import { formatMoneyVND, toggleBodyOverflow } from "@/helper"
import { useBackRouter } from "@/hooks"
import { CompoundingCancelCar, CompoundingCarCustomer, CompoundingCarRes } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import moment from "moment"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { RideSummaryModal } from "../summary"

interface RideCanceledProps {
  showLoading?: boolean
  compoundingCar?: CompoundingCarRes | CompoundingCarCustomer
}

const RideCanceled = ({ compoundingCar, showLoading }: RideCanceledProps) => {
  const dispatch = useDispatch()

  useBackRouter({
    cb: () => {
      toggleBodyOverflow("unset")
    },
  })

  useEffect(() => {
    return () => {
      dispatch(setShowSummaryDetail(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // if (!(compoundingCar as CompoundingCancelCar)?.down_payment) return null
  return (
    <div className="p-12 md:p-24 lg:pt-0 pt-0">
      {showLoading ? (
        <div>
          <div className="skeleton h-[18px] rounded-[5px] mb-[40px]"></div>
          <div className="mb-24 flex justify-between">
            <div className="skeleton w-[160px] sm:w-[220px] h-[12px] rounded-[5px]"></div>
            <div className="skeleton w-[90px] sm:w-[180px] h-[12px] rounded-[5px]"></div>
          </div>
          <div className="mb-24 flex justify-between">
            <div className="skeleton w-[120px] sm:w-[180px] h-[12px] rounded-[5px]"></div>
            <div className="skeleton w-[80px] sm:w-[140px] h-[12px] rounded-[5px]"></div>
          </div>
          <div className="mb-[40px] flex justify-between">
            <div className="skeleton w-[200px] sm:w-[250px] h-[12px] rounded-[5px]"></div>
            <div className="skeleton w-[110px] sm:w-[150px] h-[12px] rounded-[5px]"></div>
          </div>
          <div className="flex justify-between mb-[40px]">
            <div className="skeleton w-[140px] sm:w-[160px] h-[12px] rounded-[5px]"></div>
            <div className="skeleton w-[80px] sm:w-[140px] h-[12px] rounded-[5px]"></div>
          </div>
          <div className="lg:hidden skeleton h-[200px] rounded-[5px]"></div>
        </div>
      ) : compoundingCar?.compounding_car_id ? (
        <div className="">
          <div className="px-[10px] py-8 mb-24 bg-bg-primary rounded-[8px] flex items-center">
            <InfoIcon />
            <p className="text-xs ml-[10px] flex-1">
              Exxe sẽ hoàn tiền trong vòng 24 ngày nếu giao dịch hợp lệ và khách hảng tuân thủ đúng
              yêu cầu hủy chuyến.
            </p>
          </div>

          {compoundingCar?.cancel_reason?.cancel_reason_id ? (
            <div className="mb-24 pb-24 border-b border-border-color border-solid">
              <p className="text-base font-semibold mb-24 uppercase">Thông tin hủy chuyến</p>
              <p className="text-14 md:text-16 font-semibold text-error">
                {compoundingCar?.cancel_reason?.reason}
              </p>
            </div>
          ) : null}

          <ul>
            <p className="text-base font-semibold mb-24 uppercase">Chi phí chuyến đi</p>
            <li className="flex items-center mb-[16px]">
              <span className="text-xs w-[150px] xs:w-[180px]">Ngày hủy chuyến:</span>
              <span className="text-sm md:text-base flex-1 text-right ml-12 whitespace-nowrap">
                {moment((compoundingCar as CompoundingCancelCar)?.cancel_date).format(
                  "HH:mm DD/MM/YYYY"
                )}
              </span>
            </li>
            <li className="flex items-center mb-[16px]">
              <span className="text-xs w-[150px] xs:w-[180px]">Tổng giá trị chuyến đi</span>
              <span className="text-sm md:text-base flex-1 text-right ml-12 whitespace-nowrap">
                {formatMoneyVND((compoundingCar as CompoundingCancelCar)?.amount_total)}
              </span>
            </li>
            <li
              className={`flex items-center ${
                !(compoundingCar as CompoundingCancelCar)?.paid_date ? "mb-[16px]" : ""
              }`}
            >
              <span className="text-xs w-[150px] xs:w-[180px]">
                Đã đặt cọc({(compoundingCar as CompoundingCancelCar)?.down_payment?.percent * 100}%)
              </span>
              <span className="text-sm md:text-base flex-1 text-right ml-12 whitespace-nowrap">
                {formatMoneyVND((compoundingCar as CompoundingCancelCar)?.down_payment?.total)}
              </span>
            </li>
            {(compoundingCar as CompoundingCancelCar)?.paid_date ? (
              <li className="flex items-center justify-between mb-[16px]">
                <span className="text-xs">Đã đặt cọc</span>
                <span className="text-sm md:text-base flex-1 text-right ml-12 whitespace-nowrap">
                  {moment((compoundingCar as CompoundingCancelCar)?.paid_date).format(
                    "HH:mm DD/MM/YYYY"
                  )}
                </span>
              </li>
            ) : null}

            <li className="flex items-center justify-between mb-[20px] pt-[20px] border-t border-solid border-border-color">
              <span className="text-xs">
                Số tiền được hoàn trả <span className="text-gray-color-2">(VND)</span>
              </span>
              <span className="text-base text-error flex-1 text-right ml-12 font-semibold whitespace-nowrap">
                {formatMoneyVND(
                  compoundingCar?.amount_return ||
                    (compoundingCar as CompoundingCarCustomer)?.amount_total
                )}
              </span>
            </li>
          </ul>
        </div>
      ) : null}

      {compoundingCar ? <RideSummaryModal rides={compoundingCar} /> : null}
    </div>
  )
}

export { RideCanceled }
