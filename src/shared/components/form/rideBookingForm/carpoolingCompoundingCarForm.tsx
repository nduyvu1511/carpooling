import {
  Alert,
  ButtonSubmit,
  DateTimeField,
  InputCheckbox,
  LocationField,
  Map,
  Modal,
  PolicyField,
  SelectField,
  StationField,
  TextareaField,
} from "@/components"
import {
  carpoolingCompoundingCarSchema,
  CARPOOLING_CAR_ID,
  CARPOOLING_DISTANCE,
  CARPOOLING_DURATION,
  CARPOOLING_EXPECTED_GOING_ON_DATE,
  CARPOOLING_FROM_LOCATION,
  CARPOOLING_FROM_STATION,
  CARPOOLING_IS_CHECKED_POLICY,
  CARPOOLING_NOTE,
  CARPOOLING_NUMBER_SEAT,
  CARPOOLING_PRICE_PER_PASSENGER,
  CARPOOLING_TO_STATION,
  isObjectHasValue,
  setToLocalStorage,
  subtractDateTimeToNumberOfHour,
} from "@/helper"
import { useCalcDistance, useCompoundingForm } from "@/hooks"
import {
  CompoundingType,
  CreateCarpoolingCompoundingCar,
  CreateCarpoolingCompoundingForm,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

interface CarpoolingCompoundingFormProps {
  onSubmit?: (params: CreateCarpoolingCompoundingCar) => void
  defaultValues?: CreateCarpoolingCompoundingForm
  type?: "new" | "existed"
  limitNumberSeat?: number
  mode?: "create" | "update" | "confirm"
  disabled?: boolean
  showButon?: boolean
  view?: "page" | "modal"
  labelBtn?: string
  showNote?: boolean
  compoundingType?: CompoundingType
}

export const CarpoolingCompoundingForm = ({
  onSubmit,
  defaultValues,
  mode,
  type = "new",
  limitNumberSeat,
  disabled = false,
  showButon = true,
  view,
  labelBtn,
  showNote = true,
  compoundingType = "compounding",
}: CarpoolingCompoundingFormProps) => {
  const dispatch = useDispatch()
  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    clearErrors,
    formState: { errors },
    control,
  } = useForm<CreateCarpoolingCompoundingForm>({
    resolver: yupResolver(carpoolingCompoundingCarSchema),
    mode: "all",
    defaultValues,
  })
  const { calculateDistanceBetweenTwoCoordinates } = useCalcDistance()
  const { vehicleTypeOptions, seats, calcPriceFromProvinceIds } = useCompoundingForm()

  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [showMap, setShowMap] = useState<boolean>(false)
  const [numberSeat, setNumberSeat] = useState<number>(
    limitNumberSeat || getValues("car_id.number_seat")
  )

  const fromLocationProvince = watch("from_location")
  const fromStationProvince = watch("from_station")
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
        if (errors?.distance) {
          clearErrors("distance")
        }
        setToLocalStorage(CARPOOLING_DISTANCE, distance)
        setToLocalStorage(CARPOOLING_DURATION, duration)
        setValue("distance", distance)
        setValue("duration", duration)
      },
    })
  }

  const handleGetFromLocation = () => {
    if (fromLocationProvince?.province_id) {
      setValue("from_location", undefined)
      console.log(getValues())
      setToLocalStorage(CARPOOLING_FROM_LOCATION, undefined)
      // setPickingUp(false)
    } else {
      setShowAlert(true)
    }
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
        setToLocalStorage(CARPOOLING_PRICE_PER_PASSENGER, data)
      },
    })
  }

  const onSubmitHandler = (data: CreateCarpoolingCompoundingForm) => {
    const params: CreateCarpoolingCompoundingCar = {
      car_id: Number(data.car_id.value),
      compounding_type: "compounding",
      distance: data.distance,
      expected_going_on_date: subtractDateTimeToNumberOfHour(data.expected_going_on_date, 7),
      from_address: data.from_station.address,
      from_latitude: data.from_station.lat + "",
      from_longitude: data.from_station.lng + "",
      to_address: data.to_station.address,
      to_latitude: data.to_station.lat + "",
      to_longitude: data.to_station.lng + "",
      from_province_id: data.from_station.province_id,
      to_province_id: data.to_station.province_id,
      note: data?.note || "",
      from_pick_up_station_id: data.from_station.station_id,
      is_picking_up_from_start: !!data?.from_location?.province_id,
      number_seat: Number(data.number_seat.value),
      to_pick_up_station_id: data.to_station.station_id,
      price_per_passenger: data.price_per_passenger,
      duration: data?.duration || 0,
    }
    onSubmit?.(params)
  }

  return (
    <>
      <form className="carpooling-form" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={`form-item ${disabled ? "pointer-events-none" : ""}`}>
          <div className="mb-8">
            {fromLocationProvince?.province_id && compoundingType === "compounding" ? (
              <LocationField
                disabled={disabled}
                control={control}
                name="from_location"
                onChange={(val) => {
                  setToLocalStorage(CARPOOLING_FROM_LOCATION, val)
                  calcDistance()
                  calcPrice()
                }}
                prevProvinceId={getValues("to_station.province_id")}
                label="Điểm đón"
                placeholder="Điểm đón"
                modalTitle="Chọn điểm đón"
              />
            ) : (
              <StationField
                control={control}
                name="from_station"
                disabled={disabled}
                onChange={(val) => {
                  setToLocalStorage(CARPOOLING_FROM_STATION, val)
                  calcDistance()
                  calcPrice()
                }}
                prevProvinceId={getValues("to_station.province_id")}
                modalTitle="Chọn trạm đón"
                placeholder="Điểm đón"
                label="Điểm đón"
              />
            )}
          </div>

          {compoundingType === "compounding" &&
          !disabled &&
          (fromStationProvince?.province_id || fromLocationProvince?.province_id) ? (
            <div className="flex items-center">
              <InputCheckbox
                type="circle"
                size={20}
                onCheck={handleGetFromLocation}
                isChecked={!!fromLocationProvince?.province_id}
              />
              <p
                className="flex-1 ml-[12px] text-12 cursor-pointer select-none"
                onClick={handleGetFromLocation}
              >
                Đón tận nơi
                <span className=""> (Chi phí phát sinh thêm với tài xế)</span>
              </p>
            </div>
          ) : null}
        </div>

        <StationField
          control={control}
          name="to_station"
          disabled={disabled}
          onChange={(val) => {
            setToLocalStorage(CARPOOLING_TO_STATION, val)
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
            setNumberSeat((val as any).number_seat)
            setToLocalStorage(CARPOOLING_CAR_ID, val)
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
            setToLocalStorage(CARPOOLING_EXPECTED_GOING_ON_DATE, val)
          }}
          disableDate={type === "existed"}
          maxHour={
            type === "existed" ? defaultValues?.expected_going_on_date?.slice(11) : undefined
          }
        />

        <SelectField
          disabled={disabled}
          label="Số hành khách"
          placeholder="Số hành khách"
          name="number_seat"
          maxMenuHeight={140}
          isSearchable={false}
          control={control}
          onChange={(val) => {
            setToLocalStorage(CARPOOLING_NUMBER_SEAT, val)
          }}
          options={seats(limitNumberSeat || numberSeat || 0)}
          required
        />

        {showNote ? (
          <TextareaField
            disabled={disabled}
            control={control}
            name="note"
            readOnly={disabled}
            label="Ghi chú cho chuyến đi"
            placeholder="Ghi chú cho chuyến đi"
            onBlur={(val) => setToLocalStorage(CARPOOLING_NOTE, val)}
          />
        ) : null}

        {mode === "create" && !disabled ? (
          <PolicyField
            className="mb-24"
            defaultValue={getValues("is_checked_policy")}
            control={control}
            name="is_checked_policy"
            onChange={(val) => {
              setToLocalStorage(CARPOOLING_IS_CHECKED_POLICY, val || undefined)
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
            isError={isObjectHasValue(errors)}
            parentClassName={`${view === "page" ? "mt-[40px]" : ""}`}
          />
        ) : null}
      </form>

      <Alert
        show={!!showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={() => {
          setShowAlert(false)
          setShowMap(true)
          // setPickingUp(true)
        }}
        type="info"
        title="Nếu đi ghép, Exxe chỉ có thể cung cấp các trạm đón trên mỗi tỉnh, nếu bạn chọn đón tận nơi, chi phí phát sinh này sẽ được bạn và tài xế giải quyết"
      />

      <Modal
        key="station-modal"
        show={showMap}
        iconType="back"
        onClose={() => setShowMap(false)}
        heading="Chọn Điểm đến tại"
      >
        <Map
          defaultLocation={{
            address: getValues("from_station.address"),
            lat: +getValues("from_station.lat"),
            lng: +getValues("from_station.lng"),
            province_id: getValues("from_station.province_id"),
          }}
          prevProvinceId={getValues("to_station.province_id")}
          onChooseLocation={(location) => {
            setValue("from_location", location)
            setToLocalStorage(CARPOOLING_FROM_LOCATION, location)
            setShowMap(false)
          }}
        />
      </Modal>
    </>
  )
}
