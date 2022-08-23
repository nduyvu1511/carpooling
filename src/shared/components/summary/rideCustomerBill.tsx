import { formatMoneyVND, PAYMENT_METHOD_NAME } from "@/helper"
import { CompoundingCarCustomer } from "@/models"
import moment from "moment"
import { ReactNode } from "react"
import { DriverInfoSummary } from "./driverInfoSummary"
import { RidesSummaryHeader } from "./rideSummaryHeader"
import { RideSummaryInfo } from "./rideSummaryInfo"

interface RideCustomerBillProps {
  data: CompoundingCarCustomer
  title?: string | ReactNode
  desc?: string | ReactNode
  type?: "deposit" | "checkout"
  className?: string
}

const RideCustomerBill = ({
  data,
  desc,
  title,
  type = "deposit",
  className = "",
}: RideCustomerBillProps) => {
  return (
    <div className={className}>
      <RidesSummaryHeader desc={desc} title={title} />

      <div className="my-[40px] border-border-color border-solid border-0 md:border-b"></div>

      <div className="mb-[40px]">
        {type === "deposit" ? (
          <ul>
            <p className="text-base font-semibold text-blue-7 uppercase mb-16 md:mb-24">
              Thông tin đặt cọc
            </p>

            <li className="flex items-start justify-between mb-12">
              <p className="text-xs leading-[20px]">Giá vé</p>
              <p className="text-sm md:text-base ml-16 flex-1 text-right">
                {formatMoneyVND(data.amount_total)}
              </p>
            </li>
            <li className="flex items-start justify-between mb-12">
              <p className="text-sm md:text-base font-semibold uppercase md:normal-case">
                Đã đặt cọc ({data.down_payment.percent * 100}%)
              </p>
              <p className="text-sm md:text-base ml-16 flex-1 text-right font-semibold text-error">
                {formatMoneyVND(data.down_payment.total)}
              </p>
            </li>

            <li className="flex items-start justify-between mb-12">
              <p className="text-xs leading-[20px]">Ngày đặt cọc</p>
              <p className="text-sm md:text-base ml-16 flex-1 text-right">
                {moment(data.deposit_date).format("HH:mm DD/MM/YYYY")}
              </p>
            </li>
            <li className="flex items-start justify-between">
              <p className="text-xs leading-[20px]">Số tiền thanh toán sau</p>
              <p className="text-sm md:text-base ml-16 flex-1 text-right">
                {formatMoneyVND(data.amount_due)}
              </p>
            </li>
          </ul>
        ) : (
          <ul>
            <p className="text-base font-semibold text-blue-7 uppercase mb-16 md:mb-24">
              Thông tin thanh toán
            </p>
            <li className="flex items-start justify-between mb-12">
              <p className="text-xs leading-[20px]">
                Số tiền đặt cọc ({Number(data.down_payment.percent * 100)}%)
              </p>
              <p className="text-sm md:text-base ml-16 flex-1 text-right">
                {formatMoneyVND(data.down_payment.total)}
              </p>
            </li>
            {data?.deposit_date ? (
              <li className="flex items-start justify-between mb-12">
                <p className="text-xs leading-[20px]">Ngày đặt cọc</p>
                <p className="text-sm md:text-base ml-16 flex-1 text-right">
                  {moment(data.deposit_date).format("HH:mm DD/MM/YYYY")}
                </p>
              </li>
            ) : null}

            <div className="my-12 border-b border-solid border-border-color"></div>

            <li className="flex items-start justify-between mb-12">
              <p className="text-xs leading-[20px]">Số tiền còn lại</p>
              <p className="text-sm md:text-base ml-16 flex-1 text-right">
                {formatMoneyVND(data.amount_due)}
              </p>
            </li>

            {data?.paid_date ? (
              <li className="flex items-start justify-between mb-12">
                <p className="text-xs leading-[20px]">Ngày thanh toán</p>
                <p className="text-sm md:text-base ml-16 flex-1 text-right">
                  {moment(data.paid_date).format("HH:mm DD/MM/YYYY")}
                </p>
              </li>
            ) : null}

            {data?.payment_method ? (
              <li className="flex items-start justify-between mb-12">
                <p className="text-xs leading-[20px]">Phương thức thanh toán</p>
                <p className="text-sm md:text-base ml-16 flex-1 text-right">
                  {PAYMENT_METHOD_NAME[data.payment_method]}
                </p>
              </li>
            ) : null}

            <div className="my-12 border-b border-solid border-border-color"></div>
            <li className="flex items-start">
              <p className="text-14 leading-[26px] uppercase font-semibold">Tổng giá vé</p>
              <p className="text-sm md:text-base font-semibold text-error flex-1 text-right ml-16">
                {formatMoneyVND(data.amount_due + data.down_payment.total)}
              </p>
            </li>
          </ul>
        )}
      </div>

      <div className="mb-[40px]">
        <DriverInfoSummary titleClassName="text-blue-7" driver={data.car_driver_id} />
      </div>

      <div className="">
        <p className="text-base font-semibold text-blue-7 uppercase mb-16 md:mb-24">
          Thông tin chuyến đi
        </p>
        <ul>
          <RideSummaryInfo data={data} />
        </ul>
      </div>
    </div>
  )
}

export { RideCustomerBill }
