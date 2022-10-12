import { MyInputDateTime } from "@/components"
import React from "react"

import { Control, useController } from "react-hook-form"

type DateTimeFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLDivElement>,
  any
> & {
  size?: number
  control: Control<any>
  name: string
  label?: string
  className?: string
  disableHour?: boolean
  disableDate?: boolean
  maxHour?: string
  currentDay?: string
  onChange?: (val: string) => void
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
  onChange: externalOnChange,
  ...attributes
}: DateTimeFieldProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  })

  return (
    <div
      ref={ref}
      className={`form-item ${attributes.disabled ? "pointer-events-none" : ""} ${className}`}
    >
      {label ? (
        <label htmlFor={name} className="form-label">
          {label}
          {attributes?.required ? "(*)" : ""}
        </label>
      ) : null}

      <MyInputDateTime
        currentDay={currentDay}
        onBlur={onBlur}
        maxHour={maxHour}
        disableHour={disableHour}
        disableDate={disableDate}
        isError={!!error}
        onChange={(dateTime) => {
          if (attributes.disabled) return

          externalOnChange?.(dateTime)
          onChange(dateTime)
        }}
        initialValue={value}
        maxMenuHeight={200}
        isSelectSearchable={false}
      />

      {error ? <p className="form-err-msg">{error?.message}</p> : null}
    </div>
  )
}
