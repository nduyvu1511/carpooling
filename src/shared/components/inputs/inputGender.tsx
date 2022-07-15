import { GenderType } from "@/models"
import { InputCheckbox } from "./inputCheckbox"

interface InputGenderProps {
  onChange: (params: GenderType) => void
  value: GenderType | undefined
  isError?: undefined | boolean
}

const InputGender = ({ onChange: onChangeProps, value, isError = false }: InputGenderProps) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center mr-[40px]">
        <span className="mr-[14px]">
          <InputCheckbox
            size={20}
            type="circle"
            isChecked={value === "male"}
            onCheck={() => onChangeProps("male")}
          />
        </span>
        <span onClick={() => onChangeProps("male")} className="text-sm cursor-pointer">
          Nam
        </span>
      </div>
      <div className="flex items-center">
        <span className="mr-[14px]">
          <InputCheckbox
            type="circle"
            size={20}
            isChecked={value === "female"}
            onCheck={() => onChangeProps("female")}
          />
        </span>

        <span onClick={() => onChangeProps("female")} className="text-sm cursor-pointer">
          Nữ
        </span>
      </div>
    </div>
  )
}

export { InputGender }
