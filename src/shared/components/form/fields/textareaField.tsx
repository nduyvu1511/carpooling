import React from "react"
import { Control, useController } from "react-hook-form"

type TextareaFieldProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  any
> & {
  control: Control<any>
  name: string
  className?: string
  label?: string
}

export const TextareaField = ({
  className = "",
  label,
  control,
  name,
  defaultValue,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ref: externalRef,
  value: externalValue,
  ...attributes
}: TextareaFieldProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  })

  return (
    <div className={`form-item ${className}`}>
      {label ? (
        <label htmlFor={name} className="form-label">
          {label}
          {attributes?.required ? "(*)" : ""}
        </label>
      ) : null}

      <textarea
        ref={ref}
        className="form-textarea"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={() => {
          onBlur()
          externalOnBlur?.(value)
        }}
        maxLength={attributes?.maxLength || 300}
        cols={attributes?.cols || 10}
        {...attributes}
      ></textarea>

      {error ? <p className="form-err-msg">{error?.message}</p> : null}
    </div>
  )
}
