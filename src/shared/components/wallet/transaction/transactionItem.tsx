import { ArrowRightIcon, CalendarIcon, PaymentIcon } from "@/assets"
import { formatMoneyVND, PAYMENT_PURPOSE_COLOR, PAYMENT_PURPOSE_NAME } from "@/helper"
import { TransactionRes } from "@/models"
import moment from "moment"

interface TransactionItemProps {
  transaction: TransactionRes | null
  onChange?: (id: number) => void
}

export const TransactionItem = ({ transaction, onChange }: TransactionItemProps) => {
  if (transaction === null)
    return (
      <div className="flex p-16 mb-12 md:mb-16 block-element border border-solid border-border-color rounded-[8px]">
        <div className="sm:hidden w-full">
          <div className="flex items-center justify-between mb-12">
            <div className="skeleton h-[18px] skeleton rounded-[5px] flex-1 mr-24"></div>
            <div className="skeleton h-[18px] skeleton rounded-[5px] w-[80px]"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="skeleton h-[18px] skeleton rounded-[5px] w-full max-w-[200px]"></div>
            <div className="skeleton h-[18px] skeleton rounded-[5px] w-[80px]"></div>
          </div>
        </div>

        <div className="hidden sm:flex w-full">
          <div className="flex-1">
            <div className="skeleton h-[18px] rounded-[5px] mb-12"></div>
            <div className="w-[100px] skeleton h-[10px] rounded-[5px]"></div>
          </div>
          <div className="mx-[40px]">
            <div className="w-[150px] skeleton h-16 rounded-[5px] mb-[12px]"></div>
            <div className="w-[200px] skeleton h-[10px] rounded-[5px]"></div>
          </div>
          <div className="w-[40px] skeleton h-[20px] rounded-[5px]"></div>
        </div>
      </div>
    )

  return (
    <div
      onClick={() => onChange?.(transaction.payment_id)}
      className={`px-[10px] py-[12px] sm:p-16 block-element rounded-[8px] border border-border-color border-solid cursor-pointer transition-all duration-100`}
    >
      <div className="sm:hidden w-full">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium xs:text-sm flex-1 mr-12">
            ID: {transaction.payment_code}
          </p>

          <span
            style={{
              color: PAYMENT_PURPOSE_COLOR[transaction.payment_purpose]?.color,
              backgroundColor: PAYMENT_PURPOSE_COLOR[transaction.payment_purpose]?.bg,
            }}
            className="text-[10px] 420:text-xs rounded-[5px] py-[4px] px-8"
          >
            {PAYMENT_PURPOSE_NAME[transaction.payment_purpose]}
          </span>
        </div>

        <div className="my-8 border-b border-border-color border-solid"></div>

        <div className="flex justify-between">
          <div className="">
            <div className="flex items-center mb-4">
              <PaymentIcon className="w-16 mr-8" />
              <p
                className={`text-14 font-semibold whitespace-nowrap ${
                  transaction.payment_type === "inbound" ? "text-success" : "text-error"
                }`}
              >
                {`${transaction.payment_type === "inbound" ? "+" : "-"}${formatMoneyVND(
                  transaction.amount
                )}`}
              </p>
            </div>

            <p className="text-gray-color-7 text-[10px] font-medium ml-[26px]">
              {moment(transaction.date).format("DD/MM/YYYY")}
            </p>
          </div>

          <button className="w-[32px] h-[32px] rounded-[5px] bg-gray-color-1 flex-center">
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      <div className="hidden sm:flex justify-between items-center w-full">
        <div className="mr-24">
          <p className="mb-12 text-sm">ID: {transaction.payment_code}</p>
          <p className="text-xs font-medium flex items-center">
            <CalendarIcon className="mr-8 text-gray-color-7" />
            <span className="flex-1 text-gray-color-7">
              {moment(transaction.date).format("DD/MM/YYYY")}
            </span>
          </p>
        </div>

        <div className="mr-24 flex-1 flex flex-col items-center">
          <p
            className={`text-14 md:text-16 font-semibold whitespace-nowrap mb-8 ${
              transaction.payment_type === "inbound" ? "text-success" : "text-error"
            }`}
          >
            {`${transaction.payment_type === "inbound" ? "+" : "-"}${formatMoneyVND(
              transaction.amount
            )}`}
          </p>

          <span
            style={{
              color: PAYMENT_PURPOSE_COLOR[transaction.payment_purpose]?.color,
              backgroundColor: PAYMENT_PURPOSE_COLOR[transaction.payment_purpose]?.bg,
            }}
            className="text-xs rounded-[5px] py-[4px] px-8"
          >
            {PAYMENT_PURPOSE_NAME[transaction.payment_purpose]}
          </span>
        </div>

        <div className="">
          <button className="w-[40px] h-[40px] rounded-[5px] bg-gray-color-1 flex-center">
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
