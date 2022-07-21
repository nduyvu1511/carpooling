import { OneWayIcon } from "@/assets"
import { formatMoneyVND, getCompoundingCarStateName } from "@/helper"
import {
  CarAccountType,
  CompoundingCarCustomer,
  CompoundingCarDriverRes,
  CompoundingCarRes,
} from "@/models"
import moment from "moment"
import { RidesSummaryHeader } from "./ridesSummaryHeader"

interface RidesSummaryProps {
  rides: CompoundingCarCustomer | CompoundingCarRes | CompoundingCarDriverRes
  type?: "bill" | "summary"
  car_account_type?: CarAccountType
}
const RidesSummary = ({
  rides,
  type = "summary",
  car_account_type = "customer",
}: RidesSummaryProps) => {
  const item = "flex-1 flex justify-end ml-24 text-16 font-medium leading-26 text-gray-color-4"
  const title = "text-12 font-normal leading-[18px] w-[90px]"

  return (
    <div className="">
      {type === "summary" ? (
        <div className="mx-24 py-24 border-b border-border-color border-solid">
          <h3 className="text-18 leading-[26px] font-medium text-primary">Thông tin chuyến đi</h3>
        </div>
      ) : (
        <>
          <div className="p-24">
            <RidesSummaryHeader />
          </div>

          <div className="mx-24 border border-b border-solid border-border-color"></div>
        </>
      )}

      <div className="bg-white p-24">
        <div className="flex items-center mb-24">
          <div className="flex-1">
            <p className="text-28 font-medium leading-[36px] mb-8 line-clamp-1">
              {rides?.from_province.province_brief_name}
            </p>
            <p className="text-14 font-medium leading-26">
              {moment(rides?.expected_going_on_date).format("HH:MM DD/MM/YYYY")}
            </p>
          </div>
          <div className="mx-8">
            <OneWayIcon />
          </div>
          <div className="flex-1 flex items-end flex-col">
            <p className="text-28 font-medium leading-[36px] mb-8 line-clamp-1">
              {rides?.to_province.province_brief_name}
            </p>
            <p className="text-14 font-medium leading-26">
              {moment(rides?.expected_going_on_date)
                .add(rides.duration, "hours")
                .format("HH:MM DD/MM/YYYY")}
            </p>
          </div>
        </div>

        {type === "bill" ? (
          <>
            <div className="flex items-baseline justify-between mb-[16px]">
              <p className={title}>Nơi đi:</p>
              <p className={item}>{formatMoneyVND(rides?.from_address)}</p>
            </div>
            <div className="flex items-baseline justify-between mb-[16px]">
              <p className={title}>Nơi đến:</p>
              <p className={item}>{formatMoneyVND(rides?.to_address)}</p>
            </div>
            {(rides as CompoundingCarCustomer)?.partner ? (
              <>
                <div className="flex items-baseline justify-between mb-[16px]">
                  <p className={title}>Tên KH:</p>
                  <p className={item}>{(rides as CompoundingCarCustomer)?.partner.partner_name}</p>
                </div>

                <div className="flex items-baseline justify-between mb-[16px]">
                  <p className={title}>Số điện thoại:</p>
                  <p className={item}>{(rides as CompoundingCarCustomer)?.partner.phone}</p>
                </div>
              </>
            ) : null}
          </>
        ) : null}

        <div className="border border-solid border-border-color my-24"></div>

        <div className="">
          <p className="text-16 font-semibold leading-[26px] mb-[16px]">Thông tin lộ trình:</p>
          <div className="flex items-baseline justify-between mb-[16px]">
            <p className={title}>Ngày đi:</p>
            <p className={item}>
              {moment(rides.expected_going_on_date).format("HH:MM DD/MM/YYYY")}
            </p>
          </div>

          {rides?.expected_picking_up_date ? (
            <div className="flex items-baseline justify-between mb-[16px]">
              <p className={title}>Ngày về:</p>
              <p className={item}>
                {moment(rides.expected_picking_up_date).format("HH:MM DD/MM/YYYY")}
              </p>
            </div>
          ) : null}

          {type === "bill" ? (
            <div className="flex items-baseline justify-between mb-[16px]">
              <p className={title}>Tình trạng:</p>
              <p className={item}>{getCompoundingCarStateName(rides.state)}</p>
            </div>
          ) : null}

          <div className="flex items-baseline justify-between mb-[16px]">
            <p className={title}>Tổng lộ trình:</p>
            <p className={item}>{rides?.distance?.toFixed(2)} km</p>
          </div>

          <div className="flex items-baseline justify-between mb-[16px]">
            <p className={title}>Tổng thời gian lộ trình:</p>
            <p className={item}>{rides.duration || 0} giờ</p>
          </div>

          {(rides as CompoundingCarRes).number_seat_in_car ? (
            <div className="flex items-baseline justify-between mb-[16px]">
              <p className={title}>Số khách:</p>
              <p className={item}>
                {(rides as CompoundingCarRes)?.number_seat_in_car}/{rides.car.number_seat} Khách
              </p>
            </div>
          ) : null}

          <div className="flex items-baseline justify-between mb-[16px]">
            <p className={title}>Loại xe:</p>
            <p className={item}>{`${rides?.car.number_seat} Chỗ`}</p>
          </div>
        </div>

        <div className="border border-solid border-border-color my-24"></div>

        <div className="flex items-center justify-between mb-[16px]">
          <p className={title}>Thuế phí:</p>
          <p className={item}>Đã bao gồm</p>
        </div>

        {car_account_type === "customer" && rides?.price_unit ? (
          <div className="flex items-baseline justify-between mb-[16px]">
            <p className={title}>Giá vé/khách:</p>
            <p className={item}>{formatMoneyVND(rides?.price_unit?.price_unit)}</p>
          </div>
        ) : null}

        <div className="flex items-baseline justify-between mb-[16px]">
          <p className={title}>Tổng giá vé:</p>
          <p className="font-medium text-orange-50 text-28 leading-[36px]">
            {formatMoneyVND(
              car_account_type === "car_driver"
                ? (rides as CompoundingCarRes).price_unit.price_unit
                : (rides as CompoundingCarCustomer)?.amount_total || 0
            )}
          </p>
        </div>

        <div className="flex items-baseline justify-between mb-[16px]">
          <p className={title}>Ghi chú:</p>
          <p className={item}>{rides?.note || "Không có ghi chú nào"}</p>
        </div>

        <div className="border border-solid border-border-color my-24"></div>

        <div className="">
          <p className="text-16 font-semibold leading-[26px] mb-[16px]">Điều khoản*:</p>

          <ul className="ml-24 list-disc">
            <li className="mb-12">
              Quý khách vui lòng không hút thuốc trên xe hoặc mang các thực phẩm có mùi và ướt.
            </li>
            <li className="mb-12">
              Để đảm bảo thời gian đón khách đúng giờ & tránh tắc đường, tài xế chỉ đón khách tại
              điểm đã đặt xe hoặc điểm thay thế (Vui lòng báo trước cho tài xế trong trường hợp có
              thay đổi địa Điểm đến khách)
            </li>
            <li className="mb-12">
              Trong trường hợp khách thuê thay đổi lộ trình chuyến đi, vui lòng báo trước với tài xế
              để chuẩn bị và chăm sóc tốt hơn.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { RidesSummary }
