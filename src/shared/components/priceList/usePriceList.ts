import { useCalcDistance, useCompoundingForm } from "@/hooks"
import { CarIdType, CompoundingType } from "@/models"
import { rideAPI } from "@/services"
import moment from "moment"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import useSWR from "swr"
import { LocationSearch } from "./inputLocation"

interface calculatePriceParams {
  fromDate?: string
  toDate?: string
  carType?: CarIdType
  compoundingType?: CompoundingType
  distance?: number
}

export type FuelPriceUnit = {
  gasoline_consumption_per_km: number
  gasoline_price_unit: number
  petroleum_consumption_per_km: number
  petroleum_price_unit: number
}

export const usePriceList = () => {
  const dispatch = useDispatch()
  const { calculateDistanceBetweenTwoCoordinates } = useCalcDistance()
  const [fromLocation, setFromLocation] = useState<LocationSearch>()
  const [toLocation, setToLocation] = useState<LocationSearch>()
  const [compoundingType, setCompoundingType] = useState<CompoundingType>()
  const [fromDate, setFromDate] = useState<string>()
  const [toDate, setToDate] = useState<string>()
  const [carType, setCarType] = useState<CarIdType>()
  const [result, setResult] = useState<number | undefined>()
  const [distance, setDistance] = useState<number>()
  const [numberOfDays, setNumberOfDays] = useState<number>(0)
  const [isLoading, setLoading] = useState<boolean>()
  const [fuelPriceUnit, setFuelPriceUnit] = useState<FuelPriceUnit>()

  const { data } = useSWR("compute_price_unit", () =>
    rideAPI.getComputePriceUnit().then((res) => res?.result?.data)
  )

  const checkToResetToDate = (date: string, numberOfDays: number, cb?: () => void) => {
    if (toDate) {
      if (moment(date).add(numberOfDays, "days").isSameOrAfter(moment(toDate))) {
        setToDate(undefined)
        setResult(undefined)
        cb?.()
      }
    }
  }

  const handleSetNumberOfDays = (numberOfDays: number, cb?: () => void) => {
    setNumberOfDays(numberOfDays)
    if (fromDate) {
      checkToResetToDate(fromDate, numberOfDays, cb)
    }
  }

  const calculateDistance = (origin?: LocationSearch, destination?: LocationSearch) => {
    if (!origin || !destination) return

    calculateDistanceBetweenTwoCoordinates({
      params: { destination, origin },
      onSuccess: ({ distance }) => {
        setDistance(distance)
        calculatePrice({ carType, fromDate, toDate, compoundingType, distance })

        let numberOfDays = Math.ceil(distance / (data?.number_km_per_day || 550))
        if (compoundingType === "two_way") {
          numberOfDays *= 2
        }
        handleSetNumberOfDays(numberOfDays)
      },
    })
  }

  const handleSetCompoundingType = (type: CompoundingType) => {
    if (type === compoundingType) return

    let newNumberOfDays = numberOfDays
    if (compoundingType === "two_way") {
      newNumberOfDays /= 2
      setNumberOfDays(newNumberOfDays)
    }

    let newToDate = toDate
    if (type === "two_way") {
      if (result) {
        setResult(undefined)
      }
      if (newNumberOfDays) {
        handleSetNumberOfDays(newNumberOfDays * 2, () => {
          newToDate = undefined
        })
      }
    }

    calculatePrice({
      carType,
      compoundingType: type,
      fromDate,
      toDate: newToDate,
    })

    setCompoundingType(type)
  }

  const handleSelectVehicle = (item: CarIdType) => {
    if (item.value === carType?.value) return

    setCarType(item)
    calculatePrice({
      carType: item,
      compoundingType,
      fromDate,
      toDate,
    })
  }

  const handleSetFromLocation = (val: LocationSearch) => {
    if (val.lat === fromLocation?.lat && val?.lng === fromLocation?.lat) return

    setFromLocation(val)
    calculateDistance(val, toLocation)
  }

  const handleSetToLocation = (val: LocationSearch) => {
    if (val.lat === toLocation?.lat && val?.lng === toLocation?.lat) return

    setToLocation(val)
    calculateDistance(fromLocation, val)
  }

  const handleSetFromDate = (date: string) => {
    if (date === fromDate) return

    checkToResetToDate(date, numberOfDays)
    setFromDate(date)
    calculatePrice({
      carType,
      compoundingType,
      fromDate: date,
      toDate,
    })
  }

  const handleSetToDate = (date: string) => {
    if (date === toDate) return

    setToDate(date)
    calculatePrice({
      carType,
      compoundingType,
      fromDate,
      toDate: date,
    })
  }

  const calculatePrice = async (params: calculatePriceParams) => {
    const { carType, fromDate, toDate, compoundingType, distance: _distance } = params

    const newDistance = _distance || distance

    if (
      !newDistance ||
      !fromDate ||
      !carType ||
      !compoundingType ||
      (compoundingType === "two_way" && !toDate) ||
      !numberOfDays
    )
      return

    try {
      setLoading(true)
      const res = await rideAPI.getPriceList({
        distance: newDistance,
        going_on_date: fromDate,
      })
      const data = res?.result?.data
      setFuelPriceUnit({
        gasoline_price_unit: data?.gasoline_price_unit,
        petroleum_price_unit: data?.petroleum_price_unit,
        gasoline_consumption_per_km: data?.gasoline_consumption_per_km,
        petroleum_consumption_per_km: data.petroleum_consumption_per_km,
      })
      const priceUnits = data?.price_unit || []
      const priceUnit = priceUnits.find(
        (item) => item.car_id.car_id === carType?.value && item.compounding_type === compoundingType
      )
      if (!priceUnit) {
        dispatch(notify("Không tìm thấy bảng giá nào", "info"))
        return
      }

      const { first_day, price_unit_in_day, waiting_charge_per_day } = priceUnit
      const numberOfDays = moment(toDate).diff(moment(fromDate), "days")
      const result =
        price_unit_in_day +
        first_day +
        ((numberOfDays > 0 ? numberOfDays : 0) - 1) * waiting_charge_per_day

      setResult(result)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return {
    fromLocation,
    toLocation,
    compoundingType,
    fromDate,
    toDate,
    carType,
    result,
    distance,
    numberOfDays,
    isLoading,
    fuelPriceUnit,
    checkToResetToDate,
    handleSetNumberOfDays,
    calculateDistance,
    handleSetCompoundingType,
    handleSelectVehicle,
    handleSetFromLocation,
    handleSetToLocation,
    handleSetFromDate,
    handleSetToDate,
    service_fee_percent: data?.service_fee_percent,
    person_income_tax: data?.person_income_tax,
  }
}
