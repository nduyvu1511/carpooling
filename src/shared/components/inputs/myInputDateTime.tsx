import { getTimes, LIMIT_HOUR_OF_WAITING_TIME } from "@/helper"
import { OptionModel } from "@/models"
import moment from "moment"
import { useMemo, useState } from "react"
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
  maxHour?: string
  minHour?: string
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
  maxHour,
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
    const times = [...getTimes()]
    if (maxHour) {
      const index = times.findIndex((item) => item.value >= maxHour)
      return times.slice(
        index - LIMIT_HOUR_OF_WAITING_TIME > 0 ? index - LIMIT_HOUR_OF_WAITING_TIME : 0,
        index
      )
    }
    return times
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = ({ date, time }: { date: string | undefined; time: string | undefined }) => {
    if (!date || !time) return
    onChange(`${date} ${time}`)
  }

  return (
    <div className="my-input-datetime flex items-center h-[44px] md:h-[52px]">
      <div
        className={`relative form-date w-[40%] sm:w-1/2 h-full borer border-solid bg-white-color rounded-[5px] md:rounded-[10px] ${
          isError ? "border border-solid border-error" : "border-black-10 md:border-border-color-2"
        }`}
      >
        <Datetime
          closeOnSelect
          dateFormat="DD/MM/YYYY"
          locale="vi"
          isValidDate={disablePassDay ? disablePastDt : undefined}
          onChange={(e: any) => {
            const date = moment(e._d).format("YYYY-MM-DD")
            handleChange({ date, time })
            setDate(date)
          }}
          timeFormat={false}
          inputProps={{ placeholder: "Chọn ngày" }}
          value={date ? new Date(date) : ""}
          className={`${disableDate ? "pointer-events-none opacity-60" : ""} `}
          renderInput={(props) => (
            <input {...props} readOnly placeholder="Chọn ngày" value={date ? props.value : ""} />
          )}
        />
      </div>
      <div className="mx-[6px] md:mx-[12px]"></div>
      <div className={`form-select w-[60%] sm:w-1/2 h-full ${isError ? "form-select-error" : ""}`}>
        <Select
          menuShouldScrollIntoView={false}
          options={times}
          value={
            time
              ? times?.find((item) => item.value === time) || {
                  label: `${time.slice(0, 5)}`,
                  value: time,
                }
              : undefined
          }
          placeholder={<p className="font-medium">Chọn giờ</p>}
          onChange={(val) => {
            if (!val) return
            handleChange({ date, time: val?.value + "" })
            setTime(val?.value + "")
          }}
          className={`${disableHour ? "pointer-events-none opacity-60" : ""} `}
          maxMenuHeight={maxMenuHeight}
          isSearchable={isSelectSearchable}
        />
      </div>
    </div>
  )
}

export { MyInputDateTime }
