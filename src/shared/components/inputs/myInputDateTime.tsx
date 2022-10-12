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
  const [times, setTimes] = useState<OptionModel[]>()
  const [time, setTime] = useState<string>(initialValue ? initialValue.slice(11) : "")
  const [date, setDate] = useState<string>(
    initialValue ? moment(initialValue.slice(0, 10)).format("YYYY-MM-DD") : ""
  )
  const timeValue: OptionModel | null = useMemo(() => {
    if (!times || !time) return null

    return (
      times?.find((item) => item.value === time) || {
        label: `${time.slice(0, 5)}`,
        value: time,
      }
    )
  }, [times, time])

  const initialDate = useMemo(() => {
    return initialValue && maxHour && maxHour <= "02:00:00"
      ? moment(initialValue.slice(0, 10)).format("YYYY-MM-DD")
      : ""
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!currentDay || !date || !time) return

    if (
      moment(currentDay)
        .add(12, "hour")
        .isAfter(moment(`${date} ${time}`))
    ) {
      onChange("")
      setTime("")
      setDate("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDay])

  // Set time options
  useEffect(() => {
    const times = [...getTimes()]

    if (!maxHour) {
      setTimes(times)
      return
    }

    const index = times.findIndex((item) => item.value >= maxHour)
    let newTimes = []

    if (index < LIMIT_TIME_RANGE) {
      if (index === 0) {
        newTimes = [...times.slice(-4), ...times.slice(0, 1)]
      } else if (index === 1) {
        newTimes = [...times.slice(-3), ...times.slice(0, 2)]
      } else if (index === 2) {
        newTimes = [...times.slice(-2), ...times.slice(0, 3)]
      } else {
        newTimes = [...times.slice(-1), ...times.slice(0, 4)]
      }
    } else {
      newTimes = times.slice(index - LIMIT_TIME_RANGE, index + 1)
    }

    setTimes(newTimes)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const disablePastDt = (current: any) => {
    const yesterday = moment().subtract(1, "day")
    return current.isAfter(currentDay ? moment(currentDay) : yesterday)
  }

  const getTimesBySameDay = (date: string): OptionModel[] => {
    const data = [...getTimes()]
    const times = moment().isSame(date, "date")
      ? data.slice(data.findIndex((item) => item.value >= moment().format("HH:mm")))
      : data
    return times
  }

  const handleChange = ({ date, time }: { date: string | undefined; time: string | undefined }) => {
    if (date && time) {
      onChange(`${date} ${time}`)
    }
  }

  const handleSetTime = (val: OptionModel) => {
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

  const handleSetDate = (date: string) => {
    setDate(date)
    setTimes(getTimesBySameDay(date))

    let newTime = time
    if (time && moment().isAfter(moment(`${date} ${time}`))) {
      newTime = ""
      setTime(newTime)
    }
    handleChange({ date, time: newTime })
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
          renderMonth={(props, month) => <td {...props}>Thg {month + 1}</td>}
          closeOnSelect
          dateFormat="DD/MM/YYYY"
          isValidDate={disablePassDay ? disablePastDt : undefined}
          onChange={(e: any) => {
            const date = moment(e._d).format("YYYY-MM-DD")
            handleSetDate(date)
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
          value={timeValue}
          placeholder={<p className="font-medium">Chọn giờ</p>}
          onChange={(val) => handleSetTime(val as OptionModel)}
          className={`${disableHour ? "pointer-events-none opacity-60" : ""} `}
          maxMenuHeight={maxMenuHeight}
          isSearchable={isSelectSearchable}
        />
      </div>
    </div>
  )
}

export { MyInputDateTime }
