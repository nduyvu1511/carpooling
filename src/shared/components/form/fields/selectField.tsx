import { useRef } from "react"

import { Control, useController } from "react-hook-form"
import Select, { Props } from "react-select"

type SelectFieldProps = Props & {
  size?: number
  control: Control<any>
  name: string
  label?: string
  className?: string
  disabled?: boolean
  required?: boolean
  onChange?: (val: string) => void
}

export const SelectField = ({
  control,
  name,
  label,
  className = "",
  size,
  defaultValue,
  onChange: externalOnChange,
  disabled = false,
  required = true,
  autoFocus = false,
  openMenuOnFocus = true,
  ...attribute
}: SelectFieldProps) => {
  const selectRef = useRef<any>(null)
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  })

  return (
    <div ref={ref} className={`form-item ${disabled ? "pointer-events-none" : ""} ${className}`}>
      {label ? (
        <label
          onClick={() => {
            selectRef.current?.focus()
          }}
          htmlFor={name}
          className={`form-label ${disabled ? "pointer-events-none" : ""}`}
        >
          {label}
          {required ? "(*)" : ""}
        </label>
      ) : null}

      <div className="form-select">
        <Select
          {...attribute}
          openMenuOnFocus={true}
          ref={selectRef}
          placeholder={attribute.placeholder}
          options={attribute.options}
          onChange={(val) => {
            if (disabled) return

            onChange(val)
            externalOnChange?.(val)
          }}
          onBlur={onBlur}
          value={value}
          defaultValue={defaultValue}
          id={name}
          className={`${error ? "form-select-error" : ""}`}
        />
      </div>

      {error ? (
        <p className="form-err-msg">{error?.message || "Vui lòng nhập trường này"}</p>
      ) : null}
    </div>
  )
}
