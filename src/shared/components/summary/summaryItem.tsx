interface SummaryItemProps {
  label: string
  value: string | number
  className?: string
  labelClassName?: string
  valueClassName?: string
}

export const SummaryItem = ({
  label,
  value,
  className = "",
  labelClassName = "",
  valueClassName = "",
}: SummaryItemProps) => {
  return (
    <div className={`flex items-start justify-between mb-12 ${className}`}>
      <span
        className={`mr-16 ${
          labelClassName || "leading-[20px] text-12 font-medium text-gray-color-7"
        }`}
      >
        {label}
      </span>
      <span className={`flex-1 text-right ${valueClassName || "text-14 md:text-16 font-medium"}`}>
        {value}
      </span>
    </div>
  )
}
