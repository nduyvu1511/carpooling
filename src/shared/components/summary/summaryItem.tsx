import React from "react"

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
    <li className={`flex items-center justify-between mb-12 ${className}`}>
      <span className={`mr-[12px] text-xs ${labelClassName}`}>{label}</span>
      <span
        className={`text-sm md:text-base whitespace-nowrap flex-1 text-right ${valueClassName}`}
      >
        {value}
      </span>
    </li>
  )
}
