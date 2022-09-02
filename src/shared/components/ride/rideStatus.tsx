import React, { ReactNode } from "react"

interface RideStatusProps {
  label: string
  backgroundColor: string
  number: number
  icon: ReactNode
  className?: string
}

export const RideStatus = ({ backgroundColor, icon, label, number }: RideStatusProps) => {
  return (
    <div key={backgroundColor as string} className="flex items-center mr-12 mb-12 last:mr-0">
      <span
        className="flex-center w-[18px] sm:w-[24px] h-[18px] sm:h-[24px] mr-[6px] rounded-[50%]"
        style={{ backgroundColor: backgroundColor + "" }}
      >
        {icon}
      </span>
      <p className="whitespace-nowrap">
        <span className="text-[10px]">{label}:</span>{" "}
        <span className="text-12 font-medium">{number}</span>
      </p>
    </div>
  )
}
