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
            isError={isError}
            onChange={(dateTime) => {
              console.log({ dateTime })
              onChange(dateTime)
              onChangeProps(dateTime)
            }}
            initialValue={defaultValue}
          />
        )}
        rules={{ required: true }}
      />

      {isError ? <p className="form-err-msg">Vui lòng nhập trường này</p> : null}
    </>
  )
}
