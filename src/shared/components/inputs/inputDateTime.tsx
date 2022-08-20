import "react-datetime/css/react-datetime.css"
import { Control, Controller } from "react-hook-form"
import { MyInputDateTime } from "./myInputDateTime"

interface InputDateTimeProps {
  showLabel?: boolean
  onChange: (params: string) => void
  defaultValue?: string
  placeholder: string
  required?: boolean
  name: string
  control: Control<any>
  isError?: boolean | undefined
  disableHour?: boolean
  disableDate?: boolean
  maxHour?: string
  currentDay?: string
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
  disableHour = false,
  disableDate = false,
  maxHour,
  currentDay,
}: InputDateTimeProps) => {
  return (
    <>
      {showLabel ? (
        <label htmlFor={name} className="form-label">
          {placeholder} {required ? "(*)" : ""}
        </label>
      ) : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur } }) => (
          <MyInputDateTime
            currentDay={currentDay}
            onBlur={onBlur}
            maxHour={maxHour}
            disableHour={disableHour}
            disableDate={disableDate}
            isError={isError}
            onChange={(dateTime) => {
              onChange(dateTime)
              onChangeProps(dateTime)
            }}
            initialValue={defaultValue}
            maxMenuHeight={200}
            isSelectSearchable={false}
          />
        )}
        rules={{ required: true }}
      />

      {isError ? <p className="form-err-msg">Vui lòng nhập trường này</p> : null}
    </>
  )
}
