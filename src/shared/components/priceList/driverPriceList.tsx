import { LocationIcon6, LocationIcon7 } from "@/assets"
import { COMPOUNDING_TYPE_NAME, formatMoneyVND } from "@/helper"
import { CompoundingType } from "@/models"
import { useMemo, useState } from "react"
import { InputRadio } from "../inputs"
import { FuelPriceUnit } from "./usePriceList"

interface DriverPriceListProps {
  compoundingType: CompoundingType
  fromLocation: string
  toLocation?: string
  distance: number
  fromDate: string
  toDate: string | undefined
  carType: string
  total: number
  fuelPriceUnit: FuelPriceUnit
  service_fee_percent?: number | undefined
  person_income_tax?: number | undefined
}

export const DriverPriceList = ({
  fromLocation,
  toLocation,
  distance,
  fromDate,
  toDate,
  fuelPriceUnit,
  carType,
  total,
  service_fee_percent = 0,
  person_income_tax = 0,
  compoundingType,
}: DriverPriceListProps) => {
  console.log({ service_fee_percent, person_income_tax })
  const [fuelType, setfuelType] = useState<"gas" | "petro">("gas")

  const fuelCost = useMemo(() => {
    return fuelType === "gas"
      ? distance * fuelPriceUnit.gasoline_consumption_per_km * fuelPriceUnit.gasoline_price_unit
      : distance * fuelPriceUnit.petroleum_consumption_per_km * fuelPriceUnit.petroleum_price_unit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fuelPriceUnit, fuelType])
  const serviceFeeAmount = total * (1 - service_fee_percent)
  const personIncomeTaxAmount = serviceFeeAmount * person_income_tax
  const totalAmount = total - (fuelCost + serviceFeeAmount + personIncomeTaxAmount)

  return (
    <div className="price-container py-16 md:py-24 lg:py-48">
      <p className="text-16 md:text-18 lg:text-24 font-medium text-center mb-16 lg:mb-32">
        Dành cho tài xế
      </p>

      <div className="bg-price-unit-section p-12 xs:p-16 md:p-24 lg:p-[40px] xl:p-[64px] shadow-shadow-4 rounded-[16px]">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start flex-1 mb-12 sm:mb-0">
            <span className="mr-16">
              <LocationIcon6 />
            </span>
            <div className="">
              {/* <p className="text-14 md:text-16 lg:text-20 font-semibold">TPHCM</p> */}
              <p className="text-12 sm:text-14 lg:text-16 font-medium text-gray-color-7">
                {fromLocation}
              </p>
            </div>
          </div>

          <div className="hidden sm:block w-32"></div>

          <div className="flex items-start flex-1 justify-end">
            <span className="mr-16">
              <LocationIcon7 />
            </span>
            <div className="">
              {/* <p className="text-14 md:text-16 lg:text-20 font-semibold">TPHCM</p> */}
              <p className="text-12 sm:text-14 lg:text-16 font-medium text-gray-color-7">
                {toLocation}
              </p>
            </div>
          </div>
        </div>

        <div className="border-2 border-dashed border-border-color-1 my-12 md:my-16"></div>

        <div className="mb-16 md:mb-24 lg:mb-32">
          <p className="text-center">
            <span className="text-12 md:text-14 lg:text-16 font-medium text-gray-color-7">
              Lộ trình:{" "}
            </span>
            <span className="text-14 md:text-16 lg:text-20 font-semibold">
              {distance.toFixed(2)}km
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12 lg:gap-y-16 sm:gap-x-40 md:gap-x-[64px] lg:gap-x-[120px]">
          <div className="flex items-center justify-between">
            <p className="text-12 md:text-14 lg:text-16 font-medium text-gray-color-7">Ngày đi</p>
            <p className="font-medium text-14 md:text-16 lg:text-20">{fromDate}</p>
          </div>

          {toDate ? (
            <div className="flex items-center justify-between">
              <p className="text-12 md:text-14 lg:text-16 font-medium text-gray-color-7">
                Ngày đến
              </p>
              <p className="font-medium text-14 md:text-16 lg:text-20">{toDate}</p>
            </div>
          ) : null}

          <div className="flex items-center justify-between">
            <p className="text-12 md:text-14 lg:text-16 font-medium text-gray-color-7">
              Nhiên liệu
            </p>
            <div className="flex items-center">
              <div onClick={() => setfuelType("gas")} className="flex items-center mr-16">
                <InputRadio
                  size={24}
                  color={"#5D44FF"}
                  isChecked={fuelType === "gas"}
                  onCheck={() => setfuelType("gas")}
                />
                <span className="cursor-default text-12 md:text-14 lg:text-16 font-medium ml-8">
                  Xăng
                </span>
              </div>

              <div onClick={() => setfuelType("petro")} className="flex items-center">
                <InputRadio
                  size={24}
                  color={"#5D44FF"}
                  isChecked={fuelType === "petro"}
                  onCheck={() => setfuelType("petro")}
                />
                <span className="cursor-default text-12 md:text-14 lg:text-16 font-medium ml-8">
                  Dầu
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-12 md:text-14 lg:text-16 font-medium text-gray-color-7">
              Loại chuyến
            </p>
            <p className="font-medium text-14 md:text-16 lg:text-20">
              {COMPOUNDING_TYPE_NAME[compoundingType]}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-12 md:text-14 lg:text-16 font-medium text-gray-color-7">Loại xe</p>
            <p className="font-medium text-14 md:text-16 lg:text-20">{carType}</p>
          </div>
        </div>

        <div className="my-16 md:my-24 lg:my-32 border-t-gray-color-2 border-solid border-t"></div>

        <div className="">
          <div className="flex items-center justify-between mb-8 md:mb-12 lg:mb-16">
            <p className="text-12 md:text-14 lg:text-16 font-medium text-gray-color-7">
              Tổng chi phí chuyến xe:
            </p>

            <p className="text-14 md:text-16 lg:text-20 font-medium">{formatMoneyVND(total)}</p>
          </div>

          <div className="flex items-center justify-between mb-8 md:mb-12 lg:mb-16">
            <p className="text-12 md:text-14 lg:text-16 font-medium text-gray-color-7">
              Chi phí nhiên liệu:
            </p>

            <p className="text-14 md:text-16 lg:text-20 font-medium">-{formatMoneyVND(fuelCost)}</p>
          </div>

          <div className="flex items-center justify-between mb-8 md:mb-12 lg:mb-16">
            <p className="text-12 md:text-14 lg:text-16 font-medium text-gray-color-7">
              Thuế thu nhập cá nhân 10%:
            </p>

            <p className="text-14 md:text-16 lg:text-20 font-medium">
              -{formatMoneyVND(personIncomeTaxAmount)}
            </p>
          </div>

          <div className="flex items-center justify-between mb-8 md:mb-12 lg:mb-16">
            <p className="text-12 md:text-14 lg:text-16 font-medium text-gray-color-7">
              Phí dịch vụ ({service_fee_percent * 100})
            </p>

            <p className="text-14 md:text-16 lg:text-20 font-medium">
              -{formatMoneyVND(serviceFeeAmount)}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-12 md:text-14 lg:text-16 font-medium text-gray-color-7">
              Tổng thực nhận:
            </p>

            <div className="">
              <p className="text-20 md:text-24 lg:text-[30px] text-primary font-semibold">
                {formatMoneyVND(totalAmount, "VNĐ")}
              </p>
              <p className="text-10 md:text-12 lg:text-14 font-normal text-gray-color-7 text-right">
                (Chưa bao gồm phí)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
