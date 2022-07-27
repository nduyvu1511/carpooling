import { COMPOUNDING_TYPE_BG, COMPOUNDING_TYPE_COLOR, COMPOUNDING_TYPE_NAME } from "@/helper"
import { CompoundingType } from "@/models"
import { CompoundingCarICon } from "../utilities"

interface CompoundingFilterItemProps {
  compounding_type: CompoundingType
  isActive?: boolean
  onChange?: Function
}

export const CompoundingFilterItem = ({
  compounding_type,
  isActive,
  onChange,
}: CompoundingFilterItemProps) => {
  return (
    <button
      onClick={() => onChange?.()}
      style={{
        color: COMPOUNDING_TYPE_COLOR[compounding_type],
        border: `1px solid ${isActive ? "transparent" : COMPOUNDING_TYPE_COLOR[compounding_type]}`,
        backgroundColor: `${!isActive ? "transparent" : COMPOUNDING_TYPE_BG[compounding_type]}`,
      }}
      className={`px-[12px] py-[8px] text-[12px] leading-[18px] font-medium rounded-[5px] w-fit h-fit flex items-center whitespace-nowrap`}
    >
      <span className="mr-[10px]">
        <CompoundingCarICon compounding_type={compounding_type} />
      </span>
      {COMPOUNDING_TYPE_NAME[compounding_type]}
    </button>
  )
}
