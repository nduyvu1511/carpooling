import { RideDriverSummary } from "@/components/summary"
import { DriverCompoundingCarInvoiceRes } from "@/models"

interface TransactionInvoiceProps {
  data: DriverCompoundingCarInvoiceRes
}

export const TransactionInvoice = ({ data }: TransactionInvoiceProps) => {
  return (
    <div>
      <p className="title-uppercase mb-16">Thông tin thanh toán</p>
      <RideDriverSummary data={data} />
    </div>
  )
}
