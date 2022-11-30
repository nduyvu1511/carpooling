import {
  ButtonSubmit,
  DateTimeField,
  PolicyField,
  SelectField,
  StationField,
  TextareaField,
} from "@/components"
import {
  convenientCompoundingCarSchema,
  CONVENIENT_CAR_ID,
  CONVENIENT_DISTANCE,
  CONVENIENT_DURATION,
  CONVENIENT_EXPECTED_GOING_ON_DATE,
  CONVENIENT_FROM_STATION,
  CONVENIENT_IS_CHECKED_POLICY,
  CONVENIENT_NOTE,
  CONVENIENT_PRICE_PER_PASSENGER,
  CONVENIENT_TO_STATION,
  setToSessionStorage,
  subtractDateTimeToNumberOfHour,
} from "@/helper"
import { useCalcDistance, useCompoundingForm } from "@/hooks"
import { CreateConvenientCompoundingCar, CreateConvenientCompoundingForm } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

interface ConvenientFormProps {
  onSubmit?: (params: CreateConvenientCompoundingCar) => void
  defaultValues?: CreateConvenientCompoundingForm
  type?: "new" | "existed"
  mode?: "create" | "update" | "confirm"
  disabled?: boolean
  showButon?: boolean
  view?: "page" | "modal"
  labelBtn?: string
  showNote?: boolean
}

export const ConvenientForm = ({
  onSubmit,
  defaultValues,
  mode,
  type = "new",
  disabled = false,
  showButon = true,
  view,
  labelBtn,
  showNote = true,
}: ConvenientFormProps) => {
  const dispatch = useDispatch()
  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isValid },
    control,
  } = useForm<CreateConvenientCompoundingForm>({
    resolver: yupResolver(convenientCompoundingCarSchema),
    mode: "all",
    defaultValues,
  })
  const { calculateDistanceBetweenTwoCoordinates } = useCalcDistance()
  const { vehicleTypeOptions, calcPriceFromProvinceIds } = useCompoundingForm()

  const durationDistance = watch(["distance", "duration", "price_per_passenger"])

  const calcDistance = () => {
    const fromStation = getValues("from_station")
    const toStation = getValues("to_station")
    if (!fromStation?.province_id || !toStation?.province_id) return

    calculateDistanceBetweenTwoCoordinates({
      params: {
        origin: { lat: +fromStation.lat, lng: +fromStation.lng },
        destination: { lat: +toStation.lat, lng: +toStation.lng },
      },
      onSuccess: ({ distance, duration }) => {
        setToSessionStorage(CONVENIENT_DISTANCE, distance)
        setToSessionStorage(CONVENIENT_DURATION, duration)
        setValue("distance", distance)
        setValue("duration", duration)
      },
    })
  }

  const calcPrice = async () => {
    const fromLocation = getValues("from_station")
    const toLocation = getValues("to_station")
    const carId = getValues("car_id")
    if (!fromLocation?.province_id || !toLocation?.province_id || !carId?.value) return
    calcPriceFromProvinceIds({
      params: {
        car_id: +carId.value,
        from_province_id: fromLocation.province_id,
        to_province_id: toLocation.province_id,
      },
      onSuccess: (data) => {
        setValue("price_per_passenger", data)
        setToSessionStorage(CONVENIENT_PRICE_PER_PASSENGER, data)
      },
    })
  }

  const onSubmitHandler = (data: CreateConvenientCompoundingForm) => {
    const params: CreateConvenientCompoundingCar = {
      car_id: Number(data.car_id.value),
      compounding_type: "convenient",
      distance: data?.distance,
      expected_going_on_date: subtractDateTimeToNumberOfHour(data.expected_going_on_date, 7),
      from_province_id: data.from_station.province_id,
      to_province_id: data.to_station.province_id,
      note: data?.note || "",
      from_pick_up_station_id: data.from_station.station_id,
      to_pick_up_station_id: data.to_station.station_id,
      duration: data?.duration || 0,
    }

    if (!getValues("distance")) {
      calculateDistanceBetweenTwoCoordinates({
        params: {
          origin: { lat: +data.from_station.lat, lng: +data.from_station.lng },
          destination: { lat: +data.to_station.lat, lng: +data.to_station.lng },
        },
        onSuccess: ({ distance, duration }) => {
          onSubmit?.({ ...params, distance, duration })
        },
        config: { showScreenLoading: true },
      })
    } else {
      onSubmit?.(params)
    }
  }

  return (
    <>
      <form className="carpooling-form" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={`form-item ${disabled ? "pointer-events-none" : ""}`}>
          <div className="mb-8">
            <StationField
              control={control}
              name="from_station"
              disabled={disabled}
              onChange={(val) => {
                setToSessionStorage(CONVENIENT_FROM_STATION, val)
                calcDistance()
                calcPrice()
              }}
              prevProvinceId={getValues("to_station.province_id")}
              modalTitle="Chọn trạm đón"
              placeholder="Điểm đón"
              label="Điểm đón"
            />
          </div>
        </div>

        <StationField
          control={control}
          name="to_station"
          disabled={disabled}
          onChange={(val) => {
            setToSessionStorage(CONVENIENT_TO_STATION, val)
            calcDistance()
            calcPrice()
          }}
          showLocationInfo={mode === "create" && !!durationDistance?.[0]}
          distance={durationDistance?.[0]}
          duration={durationDistance?.[1]}
          price={durationDistance?.[2]}
          prevProvinceId={getValues("from_station.province_id")}
          placeholder="Điểm đến"
          label="Điểm đến"
          modalTitle="Chọn trạm đến"
        />

        <SelectField
          disabled={disabled}
          label="Loại xe"
          placeholder="Loại xe"
          name="car_id"
          isSearchable={false}
          control={control}
          options={vehicleTypeOptions}
          onChange={(val) => {
            if (getValues("car_id")?.value >= (val as any).number_seat) {
              setValue("car_id", undefined as any)
              dispatch(notify("Vui lòng chọn lại số hành khách", "error"))
            }
            setToSessionStorage(CONVENIENT_CAR_ID, val)
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
            setToSessionStorage(CONVENIENT_EXPECTED_GOING_ON_DATE, val)
          }}
          disableDate={type === "existed"}
          maxHour={
            type === "existed" ? defaultValues?.expected_going_on_date?.slice(11) : undefined
          }
        />

        {showNote ? (
          <TextareaField
            disabled={disabled}
            control={control}
            name="note"
            readOnly={disabled}
            label="Ghi chú cho chuyến đi"
            placeholder="Ghi chú cho chuyến đi"
            onBlur={(val) => setToSessionStorage(CONVENIENT_NOTE, val)}
          />
        ) : null}

        {mode === "create" && !disabled ? (
          <PolicyField
            className="mb-24"
            defaultValue={getValues("is_checked_policy")}
            control={control}
            name="is_checked_policy"
            onChange={(val) => {
              setToSessionStorage(CONVENIENT_IS_CHECKED_POLICY, val || undefined)
              console.log(val)
            }}
          />
        ) : null}

        {view === "page" ? <div className="mt-[40px]"></div> : null}

        {onSubmit && showButon ? (
          <ButtonSubmit
            view={view}
            title={
              labelBtn
                ? labelBtn
                : mode === "create"
                ? "Tiếp tục"
                : mode === "confirm"
                ? "Xác nhận"
                : "Lưu"
            }
            disabled={!isValid}
            parentClassName={`${view === "page" ? "mt-[40px]" : ""}`}
          />
        ) : null}
      </form>
    </>
  )
}
