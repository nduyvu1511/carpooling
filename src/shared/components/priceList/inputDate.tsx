import { CalendarIcon } from "@/assets"
import moment from "moment"
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css"

interface InputDateProps {
  onChange?: (val: string) => void
  minNumberOfDays?: number
  placeholder?: string
  currentDay?: string
  value?: string
}

export const InputDate = ({
  onChange,
  currentDay,
  value,
  placeholder,
  minNumberOfDays = 0,
}: InputDateProps) => {
  // const disablePastDt = (current: any) => {
  //   const yesterday = moment().subtract(1, "day")
  //   return current.isAfter(yesterday)
  // }

  const disablePastDt = (current: any) => {
    const yesterday = moment().subtract(1, "day")
    return current.isAfter(currentDay ? moment(currentDay).add(minNumberOfDays, "days") : yesterday)
  }

  const handleChange = (val: Date) => {
    onChange?.(moment(val).format("YYYY-MM-DD"))
  }

  return (
    <div className="form-date pr-0 pl-0">
      <Datetime
        renderMonth={(props, month) => <td {...props}>Thg {month + 1}</td>}
        closeOnSelect
        dateFormat="DD/MM/YYYY"
        isValidDate={disablePastDt}
        value={value ? moment(value).format("DD/MM/YYYY") : ""}
        onChange={(e: any) => {
          handleChange(e._d)
        }}
        timeFormat={false}
        renderInput={(props) => (
          <div className="h-[56px] rounded-[10px] flex items-center flex-1 w-full overflow-hidden relative">
            <CalendarIcon className="absolute-vertical left-12 text-gray-color-5 w-[20px] h-[20px] pointer-events-none" />
            <input
              {...props}
              value={value ? props.value : ""}
              placeholder={placeholder}
              readOnly
              className={"h-full outline-none flex-1 px-12 pl-[42px]"}
            />
          </div>
        )}
      />
    </div>
  )
}
