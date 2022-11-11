import { CalendarDoneIcon, CalendarIcon } from "@/assets"
import moment from "moment"
import { HTMLProps } from "react"
import Datetime, { DatetimepickerProps } from "react-datetime"
import "react-datetime/css/react-datetime.css"

interface InputDateProps extends Omit<DatetimepickerProps, "onChange"> {
  disablePassDay?: boolean
  onChange?: (params: string | number) => void
  defaultValue?: string
  inputProps?: HTMLProps<HTMLInputElement>
  value?: string
  placeholder?: string
  currentDay?: string
  showDiffCalendarIcon?: boolean
}

const InputDate = ({
  disablePassDay = true,
  onChange,
  defaultValue,
  inputProps,
  value,
  placeholder,
  currentDay,
  showDiffCalendarIcon = false,
  ...attributes
}: InputDateProps) => {
  const disablePastDt = (current: any) => {
    const yesterday = moment().subtract(1, "day")
    return current.isAfter(yesterday)
  }

  return (
    <div className="relative h-full">
      <Datetime
        renderMonth={(props, month) => <td {...props}>Thg {month + 1}</td>}
        closeOnSelect
        dateFormat="DD/MM/YYYY"
        isValidDate={disablePassDay ? disablePastDt : undefined}
        onChange={(e: any) => {
          const val = moment(e._d).format("YYYY-MM-DD")
          onChange?.(val)
        }}
        timeFormat={false}
        inputProps={{ ...inputProps }}
        initialValue={defaultValue}
        value={value ? new Date(value) : ""}
        renderInput={(props) => (
          <input {...props} readOnly placeholder={placeholder} value={value ? props.value : ""} />
        )}
        {...attributes}
      />
      {showDiffCalendarIcon ? (
        <CalendarDoneIcon className="absolute-vertical right-0 text-gray-color-5 pointer-events-none" />
      ) : (
        <CalendarIcon className="absolute-vertical right-0 text-gray-color-5 pointer-events-none" />
      )}
    </div>
  )
}

export { InputDate }
