import { JournalFilterDate, JournalFilterDateOptional } from "@/models"
import { useState } from "react"
import { InputDate } from "../inputs"

interface JournalFilterProps {
  onChange?: (params: JournalFilterDateOptional | undefined) => void
  defaultValues?: JournalFilterDate
}

const WalletFilter = ({ onChange, defaultValues }: JournalFilterProps) => {
  const [data, setData] = useState<JournalFilterDateOptional | undefined>(defaultValues)

  return (
    <div className="flex-col sm:flex-row flex sm:h-[42px] journal-filter-inputs wallet-filter">
      <div className="h-[42px] sm:h-full sm:max-w-[124px] mb-12 sm:mb-0 form-date w-full rounded-[5px] mr-16">
        <InputDate
          value={data?.start_date}
          disablePassDay={false}
          placeholder="Từ ngày"
          onChange={(val) =>
            setData({
              ...data,
              start_date: val + "",
            })
          }
        />
      </div>
      <div className="h-[42px] sm:h-full sm:max-w-[124px] mb-[40px] sm:mb-0 form-date w-full rounded-[5px] mr-16">
        <InputDate
          placeholder="Đến ngày"
          value={data?.end_date}
          disablePassDay={false}
          onChange={(val) =>
            setData({
              ...data,
              end_date: val + "",
            })
          }
        />
      </div>
      <div className="flex wallet-filter-btns">
        <button
          onClick={() => data?.end_date && data?.start_date && onChange?.(data)}
          className={`flex-1 btn-primary h-full px-24 py-[10px] ${
            data?.end_date && data?.start_date ? "" : "btn-disabled"
          } wallet-filter-btns-filter`}
        >
          Lọc
        </button>
        {data?.end_date && data?.start_date ? (
          <button
            onClick={() => {
              setData(undefined)
              onChange?.(undefined)
            }}
            className="flex-1 rounded-[5px] text-sm whitespace-nowrap ml-16 font-medium text-primary wallet-filter-btns-cancel"
          >
            Đặt lại
          </button>
        ) : null}
      </div>
    </div>
  )
}

export { WalletFilter }
