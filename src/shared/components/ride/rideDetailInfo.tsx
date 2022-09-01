import { formatMoneyVND } from "@/helper"
import { CompoundingCarCustomer } from "@/models"
import moment from "moment"
import { DriverInfoSummary, SummaryItem } from "../summary"

interface RideDetailInfoProps {
  data: CompoundingCarCustomer
}

export const RideDetailInfo = ({ data }: RideDetailInfoProps) => {
  return (
    <>
      <DriverInfoSummary driver={data.car_driver_id} />
      <div className="my-24 border-b border-solid border-border-color"></div>
      <ul>
        <p className="text-base font-semibold uppercase mb-16 md:mb-24">Hóa đơn</p>
        <SummaryItem label="Chi phí tạm tính" value={formatMoneyVND(data?.amount_total)} />
        {data?.paid_date ? (
          <SummaryItem label="Ngày đặt cọc" value={moment(data.paid_date).format("DD/MM/YYYY")} />
        ) : null}
        <SummaryItem label="Tổng tiền cần thanh toán" value={formatMoneyVND(data.amount_total)} />
        <SummaryItem
          label={`Số tiền đặt cọc (${Number(data.customer_deposit_percentage)}%)`}
          value={formatMoneyVND(data.down_payment.total || (data as any).down_payment)}
        />
        <SummaryItem
          className="mb-0"
          labelClassName="text-14 md:text-16 font-semibold"
          label="Số tiền thanh toán sau"
          value={formatMoneyVND(data.amount_due)}
          valueClassName="text-14 md:text-16 font-semibold"
        />

        {/* <p className="text-xs">(*) Chi phí trên chưa bao gồm phát sinh phí cầu đường, bến bãi.</p> */}
      </ul>
    </>
  )
}
