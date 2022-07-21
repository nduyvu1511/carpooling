import { RidesSummary } from "@/components"
import { formatMoneyVND } from "@/helper"
import { useCompoundingCarDriver } from "@/hooks"
import { DriverBookingLayout } from "@/layout"
import { CompoundingCarDriverRes } from "@/models"
import { useRouter } from "next/router"

const RideCanceled = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarDriver({
    key: "get_canceled_ride_driver",
    type: "once",
    compounding_car_id: Number(compounding_car_id),
  })

  return (
    <DriverBookingLayout
      showLoading={isInitialLoading}
      title="Thông tin hủy chuyến đi"
      rightNode={
        <RidesSummary
          rides={compoundingCar as CompoundingCarDriverRes}
          car_account_type="car_driver"
        />
      }
    >
      <div className="p-24 pt-0 bg-white-color block-element">
        {isInitialLoading ? (
          <div>
            <div className="skeleton h-[18px] rounded-[5px] mb-[40px]"></div>
            <div className="mb-24 flex justify-between">
              <div className="skeleton w-[220px] h-[12px] rounded-[5px]"></div>
              <div className="skeleton w-[180px] h-[12px] rounded-[5px]"></div>
            </div>
            <div className="mb-24 flex justify-between">
              <div className="skeleton w-[180px] h-[12px] rounded-[5px]"></div>
              <div className="skeleton w-[140px] h-[12px] rounded-[5px]"></div>
            </div>
            <div className="mb-[40px] flex justify-between">
              <div className="skeleton w-[250px] h-[12px] rounded-[5px]"></div>
              <div className="skeleton w-[150px] h-[12px] rounded-[5px]"></div>
            </div>
            <div className="flex justify-between">
              <div className="skeleton w-[160px] h-[12px] rounded-[5px]"></div>
              <div className="skeleton w-[140px] h-[12px] rounded-[5px]"></div>
            </div>
          </div>
        ) : compoundingCar?.compounding_car_id ? (
          <div className="">
            <p className="text-base font-semibold mb-[26px]">Số tiền được hoàn:</p>
            <ul>
              <li className="flex items-center justify-between mb-[20px]">
                <span className="text-xs">Tổng giá trị chuyến đi</span>
                <span className="text-base">
                  {formatMoneyVND(compoundingCar?.price_unit.price_unit)}
                </span>
              </li>
              <li className="flex items-center justify-between mb-[20px]">
                <span className="text-xs">Đã đặt cọc</span>
                <span className="text-base">1.000.000đ</span>
              </li>
              <li className="flex items-center justify-between mb-[20px]">
                <span className="text-xs">Ngày đặt cọc:</span>
                <span className="text-base">01/07/2022</span>
              </li>

              <li className="flex items-center justify-between mb-[20px] pt-[20px] border-t border-solid border-border-color">
                <span className="text-xs">
                  Số tiền được hoàn trả <span className="text-gray-color-2">(VND)</span>
                </span>
                <span className="text-base text-error">1.000.000 VND</span>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </DriverBookingLayout>
  )
}

export default RideCanceled
