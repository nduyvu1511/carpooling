import { GenderType } from "@/models"
import { InputRadio } from "./inputRadio"

interface InputGenderProps {
  onChange: (params: GenderType) => void
  value: GenderType | undefined
}

const InputGender = ({ onChange: onChangeProps, value: valueProps }: InputGenderProps) => {
  return (
    <div className="flex items-center">
      {[
        ["Nam", "male"],
        ["Nữ", "female"],
        ["Khác", "no_info"],
      ].map(([label, value], index) => (
        <div key={value} className="flex items-center mr-24 xs:mr-40 last:mr-0">
          <span className="mr-[14px]">
            <InputRadio
              size={20}
              isChecked={valueProps === value}
              onCheck={() => onChangeProps(value as GenderType)}
            />
          </span>
          <span
            onClick={() => onChangeProps(value as GenderType)}
            className="text-sm cursor-pointer"
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

export { InputGender }
