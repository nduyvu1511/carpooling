import { formatMoneyVND, PAYMENT_METHOD_NAME } from "@/helper"
import { DriverCompoundingCarInvoiceRes } from "@/models"
import { RideSummaryInfo } from "./rideSummaryInfo"
import { SummaryItem } from "./summaryItem"

interface RideDriverSummaryProps {
  ride: DriverCompoundingCarInvoiceRes
}

const RideDriverSummary = ({ ride }: RideDriverSummaryProps) => {
  return (
    <>
      <ul className="mb-24">
        <SummaryItem label="Chi phí tạm tính" value={formatMoneyVND(ride.amount_total)} />
        <SummaryItem
          label={`Phí sử dụng dịch vụ ExxeVn (${ride.service_charge.percent * 100}%)`}
          value={formatMoneyVND(ride.service_charge.total)}
        />
        <div className="mb-12 border-b border-solid border-border-color"></div>
        <SummaryItem label="Tổng tiền cần thanh toán" value={formatMoneyVND(ride.amount_total)} />
        <SummaryItem
          label={`Số tiền đặt cọc(${ride.down_payment.percent * 100}%)`}
          value={formatMoneyVND(ride.down_payment.total)}
        />
        {/* <SummaryItem
          label={`Thuế VAT (${ride.vat.percent * 100}%)`}
          value={formatMoneyVND(ride.vat.total)}
        /> */}
        {/* <SummaryItem label="Phương thức đặt cọc" value={PAYMENT_METHOD_NAME[ride.payment_method]} /> */}
        <SummaryItem label="Số tiền nhận từ khách" value={formatMoneyVND(ride.cash)} />

        {/* <SummaryItem label="Thời gian đặt cọc" value={ride.date_paid} /> */}
        <div className="mb-12 border-b border-solid border-border-color"></div>
        <SummaryItem
          className="mb-0"
          label="Số tiền thực nhận"
          labelClassName="text-14 md:text-16 font-semibold text-blue-8 md:text-blue-8"
          value={formatMoneyVND(ride.income_before_pit)}
          valueClassName="text-error font-semibold text-16 md:text-16"
        />
      </ul>

      <div className="">
        <p className="title-uppercase mb-16">Thông tin chuyến đi</p>
        <RideSummaryInfo data={ride as any} />
      </div>
    </>
  )
}

export { RideDriverSummary }
