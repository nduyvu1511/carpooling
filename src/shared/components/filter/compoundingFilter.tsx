import { CompoundingFilterSchema } from "@/core/schema"
import { CompoundingFilterFormFields, compoundingOrderList } from "@/helper"
import { useAddress, useCompoundingForm, useCurrentLocation } from "@/hooks"
import {
  CompoundingCarCustomerFilterKey,
  CompoundingCarFilterKey,
  CompoundingFilterForm,
  CompoundingFilterParams,
  DefaultCompoundingCarFilterFormParams,
  OptionModel,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"
import { InputSelect, ItemSelect } from "../inputs"

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
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    getValues,
    reset,
  } = useForm<CompoundingFilterForm>({
    resolver: yupResolver(CompoundingFilterSchema),
    defaultValues,
  })
  const [numberSeatOptions, setNumberSeatOptions] = useState<OptionModel[]>([])
  const [filterValues, setFilterValues] = useState<
    DefaultCompoundingCarFilterFormParams | undefined
  >()

  const getOptions = (field: CompoundingFilterKey): OptionModel[] => {
    if (field === "from_province_id" || field === "to_province_id") {
      return provinceOptions
    } else if (field === "car_id") {
      return vehicleTypeOptions
    } else if (field === "number_seat") {
      return numberSeatOptions
    }
    return []
  }

  return (
    <form>
      <div className="compounding__filter">
        <div className="">
          <div className="flex items-center justify-between mb-[40px]">
            <p className="text-24 leading-[32px] font-medium">Bộ lọc: </p>
            <span
              onClick={() => {
                setFilterValues(undefined)
                onChangeProps(undefined)
                reset()
              }}
              className="text-primary text-14 leading-26 font-medium cursor-pointer"
            >
              Đặt lại
            </span>
          </div>
          {CompoundingFilterFormFields.map((field) => (
            <div key={field.name} className="mb-[16px]">
              {field.type === "date" ? (
                <div className="" key={field.name}>
                  <Controller
                    control={control}
                    name={field.name}
                    render={({ field: { onChange, onBlur } }) => (
                      <input
                        className={`form-input-sm ${errors?.[field.name] ? "form-input-err" : ""}`}
                        id={field.name}
                        type="date"
                        onBlur={onBlur}
                        defaultValue={defaultValues?.[field.name] + ""}
                        placeholder="Ngày đi"
                        onChange={(e) => {
                          const val = e.target.value
                          setValue(field.name, val)
                          onChange(val)
                          onChangeProps({ from_expected_going_on_date: val })
                        }}
                        // defaultValue={defaultValues?.[field.name] }
                      />
                    )}
                    rules={{ required: true }}
                  />
                </div>
              ) : field.type === "select" ? (
                <div className="" key={field.name}>
                  <div className="form-select form-select-sm">
                    <Controller
                      control={control}
                      name={field.name}
                      render={({ field: { onChange, onBlur } }) =>
                        field.name === "number_seat" ? (
                          <>
                            {type === "customer" ? (
                              <Select
                                defaultValue={filterValues?.number_seat}
                                placeholder={field.label}
                                options={numberSeatOptions}
                                onChange={(data) => {
                                  onChange(data)
                                  if (!data?.value) return
                                  onChangeProps({ number_seat: +data.value })
                                }}
                                onBlur={onBlur}
                                id={field.name}
                              />
                            ) : null}
                          </>
                        ) : (
                          <Select
                            defaultValue={defaultValues?.[field.name]}
                            placeholder={field.label}
                            options={getOptions(field.name)}
                            onChange={(data: any) => {
                              if (field.name === "car_id") {
                                setNumberSeatOptions(seats(Number((data as any)?.number_seat) || 0))
                              }
                              onChange(data)
                              onChangeProps({ [field.name]: data.value })
                            }}
                            onBlur={onBlur}
                            id={field.name}
                          />
                        )
                      }
                      rules={{ required: true }}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-24">
          <label htmlFor="" className="form-label mb-24">
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
    </form>
  )
}
