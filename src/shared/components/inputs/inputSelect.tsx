import { OptionModel } from "@/models"
import { useRef } from "react"
import { Control, Controller } from "react-hook-form"
import Select from "react-select"

interface InputSelectProps {
  placeholder: string
  required?: boolean
  onChange: (params: OptionModel | undefined) => void
  name: string
  control: Control<any>
  options: OptionModel[]
  defaultValue?: OptionModel | undefined
  value?: OptionModel | undefined
  isError?: boolean | undefined
  showLabel?: boolean
  disabled?: boolean
  isSearchable?: boolean
}

const InputSelect = ({
  name,
  placeholder,
  required = true,
  onChange: onChangeProps,
  control,
  options,
  isError = false,
  defaultValue,
  showLabel = true,
  disabled = false,
  value,
  isSearchable = true,
}: InputSelectProps) => {
  const ref = useRef<any>(null)

  return (
    <>
      {showLabel ? (
        <label
          onClick={() => {
            ref.current?.focus()
          }}
          htmlFor={name}
          className={`form-label ${disabled ? "pointer-events-none" : ""}`}
        >
          {placeholder} {required ? "(*)" : ""}
        </label>
      ) : null}

      <div className="form-select">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur }, formState: { errors } }) => (
            <Select
              isSearchable={isSearchable}
              autoFocus={false}
              openMenuOnFocus={true}
              ref={ref}
              placeholder={placeholder}
              options={options}
              onChange={(val) => {
                onChange(val)
                onChangeProps(val as OptionModel)
              }}
              onBlur={onBlur}
              value={value}
              defaultValue={defaultValue}
              id={name}
              className={`${isError ? "form-select-error" : ""} ${
                disabled ? "pointer-events-none opacity-60" : ""
              }`}
            />
          )}
          rules={{ required: true }}
        />
      </div>
      {isError ? <p className="form-err-msg">Vui lòng nhập trường này</p> : null}
    </>
  )
}

export { InputSelect }
