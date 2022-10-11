import { MyInputDateTime } from "@/components"
import { OptionModel } from "@/models"
import React, { useRef } from "react"

import { Control, useController } from "react-hook-form"
import Select from "react-select"

type DateTimeFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLDivElement>,
  any
> & {
  size?: number
  control: Control<any>
  name: string
  label: string
  className?: string
  disableHour?: boolean
  disableDate?: boolean
  maxHour?: string
  currentDay?: string
  onChange?: (val: string) => void
  options: OptionModel[]
}

export const DateTimeField = ({
  control,
  name,
  label,
  className = "",
  size,
  maxHour,
  currentDay,
  disableDate,
  disableHour,
  defaultValue,
  options,
  onChange: externalOnChange,
  ...attributes
}: DateTimeFieldProps) => {
  const selectRef = useRef<any>(null)
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
    formState: { dirtyFields },
  } = useController({
    name,
    control,
    defaultValue,
  })

  return (
    <div ref={ref} className={`form-item ${className}`}>
      {label ? (
        <label
          onClick={() => {
            selectRef.current?.focus()
          }}
          htmlFor={name}
          className={`form-label ${attributes?.disabled ? "pointer-events-none" : ""}`}
        >
          {label} {attr ? "(*)" : ""}
        </label>
      ) : null}

      <div className="form-select">
        <Select
          isSearchable={isSearchable}
          autoFocus={false}
          openMenuOnFocus={true}
          ref={selectRef}
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
      </div>
      {isError ? <p className="form-err-msg">Vui lòng nhập trường này</p> : null}
    </div>
  )
}
