import { InputCheckbox } from "@/components"
import React from "react"

import { Control, useController } from "react-hook-form"

interface CheckboxFieldProps {
  size?: number
  control: Control<any>
  name: string
  label: string
  defaultValue?: boolean
  className?: string
}

export const CheckboxField = ({
  control,
  name,
  label,
  defaultValue = false,
  className = "",
  size,
}: CheckboxFieldProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  })

  return (
    <div className={`flex items-start ${className}`}>
      <InputCheckbox
        ref={ref}
        size={size}
        onCheck={() => onChange(!value)}
        onBlur={onBlur}
        isChecked={value}
        type="circle"
      />
      <label
        onClick={() => onChange(!value)}
        className="cursor-default flex-1 ml-12 text-xs leading-[18px]"
      >
        {label}
      </label>
    </div>
  )
}
