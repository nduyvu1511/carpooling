import { formatMoneyVND, PAYMENT_METHOD_NAME } from "@/helper"
import { CompoundingCarCustomer } from "@/models"
import moment from "moment"
import { ReactNode } from "react"
import { DriverInfoSummary } from "./driverInfoSummary"
import { RidesSummaryHeader } from "./rideSummaryHeader"
import { RideSummaryInfo } from "./rideSummaryInfo"
import { SummaryItem } from "./summaryItem"

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

      <div className="mb-24">
        {type === "deposit" ? (
          <ul>
            <p className="text-base font-semibold text-blue-7 uppercase mb-16">Thông tin đặt cọc</p>
            <SummaryItem
              label="Chi phí tạm tính"
              value={formatMoneyVND(data.amount_undiscounted || data.amount_total)}
            />
            {data?.discount_after_tax ? (
              <SummaryItem
                label="Khuyến mãi"
                valueClassName="text-sm md:text-base text-error md:text-error"
                value={formatMoneyVND(-data.discount_after_tax)}
              />
            ) : null}
            {data?.deposit_date ? (
              <SummaryItem
                label="Ngày đặt cọc"
                value={moment(data.deposit_date).format("HH:mm DD/MM/YYYY")}
              />
            ) : null}
            <SummaryItem label="Số tiền thanh toán sau" value={formatMoneyVND(data.amount_due)} />
            <SummaryItem
              labelClassName="text-14 md:text-16 font-semibold"
              valueClassName="text-14 md:text-16 font-semibold"
              label={`Số tiền đặt cọc (${data.down_payment.percent * 100}%)`}
              value={formatMoneyVND(data.down_payment.total)}
            />
          </ul>
        ) : (
          <ul>
            <p className="text-base font-semibold text-primary uppercase mb-16">Hóa đơn</p>
            {data?.discount_after_tax ? (
              <SummaryItem
                label="Khuyến mãi"
                valueClassName="text-sm md:text-base text-error md:text-error"
                value={formatMoneyVND(-data.discount_after_tax)}
              />
            ) : null}
            <SummaryItem
              label={`Số tiền đặt cọc (${Number(data.down_payment.percent * 100)}%)`}
              value={formatMoneyVND(data.down_payment.total)}
            />
            {data?.deposit_date ? (
              <SummaryItem
                label="Ngày đặt cọc"
                value={moment(data.deposit_date).format("HH:mm DD/MM/YYYY")}
              />
            ) : null}
            <SummaryItem label="Số tiền vừa thanh toán" value={formatMoneyVND(data.amount_due)} />
            {data?.paid_date ? (
              <SummaryItem
                label="Ngày thanh toán"
                value={moment(data.paid_date).format("HH:mm DD/MM/YYYY")}
              />
            ) : null}

            {data?.payment_method ? (
              <SummaryItem
                label="Phương thức thanh toán"
                value={PAYMENT_METHOD_NAME[data.payment_method]}
              />
            ) : null}
            <SummaryItem
              labelClassName="text-14 md:text-16 font-semibold"
              label="Tổng tiền"
              value={formatMoneyVND(data.amount_due + data.down_payment.total)}
              valueClassName="text-14 md:text-16 font-semibold text-error"
            />
          </ul>
        )}
      </div>

      <div className="mb-24">
        <DriverInfoSummary
          titleClassName="text-blue-7"
          compounding_car_id={data.compounding_car_id}
          driver={data.car_driver_id}
        />
      </div>

      <div className="">
        <p className="text-base font-semibold text-blue-7 uppercase mb-16">Thông tin chuyến đi</p>
        <ul>
          <RideSummaryInfo data={data} />
        </ul>
      </div>
    </div>
  )
}

export { RideCustomerBill }
