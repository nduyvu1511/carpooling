import { CarpoolingIcon, ConvenientIcon, OneWayIcon, TwoWayIcon } from "@/assets"
import { CompoundingType } from "@/models"

const CompoundingCarICon = ({ compounding_type }: { compounding_type: CompoundingType }) => {
  return (
    <>
      {compounding_type === "one_way" ? (
        <OneWayIcon className="w-[16px] h-[16px] lg:h-24 lg:w-24" />
      ) : compounding_type === "two_way" ? (
        <TwoWayIcon className="w-[16px] h-[16px] lg:h-24 lg:w-24" />
      ) : compounding_type === "convenient" ? (
        <ConvenientIcon className="w-[16px] h-[16px] lg:h-24 lg:w-24" />
      ) : (
        <CarpoolingIcon className="w-[16px] h-[16px] lg:h-24 lg:w-24" />
      )}
    </>
  )
}

export { CompoundingCarICon }
