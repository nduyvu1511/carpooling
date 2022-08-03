import { PlusIcon } from "@/assets"
import { formatMoneyVND, PAYMENT_PURPOSE_NAME } from "@/helper"
import { TransactionRes } from "@/models"
import moment from "moment"

interface TransactionItemProps {
  transaction: TransactionRes | null
  isActive?: boolean
  onChange?: (id: number) => void
}

export const TransactionItem = ({ transaction, isActive, onChange }: TransactionItemProps) => {
  if (transaction === null)
    return (
      <div className="flex p-[16px]">
        <div className="flex-1">
          <div className="skeleton h-[18px] rounded-[5px] mb-12"></div>
          <div className="w-[100px] skeleton h-[10px] rounded-[5px]"></div>
        </div>
        <div className="mx-[40px]">
          <div className="w-[150px] skeleton h-[16px] rounded-[5px] mb-[12px]"></div>
          <div className="w-[200px] skeleton h-[10px] rounded-[5px]"></div>
        </div>
        <div className="w-[40px] skeleton h-[20px] rounded-[5px]"></div>
      </div>
    )
  return (
    <div
      onClick={() => onChange?.(transaction.payment_id)}
      className={`p-[16px] hover:bg-bg-primary rounded-[5px] flex justify-between cursor-pointer transition-all duration-100 ${
        isActive ? "bg-bg-primary" : ""
      }`}
    >
      <div className="mr-24 flex-1">
        <p className="text-base font-semibold mb-8">
          {transaction.compounding_car.compounding_car_name}
        </p>
        <p className="text-xs">{PAYMENT_PURPOSE_NAME[transaction.payment_purpose]}</p>
      </div>
      <div className="w-[300px] mr-24">
        <p
          className={`text-base font-semibold whitespace-nowrap mb-8 ${
            transaction.payment_type === "inbound" ? "text-success" : "text-error"
          }`}
        >
          {`${transaction.payment_type === "inbound" ? "+" : "-"}${formatMoneyVND(
            transaction.amount
          )}`}
        </p>
        <p className="text-xs">{moment(transaction.date).format("HH:mm DD/MM/YYYY")}</p>
      </div>

      <div className="">
        <button className="w-[40px] h-[40px] rounded-[5px] bg-gray-color-1 flex-center">
          <PlusIcon />
        </button>
      </div>
    </div>
  )
}
