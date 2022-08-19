import { PaymentIcon } from "@/assets"
import { formatMoneyVND } from "@/helper"
import { JournalRes } from "@/models"

interface JournalItemProps {
  journal?: JournalRes
  isActive?: boolean
  onChange?: (id: number) => void
}

const JournalItem = ({ journal, isActive, onChange }: JournalItemProps) => {
  if (!journal) return <div className="skeleton h-[120px] rounded-[5px]"></div>
  return (
    <div
      onClick={() => onChange?.(journal.journal_id)}
      className={`p-24 block-element rounded-[10px] ${isActive ? "bg-bg-error" : "bg-bg-primary"}`}
    >
      <div className="flex items-center mb-12">
        <PaymentIcon className="mr-8" />
        <p className="capitalize text-sm text-gray-color-5">{journal.journal_type}</p>
      </div>
      <p className="text-xl text-primary">{formatMoneyVND(journal.remains_amount)}</p>
    </div>
  )
}

export { JournalItem }
