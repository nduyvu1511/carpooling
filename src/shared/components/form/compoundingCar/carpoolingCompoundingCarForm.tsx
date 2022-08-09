/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  ButtonSubmit,
  InputCheckbox,
  InputDateTime,
  InputLocation,
  InputPolicy,
  InputSelect,
  InputStation,
  Map,
  Modal,
} from "@/components"
import { carpoolingCompoundingCarSchema } from "@/core/schema"
import {
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
  formatMoneyVND,
  getHoursName,
  isObjectHasValue,
  setToLocalStorage,
} from "@/helper"
import { useCalcDistance, useCompoundingForm } from "@/hooks"
import {
  CreateCarpoolingCompoundingCar,
  CreateCarpoolingCompoundingForm,
  NumberSeatOptionModel,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
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
  btnLabel?: string
}

export const CarpoolingCompoundingForm = ({
  onSubmit,
  defaultValues,
  mode = "create",
  type = "new",
  limitNumberSeat,
  disabled = false,
  showButon = true,
  view,
  btnLabel,
}: CarpoolingCompoundingFormProps) => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    clearErrors,
    formState: { errors },
    control,
  } = useForm<CreateCarpoolingCompoundingForm>({
    resolver: yupResolver(carpoolingCompoundingCarSchema),
    mode: "onChange",
    defaultValues,
    reValidateMode: "onBlur",
  })
  const { calculateDistanceBetweenTwoCoordinates } = useCalcDistance()
  const { vehicleTypeOptions, seats, calcPriceFromProvinceIds } = useCompoundingForm()
  const [numberSeat, setNumberSeat] = useState<number>(
    limitNumberSeat || getValues("car_id.number_seat")
  )
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [showMap, setShowMap] = useState<boolean>(false)
  const [_, setPickingFromStart] = useState<boolean>()
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
        setToLocalStorage(CARPOOLING_DISTANCE, distance)
        setToLocalStorage(CARPOOLING_DURATION, duration)
        setValue("distance", distance)
        setValue("duration", duration)
      },
    })
  }

  const handleGetFromLocation = () => {
    const value = getValues("from_location")?.province_id
    if (value) {
      setPickingFromStart(false)
      setValue("from_location", undefined)
      setToLocalStorage(CARPOOLING_FROM_LOCATION, undefined)
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
      expected_going_on_date: data.expected_going_on_date,
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

  const handleTogglePolicy = (): boolean | undefined => {
    const isChecked = getValues("is_checked_policy")
    if (!isChecked) {
      clearErrors("is_checked_policy")
      setToLocalStorage(CARPOOLING_IS_CHECKED_POLICY, true)
      return true
    }
    setToLocalStorage(CARPOOLING_IS_CHECKED_POLICY, undefined)
    return
  }

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmitHandler(data)
        })}
      >
        <div className={`form-item ${disabled ? "pointer-events-none" : ""}`}>
          <div className="mb-8">
            {getValues("from_location") ? (
              <InputLocation
                prevProvinceId={getValues("from_location.province_id")}
                isError={!!errors?.from_location}
                type="from"
                defaultValue={getValues("from_location")?.address || ""}
                placeholder="Điểm đi"
                onChange={(location) => {
                  setValue("from_location", location)
                  clearErrors("from_location")
                  setToLocalStorage(CARPOOLING_FROM_LOCATION, location)
                  calcDistance()
                  calcPrice()
                }}
                defaultLocation={getValues("from_location")}
                control={control}
                name="from_location"
              />
            ) : (
              <InputStation
                prevProvinceId={getValues("to_station.province_id")}
                name="from_station"
                control={control}
                onChange={(station) => {
                  if (!station) return
                  setValue("from_station", station)
                  clearErrors("from_station")
                  calcPrice()
                  setToLocalStorage(CARPOOLING_FROM_STATION, station)
                  calcDistance()
                }}
                placeholder="Điểm đi"
                isError={!!errors?.from_station}
                defaultValue={getValues("from_station")}
                type="from"
              />
            )}
          </div>

          {getValues("from_station.province_id") || getValues("from_location.province_id") ? (
            <div className="flex items-center">
              <InputCheckbox
                type="circle"
                size={20}
                onCheck={handleGetFromLocation}
                isChecked={!!getValues("from_location")?.province_id}
              />
              <p
                className="flex-1 ml-[12px] text-12 cursor-pointer"
                onClick={handleGetFromLocation}
              >
                Đón tận nơi
                <span className=""> (Chi phí phát sinh thêm với tài xế)</span>
              </p>
            </div>
          ) : null}
        </div>

        <div className={`form-item ${disabled ? "pointer-events-none" : ""}`}>
          <InputStation
            name="to_station"
            control={control}
            onChange={(location) => {
              if (!location) return
              setToLocalStorage(CARPOOLING_TO_STATION, location)
              setValue("to_station", location)
              clearErrors("to_station")
              calcDistance()
              calcPrice()
            }}
            placeholder="Điểm đến"
            isError={!!errors?.to_station}
            defaultValue={getValues("to_station")}
            prevProvinceId={getValues("from_station.province_id")}
            type="from"
          />

          {durationDistance?.[0] ? (
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

        <div className={`form-item ${disabled ? "pointer-events-none" : ""}`}>
          <InputSelect
            isSearchable={false}
            onChange={(val) => {
              if (getValues("car_id")?.value >= (val as any).number_seat) {
                setValue("car_id", undefined as any)
                dispatch(notify("Vui lòng chọn lại số hành khách", "error"))
              }
              setNumberSeat((val as any).number_seat)
              setToLocalStorage(CARPOOLING_CAR_ID, val)
              calcPrice()
              setValue("car_id", val as NumberSeatOptionModel)
            }}
            control={control}
            defaultValue={getValues("car_id")}
            name="car_id"
            placeholder="Loại xe"
            options={vehicleTypeOptions}
            required
            isError={!!errors?.car_id}
            disabled={type === "existed"}
          />
        </div>

        <div className={`form-item ${disabled ? "pointer-events-none" : ""}`}>
          <InputDateTime
            maxHour={
              type === "existed" ? defaultValues?.expected_going_on_date?.slice(11) : undefined
            }
            control={control}
            name="expected_going_on_date"
            placeholder="Chọn ngày đi"
            defaultValue={getValues("expected_going_on_date")}
            onChange={(val) => {
              setToLocalStorage(CARPOOLING_EXPECTED_GOING_ON_DATE, val)
            }}
            isError={!!errors?.expected_going_on_date}
            disableDate={type === "existed"}
          />
        </div>

        <div className={`form-item ${disabled ? "pointer-events-none" : ""}`}>
          <InputSelect
            isSearchable={false}
            onChange={(val) => {
              if (!val?.value) return
              setToLocalStorage(CARPOOLING_NUMBER_SEAT, val)
              setValue("number_seat", val)
              clearErrors("number_seat")
            }}
            control={control}
            defaultValue={getValues("number_seat")}
            name="number_seat"
            placeholder="Số hành khách"
            options={seats(limitNumberSeat || numberSeat || 0) as NumberSeatOptionModel[]}
            required
            isError={!!errors?.number_seat}
          />
        </div>

        <div className="form-item">
          <label htmlFor="note" className="form-label">
            Ghi chú cho chuyến đi
          </label>

          <textarea
            readOnly={disabled}
            {...register}
            className="form-textarea form-input"
            name="note"
            id="note"
            cols={10}
            rows={3}
            placeholder="Ghi chú thêm cho chuyến đi..."
            defaultValue={getValues("note")}
            onChange={(e) => {
              setValue("note", e.target.value)
              setToLocalStorage(CARPOOLING_NOTE, e.target.value)
            }}
          ></textarea>
        </div>

        {mode === "create" && !disabled ? (
          <div className={`form-item mb-[24px] ${disabled ? "pointer-events-none" : ""}`}>
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

        {view === "page" ? <div className="md:mt-[40px]"></div> : null}

        {onSubmit && showButon ? (
          <ButtonSubmit
            view={view}
            title={
              btnLabel || (mode === "create" ? "Tiếp tục" : mode === "confirm" ? "Xác nhận" : "Lưu")
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
        }}
        type="info"
        desc="Nếu đi ghép, Exxe chỉ có thể cung cấp các trạm đón trên mỗi tỉnh, nếu bạn chọn đón tận nơi, chi phí phát sinh này sẽ được bạn và tài xế giải quyết"
      />

      <Modal
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
            setPickingFromStart(true)
            setToLocalStorage(CARPOOLING_FROM_LOCATION, location)
            setShowMap(false)
          }}
        />
      </Modal>
    </>
  )
}
