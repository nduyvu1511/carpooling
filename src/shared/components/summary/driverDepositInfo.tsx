import { formatMoneyVND } from "@/helper"
import { DownPayment } from "@/models"
import moment from "moment"
import { SummaryItem } from "./summaryItem"

interface DriverDeposit {
  amount_total: number
  down_payment: DownPayment
  deposit_date?: string
  discount_after_tax?: number
}

export const DriverDepositInfo = ({
  amount_total,
  down_payment,
  deposit_date,
  discount_after_tax,
}: DriverDeposit) => {
  return (
    <ul className="">
      <SummaryItem label="Chi phí tạm tính" value={formatMoneyVND(amount_total)} />
      {discount_after_tax ? (
        <SummaryItem
          label="Khuyến mãi"
          valueClassName="text-sm md:text-base text-error md:text-error"
          value={formatMoneyVND(-discount_after_tax)}
        />
      ) : null}
      <SummaryItem
        className="summary-deposit-item"
        label={`Số tiền đặt cọc(${(down_payment?.percent || 0) * 100}%)`}
        value={formatMoneyVND(down_payment?.total)}
      />
      {deposit_date ? (
        <SummaryItem label="Ngày đặt cọc" value={moment(deposit_date).format("DD/MM/YYYY")} />
      ) : null}
      <SummaryItem
        label="Số tiền hoàn sau khi thanh toán"
        value={formatMoneyVND(amount_total || 0)}
      />
    </ul>
  )
}
