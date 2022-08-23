import { CarpoolingIcon, OneWayIcon, TwoWayIcon } from "@/assets"
import { CompoundingType } from "@/models"
import React from "react"

interface CompoundingTypeFilterProps {
  onChange?: (params: CompoundingType) => void
}

const CompoundingTypeFilter = ({ onChange }: CompoundingTypeFilterProps) => {
  return (
    <div className="flex">
      {[
        { icon: <OneWayIcon />, label: "Một chiều", value: "one_way" },
        { icon: <TwoWayIcon />, label: "Hai chiều", value: "two_way" },
        { icon: <CarpoolingIcon />, label: "Ghép chuyến", value: "compounding" },
      ].map(({ icon, label, value }, index) => (
        <button
          onClick={() => onChange?.(value as CompoundingType)}
          className="mr-24 last:mr-0 border border-solid border-gray-color-5 rounded-[20px] bg-white-color h-[90px] w-[150px] flex flex-col items-start justify-center p-16"
          key={index}
        >
          <span className="mb-16">{icon}</span>
          <span className="text-16 font-semibold leading-26">{label}</span>
        </button>
      ))}
    </div>
  )
}

export { CompoundingTypeFilter }
