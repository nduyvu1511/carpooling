import { CheckIcon } from "@/assets"
import { RefCallback } from "react"

interface InputCheck {
  onCheck: Function
  isChecked: boolean
  type?: "circle" | "square"
  size?: number
  className?: string
  onBlur?: Function
  ref?: RefCallback<any> | null
}

export const InputCheckbox = ({
  onCheck,
  isChecked,
  type = "square",
  size = 24,
  className = "",
  onBlur,
  ref = null,
}: InputCheck) => {
  return (
    <span
      ref={ref as any}
      onBlur={() => onBlur?.()}
      style={{ width: size, height: size }}
      onClick={(e) => {
        e.stopPropagation()
        onCheck && onCheck()
      }}
      className={`border border-solid cursor-pointer ${
        type === "square" ? "rounded-[4px]" : "rounded-[50%]"
      } flex-center ${
        isChecked ? `bg-primary border-primary` : "border-gray-color-4"
      } ${className}`}
    >
      {isChecked ? <CheckIcon className="w-[12px] h-[8px]" /> : null}
    </span>
  )
}
