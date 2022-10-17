import { DriverCompoundingCarInvoiceRes } from "@/models"

interface TransactionInvoiceProps {
  data: DriverCompoundingCarInvoiceRes
}

export const TransactionInvoice = ({ data }: TransactionInvoiceProps) => {
  return (
    <div>
      {/* <RideSummaryInfo data={data as CompoundingCarRes} />
      <DriverDepositInfo
        discount_after_tax={20000}
        amount_total={data.amount_total || 0}
        down_payment={data.down_payment}
        deposit_date={data.deposit_date}
      /> */}
    </div>
  )
}
