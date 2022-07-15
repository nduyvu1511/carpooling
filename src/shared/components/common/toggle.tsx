interface ToggleProps {
  status: boolean
  onChange: Function
}

export const Toggle = ({ onChange, status }: ToggleProps) => {
  return (
    <button
      onClick={() => {
        onChange()
      }}
      className={`w-[40px] relative rounded-[25px] h-[22px] transition-all duration-200 ${
        status
          ? "bg-[#0078d2] border-none"
          : "bg-white-color border-[3px] border-solid border-border-color-3"
      }`}
    >
      <span
        className={`absolute-vertical h-[14px] transition-all duration-200 w-[14px] rounded-[50%] ${
          !status ? "left-[2px] bg-border-color-3 " : "left-[23px] bg-white-color"
        }`}
      ></span>
    </button>
  )
}

export default Toggle
