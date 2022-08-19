import { formatMoneyVND } from "@/helper"
import { CompoundingCarCustomer } from "@/models"
import { ReactNode } from "react"
import { DriverInfoSummary } from "./driverInfoSummary"
import { RidesSummaryHeader } from "./rideSummaryHeader"
import { RideSummaryInfo } from "./rideSummaryInfo"

interface RideCustomerBillProps {
  data: CompoundingCarCustomer
  title?: string | ReactNode
  desc?: string | ReactNode
  type?: "deposit" | "checkout"
}

const RideCustomerBill = ({ data, desc, title, type = "deposit" }: RideCustomerBillProps) => {
  return (
    <div className="p-12 md:p-24">
      <RidesSummaryHeader desc={desc} title={title} />
      <div className="my-[40px]">
        {type === "deposit" ? (
          <ul>
            <p className="text-base font-semibold text-blue-7 uppercase mb-24">Thông tin đặt cọc</p>
            <li className="flex items-start justify-between mb-[16px]">
              <p className="text-xs">Giá tạm tính</p>
              <p className="text-sm md:text-base ml-[16px] flex-1 text-right">
                {formatMoneyVND(data?.price_unit?.price_unit)}
              </p>
            </li>
            <li className="flex items-start justify-between mb-[16px]">
              <p className="text-base font-semibold uppercase">
                Đã đặt cọc({data.down_payment.percent * 100}%)
              </p>
              <p className="text-14 md:text-16 ml-[16px] flex-1 text-right font-semibold text-error">
                {formatMoneyVND(data.down_payment.total)}
              </p>
            </li>
            <li className="flex items-start justify-between">
              <p className="text-xs">Số tiền thanh toán sau</p>
              <p className="text-sm md:text-base ml-[16px] flex-1 text-right">
                {formatMoneyVND(data.amount_due)}
              </p>
            </li>
          </ul>
        ) : (
          <ul>
            <p className="text-base font-semibold text-blue-7 uppercase mb-24">
              Thông tin thanh toán
            </p>
            <li className="flex items-start justify-between mb-[16px]">
              <p className="text-xs">Giá tạm tính</p>
              <p className="text-sm md:text-base ml-[16px] flex-1 text-right">
                {formatMoneyVND(data?.price_unit?.price_unit)}
              </p>
            </li>
            <li className="flex items-start justify-between mb-[16px]">
              <p className="text-xs">Đã đặt cọc</p>
              <p className="text-sm md:text-base ml-[16px] flex-1 text-right">
                {formatMoneyVND(data.down_payment.total)}
              </p>
            </li>
            <li className="flex items-start">
              <p className="text-xs">Đã thanh toán</p>
              <p className="text-sm md:text-base ml-[16px] flex-1 text-right">
                {formatMoneyVND(data.amount_due)}
              </p>
            </li>
            <div className="my-12 border-b border-solid border-border-color"></div>
            <li className="flex items-start">
              <p className="text-14 leading-[26px] uppercase font-semibold">TỔNG GIÁ TRỊ</p>
              <p className="text-base font-semibold text-error flex-1 text-right ml-[16px]">
                {formatMoneyVND(data.amount_due + data.down_payment.total)}
              </p>
            </li>
          </ul>
        )}
      </div>

      <div className="mb-[40px]">
        <DriverInfoSummary driver={data.car_driver_id} />
      </div>

      <div className="mb-[40px]">
        <p className="text-base font-semibold text-blue-7 uppercase mb-24">Thông tin chuyến đi</p>
        <ul>
          <RideSummaryInfo data={data} />
        </ul>
      </div>
    </div>
  )
}

export { RideCustomerBill }
