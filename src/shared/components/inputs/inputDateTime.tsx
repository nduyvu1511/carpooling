import { subtractDateTimeToNumberOfHour } from "@/helper"
import moment from "moment"
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css"
import { Control, Controller } from "react-hook-form"

interface InputDateTimeProps {
  showLabel?: boolean
  onChange: (params: string) => void
  defaultValue?: string
  placeholder: string
  required?: boolean
  name: string
  control: Control<any>
  isError?: boolean | undefined
}

export const InputDateTime = ({
  showLabel = true,
  onChange: onChangeProps,
  defaultValue,
  isError = false,
  control,
  name,
  placeholder,
  required = true,
}: InputDateTimeProps) => {
  const yesterday = moment().subtract(1, "day")
  const disablePastDt = (current: any) => {
    return current.isAfter(yesterday)
  }

  return (
    <>
      {showLabel ? (
        <label htmlFor={name} className="form-label">
          {placeholder} {required ? "(*)" : ""}
        </label>
      ) : null}
      <div className={`form-date ${isError ? "form-date-err" : ""}`}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur } }) => (
            <Datetime
              inputProps={{ placeholder }}
              initialValue={defaultValue ? moment(defaultValue) : undefined}
              locale="vi"
              isValidDate={disablePastDt}
              onChange={(e: any) => {
                const dateTime = subtractDateTimeToNumberOfHour(
                  moment(new Date(e._d)).format("YYYY-MM-DD HH:MM:SS"),
                  7
                )
                onChange(dateTime)
                onChangeProps(dateTime)
              }}
            />
          )}
          rules={{ required: true }}
        />
      </div>

      {isError ? <p className="form-err-msg">Vui lòng nhập trường này</p> : null}
    </>
  )
}
