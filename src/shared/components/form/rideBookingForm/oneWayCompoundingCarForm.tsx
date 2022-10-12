/* eslint-disable react-hooks/exhaustive-deps */
import {
  ButtonSubmit,
  DateTimeField,
  LocationField,
  PolicyField,
  SelectField,
  TextareaField,
} from "@/components"
import {
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
import { useForm } from "react-hook-form"

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
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    watch,
    formState: { errors },
    control,
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
      className="one-way-form"
    >
      <LocationField
        disabled={disabled}
        control={control}
        name="from_location"
        onChange={(data) => {
          setToLocalStorage(ONE_WAY_FROM_LOCATION, data)
          calcDistance()
          calcPrice()
        }}
        label="Điểm đón"
        placeholder="Điểm đón"
        modalTitle="Chọn điểm đón"
        prevProvinceId={getValues("to_location.province_id")}
      />

      <LocationField
        disabled={disabled}
        control={control}
        name="to_location"
        onChange={(data) => {
          setToLocalStorage(ONE_WAY_TO_LOCATION, data)
          calcDistance()
          calcPrice()
        }}
        prevProvinceId={getValues("from_location.province_id")}
        label="Điểm đến"
        placeholder="Điểm đến"
        modalTitle="Chọn điểm đến"
        distance={durationDistance?.[0]}
        duration={durationDistance?.[1]}
        price={durationDistance?.[2]}
        showLocationInfo={mode === "create" && !!durationDistance?.[0]}
      />

      <SelectField
        disabled={disabled}
        label="Loại xe"
        placeholder="Loại xe"
        name="car_id"
        isSearchable={false}
        control={control}
        options={vehicleTypeOptions}
        onChange={(option) => {
          setToLocalStorage(ONE_WAY_CAR_ID, option)
          calcPrice()
        }}
      />

      <DateTimeField
        disabled={disabled}
        required
        control={control}
        name="expected_going_on_date"
        label="Thời gian đi"
        placeholder="Thời gian đi"
        onChange={(val) => {
          setToLocalStorage(ONE_WAY_EXPECTED_GOING_ON_DATE, val)
        }}
      />

      <TextareaField
        disabled={disabled}
        control={control}
        name="note"
        readOnly={disabled}
        label="Ghi chú cho chuyến đi"
        placeholder="Ghi chú cho chuyến đi"
        onBlur={(val) => setToLocalStorage(ONE_WAY_NOTE, val)}
      />

      {mode === "create" && !disabled ? (
        <PolicyField
          className="mb-24"
          defaultValue={getValues("is_checked_policy")}
          control={control}
          name="is_checked_policy"
          onChange={(val) => setToLocalStorage(ONE_WAY_IS_CHECKED_POLICY, val || undefined)}
        />
      ) : null}

      {view === "page" ? <div className="mt-[40px]"></div> : null}

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
