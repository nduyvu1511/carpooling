import { FilterIcon } from "@/assets"
import { CarAccountType, CompoundingType } from "@/models"
import { useMemo } from "react"

interface RideTypeFilterProps {
  onChange?: (params: CompoundingType | undefined) => void
  itemActive?: CompoundingType
  carAccountType: CarAccountType
  onClickShowFilterMobile?: Function
  onClickShowFilterTablet?: Function
}

const RideTypeFilter = ({
  onChange,
  itemActive,
  carAccountType,
  onClickShowFilterMobile,
  onClickShowFilterTablet,
}: RideTypeFilterProps) => {
  const list = useMemo(() => {
    return carAccountType === "car_driver"
      ? [
          { value: "", label: "Tất cả" },
          { label: "Một chiều", value: "one_way" },
          {
            label: "Hai chiều",
            value: "two_way",
          },
          { value: "compounding", label: "Đi ghép" },
        ]
      : [
          { value: "", label: "Tất cả" },
          { label: "Tiện chuyến", value: "convenient" },
          { label: "Ghép chuyến", value: "compounding" },
        ]
  }, [carAccountType])

  return (
    <div
      className={`flex items-center justify-between mb-12 sticky xl:static top-[60px] md:top-[80px] bg-white-color z-[1000] mx-[-12px] md:mx-[-16px] lg:mx-[-24px] px-custom py-12`}
    >
      <div className="flex overflow-auto scrollbar-hide mr-16">
        <p className="text-base hidden md:block font-semibold mr-16">Danh sách chuyến:</p>

        {list.map(({ label, value }, index) => (
          <button
            onClick={() => value !== itemActive && onChange?.(value as CompoundingType)}
            // (value === "all" ? !itemActive || itemActive === "all" : itemActive === value)
            className={`flex py-6 px-8 xs:px-12 rounded-[5px] border border-solid mr-12 last:mr-0 ${
              (itemActive || "") === value ? "bg-bg-blue border-[transparent]" : "border-bg-blue"
            }`}
            key={index}
          >
            <span className="text-xs text-primary whitespace-nowrap">{label}</span>
          </button>
        ))}
      </div>

      <div className="">
        <button
          onClick={() => onClickShowFilterMobile?.()}
          className="w-[32px] h-[32px] flex-center sm:hidden bg-gray-05 rounded-[5px]"
        >
          <FilterIcon />
        </button>
        <button
          onClick={() => onClickShowFilterTablet?.()}
          className="w-[32px] h-[32px] flex-center hidden sm:flex xl:hidden"
        >
          <FilterIcon />
        </button>
      </div>
    </div>
  )
}

export { RideTypeFilter }
