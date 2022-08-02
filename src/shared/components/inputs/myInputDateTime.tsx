import { CloseIcon } from "@/assets"
import { getTimes } from "@/helper"
import { OptionModel } from "@/models"
import moment from "moment"
import { useEffect, useMemo, useState } from "react"
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css"
import Select from "react-select"

interface MyInputDateTimeProps {
  onChange: (time: string) => void
  initialValue?: string
  isError?: boolean
  disablePassDay?: boolean
  disableHour?: boolean
  disableDate?: boolean
  maxMenuHeight?: number
  isSelectSearchable?: boolean
}

const MyInputDateTime = ({
  onChange,
  initialValue,
  isError = false,
  disablePassDay = true,
  disableHour = false,
  disableDate = false,
  maxMenuHeight,
  isSelectSearchable,
}: MyInputDateTimeProps) => {
  const [time, setTime] = useState<string>(initialValue ? initialValue.slice(11) : "")
  const [date, setDate] = useState<string>(
    initialValue ? moment(initialValue.slice(0, 10)).format("YYYY-MM-DD") : ""
  )
  const yesterday = moment().subtract(1, "day")
  const disablePastDt = (current: any) => {
    return current.isAfter(yesterday)
  }

  const times: OptionModel[] = useMemo(() => {
    return getTimes()
  }, [])

  useEffect(() => {
    if (!date || !time) return
    onChange(`${date} ${time}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, time])

  return (
    <div className="my-input-datetime flex items-center h-[44px] md:h-[52px]">
      <div
        className={`relative form-date w-[40%] sm:w-1/2 h-full borer border-solid border-black-10 md:border-border-color-2 bg-white-color rounded-[5px] md:rounded-[10px] ${
          isError ? "border border-solid border-error" : ""
        }`}
      >
        <Datetime
          input={true}
          closeOnSelect
          dateFormat="DD/MM/YYYY"
          locale="vi"
          isValidDate={disablePassDay ? disablePastDt : undefined}
          onChange={(e: any) => {
            setDate(moment(e._d).format("YYYY-MM-DD"))
          }}
          timeFormat={false}
          inputProps={{ placeholder: "Chọn ngày" }}
          value={date ? new Date(date) : ""}
          className={`${disableDate ? "pointer-events-none opacity-60" : ""} `}
        />
        {/* <button
          onClick={() => {
            setTime("")
            setDate("")
            onChange("")
          }}
          className="absolute-vertical right-[10px]"
        >
          <CloseIcon className="w-[13px] h-[13px]" />
        </button> */}
      </div>
      <div className="mx-[6px] md:mx-[12px]"></div>
      <div className={`form-select w-[60%] sm:w-1/2 h-full ${isError ? "form-select-error" : ""}`}>
        <Select
          menuShouldScrollIntoView={false}
          options={times}
          value={
            times?.find((item) => item.value === time) || {
              label: `${time.slice(0, 5)}`,
              value: time,
            } ||
            undefined
          }
          placeholder="Chọn giờ"
          onChange={(val) => setTime(val?.value + "")}
          className={`${disableHour ? "pointer-events-none opacity-60" : ""} `}
          maxMenuHeight={maxMenuHeight}
          isSearchable={isSelectSearchable}
        />
      </div>
    </div>
  )
}

export { MyInputDateTime }
