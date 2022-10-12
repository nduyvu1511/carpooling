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
  hoursBackList,
  isObjectHasValue,
  setToLocalStorage,
  subtractDateTimeToNumberOfHour,
  twoWayCompoundingCarSchema,
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
import { useForm } from "react-hook-form"
import { InputCheckbox } from "../../inputs"

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
  mode,
  disabled = false,
  view = "page",
}: TwoWayCompoundingFormProps) => {
  const {
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
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
  const durationDistance = watch(["distance", "duration", "price"])
  const isAdayTour = watch("is_a_day_tour")
  const expectedGoingOnDate = watch("expected_going_on_date")

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
        if (errors?.distance) {
          clearErrors("distance")
        }
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
  }

  const onSubmitHandler = (data: CreateTwoWayCompoundingCarForm) => {
    const { is_a_day_tour } = data

    const params: CreateTwoWayCompoundingCar = {
      car_id: Number(data.car_id.value),
      compounding_type: "two_way",
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
      is_a_day_tour,
      expected_picking_up_date: is_a_day_tour
        ? subtractDateTimeToNumberOfHour(
            subtractDateTimeToNumberOfHour(
              data.expected_going_on_date,
              -Number((data.hour_of_wait_time?.value + "").slice(0, 2))
            ),
            7
          )
        : data.expected_picking_up_date,
      hour_of_wait_time: is_a_day_tour
        ? (data.hour_of_wait_time?.value as HourWaitTimeType)
        : false,
      duration: data?.duration || 0,
    }
    onSubmit?.(params)
  }

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmitHandler(data)
      })}
      className="two-way-form"
    >
      <div className="">
        <LocationField
          disabled={disabled}
          control={control}
          name="from_location"
          onChange={(data) => {
            setToLocalStorage(TWO_WAY_FROM_LOCATION, data)
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
            setToLocalStorage(TWO_WAY_TO_LOCATION, data)
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
      </div>

      <SelectField
        disabled={disabled}
        label="Loại xe"
        placeholder="Loại xe"
        name="car_id"
        isSearchable={false}
        control={control}
        options={vehicleTypeOptions}
        onChange={(option) => {
          setToLocalStorage(TWO_WAY_CAR_ID, option)
          calcPrice()
        }}
      />

      <DateTimeField
        disabled={disabled}
        required
        control={control}
        placeholder="Ngày đi"
        label="Ngày đi"
        defaultValue={getValues("expected_going_on_date")}
        name="expected_going_on_date"
        onChange={(val) => {
          setToLocalStorage(TWO_WAY_EXPECTED_GOING_ON_DATE, val)
        }}
      />

      {/* Handle later on...................................... */}
      <div className={`form-item ${disabled ? "pointer-events-none" : ""}`}>
        <label className="form-label">Thời gian về(*)</label>

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
            <span className="ml-8" onClick={() => handleToggleStatus(true)}>
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
            <span className="ml-8" onClick={() => handleToggleStatus(false)}>
              Khác ngày
            </span>
          </div>
        </div>

        {isAdayTour ? (
          <SelectField
            maxMenuHeight={160}
            disabled={disabled}
            placeholder="Số giờ"
            name="hour_of_wait_time"
            isSearchable={false}
            control={control}
            options={hoursBackList}
            onChange={(val) => {
              setToLocalStorage(TWO_WAY_HOUR_OF_WAIT_TIME, val)
            }}
          />
        ) : (
          <DateTimeField
            disabled={disabled}
            required
            control={control}
            currentDay={expectedGoingOnDate}
            name="expected_picking_up_date"
            placeholder="Ngày đến"
            defaultValue={getValues("expected_picking_up_date")}
            onChange={(val) => {
              setToLocalStorage(TWO_WAY_EXPECTED_PICKING_UP_DATE, val)
            }}
          />
        )}
      </div>

      <TextareaField
        disabled={disabled}
        control={control}
        name="note"
        readOnly={disabled}
        label="Ghi chú cho chuyến đi"
        placeholder="Ghi chú cho chuyến đi"
        onBlur={(val) => setToLocalStorage(TWO_WAY_NOTE, val)}
      />

      {mode === "create" && !disabled ? (
        <PolicyField
          className="mb-24"
          defaultValue={getValues("is_checked_policy")}
          control={control}
          name="is_checked_policy"
          onChange={(val) => setToLocalStorage(TWO_WAY_IS_CHECKED_POLICY, val || undefined)}
        />
      ) : null}

      {view === "page" ? <div className="mt-[40px]"></div> : null}

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
