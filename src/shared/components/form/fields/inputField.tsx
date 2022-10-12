import { EyeHideIcon, EyeShowIcon } from "@/assets"
import React, { HTMLInputTypeAttribute, useState } from "react"
import { Control, useController } from "react-hook-form"

type InputFieldProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, any> & {
  control: Control<any>
  name: string
  className?: string
  label?: string
}

export const InputField = ({
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
}: InputFieldProps) => {
  const [type, setType] = useState<HTMLInputTypeAttribute>(attributes?.type || "text")

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

      <div className="form-item-inner">
        <div className="relative">
          <input
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            value={value}
            className={`form-input ${error ? "form-input-err" : ""}`}
            id={name}
            {...attributes}
            type={type}
          />

          {attributes?.type === "password" ? (
            <span
              onClick={() => setType(type === "password" ? "text" : "password")}
              className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-[10px]"
            >
              {type === "password" ? <EyeHideIcon /> : <EyeShowIcon />}
            </span>
          ) : null}
        </div>

        {error ? <p className="form-err-msg">{error?.message}</p> : null}
      </div>
    </div>
  )
}
