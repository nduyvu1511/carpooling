import { formatMoneyVND, getHoursName } from "@/helper"
import React from "react"

interface LocationInfoFieldProps {
  className?: string
  distance?: number
  duration?: number
  price?: number
}

export const LocationInfoField = ({
  className = "",
  distance,
  duration,
  price,
}: LocationInfoFieldProps) => {
  return (
    <div
      className={`mt-[4px] text-xs leading-[22px] font-normal flex items-center flex-wrap ${className}`}
    >
      {distance ? <p className="mr-[12px]">Quãng đường: {distance.toFixed()}km</p> : null}
      {duration ? <p className="mr-[12px]">Thời gian: {getHoursName(duration)}</p> : null}
      {price ? <p className="">Giá: {formatMoneyVND(price.toFixed(2))}</p> : null}
    </div>
  )
}
