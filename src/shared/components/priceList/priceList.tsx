import { priceListBg } from "@/assets"
import { RootState } from "@/core/store"
import { formatMoneyVND } from "@/helper"
import { CompoundingType } from "@/models"
import { useSelector } from "react-redux"
import { Spinner } from "../loading"
import { DriverPriceList } from "./driverPriceList"
import { InputDate } from "./inputDate"
import { InputLocation } from "./inputLocation"
import { SelectItem } from "./selectItem"
import { usePriceList } from "./usePriceList"

export const PriceList = () => {
  const isLoaded = useSelector((state: RootState) => state.common.isLoadedGoogleMap)
  const vehicleTypeOptions = useSelector(
    (state: RootState) => state.compoundingCarData.vehicleTypes
  )
  const {
    compoundingType,
    fromDate,
    toDate,
    carType,
    result,
    numberOfDays,
    isLoading,
    distance,
    fromLocation,
    toLocation,
    fuelPriceUnit,
    handleSetCompoundingType,
    handleSelectVehicle,
    handleSetFromLocation,
    handleSetToLocation,
    handleSetFromDate,
    handleSetToDate,
    service_fee_percent,
    person_income_tax,
  } = usePriceList()

  return (
    <div className="price-list">
      <div
        style={{
          backgroundImage: `url(${priceListBg})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
        className={`price-list-wrapper mt-[64px] md:mt-[80px] lg:mt-[120px] relative`}
      >
        <div className="price-container py-16 md:py-24 lg:py-48 z-10">
          <h1 className="h1 text-primary text-center mb-16 sm:mb-[32px] md:mb-[40px] lg:mb-[80px]">
            Báo giá nhanh cùng Exxe !
          </h1>

          <div className="">
            <h3 className="text-16 md:text-18 lg:text-24 font-medium text-center mb-16 lg:mb-32">
              Dành cho hành khách
            </h3>
            <div className="p-12 xs:p-16 md:p-24 lg:p-[40px] xl:p-[64px] shadow-shadow-4 rounded-[16px] bg-white-color">
              <div className="">
                <div className="flex flex-col md:flex-row md:items-center mb-12 md:mb-16 lg:mb-24">
                  <p className="text-12 md:text-14 lg:text-16 mb-8 md:mb-0 font-medium text-gray-color-8 w-[200px]">
                    Điểm đi:
                  </p>

                  {isLoaded ? (
                    <InputLocation
                      placeholder="Tìm kiếm điểm đi"
                      onSelect={handleSetFromLocation}
                    />
                  ) : (
                    <Spinner />
                  )}
                </div>

                <div className="flex flex-col md:flex-row md:items-center mb-12 md:mb-16 lg:mb-24">
                  <p className="text-12 md:text-14 lg:text-16 mb-8 md:mb-0 font-medium text-gray-color-8 w-[200px]">
                    Điểm đến:
                  </p>

                  {isLoaded ? (
                    <InputLocation placeholder="Tìm kiếm điểm đến" onSelect={handleSetToLocation} />
                  ) : (
                    <Spinner />
                  )}
                </div>

                {distance ? (
                  <div className="flex items-center mb-12 md:mb-16 lg:mb-24">
                    <p className="text-12 md:text-14 lg:text-16 font-medium text-gray-color-8 mr-24 md:mr-0 md:w-[200px]">
                      Lộ trình:
                    </p>

                    <div className="flex items-center flex-1 flex-wrap">
                      <p className="text-20 font-semibold text-primary">{distance}KM</p>
                    </div>
                  </div>
                ) : null}

                <div className="flex flex-col md:flex-row md:items-center mb-12 md:mb-16 lg:mb-24">
                  <p className="text-12 md:text-14 lg:text-16 mb-8 md:mb-0 font-medium text-gray-color-8 w-[200px]">
                    Chọn loại hình:
                  </p>

                  <div className="flex items-center flex-1 flex-wrap">
                    {[
                      ["one_way", "Một Chiều"],
                      ["two_way", "Hai Chiều"],
                      ["convenient", "Tiện chuyến"],
                    ].map(([value, label]) => (
                      <SelectItem
                        key={value}
                        onClick={() => handleSetCompoundingType(value as CompoundingType)}
                        className="mr-12 md:mr-16 lg:mr-24 mb-12 xs:mb-0"
                        active={value === compoundingType}
                        label={label}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center mb-12 md:mb-16 lg:mb-24">
                  <p className="text-12 md:text-14 lg:text-16 mb-8 md:mb-0 font-medium text-gray-color-8 w-[200px]">
                    Chọn loại xe:
                  </p>

                  <div className="flex items-center flex-1 flex-wrap">
                    {vehicleTypeOptions.map((item) => (
                      <SelectItem
                        onClick={() => handleSelectVehicle(item)}
                        key={item.value}
                        className="mr-12 md:mr-16 lg:mr-24"
                        active={carType?.value === item.value}
                        label={item.label}
                      />
                    ))}
                  </div>
                </div>

                <div
                  className={`${
                    compoundingType === "two_way"
                      ? "grid gap-x-32 lg:gap-x-[64px] gap-y-12 md:grid-cols-2"
                      : ""
                  }`}
                >
                  <div
                    className={`${
                      compoundingType === "two_way"
                        ? "flex-col"
                        : "flex flex-col md:flex-row md:items-center mb-12 md:mb-16 lg:mb-24 "
                    }`}
                  >
                    <p
                      className={`text-12 md:text-14 lg:text-16 font-medium text-gray-color-8 ${
                        compoundingType === "two_way" ? "mb-8" : "w-[200px] mb-8 md:mb-0"
                      }`}
                    >
                      Ngày đi:
                    </p>

                    <div className={compoundingType !== "two_way" ? "flex-1" : ""}>
                      <InputDate
                        placeholder="Chọn ngày đi"
                        value={fromDate}
                        onChange={handleSetFromDate}
                      />
                    </div>
                  </div>

                  {compoundingType === "two_way" ? (
                    <div
                      className={`${
                        compoundingType === "two_way"
                          ? "flex-col"
                          : "flex flex-row items-center mb-12 md:mb-16 lg:mb-24 "
                      }`}
                    >
                      <p
                        className={`text-12 md:text-14 lg:text-16 font-medium text-gray-color-8 ${
                          compoundingType === "two_way" ? "mb-8" : "w-[200px] mb-8 md:mb-0"
                        }`}
                      >
                        Ngày về:
                      </p>

                      <InputDate
                        numberOfDays={numberOfDays}
                        currentDay={fromDate}
                        placeholder="Chọn ngày về"
                        value={toDate}
                        onChange={handleSetToDate}
                      />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="my-16 lg:my-32 border-t border-t-solid border-t-border-color-1"></div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-12 md:mb-0">
                  <p className="text-12 md:text-14 lg:text-16 mb-4 md:mb-0 font-medium">
                    Tổng cước phí:
                  </p>
                  <p className="text-12 md:text-14 font-normal text-gray-color-7">
                    (Chưa bao gồm phí cầu đường, bến bãi...)
                  </p>
                </div>

                <div className="">
                  {isLoading ? (
                    <div className="py-12">
                      <p className="text-sm">Đang tính giá...</p>
                    </div>
                  ) : result ? (
                    <>
                      <p className="text-20 md:text-24 lg:text-[30px] text-primary font-semibold">
                        {formatMoneyVND(result, "VNĐ")}
                      </p>
                      <p className="text-12 md:text-14 font-normal text-gray-color-7">
                        (Đã bao gồm 10% phí VAT)
                      </p>
                    </>
                  ) : (
                    <p className="text-12 md:text-14 font-normal text-info">
                      Vui lòng nhập đủ trường để hệ thống tính giá cho bạn
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {result &&
      carType &&
      distance &&
      fromDate &&
      fromLocation &&
      toLocation &&
      fuelPriceUnit &&
      (compoundingType || (compoundingType === "two_way" && toDate)) ? (
        <DriverPriceList
          fuelPriceUnit={fuelPriceUnit}
          compoundingType={compoundingType}
          carType={carType.label}
          distance={distance}
          fromDate={fromDate}
          fromLocation={fromLocation.location}
          toLocation={toLocation?.location}
          toDate={toDate}
          total={result}
          person_income_tax={person_income_tax}
          service_fee_percent={service_fee_percent}
        />
      ) : null}

      <div className="price-container">
        <p className="text-10 md:text-12 font-normal text-gray-color-7">
          (*) Báo giá trên chỉ mang tính chất tương đối
        </p>
      </div>
    </div>
  )
}
