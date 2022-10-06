import { CarpoolingIcon, ConvenientIcon, OneWayIcon, TwoWayIcon } from "@/assets"
import { CompoundingType } from "@/models"

const CompoundingCarICon = ({
  compounding_type,
  className = "",
}: {
  compounding_type: CompoundingType
  className?: string
}) => {
  return (
    <>
      {compounding_type === "one_way" ? (
        <OneWayIcon
          className={`w-16 h-16 md:h-[20px] md:w-[20px] lg:h-[26px] lg:w-[26px] ${className}`}
        />
      ) : compounding_type === "two_way" ? (
        <TwoWayIcon
          className={`w-16 h-16 md:h-[20px] md:w-[20px] lg:h-[26px] lg:w-[26px] ${className}`}
        />
      ) : compounding_type === "convenient" ? (
        <ConvenientIcon
          className={`w-16 h-16 md:h-[20px] md:w-[20px] lg:h-[26px] lg:w-[26px] ${className}`}
        />
      ) : (
        <CarpoolingIcon
          className={`w-16 h-16 md:h-[20px] md:w-[20px] lg:h-[26px] lg:w-[26px] ${className}`}
        />
      )}
    </>
  )
}

export { CompoundingCarICon }
