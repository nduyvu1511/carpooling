import { JournalFilterDateOptional } from "@/models"
import { useState } from "react"
import { InputDate } from "../inputs"

interface JournalFilterProps {
  onChange?: (params: JournalFilterDateOptional | undefined) => void
}

const JournalFilter = ({ onChange }: JournalFilterProps) => {
  const [data, setData] = useState<JournalFilterDateOptional | undefined>(undefined)

  return (
    <div className="flex items-center h-[42px]">
      <div className="form-date w-full h-full max-w-[180px] rounded-[5px] mr-[16px]">
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
      <div className="form-date w-full h-full max-w-[180px] rounded-[5px] mr-[16px]">
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
      <button
        onClick={() => data?.end_date && data?.start_date && onChange?.(data)}
        className={`btn-primary h-full mr-[16px] ${
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
          className="btn-primary-outline h-full"
        >
          Đặt lại
        </button>
      ) : null}
    </div>
  )
}

export { JournalFilter }
