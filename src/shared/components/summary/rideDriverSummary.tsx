import { formatMoneyVND } from "@/helper"
import { useBreakpoint } from "@/hooks"
import { DriverCompoundingCarInvoiceRes } from "@/models"
import { useState } from "react"
import { AccordionItem } from "../accordion"
import { RideSummaryInfo } from "./rideSummaryInfo"
import { SummaryItem } from "./summaryItem"

interface RideDriverSummaryProps {
  ride: DriverCompoundingCarInvoiceRes
  className?: string
}

const RideDriverSummary = ({ ride, className = "" }: RideDriverSummaryProps) => {
  const breakpoints = useBreakpoint()
  const [showDetailRide, setShowDetailRide] = useState<boolean>(false)

  return (
    <>
      <ul className={`${className}`}>
        <SummaryItem label="Chi phí tạm tính" value={formatMoneyVND(ride.amount_total)} />
        <SummaryItem label="Tổng tiền cần thanh toán" value={formatMoneyVND(ride.amount_total)} />
        {/* <SummaryItem
          label={`Thuế VAT (${ride.vat.percent * 100}%)`}
          value={formatMoneyVND(ride.vat.total)}
        /> */}
        <SummaryItem
          label={`Phí sử dụng dịch vụ ExxeVn (${ride.service_charge.percent * 100}%)`}
          value={formatMoneyVND(ride.service_charge.total)}
        />
        <SummaryItem label="Số tiền tài xế nhận từ khách" value={formatMoneyVND(ride.cash)} />
        <SummaryItem
          label={`Số tiền đặt cọc(${ride.down_payment.percent * 100}%)`}
          value={formatMoneyVND(ride.down_payment.total)}
        />
        {/* <SummaryItem label="Thời gian đặt cọc" value={ride.date_paid} /> */}
        <div className="mb-12 border-b border-solid border-border-color"></div>

        <SummaryItem
          className="mb-0"
          label="Số tiền thực nhận"
          labelClassName="text-14 md:text-16 font-semibold text-blue-8 md:text-blue-8"
          value={formatMoneyVND(ride.income_before_pit)}
          valueClassName="text-error font-semibold"
        />
      </ul>

      {breakpoints >= 1024 ? (
        <AccordionItem
          className="px-24 py-16 md:px-24 md:py-16 bg-bg-primary rounded-[5px] mb-16"
          titleClassName="text-base uppercase font-semibold text-blue-7"
          title="Chi tiết chuyến đi"
          isActive={showDetailRide}
          onClick={() => setShowDetailRide(!showDetailRide)}
        >
          <RideSummaryInfo data={ride as any} />
        </AccordionItem>
      ) : (
        <div className="">
          <p className="title-uppercase">Thông tin chuyến đi</p>
          <RideSummaryInfo data={ride as any} />
        </div>
      )}
    </>
  )
}

export { RideDriverSummary }
