import { getTimes } from "@/helper"
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
  onBlur?: Function
  currentDay?: string
}
const LIMIT_TIME_RANGE = 4

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
  onBlur,
  currentDay,
}: MyInputDateTimeProps) => {
  const [time, setTime] = useState<string>(initialValue ? initialValue.slice(11) : "")
  const [date, setDate] = useState<string>(
    initialValue ? moment(initialValue.slice(0, 10)).format("YYYY-MM-DD") : ""
  )

  const initialDate = useMemo(() => {
    return initialValue && maxHour && maxHour <= "02:00:00"
      ? moment(initialValue.slice(0, 10)).format("YYYY-MM-DD")
      : ""
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const disablePastDt = (current: any) => {
    const yesterday = moment().subtract(1, "day")
    return current.isAfter(currentDay ? moment(currentDay) : yesterday)
  }

  const times: OptionModel[] = useMemo(() => {
    const times = [...getTimes()]
    if (!maxHour) return times
    const index = times.findIndex((item) => item.value >= maxHour)

    if (index < LIMIT_TIME_RANGE) {
      if (index === 0) {
        return [...times.slice(-4), ...times.slice(0, 1)]
      } else if (index === 1) {
        return [...times.slice(-3), ...times.slice(0, 2)]
      } else if (index === 2) {
        return [...times.slice(-2), ...times.slice(0, 3)]
      }
      return [...times.slice(-1), ...times.slice(0, 4)]
    }

    return times.slice(index - LIMIT_TIME_RANGE, index + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = ({ date, time }: { date: string | undefined; time: string | undefined }) => {
    if (!date || !time) return
    onChange(`${date} ${time}`)
  }

  const handleGetTime = (val: OptionModel) => {
    if (!val) return
    setTime(val?.value + "")

    if (maxHour && maxHour <= "02:00:00") {
      let newDate = ""
      if (val.value >= "22:00:00" && val.value <= "23:59:59") {
        newDate = moment(initialDate).subtract(1, "day").format("YYYY-MM-DD")
      } else {
        newDate = moment(initialDate).format("YYYY-MM-DD")
      }
      setDate(newDate)
      handleChange({ date: newDate, time: val?.value + "" })
      return
    }

    handleChange({ date, time: val?.value + "" })
  }

  return (
    <div
      onBlur={() => onBlur?.()}
      className="my-input-datetime flex items-center h-[44px] md:h-[52px]"
    >
      <div
        className={`relative form-date w-[40%] sm:w-1/2 h-full borer border-solid bg-white-color rounded-[5px] md:rounded-[10px] ${
          isError ? "border border-solid border-error" : "border-gray-20 md:border-gray-color-2"
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
          onChange={(val) => handleGetTime(val as OptionModel)}
          className={`${disableHour ? "pointer-events-none opacity-60" : ""} `}
          maxMenuHeight={maxMenuHeight}
          isSearchable={isSelectSearchable}
        />
      </div>
    </div>
  )
}

export { MyInputDateTime }
