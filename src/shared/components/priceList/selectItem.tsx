interface SelectItemProps {
  label: string
  className?: string
  onClick?: () => void
  active?: boolean
}

export const SelectItem = ({ label, active, className, onClick }: SelectItemProps) => {
  return (
    <span
      onClick={() => onClick?.()}
      className={`py-8 px-12 lg:py-12 lg:px-16 text-12 md:text-14 lg:text-16 capitalize border border-solid rounded-[8px] border-border-color-1 font-medium cursor-pointer select-none
        ${active ? "bg-primary text-white-color border-primary" : ""} ${className}`}
    >
      {label?.toLowerCase()}
    </span>
  )
}
