import { roundToHalf } from "@/helper"
import { useCalcDistance } from "@/hooks"
import { CarIdType, CompoundingType, GetPriceListReq, GetPriceListUnitRes } from "@/models"
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
  const [fromDate, setFromDate] = useState<string>(moment().format("YYYY-MM-DD"))
  const [toDate, setToDate] = useState<string>()
  const [carType, setCarType] = useState<CarIdType>()
  const [result, setResult] = useState<number | undefined>()
  const [distance, setDistance] = useState<number>()
  const [minNumberOfDays, setMinNumberOfDays] = useState<number>(0)
  const [isLoading, setLoading] = useState<boolean>()
  const [priceUnit, setPriceUnit] = useState<GetPriceListUnitRes | undefined>()
  const numberOfDays =
    toDate && fromDate && compoundingType === "two_way"
      ? moment(toDate).diff(moment(fromDate), "days")
      : undefined

  const { data } = useSWR("compute_price_unit", () =>
    rideAPI.getComputePriceUnit().then((res) => res?.result?.data)
  )

  const getPriceUnitFormula = async (params: Partial<GetPriceListReq>) => {
    if (!params?.distance || !params?.going_on_date) return

    if (
      params.distance === distance &&
      params.going_on_date === fromDate &&
      priceUnit?.price_unit?.length
    ) {
      return priceUnit
    }

    setLoading(true)
    try {
      const res = await rideAPI.getPriceList(params as GetPriceListReq)
      const data = res?.result?.data
      setLoading(false)
      setPriceUnit(data)
      return data
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const calculatePrice = async (params: calculatePriceParams) => {
    if (result) {
      setResult(undefined)
    }

    const { carType, fromDate, toDate, compoundingType, distance: _distance } = params
    const newDistance = _distance || distance
    const priceFormula = await getPriceUnitFormula({
      distance: newDistance,
      going_on_date: fromDate,
    })

    if (
      !newDistance ||
      !fromDate ||
      !carType ||
      !compoundingType ||
      (compoundingType === "two_way" && !toDate)
    )
      return

    const priceUnits = priceFormula?.price_unit || []
    const priceUnit = priceUnits.find(
      (item) => item.car_id.car_id === carType?.value && item.compounding_type === compoundingType
    )
    if (!priceUnit) {
      dispatch(notify("Không tìm thấy bảng giá nào", "info"))
      return
    }

    const { first_day, price_unit_in_day, waiting_charge_per_day } = priceUnit

    let newResult = price_unit_in_day

    if (toDate && compoundingType === "two_way") {
      const dateRange = moment(toDate).diff(moment(fromDate), "days") + 1
      let numberOfWaitingDays = dateRange
      // let numberOfWaitingDays = dateRange > 1 ? dateRange : 1
      if ((distance || 0) <= (data?.max_distance_traveling_in_day || 0)) {
        numberOfWaitingDays -= 1
      } else {
        numberOfWaitingDays -= roundToHalf((distance || 0) / (data?.number_km_per_day || 0))
      }

      // let numberOfWaitingDays = dateRange > 0 ? dateRange + 1 : dateRange
      // if ((distance || 0) > (data?.max_distance_traveling_in_day || 0)) {
      //   numberOfWaitingDays -= roundToHalf((distance || 0) / (data?.number_km_per_day || 0))
      // }

      // (dateRange > 0 ? dateRange + 1 : dateRange) -
      // roundToHalf((distance || 0) / (data?.number_km_per_day || 0))

      console.log({ numberOfWaitingDays })

      if (numberOfWaitingDays >= 1) {
        newResult += first_day
      }

      if (numberOfWaitingDays > 1) {
        newResult += (numberOfWaitingDays - 1) * waiting_charge_per_day
      }
    }
    setResult(newResult)
  }

  const handleSetMinNumberOfDays = (
    _distance = distance || 0,
    _compoundingType = compoundingType
  ) => {
    const days =
      _distance > (data?.max_distance_traveling_in_day || 0)
        ? // (_compoundingType === "two_way" ? _distance * 2 : _distance) /
          Math.ceil((_distance * 2) / (data?.number_km_per_day || 550))
        : 0

    const newDays = days > 0 ? days - 1 : days

    setMinNumberOfDays(newDays)
    if (newDays > (numberOfDays || 0)) {
      setToDate(undefined)
      calculatePrice({ toDate: undefined })
    }

    return newDays
  }

  const handleSetNumberOfDays = (days: number) => {
    if (days < minNumberOfDays) return

    let newFromDate = fromDate
    if (!fromDate) {
      const newDate = moment().format("YYYY-MM-DD")
      newFromDate = newDate
      setFromDate(newDate)
    }

    let type = compoundingType
    if (compoundingType !== "two_way") {
      type = "two_way"
      setCompoundingType("two_way")
    }

    const newToDate = moment(newFromDate).add(days, "days").format("YYYY-MM-DD")
    setToDate(newToDate)
    calculatePrice({
      carType,
      compoundingType: type,
      distance,
      fromDate: newFromDate,
      toDate: newToDate,
    })
  }

  const calculateDistance = (origin?: LocationSearch, destination?: LocationSearch) => {
    if (!origin || !destination) return

    calculateDistanceBetweenTwoCoordinates({
      params: { destination, origin },
      onSuccess: ({ distance }) => {
        setDistance(distance)
        handleSetMinNumberOfDays(distance)
        calculatePrice({ carType, fromDate, toDate, compoundingType, distance })
      },
    })
  }

  const handleSetCompoundingType = (type: CompoundingType) => {
    if (type === compoundingType) return

    const minNumberOfDays = handleSetMinNumberOfDays(distance, type)
    let newToDate = toDate
    if (type === "two_way" && fromDate) {
      newToDate = moment(fromDate).add(minNumberOfDays, "days").format("YYYY-MM-DD")
      setToDate(newToDate)
    }
    setCompoundingType(type)
    calculatePrice({
      carType,
      compoundingType: type,
      fromDate,
      toDate: newToDate,
    })
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

    setFromDate(date)

    let newToDate: string | undefined = toDate
    if (toDate) {
      if (moment(date).add(minNumberOfDays, "days").isSameOrAfter(moment(toDate))) {
        newToDate = undefined
        setToDate(undefined)
      }
    }

    calculatePrice({
      carType,
      compoundingType,
      fromDate: date,
      toDate: newToDate,
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
    fuelPriceUnit: {
      gasoline_consumption_per_km: priceUnit?.gasoline_consumption_per_km,
      gasoline_price_unit: priceUnit?.gasoline_price_unit,
      petroleum_consumption_per_km: priceUnit?.gasoline_consumption_per_km,
      petroleum_price_unit: priceUnit?.petroleum_price_unit,
    } as FuelPriceUnit,
    minNumberOfDays,
    service_fee_percent: data?.service_fee_percent,
    person_income_tax: data?.person_income_tax,
    numberKmPerDay: data?.number_km_per_day,
    vat_fee_percent: data?.vat_fee_percent,
    handleSetNumberOfDays,
    calculateDistance,
    handleSetCompoundingType,
    handleSelectVehicle,
    handleSetFromLocation,
    handleSetToLocation,
    handleSetFromDate,
    handleSetToDate,
  }
}
