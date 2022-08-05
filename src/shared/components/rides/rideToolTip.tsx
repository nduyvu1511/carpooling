import { InfoIcon } from "@/assets"
import React from "react"

interface RideToolTipProps {
  percentage: number
  desc: string
  className?: string
}

const RideToolTip = ({ percentage, desc = "", className = "" }: RideToolTipProps) => {
  return (
    <div className={`p-8 flex bg-bg-blue items-center rounded-[5px] ${className}`}>
      <InfoIcon />
      <p className="text-xs leading-[18px] flex-1 ml-[10px] text-blue-8">
        Vui lòng đặt cọc {Math.round(percentage)}% số tiền để tiếp tục {desc ? `, ${desc}` : ""}
      </p>
    </div>
  )
}

export { RideToolTip }
