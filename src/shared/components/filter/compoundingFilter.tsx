import { CompoundingFilterSchema } from "@/core/schema"
import { compoundingOrderList, isObjectHasValue } from "@/helper"
import { useAddress, useCompoundingForm, useCurrentLocation } from "@/hooks"
import {
  CarIdType,
  CompoundingCarCustomerFilterKey,
  CompoundingCarFilterKey,
  CompoundingFilterForm,
  CompoundingFilterParams,
  OptionModel,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import "react-datetime/css/react-datetime.css"
import { Controller, useForm } from "react-hook-form"
import { InputDate, InputSelect, ItemSelect } from "../inputs"

type CompoundingFilterKey = CompoundingCarCustomerFilterKey | CompoundingCarFilterKey
interface CompoundingFilterFormProps {
  type: "driver" | "customer"
  onChange: (params: CompoundingFilterParams | undefined) => void
  defaultValues?: CompoundingFilterForm
}

export const CompoundingFilter = ({
  onChange: onChangeProps,
  defaultValues,
  type,
}: CompoundingFilterFormProps) => {
  const { provinceOptions } = useAddress()
  const { vehicleTypeOptions, seats } = useCompoundingForm()
  const { getCurrentLocation } = useCurrentLocation({ showLoading: true })
  const { setValue, control, getValues, reset } = useForm<CompoundingFilterForm>({
    resolver: yupResolver(CompoundingFilterSchema),
    defaultValues,
  })
  const [numberSeatOptions, setNumberSeatOptions] = useState<OptionModel[]>([])

  return (
    <form>
      <div className="compounding__filter">
        <div className="">
          <div className="flex items-center justify-between mb-[24px]">
            <p className="text-xl">Bộ lọc</p>
            {isObjectHasValue(defaultValues) ? (
              <span
                onClick={() => {
                  onChangeProps(undefined)
                  reset()
                }}
                className="text-primary text-14 leading-26 font-medium cursor-pointer"
              >
                Đặt lại
              </span>
            ) : null}
          </div>

          <div className="form-date form-date-sm mb-[10px]">
            <Controller
              control={control}
              name={"from_expected_going_on_date"}
              render={({ field: { onChange, onBlur } }) => (
                <InputDate
                  onChange={(val) => {
                    onChange(val)
                    onChangeProps({ from_expected_going_on_date: val + "" })
                  }}
                  defaultValue={defaultValues?.from_expected_going_on_date}
                  inputProps={{ placeholder: "Ngày đi" }}
                />
              )}
              rules={{ required: true }}
            />
          </div>

          <div className="form-date form-date-sm mb-[10px]">
            <Controller
              control={control}
              name={"to_expected_going_on_date"}
              render={({ field: { onChange, onBlur } }) => (
                <InputDate
                  onChange={(val) => {
                    onChange(val)
                    onChangeProps({ to_expected_going_on_date: val + "" })
                  }}
                  defaultValue={defaultValues?.to_expected_going_on_date}
                  inputProps={{ placeholder: "Ngày về" }}
                />
              )}
              rules={{ required: true }}
            />
          </div>

          <div className="form-select-sm">
            <InputSelect
              options={provinceOptions}
              control={control}
              defaultValue={
                defaultValues?.from_province_id
                  ? provinceOptions.find((item) => item.value == getValues("from_province_id"))
                  : undefined
              }
              name="from_province_id"
              onChange={(val) => {
                if (!val) return
                setValue("from_province_id", +val.value)
                onChangeProps({ from_province_id: +val.value })
              }}
              placeholder="Đi từ"
              showLabel={false}
            />
          </div>

          <div className="form-select-sm">
            <InputSelect
              options={provinceOptions}
              control={control}
              defaultValue={
                defaultValues?.to_province_id
                  ? provinceOptions.find((item) => item.value == getValues("to_province_id"))
                  : undefined
              }
              name="to_province_id"
              onChange={(val) => {
                if (!val) return
                setValue("to_province_id", +val.value)
                onChangeProps({ to_province_id: +val.value })
              }}
              placeholder="Đến tại"
              showLabel={false}
            />
          </div>

          <div className="form-select-sm">
            <InputSelect
              options={vehicleTypeOptions}
              control={control}
              defaultValue={
                defaultValues?.car_id
                  ? provinceOptions.find((item) => item.value == getValues("car_id"))
                  : undefined
              }
              name="car_id"
              onChange={(val) => {
                if (!val) return
                setNumberSeatOptions(seats(Number((val as CarIdType)?.number_seat) || 0))
                setValue("car_id", +val.value)
                onChangeProps({ car_id: +val.value })
              }}
              placeholder="Loại xe"
              showLabel={false}
            />
          </div>
          {type === "customer" ? (
            <div className="form-select-sm">
              <InputSelect
                options={numberSeatOptions}
                control={control}
                defaultValue={
                  defaultValues?.number_seat
                    ? provinceOptions.find((item) => item.value == getValues("number_seat"))
                    : undefined
                }
                name="number_seat"
                onChange={(val) => {
                  if (!val) return
                  setNumberSeatOptions(seats(Number((val as CarIdType)?.number_seat) || 0))
                  setValue("number_seat", +val.value)
                  onChangeProps({ number_seat: +val.value })
                }}
                placeholder="Số hành khách"
                showLabel={false}
              />
            </div>
          ) : null}

          <div className="mt-24">
            <label htmlFor="" className="form-label mb-[16px]">
              Sắp xếp theo:
            </label>
            <ul>
              {compoundingOrderList.map(({ label, value }, index) => (
                <li key={index} className="mb-[16px] last:mb-0">
                  <ItemSelect
                    isActive={getValues("order_by") === value}
                    onChange={() => {
                      if (value === "sort_by_distance") {
                        getCurrentLocation(({ lng, lat }) => {
                          setValue("order_by", "sort_by_distance")
                          setValue("current_latitude", lat + "")
                          setValue("current_longitude", lng + "")
                          onChangeProps({ order_by: "sort_by_distance" })
                        })
                      } else {
                        setValue("order_by", value)
                        onChangeProps({ order_by: value })
                      }
                    }}
                    title={label}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </form>
  )
}
