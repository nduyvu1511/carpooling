import { compoundingOrderList, isObjectHasValue } from "@/helper"
import { useAddress, useCompoundingForm, useCurrentLocation } from "@/hooks"
import { CarIdType, CompoundingFilterParams, OptionModel } from "@/models"
import { useState } from "react"
import "react-datetime/css/react-datetime.css"
import Select from "react-select"
import { InputDate, ItemSelect } from "../inputs"

interface CompoundingFilterFormProps {
  type: "driver" | "customer"
  onChange: (params: CompoundingFilterParams | undefined) => void
  defaultValues?: CompoundingFilterParams
  touchableDevice?: boolean
  onCloseFilter?: Function
}

export const CompoundingFilter = ({
  onChange: onChangeProps,
  defaultValues,
  type,
  touchableDevice = false,
  onCloseFilter,
}: CompoundingFilterFormProps) => {
  const { provinceOptions } = useAddress()
  const { vehicleTypeOptions, seats } = useCompoundingForm()
  const { getCurrentLocation } = useCurrentLocation({ showLoading: true })
  const [numberSeatOptions, setNumberSeatOptions] = useState<OptionModel[]>([])
  const [compoundingFormValues, setCompoundingFormValues] = useState<
    CompoundingFilterParams | undefined
  >(defaultValues)
  const [fromProvinceValue, setFromProvinceValue] = useState<OptionModel | undefined>(() =>
    provinceOptions.find((item) => item.value == compoundingFormValues?.from_province_id)
  )

  const handleChange = (params: CompoundingFilterParams) => {
    !touchableDevice && onChangeProps({ ...compoundingFormValues, ...params })
  }

  return (
    <div className="relative flex-1 flex-col">
      <div className="compounding__filter flex-1 overflow-y-auto h-full pb-[80px]">
        <div className="items-center justify-between mb-[24px] hidden xl:flex">
          <p className="text-xl">Bộ lọc</p>
          {!isObjectHasValue(defaultValues) ? (
            <span
              onClick={() => {
                onChangeProps(undefined)
                setCompoundingFormValues(undefined)
                setFromProvinceValue(undefined)
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
            defaultValue={compoundingFormValues?.from_expected_going_on_date}
            inputProps={{ placeholder: "Ngày đi" }}
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
            defaultValue={compoundingFormValues?.to_expected_going_on_date}
            inputProps={{ placeholder: "Ngày về" }}
          />
        </div>

        <div className="form-select form-select-sm">
          <Select
            openMenuOnFocus={true}
            options={provinceOptions}
            controlShouldRenderValue
            value={fromProvinceValue}
            name="from_province_id"
            onChange={(val) => {
              if (!val) return
              setCompoundingFormValues({ ...compoundingFormValues, from_province_id: +val.value })
              handleChange({ from_province_id: +val.value })
              setFromProvinceValue(val)
            }}
            placeholder="Đi từ"
          />
        </div>

        <div className="form-select form-select-sm">
          <Select
            options={provinceOptions}
            value={
              compoundingFormValues?.to_province_id
                ? provinceOptions.find(
                    (item) => item.value == compoundingFormValues?.to_province_id
                  )
                : undefined
            }
            name="to_province_id"
            onChange={(val) => {
              if (!val) return
              handleChange({ to_province_id: +val.value })
              setCompoundingFormValues({ ...compoundingFormValues, to_province_id: +val.value })
            }}
            placeholder="Đến tại"
          />
        </div>

        <div className="form-select form-select-sm">
          <Select
            options={vehicleTypeOptions}
            value={
              compoundingFormValues?.car_id
                ? provinceOptions.find((item) => item.value == compoundingFormValues?.car_id)
                : undefined
            }
            name="car_id"
            onChange={(val) => {
              if (!val) return
              setNumberSeatOptions(seats(Number((val as CarIdType)?.number_seat) || 0))
              handleChange({ car_id: +val.value })
              setCompoundingFormValues({ ...compoundingFormValues, car_id: +val.value })
            }}
            placeholder="Loại xe"
          />
        </div>

        {type === "customer" ? (
          <div className="form-select form-select-sm">
            <Select
              options={numberSeatOptions}
              value={
                compoundingFormValues?.number_seat
                  ? provinceOptions.find((item) => item.value == compoundingFormValues?.number_seat)
                  : undefined
              }
              name="number_seat"
              onChange={(val) => {
                if (!val) return
                handleChange({ number_seat: +val.value })
                setCompoundingFormValues({ ...compoundingFormValues, number_seat: +val.value })
              }}
              placeholder="Số hành khách"
            />
          </div>
        ) : null}

        <div className="mt-24">
          <label htmlFor="" className="form-label mb-24">
            Sắp xếp theo:
          </label>
          <ul>
            {compoundingOrderList.map(({ label, value }, index) => (
              <li key={index} className="mb-[16px] last:mb-0">
                <ItemSelect
                  isActive={compoundingFormValues?.order_by == value}
                  onChange={() => {
                    if (value === "sort_by_distance") {
                      getCurrentLocation(({ lng, lat }) => {
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
                      })
                    } else {
                      setCompoundingFormValues({
                        ...compoundingFormValues,
                        order_by: value,
                        current_latitude: "",
                        current_longitude: "",
                      })
                      handleChange({ order_by: value })
                    }
                  }}
                  title={label}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 left-0 xl:hidden p-12 bg-white-color flex">
        {isObjectHasValue(defaultValues) ? (
          <button
            onClick={() => {
              onChangeProps(undefined)
              onCloseFilter?.()
            }}
            className="btn-primary-outline py-[6px] mr-12 flex-1"
          >
            Xóa bộ lọc
          </button>
        ) : null}
        <button
          onClick={() => {
            isObjectHasValue(compoundingFormValues) && onChangeProps(compoundingFormValues)
            onCloseFilter?.()
          }}
          className={`btn-primary py-[6px] flex-1 ${
            !isObjectHasValue(compoundingFormValues) ? "btn-disabled" : ""
          }`}
        >
          Áp dụng
        </button>
      </div>
    </div>
  )
}
