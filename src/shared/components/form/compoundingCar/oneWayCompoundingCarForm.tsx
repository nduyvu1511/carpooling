/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonSubmit } from "@/components"
import {
  formatMoneyVND,
  getHoursName,
  isObjectHasValue,
  oneWayCompoundingCarSchema,
  ONE_WAY_CAR_ID,
  ONE_WAY_DISTANCE,
  ONE_WAY_DURATION,
  ONE_WAY_EXPECTED_GOING_ON_DATE,
  ONE_WAY_FROM_LOCATION,
  ONE_WAY_IS_CHECKED_POLICY,
  ONE_WAY_NOTE,
  ONE_WAY_PRICE,
  ONE_WAY_TO_LOCATION,
  setToLocalStorage,
  subtractDateTimeToNumberOfHour,
} from "@/helper"
import { useCalcDistance, useCompoundingForm } from "@/hooks"
import { CreateOneWayCompoundingCar, CreateOneWayCompoundingCarForm } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import { InputDateTime, InputLocation, InputPolicy, InputSelect } from "../../inputs"

interface OneWayCompoundingFormProps {
  onSubmit?: (params: CreateOneWayCompoundingCar) => void
  defaultValues?: CreateOneWayCompoundingCarForm
  mode?: "create" | "update" | "confirm"
  disabled?: boolean
  view?: "page" | "modal"
}

export const OneWayCompoundingForm = ({
  onSubmit,
  defaultValues,
  mode,
  disabled = false,
  view = "page",
}: OneWayCompoundingFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    watch,
    formState: { errors, isValid },
    control,
    setError,
  } = useForm<CreateOneWayCompoundingCarForm>({
    resolver: yupResolver(oneWayCompoundingCarSchema),
    mode: "all",
    defaultValues,
  })
  const { calculateDistanceBetweenTwoCoordinates } = useCalcDistance()
  const { vehicleTypeOptions, calcPriceFromProvinceIds } = useCompoundingForm()
  const durationDistance = watch(["distance", "duration", "price"])

  const calcDistance = () => {
    const fromLocation = getValues("from_location")
    const toLocation = getValues("to_location")
    if (!fromLocation?.province_id || !toLocation?.province_id) return

    calculateDistanceBetweenTwoCoordinates({
      params: {
        origin: { lat: +fromLocation.lat, lng: +fromLocation.lng },
        destination: { lat: +toLocation.lat, lng: +toLocation.lng },
      },
      onSuccess: ({ distance, duration }) => {
        if (errors?.distance) {
          clearErrors("distance")
        }
        setValue("distance", distance)
        setValue("duration", duration)
        setToLocalStorage(ONE_WAY_DISTANCE, distance)
        setToLocalStorage(ONE_WAY_DURATION, duration)
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
        setToLocalStorage(ONE_WAY_PRICE, data)
      },
    })
  }

  const onSubmitHandler = (data: CreateOneWayCompoundingCarForm) => {
    const params: CreateOneWayCompoundingCar = {
      car_id: Number(data.car_id.value),
      compounding_type: "one_way",
      distance: data.distance,
      expected_going_on_date: subtractDateTimeToNumberOfHour(data.expected_going_on_date, 7),
      from_address: data.from_location.address,
      from_latitude: data.from_location.lat + "",
      from_longitude: data.from_location.lng + "",
      to_address: data.to_location.address,
      to_latitude: data.to_location.lat + "",
      to_longitude: data.to_location.lng + "",
      from_province_id: data.from_location.province_id,
      to_province_id: data.to_location.province_id,
      note: data?.note || "",
      duration: data?.duration || 0,
    }

    onSubmit?.(params)
  }

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmitHandler(data)
      })}
      className="rides__form"
    >
      <div className="">
        <div className={`form-item ${disabled ? "pointer-events-none" : ""}`}>
          <InputLocation
            prevProvinceId={getValues("to_location.province_id")}
            isError={!!errors?.from_location}
            type="from"
            defaultValue={getValues("from_location")?.address || ""}
            placeholder="Điểm đón"
            onChange={(location) => {
              setValue("from_location", location)
              clearErrors("from_location")
              setToLocalStorage(ONE_WAY_FROM_LOCATION, location)
              calcDistance()
              calcPrice()
            }}
            defaultLocation={getValues("from_location")}
            control={control}
            name="from_location"
          />
        </div>

        <div className={`form-item ${disabled ? "pointer-events-none" : ""}`}>
          <InputLocation
            prevProvinceId={getValues("from_location.province_id")}
            isError={!!errors?.to_location}
            type="to"
            defaultValue={getValues("to_location")?.address || ""}
            placeholder="Điểm đến"
            onChange={(location) => {
              setValue("to_location", location)
              clearErrors("to_location")
              setToLocalStorage(ONE_WAY_TO_LOCATION, location)
              calcDistance()
              calcPrice()
            }}
            defaultLocation={getValues("to_location")}
            control={control}
            name="to_location"
          />
          {mode === "create" && durationDistance?.[0] ? (
            <div className="mt-[4px] text-xs leading-[22px] font-normal flex items-center flex-wrap">
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

      <div className={`form-item ${disabled ? "pointer-events-none" : ""}`}>
        <InputSelect
          isSearchable={false}
          control={control}
          name={"car_id"}
          defaultValue={getValues("car_id") || defaultValues?.car_id}
          isError={!!errors?.car_id}
          placeholder="Loại xe"
          onChange={(option) => {
            if (!option) return
            setToLocalStorage(ONE_WAY_CAR_ID, option)
            setValue("car_id", option)
            clearErrors("car_id")
            calcPrice()
          }}
          options={vehicleTypeOptions}
        />
      </div>
      <div className={`form-item ${disabled ? "pointer-events-none" : ""}`}>
        <InputDateTime
          control={control}
          name="expected_going_on_date"
          placeholder="Thời gian đi"
          defaultValue={defaultValues?.expected_going_on_date || ""}
          onChange={(val) => {
            setToLocalStorage(ONE_WAY_EXPECTED_GOING_ON_DATE, val)
            clearErrors("expected_going_on_date")
          }}
          isError={!!errors?.expected_going_on_date}
        />
      </div>

      <div className={`form-item`}>
        <label htmlFor="note" className="form-label">
          Ghi chú cho chuyến đi
        </label>

        <textarea
          readOnly={disabled}
          {...register}
          className="form-textarea"
          name="note"
          id="note"
          cols={10}
          placeholder="Ghi chú thêm cho chuyến đi..."
          defaultValue={defaultValues?.note}
          onChange={(e) => {
            setToLocalStorage(ONE_WAY_NOTE, e.target.value)
            setValue("note", e.target.value)
          }}
          maxLength={300}
        ></textarea>
      </div>

      {mode === "create" && !disabled ? (
        <div className="mb-[24px]">
          <Controller
            control={control}
            name={"is_checked_policy"}
            render={() => (
              <InputPolicy
                isError={!!errors?.is_checked_policy?.message}
                onChange={(status) => {
                  if (status) {
                    setToLocalStorage(ONE_WAY_IS_CHECKED_POLICY, true)
                    clearErrors("is_checked_policy")
                    setValue("is_checked_policy", true)
                  } else {
                    setToLocalStorage(ONE_WAY_IS_CHECKED_POLICY, undefined)
                    setError("is_checked_policy", {})
                    setValue("is_checked_policy", undefined as any)
                  }
                }}
                value={getValues("is_checked_policy")}
              />
            )}
            rules={{ required: true }}
          />
        </div>
      ) : null}

      {view === "page" ? <div className="md:mt-[40px]"></div> : null}

      {onSubmit ? (
        <ButtonSubmit
          view={view}
          title={
            mode === "create" ? "Tiếp tục" : mode === "confirm" ? "Xác nhận" : "Tiến hành đặt cọc"
          }
          isError={isObjectHasValue(errors)}
        />
      ) : null}
    </form>
  )
}
