import { formatMoneyVND } from "@/helper"
import { DownPayment } from "@/models"
import moment from "moment"
import { SummaryItem } from "./summaryItem"

interface DriverDeposit {
  amount_total: number
  down_payment: DownPayment
  deposit_date?: string
}

export const DriverDepositInfo = ({ amount_total, down_payment, deposit_date }: DriverDeposit) => {
  return (
    <ul className="">
      <SummaryItem label="Thuế phí phát sinh" value="chưa bao gồm" />
      <SummaryItem label="Giá vé" value={formatMoneyVND(amount_total)} />
      <SummaryItem
        label={`Đã đặt cọc(${(down_payment?.percent || 0) * 100}%)`}
        value={formatMoneyVND(amount_total)}
      />
      <SummaryItem label="" value={formatMoneyVND(down_payment?.total || 0)} />

      <li className="flex items-center justify-between">
        <p className="text-base font-semibold uppercase"></p>
        <p className="text-16 font-semibold text-error ml-12 flex-1 text-right"></p>
      </li>
      <p className="text-xs my-12">(*) Giá vé chưa bao gồm 10% phí dịch vụ EXXE.</p>
      {deposit_date ? (
        <li className="flex items-center justify-between mt-12">
          <p className="text-xs">Ngày đặt cọc</p>
          <p className="text-sm md:text-base ml-12 flex-1 text-right">
            {moment(deposit_date).format("HH:mm:SS DD/MM/YYYY")}
          </p>
        </li>
      ) : null}
    </ul>
  )
}
