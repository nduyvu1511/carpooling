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
}

const MyInputDateTime = ({
  onChange,
  initialValue,
  isError = false,
  disablePassDay = true,
  disableHour = false,
  disableDate = false,
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
    // if (!date || !time) return
    onChange(`${date} ${time}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, time])

  return (
    <div className="my-input-datetime flex items-center h-[52px]">
      <div
        className={`form-date flex-1 h-full mr-[16px] bg-white-color rounded-[8px] ${
          isError ? "border border-solid border-error" : ""
        }`}
      >
        <Datetime
          dateFormat="DD/MM/YYYY"
          locale="vi"
          isValidDate={disablePassDay ? disablePastDt : undefined}
          onChange={(e: any) => {
            setDate(moment(e._d).format("YYYY-MM-DD"))
          }}
          timeFormat={false}
          inputProps={{ placeholder: "Chọn ngày" }}
          initialValue={date}
          className={`${disableDate ? "pointer-events-none opacity-60" : ""} `}
        />
      </div>
      <div className={`form-select flex-1 h-full ${isError ? "form-select-error" : ""}`}>
        <Select
          menuShouldScrollIntoView={false}
          options={times}
          defaultValue={times?.find((item) => item.value === time) || undefined}
          placeholder="Chọn giờ"
          onChange={(val) => setTime(val?.value + "")}
          className={`${disableHour ? "pointer-events-none opacity-60" : ""} `}
        />
      </div>
    </div>
  )
}

export { MyInputDateTime }
