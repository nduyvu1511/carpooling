import { OptionModel } from "@/models"

interface SwitchProps {
  onChange?: (_: string) => void
  list: OptionModel[]
  value?: string
}

export const Switch = ({ onChange, list, value }: SwitchProps) => {
  return (
    <button className="relative border border-solid border-gray-color-2 h-[48px] lg:h-[58px] w-[240px] lg:w-[280px] rounded-[30px] flex items-stretch p-[4px]">
      <span
        className={`absolute transition-all duration-300 h-[90%] ${
          value === list[0].value ? "left-[3px] lg:left-[4px]" : "left-[117px] lg:left-[136px]"
        } top-1/2 transform -translate-y-1/2 w-[50%] bg-blue-8 rounded-[30px]`}
      ></span>
      {list.map((item) => (
        <span
          key={item.value}
          onClick={() => onChange?.(item.value + "")}
          className={`flex-1 transition-all duration-300 flex-center ${
            value === item.value ? "text-white-color" : "text-text-color"
          } z-10 text-[14px] lg:text-16 font-semibold`}
        >
          {item.label}
        </span>
      ))}
    </button>
  )
}
