import { JournalFilterDate, JournalFilterDateOptional } from "@/models"
import { useState } from "react"
import { InputDate } from "../inputs"

interface JournalFilterProps {
  onChange?: (params: JournalFilterDateOptional | undefined) => void
  defaultValues?: JournalFilterDate
}

const JournalFilter = ({ onChange, defaultValues }: JournalFilterProps) => {
  const [data, setData] = useState<JournalFilterDateOptional | undefined>(defaultValues)

  return (
    <div className="flex-col sm:flex-row flex sm:h-[42px] journal-filter-inputs">
      <div className="h-[42px] sm:h-full sm:max-w-[124px] mb-12 sm:mb-0 form-date w-full rounded-[5px] mr-[16px]">
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
      <div className="h-[42px] sm:h-full sm:max-w-[124px] mb-[40px] sm:mb-0 form-date w-full rounded-[5px] mr-[16px]">
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
      <div className="flex">
        <button
          onClick={() => data?.end_date && data?.start_date && onChange?.(data)}
          className={`flex-1 btn-primary h-full px-24 py-[10px] ${
            data?.end_date && data?.start_date ? "" : "btn-disabled"
          }`}
        >
          Lọc
        </button>
        {data?.end_date && data?.start_date ? (
          <button
            onClick={() => {
              setData(undefined)
              onChange?.(undefined)
            }}
            className="flex-1 rounded-[5px] border border-solid border-primary sm:border-none sm:flex-auto text-sm whitespace-nowrap ml-[16px] font-medium text-primary"
          >
            Đặt lại
          </button>
        ) : null}
      </div>
    </div>
  )
}

export { JournalFilter }
