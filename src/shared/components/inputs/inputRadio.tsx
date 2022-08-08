interface InputRadioProps {
  onCheck: Function
  isChecked: boolean
  size?: number
  color?: string
}

export const InputRadio = ({
  onCheck,
  isChecked,
  size = 17,
  color = "#373737",
}: InputRadioProps) => {
  return (
    <span
      style={{ width: size, height: size, borderColor: color }}
      onClick={(e) => {
        e.stopPropagation()
        onCheck && onCheck()
      }}
      className={`rounded-[50%] border border-solid flex-center ${
        isChecked ? `input__radio-active` : ""
      }`}
    >
      {isChecked ? (
        <span style={{ backgroundColor: color }} className="w-[12px] h-[12px] rounded-[50%]"></span>
      ) : null}
    </span>
  )
}
