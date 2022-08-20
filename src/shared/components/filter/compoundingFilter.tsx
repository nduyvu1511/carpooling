import {
  compoundingCustomerOrderList,
  compoundingOrderList,
  isArrayHasValue,
  isObjectHasValue,
} from "@/helper"
import { useAddress, useCompoundingForm, useCurrentLocation } from "@/hooks"
import { CarAccountType, CompoundingFilterParams, OptionModel } from "@/models"
import { useEffect, useState } from "react"
import "react-datetime/css/react-datetime.css"
import Select from "react-select"
import { InputDate } from "../inputs"

interface CompoundingFilterFormProps {
  type: CarAccountType
  onChange: (params: CompoundingFilterParams | undefined) => void
  defaultValues?: CompoundingFilterParams
  touchableDevice?: boolean
  onCloseFilter?: Function
  showInModal?: boolean
}

export const CompoundingFilter = ({
  onChange: onChangeProps,
  defaultValues,
  type,
  touchableDevice = false,
  onCloseFilter,
  showInModal = false,
}: CompoundingFilterFormProps) => {
  const { provinceOptions } = useAddress()
  const { vehicleTypeOptions, seats } = useCompoundingForm()
  const { getCurrentLocation } = useCurrentLocation()
  const [numberSeatOptions, setNumberSeatOptions] = useState<OptionModel[]>(seats(16))
  const [compoundingFormValues, setCompoundingFormValues] = useState<
    CompoundingFilterParams | undefined
  >(defaultValues)

  useEffect(() => {
    setCompoundingFormValues(defaultValues)
  }, [defaultValues])

  const handleChange = (params: CompoundingFilterParams) => {
    if (touchableDevice) return
    onChangeProps({ ...compoundingFormValues, ...params })
  }

  return (
    <div className="relative flex-1 flex-col">
      <div
        className={`compounding__filter flex-1 overflow-y-auto ${
          showInModal ? `h-[calc(100vh-120px)] md:h-[calc(100vh-170px)] p-12 lg:h-auto` : "h-full"
        }`}
      >
        <div className="items-center justify-between mb-[24px] hidden xl:flex">
          <p className="text-xl">Bộ lọc</p>
          {isObjectHasValue(defaultValues) ? (
            <span
              onClick={() => {
                onChangeProps(undefined)
                setCompoundingFormValues(undefined)
              }}
              className="text-primary text-14 leading-26 font-medium cursor-pointer"
            >
              Đặt lại
            </span>
          ) : null}
        </div>

        <div className="form-date form-date-sm mb-[10px]">
          <InputDate
            onChange={(val) => {
              setCompoundingFormValues({
                ...compoundingFormValues,
                from_expected_going_on_date: val + "",
              })
              handleChange({ from_expected_going_on_date: val + "" })
            }}
            value={compoundingFormValues?.from_expected_going_on_date || ""}
            placeholder="Ngày đi"
          />
        </div>

        <div className="form-date form-date-sm mb-[10px]">
          <InputDate
            onChange={(val) => {
              setCompoundingFormValues({
                ...compoundingFormValues,
                to_expected_going_on_date: val + "",
              })
              handleChange({ to_expected_going_on_date: val + "" })
            }}
            value={compoundingFormValues?.to_expected_going_on_date || ""}
            placeholder="Ngày về"
          />
        </div>

        <div className="form-select form-select-sm">
          <Select
            key={"from_province_id"}
            openMenuOnFocus={true}
            options={provinceOptions}
            controlShouldRenderValue
            value={
              compoundingFormValues?.from_province_id
                ? provinceOptions?.find(
                    (item) => item.value == compoundingFormValues?.from_province_id
                  )
                : null
            }
            name="from_province_id"
            onChange={(val) => {
              if (!val) return
              setCompoundingFormValues({ ...compoundingFormValues, from_province_id: +val.value })
              handleChange({ from_province_id: +val.value })
            }}
            placeholder="Đi từ"
            menuShouldScrollIntoView={false}
          />
        </div>

        <div className="form-select form-select-sm">
          <Select
            key={"to_province_id"}
            options={provinceOptions}
            value={
              compoundingFormValues?.to_province_id
                ? provinceOptions.find(
                    (item) => item.value == compoundingFormValues?.to_province_id
                  )
                : null
            }
            name="to_province_id"
            onChange={(val) => {
              if (!val) return
              handleChange({ to_province_id: +val.value })
              setCompoundingFormValues({ ...compoundingFormValues, to_province_id: +val.value })
            }}
            placeholder="Đến tại"
            menuShouldScrollIntoView={false}
          />
        </div>

        <div className="form-select form-select-sm">
          <Select
            key={"car_id"}
            options={vehicleTypeOptions}
            value={
              compoundingFormValues?.car_id
                ? vehicleTypeOptions.find((item) => item.value == compoundingFormValues.car_id)
                : null
            }
            name="car_id"
            onChange={(val) => {
              if (!val) return
              handleChange({ car_id: +val.value })
              setCompoundingFormValues({ ...compoundingFormValues, car_id: +val.value })
              setNumberSeatOptions(seats(Number(val.number_seat)))
            }}
            placeholder="Loại xe"
            menuShouldScrollIntoView={false}
          />
        </div>

        {type === "customer" ? (
          <div className="form-select form-select-sm">
            <Select
              maxMenuHeight={180}
              key={"number_seat"}
              options={numberSeatOptions}
              value={
                compoundingFormValues?.number_seat &&
                numberSeatOptions &&
                isArrayHasValue(numberSeatOptions)
                  ? numberSeatOptions.find(
                      (item) => item.value == compoundingFormValues.number_seat
                    )
                  : null
              }
              name="number_seat"
              onChange={(val) => {
                if (!val) return
                handleChange({ number_seat: +val.value })
                setCompoundingFormValues({ ...compoundingFormValues, number_seat: +val.value })
              }}
              placeholder="Số hành khách"
              menuShouldScrollIntoView={false}
            />
          </div>
        ) : null}

        <div className="form-select form-select-sm mb-[-10px]">
          <Select
            placeholder="Sắp xếp theo"
            value={
              compoundingFormValues?.order_by
                ? compoundingOrderList.find((item) => item.value === compoundingFormValues.order_by)
                : null
            }
            options={type !== "car_driver" ? compoundingOrderList : compoundingCustomerOrderList}
            onChange={(val) => {
              if (!val?.value) return
              if (val.value === "sort_by_distance") {
                getCurrentLocation({
                  params: { showLoading: true },
                  onSuccess: ({ lng, lat }) => {
                    const val = {
                      order_by: "sort_by_distance",
                      current_latitude: lat + "",
                      current_longitude: lng + "",
                    }
                    setCompoundingFormValues({
                      ...compoundingFormValues,
                      ...val,
                    } as CompoundingFilterParams)
                    handleChange(val as CompoundingFilterParams)
                  },
                })
              } else {
                if (compoundingFormValues?.current_latitude) {
                  delete compoundingFormValues.current_latitude
                  delete compoundingFormValues.current_longitude
                }
                setCompoundingFormValues({
                  ...compoundingFormValues,
                  order_by: val.value,
                })
                handleChange({ order_by: val.value })
              }
            }}
          />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 left-0 xl:hidden bg-white-color flex md:flex-col p-12">
        <button
          onClick={() => {
            onChangeProps(undefined)
            onCloseFilter?.()
          }}
          className={`btn-primary-outline py-[6px] mr-12 md:mr-0 md:mb-12 flex-1 rounded-[5px] w-full ${
            !isObjectHasValue(defaultValues) ? "btn-disabled" : ""
          }`}
        >
          Xóa bộ lọc
        </button>
        <button
          onClick={() => {
            isObjectHasValue(compoundingFormValues) && onChangeProps(compoundingFormValues)
            onCloseFilter?.()
          }}
          className={`btn-primary py-[6px] flex-1 rounded-[5px] w-full ${
            !isObjectHasValue(compoundingFormValues) ? "btn-disabled" : ""
          }`}
        >
          Áp dụng
        </button>
      </div>
    </div>
  )
}
