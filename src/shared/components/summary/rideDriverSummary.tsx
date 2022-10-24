import { formatMoneyVND } from "@/helper"
import { DriverCompoundingCarInvoiceRes } from "@/models"
import { RideSummaryInfo } from "./rideSummaryInfo"
import { SummaryItem } from "./summaryItem"

interface RideDriverSummaryProps {
  data: DriverCompoundingCarInvoiceRes
}

const RideDriverSummary = ({ data }: RideDriverSummaryProps) => {
  return (
    <>
      <ul className="mb-24">
        <SummaryItem label="Chi phí tạm tính" value={formatMoneyVND(data.amount_total)} />
        <SummaryItem
          label={`Phí sử dụng dịch vụ ExxeVn (${data.service_charge.percent * 100}%)`}
          value={formatMoneyVND(data.service_charge.total)}
        />
        <div className="mb-12 border-b border-solid border-border-color"></div>
        <SummaryItem label="Tổng tiền cần thanh toán" value={formatMoneyVND(data.amount_total)} />
        <SummaryItem
          label={`Số tiền đặt cọc(${data.down_payment.percent * 100}%)`}
          value={formatMoneyVND(data.down_payment.total)}
        />
        {/* <SummaryItem
          label={`Thuế VAT (${data.vat.percent * 100}%)`}
          value={formatMoneyVND(data.vat.total)}
        /> */}
        {/* <SummaryItem label="Phương thức đặt cọc" value={PAYMENT_METHOD_NAME[data.payment_method]} /> */}
        <SummaryItem label="Số tiền nhận từ khách" value={formatMoneyVND(data.cash)} />

        {/* <SummaryItem label="Thời gian đặt cọc" value={data.date_paid} /> */}
        <div className="mb-12 border-b border-solid border-border-color"></div>
        <SummaryItem
          className="mb-0"
          label="Số tiền thực nhận"
          labelClassName="text-14 md:text-16 font-semibold text-blue-8 md:text-blue-8"
          value={formatMoneyVND(data.income_before_pit)}
          valueClassName="text-error font-semibold text-16 md:text-16"
        />
      </ul>

      <div className="">
        <p className="title-uppercase mb-16">Thông tin chuyến đi</p>
        <RideSummaryInfo data={data as any} />
      </div>
    </>
  )
}

export { RideDriverSummary }
