interface InputRadioProps {
  onCheck: Function
  isChecked: boolean
  size?: number
}

export const InputRadio = ({ onCheck, isChecked, size = 17 }: InputRadioProps) => {
  return (
    <span
      style={{ width: size, height: size }}
      onClick={(e) => {
        e.stopPropagation()
        onCheck && onCheck()
      }}
      className={`rounded-[50%] border border-solid border-gray-color-4 flex-center ${
        isChecked ? `input__radio-active` : ""
      }`}
    >
      {isChecked ? <span className="w-[12px] h-[12px] bg-gray-color-4 rounded-[50%]"></span> : null}
    </span>
  )
}
