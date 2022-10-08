import React from "react"

interface CountProps {
  size?: number
  count: number
  className?: string
}

export const Count = ({ count, size = 12, className = "" }: CountProps) => {
  return (
    <span
      className={`bg-orange-50 rounded-[50%] text-[8px] flex-center text-white-color font-medium ${className}`}
      style={{ width: size, height: size }}
    >
      {count}
    </span>
  )
}
