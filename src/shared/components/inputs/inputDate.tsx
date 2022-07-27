import moment from "moment"
import { HTMLProps } from "react"
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css"

interface InputDateProps {
  disablePassDay?: boolean
  onChange?: (params: string | number) => void
  defaultValue?: string
  inputProps?: HTMLProps<HTMLInputElement>
  value?: string
}

const InputDate = ({
  disablePassDay = true,
  onChange,
  defaultValue,
  inputProps,
  value,
}: InputDateProps) => {
  const yesterday = moment().subtract(1, "day")
  const disablePastDt = (current: any) => {
    return current.isAfter(yesterday)
  }

  return (
    <Datetime
      closeOnSelect
      dateFormat="DD/MM/YYYY"
      locale="vi"
      isValidDate={disablePassDay ? disablePastDt : undefined}
      onChange={(e: any) => {
        const val = moment(e._d).format("YYYY-MM-DD")
        onChange?.(val)
      }}
      timeFormat={false}
      inputProps={{ ...inputProps }}
      initialValue={defaultValue}
      value={value ? new Date(value) : ""}
      renderInput={(props) => <input {...props} value={value ? props.value : ""} />}
    />
  )
}

export { InputDate }
