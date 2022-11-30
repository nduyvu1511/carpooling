import { NoteIcon, StarEmptyIcon, WalletIcon } from "@/assets"
import { formatMoneyVND } from "@/helper"
import { UserInfo } from "@/models"
import React from "react"

export const AccountSummary = ({ data }: { data: UserInfo }) => {
  return (
    <div className="grid grid-cols-3 gap-8 md:gap-16">
      <div className="shadow-shadow-1 select-none flex-1 p-10 rounded-[12px] bg-[#FFF8F2]">
        <p className="flex items-center mb-8">
          <StarEmptyIcon className="mr-8 text-[#EE542F]" />
          <span className="text-sm font-semibold line-clamp-1">{data.count_rating}</span>
        </p>

        <p className="text-xs font-normal line-clamp-1">Đánh giá tích cực</p>
      </div>

      <div className="shadow-shadow-1 select-none flex-1 p-10 rounded-[12px] bg-[#F1F5FF]">
        <p className="flex items-center mb-8">
          <WalletIcon className="mr-8 text-[#2F19BB]" />
          <span className="text-sm font-semibold line-clamp-1">
            {formatMoneyVND(data.amount_total_in_bank_wallet + data.amount_total_in_cash_wallet)}
          </span>
        </p>

        <p className="text-xs font-normal line-clamp-1">Số dư ví</p>
      </div>

      <div className="shadow-shadow-1 select-none flex-1 p-10 rounded-[12px] bg-[#FEFEE5]">
        <p className="flex items-center mb-8">
          <NoteIcon className="mr-8 text-[#FBB500]" />
          <span className="text-sm font-semibold line-clamp-1">
            {data.count_done_compounding_car}
          </span>
        </p>

        <p className="text-xs font-normal line-clamp-1">Chuyến đi hoàn tất</p>
      </div>
    </div>
  )
}
