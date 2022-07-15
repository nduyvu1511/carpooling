import React from "react"

interface BadgeProps {
  count: number
  className?: string
}

const Badge = ({ count, className = "" }: BadgeProps) => {
  return (
    <span
      className={`absolute right-0 top-0 w-[14px] h-[14px] rounded-[50%] text-[8px] font-normal flex-center bg-error text-white-color ${className}`}
    >
      {count > 9 ? `9+` : count}
    </span>
  )
}

export { Badge }
