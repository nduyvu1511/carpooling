import { formatMoneyVND, getHoursName } from "@/helper"
import { DriverCompoundingCarInvoiceRes } from "@/models"
import moment from "moment"
import Link from "next/link"
import { RidesSummaryHeader } from "./rideSummaryHeader"
import { RideSummaryPassengerItem } from "./rideSummaryPassengerItem"

interface RideDriverSummaryProps {
  ride: DriverCompoundingCarInvoiceRes
}

const RideDriverSummary = ({ ride }: RideDriverSummaryProps) => {
  return (
    <div className="">
      <RidesSummaryHeader
        desc={
          <p className="text-sm">
            Chúc mừng bạn đã hoàn thành chuyến đi, số tiền thực nhận sẽ được chuyển vào ví, xem chi
            tiết{" "}
            <Link href="/d/account/wallet">
              <a className="text-primary">tại đây</a>
            </Link>
          </p>
        }
        title="Hoàn thành chuyến đi"
      />
      <div className="mt-[40px]">
        <p className="text-sm md:text-base font-semibold md:font-medium uppercase md:normal-case text-primary mb-24">
          Chi tiết hoá đơn
        </p>
        <ul className="">
          <li className="flex items-start justify-between mb-12">
            <p className="text-xs mr-12 min-w-[100px]">Tổng giá trị chuyến đi</p>
            <p className="whitespace-nowrap text-sm md:text-base text-right">
              {formatMoneyVND(ride.amount_total)}
            </p>
          </li>
          <li className="flex items-start justify-between mb-12">
            <p className="text-xs mr-12 min-w-[100px]">Thuế VAT ({ride.vat.percent * 100}%)</p>
            <p className="whitespace-nowrap text-sm md:text-base text-right">
              {formatMoneyVND(ride.vat.total)}
            </p>
          </li>
          <li className="flex items-start justify-between mb-12">
            <p className="text-xs mr-12 min-w-[100px]">
              Phí sử dụng dịch vụ ({ride.service_charge.percent * 100}%)
            </p>
            <p className="whitespace-nowrap text-sm md:text-base text-right">
              {formatMoneyVND(ride.service_charge.total)}
            </p>
          </li>
          <li className="flex items-start justify-between mb-12">
            <p className="text-xs mr-12 min-w-[100px]">
              Đã đặt cọc({ride.down_payment.percent * 100}%)
            </p>
            <p className="whitespace-nowrap text-sm md:text-base text-right">
              {formatMoneyVND(ride.down_payment.total)}
            </p>
          </li>
          <li className="flex items-start justify-between mb-12">
            <p className="text-xs mr-12 min-w-[100px]">
              Phí thu nhập cá nhân({ride.pit.percent * 100}%)
            </p>
            <p className="whitespace-nowrap text-sm md:text-base text-right">
              {formatMoneyVND(ride.pit.total)}
            </p>
          </li>
          <li className="flex items-start justify-between mb-12">
            <p className="text-xs mr-12 min-w-[100px]">Số tiền tài xế nhận từ khách</p>
            <p className="whitespace-nowrap text-sm md:text-base text-right">
              {formatMoneyVND(ride.cash)}
            </p>
          </li>
          <div className="mb-12 border-b border-solid border-border-color"></div>
          <li className="flex items-start justify-between">
            <p className="text-xs mr-12 min-w-[100px] text-sm uppercase font-semibold">
              Số tiền thực nhận
            </p>
            <p className="whitespace-nowrap text-sm md:text-base text-right font-semibold text-error">
              {formatMoneyVND(ride.amount_due)}
            </p>
          </li>
        </ul>
      </div>

      <div className="mt-[40px]">
        <p className="text-sm md:text-base font-semibold md:font-medium uppercase md:normal-case text-primary mb-24">
          Thông tin chuyến đi
        </p>
        <ul className="">
          <li className="flex items-start justify-between mb-12">
            <p className="text-xs mr-12 min-w-[100px]">Nơi đi</p>
            <p className="text-sm md:text-base text-right">{ride.from_province.province_name}</p>
          </li>
          <li className="flex items-start justify-between mb-12">
            <p className="text-xs mr-12 min-w-[100px]">Nơi đến</p>
            <p className="text-sm md:text-base text-right">{ride.to_province.province_name}</p>
          </li>
          <li className="flex items-start justify-between mb-12">
            <p className="text-xs mr-12 min-w-[100px]">Ngày đi</p>
            <p className="whitespace-nowrap text-sm md:text-base text-right">
              {moment(ride.expected_going_on_date).format("HH:mm DD/MM/YYYY")}
            </p>
          </li>
          {ride.expected_picking_up_date ? (
            <li className="flex items-start justify-between mb-12">
              <p className="text-xs mr-12 min-w-[100px]">Ngày về</p>
              <p className="whitespace-nowrap text-sm md:text-base text-right">
                {moment(ride.expected_picking_up_date).format("HH:mm DD/MM/YYYY")}
              </p>
            </li>
          ) : null}
          <li className="flex items-start justify-between mb-12">
            <p className="text-xs mr-12 min-w-[100px]">Tổng lộ trình</p>
            <p className="whitespace-nowrap text-sm md:text-base text-right">{ride.distance} Km</p>
          </li>
          <li className="flex items-start justify-between">
            <p className="text-xs mr-12 min-w-[100px]">Thời gian đi</p>
            <p className="whitespace-nowrap text-sm md:text-base text-right">
              {getHoursName(ride.duration)}
            </p>
          </li>
        </ul>
      </div>

      <div className="mt-[40px]">
        <p className="text-sm md:text-base font-semibold md:font-medium uppercase md:normal-case text-primary mb-24">
          Thông tin khách hàng
        </p>
        <ul>
          {ride.customer_invoice?.length &&
            ride.customer_invoice.map((item, index) => (
              <li
                className="border-b border-solid border-border-color py-12 last:border-none"
                key={item.compounding_car_customer_id}
              >
                <p className="mb-12 text-xs">{index + 1},</p>
                <RideSummaryPassengerItem data={item} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export { RideDriverSummary }
