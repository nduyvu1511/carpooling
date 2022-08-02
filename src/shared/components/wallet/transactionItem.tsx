import { formatMoneyVND, PAYMENT_PURPOSE_NAME } from "@/helper"
import { TransactionRes } from "@/models"
import moment from "moment"

interface TransactionItemProps {
  transaction: TransactionRes
  isActive?: boolean
  onChange?: (id: number) => void
}

export const TransactionItem = ({ transaction, isActive, onChange }: TransactionItemProps) => {
  return (
    <div
      onClick={() => onChange?.(transaction.payment_id)}
      className={`p-[16px] hover:bg-bg-primary rounded-[5px] cursor-pointer transition-all duration-100 ${
        isActive ? "bg-bg-primary" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-start mr-24">
          {/* <OneWayIcon className="mr-[10px] mt-[8px]" /> */}
          <p className="text-base font-semibold">
            {transaction.compounding_car.compounding_car_name}
          </p>
        </div>
        <p
          className={`text-base font-semibold whitespace-nowrap ${
            transaction.payment_type === "inbound" ? "text-success" : "text-error"
          }`}
        >
          {`${transaction.payment_type === "inbound" ? "+" : "-"}${formatMoneyVND(
            transaction.amount
          )}`}
        </p>
      </div>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <p className="text-xs">{PAYMENT_PURPOSE_NAME[transaction.payment_purpose]}</p>
        </div>
        <p className="text-xs">{moment(transaction.date).format("HH:mm DD/MM/YYYY")}</p>
      </div>
    </div>
  )
}
