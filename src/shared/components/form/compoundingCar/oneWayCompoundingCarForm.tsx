/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonSubmit } from "@/components/buttons"
import { oneWayCompoundingCarSchema } from "@/core/schema"
import {
  formatMoneyVND,
  ONE_WAY_CAR_ID,
  ONE_WAY_DISTANCE,
  ONE_WAY_EXPECTED_GOING_ON_DATE,
  ONE_WAY_FROM_LOCATION,
  ONE_WAY_IS_CHECKED_POLICY,
  ONE_WAY_NOTE,
  ONE_WAY_PRICE,
  ONE_WAY_TO_LOCATION,
  setToLocalStorage,
} from "@/helper"
import { useCalcDistance, useCompoundingForm } from "@/hooks"
import { CreateOneWayCompoundingCar, CreateOneWayCompoundingCarForm } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { InputDateTime, InputLocation, InputPolicy, InputSelect } from "../../inputs"

interface OneWayCompoundingFormProps {
  onSubmit?: (params: CreateOneWayCompoundingCar) => void
  defaultValues?: CreateOneWayCompoundingCarForm
  mode?: "create" | "update" | "confirm"
  viewButtonModal?: boolean
  disabled?: boolean
}

export const OneWayCompoundingForm = ({
  onSubmit,
  defaultValues,
  mode = "create",
  viewButtonModal = true,
  disabled = false,
}: OneWayCompoundingFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm<CreateOneWayCompoundingCarForm>({
    resolver: yupResolver(oneWayCompoundingCarSchema),
    mode: "all",
    defaultValues,
  })
  const { calculateDistanceBetweenTwoCoordinates } = useCalcDistance()
  const { vehicleTypeOptions, calcPriceFromProvinceIds } = useCompoundingForm()
  const [distance, setDistance] = useState<number>(getValues("distance"))
  const [price, setPrice] = useState<number>(getValues("price") || 0)
  // Get Distance
  const calcDistance = () => {
    const fromLocation = getValues("from_location")
    const toLocation = getValues("to_location")
    if (!fromLocation?.province_id || !toLocation?.province_id) return

    calculateDistanceBetweenTwoCoordinates({
      params: {
        origin: { lat: +fromLocation.lat, lng: +fromLocation.lng },
        destination: { lat: +toLocation.lat, lng: +toLocation.lng },
      },
      onSuccess: (distance) => {
        setDistance(distance)
        setToLocalStorage(ONE_WAY_DISTANCE, distance)
        setValue("distance", distance)
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
        setPrice(data)
      },
    })
  }

  const onSubmitHandler = (data: CreateOneWayCompoundingCarForm) => {
    const params: CreateOneWayCompoundingCar = {
      car_id: Number(data.car_id.value),
      compounding_type: "one_way",
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
    }

    onSubmit?.(params)
  }

  const handleTogglePolicy = (): boolean | undefined => {
    const isChecked = getValues("is_checked_policy")
    if (!isChecked) {
      clearErrors("is_checked_policy")
      setToLocalStorage(ONE_WAY_IS_CHECKED_POLICY, true)
      return true
    }
    setToLocalStorage(ONE_WAY_IS_CHECKED_POLICY, undefined)
    return
  }

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmitHandler(data)
      })}
      className="rides__form"
    >
      <div className="">
        <div className={`${disabled ? "pointer-events-none" : ""}`}>
          <div className="form-item">
            <InputLocation
              prevProvinceId={getValues("to_location.province_id")}
              isError={!!errors?.from_location}
              type="from"
              defaultValue={getValues("from_location")?.address || ""}
              placeholder="Điểm đi"
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

          <div className="form-item">
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

            <div className="mt-[8px] flex items-center text-xs justify-between">
              {price ? <p className="">Giá: {formatMoneyVND(price)}</p> : null}
              {distance ? <p className="">Quãng đường: {distance.toFixed(2)}km</p> : null}
            </div>
          </div>
        </div>

        <div className="form-item">
          <InputSelect
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

        <div className="form-item">
          <InputDateTime
            control={control}
            name="expected_going_on_date"
            placeholder="Thời gian đi"
            defaultValue={defaultValues?.expected_going_on_date || ""}
            onChange={(val) => {
              setToLocalStorage(ONE_WAY_EXPECTED_GOING_ON_DATE, val)
            }}
            isError={!!errors?.expected_going_on_date}
          />
        </div>

        <div className="form-item">
          <label htmlFor="note" className="form-label">
            Ghi chú cho chuyến đi
          </label>

          <textarea
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
              calcPrice()
            }}
          ></textarea>
        </div>

        {mode === "create" ? (
          <div className="mb-[40px]">
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

        {!viewButtonModal ? <div className="mt-24"></div> : null}
      </div>

      {onSubmit ? (
        <ButtonSubmit
          view={viewButtonModal ? "modal" : "page"}
          title={mode === "create" ? "Tiếp tục" : mode === "confirm" ? "Xác nhận" : "Lưu"}
          isError={!isValid}
        />
      ) : null}
    </form>
  )
}
