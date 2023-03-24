import { LocationIcon6, LocationIcon7 } from "@/assets"
import {
  COMPOUNDING_TYPE_BG,
  COMPOUNDING_TYPE_COLOR,
  COMPOUNDING_TYPE_NAME,
  formatMoneyVND,
} from "@/helper"
import { CompoundingType } from "@/models"
import { useState } from "react"
import { InputRadio } from "../inputs"
import { FuelPriceUnit } from "./usePriceList"

interface DriverPriceListProps {
  compoundingType: CompoundingType
  fromLocation: string
  toLocation: string
  distance: number
  fromDate: string
  toDate: string | undefined
  carType: string
  tripCost: number
  fuelPriceUnit: FuelPriceUnit
  service_fee_percent?: number | undefined
  person_income_tax?: number | undefined
  vat_fee_percent?: number
}

export const DriverPriceList = ({
  fromLocation,
  toLocation,
  distance,
  fromDate,
  toDate,
  fuelPriceUnit,
  carType,
  tripCost,
  service_fee_percent = 0,
  person_income_tax = 0,
  vat_fee_percent = 0.1,
  compoundingType,
}: DriverPriceListProps) => {
  const [fuelType, setfuelType] = useState<"gas" | "petro">("gas")

  const vatAmount = (tripCost / 1.1) * vat_fee_percent
  const amountAfterSubtractVat = tripCost - vatAmount
  const serviceFeeAmount = amountAfterSubtractVat * service_fee_percent
  const amountActuallyReceive = amountAfterSubtractVat - serviceFeeAmount
  const personIncomeTaxAmount = amountActuallyReceive * person_income_tax
  let fuelCost =
    distance *
    fuelPriceUnit.gasoline_consumption_per_km *
    (fuelType === "gas" ? fuelPriceUnit.gasoline_price_unit : fuelPriceUnit.petroleum_price_unit)
  if (compoundingType === "two_way") {
    fuelCost *= 2
  }
  const incomeAmount = amountActuallyReceive - fuelCost

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
              <p className="text-12 sm:text-14 lg:text-16 font-medium">{fromLocation}</p>
            </div>
          </div>

          <div className="hidden sm:block w-32"></div>

          <div className="flex items-start flex-1 sm:justify-end">
            <span className="mr-16">
              <LocationIcon7 />
            </span>
            <div className="">
              <p className="text-12 sm:text-14 lg:text-16 font-medium">{toLocation}</p>
            </div>
          </div>
        </div>

        <div className="border-2 border-dashed border-border-color-1 my-12 md:my-16"></div>

        <div className="mb-16 md:mb-24 lg:mb-32">
          <p className="text-center">
            <span className="text-12 md:text-14 lg:text-16 font-medium text-gray-color-7">
              Lộ trình:{"  "}
            </span>
            <span className="text-14 md:text-16 lg:text-20 font-semibold text-primary">
              {distance.toFixed(2)}km
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-12 lg:gap-y-16 mb-32">
          <p className="uppercase text-16 font-semibold text-primary mb-16">THÔNG TIN CHUYẾN ĐI</p>

          <Item
            label="Loại chuyến"
            value={
              <span
                style={{
                  color: COMPOUNDING_TYPE_COLOR?.[compoundingType],
                  backgroundColor: COMPOUNDING_TYPE_BG?.[compoundingType],
                }}
                className="py-8 px-16 shadow-shadow-1 rounded-[8px] text-12"
              >
                {COMPOUNDING_TYPE_NAME?.[compoundingType]}
              </span>
            }
          />
          <Item label="Điểm đón" value={fromLocation} />
          <Item label="Điểm đến" value={toLocation} />
          <Item label="Ngày đi" value={fromDate} />
          {toDate ? <Item label="Ngày về" value={toDate} /> : null}
          <Item
            label="Nhiên liệu"
            value={
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
            }
          />
          <Item label="Loại xe" value={carType} />
        </div>

        <div className="grid grid-cols-1 gap-y-12 lg:gap-y-16">
          <p className="text-16 font-semibold text-primary uppercase">GIÁ CƯỚC CHUYẾN ĐI</p>
          <Item label=" Tổng chi phí tuyến đi" value={formatMoneyVND(tripCost)} />
          <Item
            label={`Thuế VAT của khách hàng (${vat_fee_percent * 100}%)`}
            value={formatMoneyVND(vatAmount)}
          />

          <div className="border-t-gray-color-2 border-solid border-t"></div>

          <Item label="Số tiền (sau khi trừ VAT)" value={formatMoneyVND(amountAfterSubtractVat)} />
          <Item
            label={`Phí sử dụng dịch vụ ExxeVn (${service_fee_percent * 100}%)`}
            value={`-${formatMoneyVND(serviceFeeAmount)}`}
          />

          <div className="border-t-gray-color-2 border-solid border-t"></div>

          <Item label="Thực nhận sau chuyến đi" value={formatMoneyVND(amountActuallyReceive)} />
          <Item
            label={`Thuế thu nhập cá nhân (${person_income_tax * 100}%):`}
            value={"-" + formatMoneyVND(personIncomeTaxAmount)}
          />
          <Item label="Chi phí nhiên liệu" value={"-" + formatMoneyVND(fuelCost)} />

          <div className="border-t-gray-color-2 border-solid border-t"></div>

          <div className="flex items-center justify-between">
            <p className="text-12 md:text-14 lg:text-16 font-medium text-gray-color-7">
              Tổng thực nhận:
            </p>

            <p className="text-20 md:text-24 lg:text-[30px] text-primary font-semibold">
              {formatMoneyVND(incomeAmount, "VNĐ")}
            </p>
            {/* <p className="text-10 md:text-12 lg:text-14 font-normal text-gray-color-7 text-right">
                (Đã bao gồm {vat_fee_percent * 100}% thuế VAT)
              </p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

const Item = ({ label, value }: { label: string; value: string | JSX.Element }) => {
  return (
    <div className="flex items-start justify-between">
      <p className="text-12 md:text-14 lg:text-16 font-medium text-gray-color-7">{label}</p>

      {(value as string)?.[0] ? (
        <p className="flex-1 ml-12 font-medium text-14 md:text-16 lg:text-20 text-right">{value}</p>
      ) : (
        value || null
      )}
    </div>
  )
}
