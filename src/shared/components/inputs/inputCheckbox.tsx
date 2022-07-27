import { CheckIcon } from "@/assets"

interface InputCheck {
  onCheck: Function
  isChecked: boolean
  type?: "circle" | "square"
  size?: number
  className?: string
}

export const InputCheckbox = ({
  onCheck,
  isChecked,
  type = "square",
  size = 24,
  className = "",
}: InputCheck) => {
  return (
    <span
      style={{ width: size, height: size }}
      onClick={(e) => {
        e.stopPropagation()
        onCheck && onCheck()
      }}
      className={`border border-solid cursor-pointer ${
        type === "square" ? "rounded-[4px]" : "rounded-[50%]"
      } flex-center border-gray-color-4 ${isChecked ? `bg-gray-color-4` : ""} ${className}`}
    >
      {isChecked ? <CheckIcon className="w-[12px] h-[8px]" /> : null}
    </span>
  )
}
