/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonSubmit } from "@/components"
import { twoWayCompoundingCarSchema } from "@/core/schema"
import {
  DEFAULT_DATE_TIME_VALUE,
  DEFAULT_HOUR_BACK_VALUE,
  formatMoneyVND,
  getHoursName,
  hoursBackList,
  isObjectHasValue,
  setToLocalStorage,
  TWO_WAY_CAR_ID,
  TWO_WAY_DISTANCE,
  TWO_WAY_DURATION,
  TWO_WAY_EXPECTED_GOING_ON_DATE,
  TWO_WAY_EXPECTED_PICKING_UP_DATE,
  TWO_WAY_FROM_LOCATION,
  TWO_WAY_HOUR_OF_WAIT_TIME,
  TWO_WAY_IS_A_DAY_TOUR,
  TWO_WAY_IS_CHECKED_POLICY,
  TWO_WAY_NOTE,
  TWO_WAY_PRICE,
  TWO_WAY_TO_LOCATION,
} from "@/helper"
import { useCalcDistance, useCompoundingForm } from "@/hooks"
import {
  CreateTwoWayCompoundingCar,
  CreateTwoWayCompoundingCarForm,
  HourWaitTimeType,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { InputCheckbox, InputDateTime, InputLocation, InputPolicy, InputSelect } from "../../inputs"

interface TwoWayCompoundingFormProps {
  onSubmit?: (params: CreateTwoWayCompoundingCar) => void
  defaultValues?: CreateTwoWayCompoundingCarForm
  mode?: "create" | "update" | "confirm"
  disabled?: boolean
  view?: "page" | "modal"
}

export const TwoWayCompoundingForm = ({
  onSubmit,
  defaultValues,
  mode = "create",
  disabled = false,
  view = "page",
}: TwoWayCompoundingFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    setError,
    watch,
    formState: { errors },
    control,
  } = useForm<CreateTwoWayCompoundingCarForm>({
    resolver: yupResolver(twoWayCompoundingCarSchema),
    mode: "all",
    defaultValues,
  })
  const { calculateDistanceBetweenTwoCoordinates } = useCalcDistance()
  const { vehicleTypeOptions, calcPriceFromProvinceIds } = useCompoundingForm()
  const [_, setADayTour] = useState<boolean>(getValues("is_a_day_tour"))
  const durationDistance = watch(["distance", "duration", "price"])

  const calcDistance = () => {
    const fromLocation = getValues("from_location")
    const toLocation = getValues("to_location")
    if (!fromLocation?.province_id || !toLocation?.province_id) return
    calculateDistanceBetweenTwoCoordinates({
      params: {
        destination: { lat: fromLocation.lat, lng: fromLocation.lng },
        origin: { lat: toLocation.lat, lng: toLocation.lng },
      },
      onSuccess: ({ distance, duration }) => {
        setToLocalStorage(TWO_WAY_DISTANCE, distance)
        setToLocalStorage(TWO_WAY_DURATION, duration)
        setValue("distance", distance)
        setValue("duration", duration)
      },
    })
  }

  const calcPrice = async () => {
    const fromLocation = getValues("from_location")
    const toLocation = getValues("to_location")
    const carId = getValues("car_id")
    if (!fromLocation?.province_id || !toLocation?.province_id || !carId?.value) return

    calcPriceFromProvinceIds({
      params: {
        car_id: +carId.value,
        from_province_id: fromLocation.province_id,
        to_province_id: toLocation.province_id,
      },
      onSuccess: (data) => {
        setValue("price", data)
        setToLocalStorage(TWO_WAY_PRICE, data)
      },
    })
  }

  const handleToggleStatus = (value: boolean) => {
    setValue("is_a_day_tour", value)
    setToLocalStorage(TWO_WAY_IS_A_DAY_TOUR, value)
    setADayTour(value)
    handleSetDefaultValueForPickingUpdate(value)
  }

  const handleSetDefaultValueForPickingUpdate = (status: boolean) => {
    const hour = getValues("hour_of_wait_time")
    const dateTime = getValues("expected_picking_up_date")

    if (status) {
      if (!dateTime) {
        setValue("expected_picking_up_date", DEFAULT_DATE_TIME_VALUE)
        setToLocalStorage(TWO_WAY_EXPECTED_PICKING_UP_DATE, DEFAULT_DATE_TIME_VALUE)
        clearErrors("expected_picking_up_date")
      }

      if (hour?.value === DEFAULT_HOUR_BACK_VALUE?.value) {
        setValue("hour_of_wait_time", undefined as any)
        setToLocalStorage(TWO_WAY_HOUR_OF_WAIT_TIME, undefined)
        setError("hour_of_wait_time", {})
      }
    } else {
      if (!hour) {
        setValue("hour_of_wait_time", DEFAULT_HOUR_BACK_VALUE)
        clearErrors("expected_picking_up_date")
        setToLocalStorage(TWO_WAY_HOUR_OF_WAIT_TIME, DEFAULT_HOUR_BACK_VALUE)
      }

      if (dateTime === DEFAULT_DATE_TIME_VALUE) {
        setValue("expected_picking_up_date", undefined as any)
        setError("expected_picking_up_date", {})
        setToLocalStorage(TWO_WAY_EXPECTED_PICKING_UP_DATE, undefined)
      }
    }
  }

  useEffect(() => {
    if (getValues("is_a_day_tour") === undefined) {
      setValue("is_a_day_tour", false)
    }
    handleSetDefaultValueForPickingUpdate(getValues("is_a_day_tour"))
  }, [])

  const onSubmitHandler = (data: CreateTwoWayCompoundingCarForm) => {
    const { is_a_day_tour } = data
    const params: CreateTwoWayCompoundingCar = {
      car_id: Number(data.car_id.value),
      compounding_type: "two_way",
      distance: data.distance,
      expected_going_on_date: data.expected_going_on_date,
      from_address: data.from_location.address,
      from_latitude: data.from_location.lat + "",
      from_longitude: data.from_location.lng + "",
      to_address: data.to_location.address,
      to_latitude: data.to_location.lat + "",
      to_longitude: data.to_location.lng + "",
      from_province_id: data.from_location.province_id,
      to_province_id: data.to_location.province_id,
      note: data?.note || "",
      is_a_day_tour,
      expected_picking_up_date: !is_a_day_tour ? data.expected_picking_up_date : false,
      hour_of_wait_time: is_a_day_tour
        ? (data.hour_of_wait_time?.value as HourWaitTimeType)
        : false,
      duration: data?.duration || 0,
    }
    onSubmit?.(params)
  }

  const handleTogglePolicy = (): boolean | undefined => {
    const isChecked = getValues("is_checked_policy")
    if (!isChecked) {
      clearErrors("is_checked_policy")
      setToLocalStorage(TWO_WAY_IS_CHECKED_POLICY, true)
      return true
    }
    setToLocalStorage(TWO_WAY_IS_CHECKED_POLICY, undefined)
    return
  }
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmitHandler({ ...data })
      })}
      className=""
    >
      <div className={`${disabled ? "pointer-events-none" : ""}`}>
        <div className="">
          <div className="form-item">
            <InputLocation
              prevProvinceId={getValues("to_location.province_id")}
              isError={!!errors?.from_location}
              type="from"
              defaultValue={getValues("from_location")?.address}
              placeholder="Điểm đi"
              onChange={(location) => {
                setToLocalStorage(TWO_WAY_FROM_LOCATION, location)
                setValue("from_location", location)
                clearErrors("from_location")
                calcPrice()
                calcDistance()
              }}
              defaultLocation={getValues("from_location")}
              control={control}
              name="from_location"
            />
          </div>

          <div className="form-item">
            <InputLocation
              prevProvinceId={getValues("from_location.province_id")}
              isError={!!errors?.to_location}
              type="from"
              defaultValue={getValues("to_location")?.address}
              placeholder="Điểm đến"
              onChange={(location) => {
                setToLocalStorage(TWO_WAY_TO_LOCATION, location)
                setValue("to_location", location)
                clearErrors("to_location")
                calcPrice()
                calcDistance()
              }}
              defaultLocation={getValues("to_location")}
              control={control}
              name="to_location"
            />

            {durationDistance?.[0] ? (
              <div className="mt-[4px] text-xs leading-[22px] font-medium flex items-center flex-wrap">
                {durationDistance?.[0] ? (
                  <p className="mr-[12px]">Quãng đường: {durationDistance?.[0].toFixed()}km</p>
                ) : null}
                {durationDistance?.[1] ? (
                  <p className="mr-[12px]">Thời gian: {getHoursName(durationDistance?.[1])}</p>
                ) : null}
                {durationDistance?.[2] ? (
                  <p className="">Giá: {formatMoneyVND(durationDistance?.[2].toFixed(2))}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="form-item">
          <InputSelect
            isSearchable={false}
            control={control}
            name={"car_id"}
            defaultValue={getValues("car_id") || defaultValues?.car_id}
            isError={!!errors?.car_id}
            placeholder="Loại xe"
            onChange={(option) => {
              if (!option) return
              setToLocalStorage(TWO_WAY_CAR_ID, option)
              setValue("car_id", option)
              clearErrors("car_id")
              calcPrice()
            }}
            options={vehicleTypeOptions}
          />
        </div>

        <div className="form-item">
          <InputDateTime
            name="expected_going_on_date"
            control={control}
            placeholder="Ngày đi"
            defaultValue={getValues("expected_going_on_date")}
            isError={!!errors?.expected_going_on_date}
            onChange={(val) => {
              setToLocalStorage(TWO_WAY_EXPECTED_GOING_ON_DATE, val)
              setValue("expected_going_on_date", val)
              clearErrors("expected_going_on_date")
            }}
          />
        </div>

        <div className="form-item">
          <div className="flex items-center mb-[8px]">
            <div className="mr-[24px] cursor-default flex items-center">
              <InputCheckbox
                type="circle"
                size={20}
                onCheck={() => {
                  handleToggleStatus(true)
                }}
                isChecked={!!getValues("is_a_day_tour")}
              />
              <span className="ml-[12px]" onClick={() => handleToggleStatus(true)}>
                Trong ngày
              </span>
            </div>

            <div className="cursor-default flex items-center">
              <InputCheckbox
                type="circle"
                size={18}
                onCheck={() => {
                  handleToggleStatus(false)
                }}
                isChecked={!getValues("is_a_day_tour")}
              />
              <span className="ml-[12px]" onClick={() => handleToggleStatus(false)}>
                Khác ngày
              </span>
            </div>
          </div>

          {getValues("is_a_day_tour") ? (
            <InputSelect
              isSearchable={false}
              control={control}
              name={"hour_of_wait_time"}
              defaultValue={getValues("hour_of_wait_time")}
              isError={!!errors?.hour_of_wait_time}
              placeholder="Số giờ"
              onChange={(val) => {
                if (!val?.value) return
                setValue("hour_of_wait_time", val)
                clearErrors("hour_of_wait_time")
                setToLocalStorage(TWO_WAY_HOUR_OF_WAIT_TIME, val)
                if (!getValues("expected_picking_up_date")) {
                  setValue("expected_picking_up_date", DEFAULT_DATE_TIME_VALUE)
                }
              }}
              options={hoursBackList}
              showLabel={false}
            />
          ) : (
            <InputDateTime
              name="expected_picking_up_date"
              control={control}
              placeholder="Ngày đến"
              showLabel={false}
              defaultValue={getValues("expected_picking_up_date")}
              isError={!!errors?.expected_picking_up_date}
              onChange={(val) => {
                setToLocalStorage(TWO_WAY_EXPECTED_PICKING_UP_DATE, val)
                if (!getValues("hour_of_wait_time")) {
                  setValue("hour_of_wait_time", DEFAULT_HOUR_BACK_VALUE)
                  clearErrors("hour_of_wait_time")
                }
              }}
            />
          )}
        </div>

        <div className="form-item">
          <label htmlFor="note" className="form-label">
            Ghi chú cho chuyến đi
          </label>

          <textarea
            {...register}
            className="form-textarea form-input"
            name="note"
            id="note"
            cols={10}
            placeholder="Ghi chú thêm cho chuyến đi..."
            defaultValue={defaultValues?.note}
            onChange={(e) => {
              setValue("note", e.target.value)
              setToLocalStorage(TWO_WAY_NOTE, e.target.value)
            }}
          ></textarea>
        </div>

        {mode === "create" ? (
          <div className="form-item mb-[40px]">
            <Controller
              control={control}
              name={"is_checked_policy"}
              render={({ field: { onChange, onBlur } }) => (
                <InputPolicy
                  onChange={() => onChange(handleTogglePolicy())}
                  isError={!!errors?.is_checked_policy}
                  onBlur={onBlur}
                  value={getValues("is_checked_policy")}
                />
              )}
              rules={{ required: true }}
            />
          </div>
        ) : null}

        {view === "modal" ? <div className="mt-24"></div> : null}
      </div>

      {onSubmit ? (
        <ButtonSubmit
          title={
            mode === "create" ? "Tiếp tục" : mode === "confirm" ? "Xác nhận" : "Tiến hành đặt cọc"
          }
          isError={isObjectHasValue(errors)}
          view={view}
        />
      ) : null}
    </form>
  )
}
