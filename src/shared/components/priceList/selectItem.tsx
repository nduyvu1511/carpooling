interface SelectItemProps {
  label: string
  className?: string
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}

export const SelectItem = ({ label, disabled, active, className, onClick }: SelectItemProps) => {
  return (
    <span
      onClick={() => !disabled && !active && onClick?.()}
      className={`py-8 px-12 lg:py-12 lg:px-16 text-12 md:text-14 lg:text-16 capitalize border border-solid rounded-[8px] border-border-color-1 font-medium cursor-pointer select-none
        ${active ? "bg-primary text-white-color border-primary" : ""} ${
        disabled ? "pointer-events-none opacity-50 cursor-default" : ""
      } ${className}`}
    >
      {label?.toLowerCase()}
    </span>
  )
}
