import React, { useState } from "react"

interface SwitchProps {
  type: "customer" | "driver"
  onChange?: (_: "customer" | "driver") => void
}

export const Switch = ({ type, onChange }: SwitchProps) => {
  return (
    <button className="relative border border-solid border-gray-color-2 h-[58px] w-[280px] rounded-[30px] flex items-stretch p-[4px]">
      <span
        className={`absolute transition-all duration-300 h-[90%] ${
          type === "customer" ? "left-[4px]" : "left-[136px]"
        } top-1/2 transform -translate-y-1/2 w-[50%] bg-gray-color-4 rounded-[30px]`}
      ></span>
      <span
        onClick={() => onChange?.("customer")}
        className={`flex-1 transition-all duration-300 flex-center ${
          type === "customer" ? "text-white-color" : "text-text-color"
        } z-10 text-[16px] font-semibold`}
      >
        Khách hàng
      </span>
      <span
        onClick={() => onChange?.("driver")}
        className={`flex-1 z-10 text-[16px] flex-center transition-all duration-300 font-semibold ${
          type === "driver" ? "text-white-color" : "text-text-color"
        }`}
      >
        Tài xế
      </span>
    </button>
  )
}
