import { RootState } from "@/core/store"
import {
  CARPOOLING_CAR_ID,
  CARPOOLING_DISTANCE,
  CARPOOLING_DURATION,
  CARPOOLING_EXPECTED_GOING_ON_DATE,
  CARPOOLING_FROM_LOCATION,
  CARPOOLING_FROM_PICK_UP_STATION_ID,
  CARPOOLING_FROM_STATION,
  CARPOOLING_IS_CHECKED_POLICY,
  CARPOOLING_IS_PICKING_UP_FROM_START,
  CARPOOLING_NOTE,
  CARPOOLING_NUMBER_SEAT,
  CARPOOLING_PRICE_PER_PASSENGER,
  CARPOOLING_TO_STATION,
  CONVENIENT_CAR_ID,
  CONVENIENT_DISTANCE,
  CONVENIENT_DURATION,
  CONVENIENT_EXPECTED_GOING_ON_DATE,
  CONVENIENT_FROM_STATION,
  CONVENIENT_IS_CHECKED_POLICY,
  CONVENIENT_NOTE,
  CONVENIENT_PRICE_PER_PASSENGER,
  CONVENIENT_TO_STATION,
  getFromSessionStorage,
  hoursBackList,
  ONE_WAY_CAR_ID,
  ONE_WAY_DISTANCE,
  ONE_WAY_DURATION,
  ONE_WAY_EXPECTED_GOING_ON_DATE,
  ONE_WAY_FROM_LOCATION,
  ONE_WAY_IS_CHECKED_POLICY,
  ONE_WAY_NOTE,
  ONE_WAY_PRICE,
  ONE_WAY_TO_LOCATION,
  setToSessionStorage,
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
import {
  CarIdType,
  CompoundingCarCustomer,
  CompoundingCarRes,
  CreateCarpoolingCompoundingForm,
  CreateCommonCompoundingForm,
  CreateConvenientCompoundingForm,
  CreateOneWayCompoundingCarForm,
  CreateTwoWayCompoundingCarForm,
  OptionType,
} from "@/models"
import { userAPI } from "@/services"
import { AxiosResponse } from "axios"
import moment from "moment"
import { useSelector } from "react-redux"

export interface CalcPriceParams {
  params: { to_province_id: number; from_province_id: number; car_id: number }
  onSuccess: (params: number) => void
  onErr?: Function
}

interface Res {
  vehicleTypeOptions: CarIdType[]
  seats: (limit: number) => OptionType[]
  clearOneWayForm: Function
  clearTwoWayForm: Function
  clearCarpoolingForm: Function
  clearConvenientForm: Function
  calcPriceFromProvinceIds: (params: CalcPriceParams) => void
  compoundingCarCustomerResToCarpoolingForm: (
    _: CompoundingCarCustomer
  ) => CreateCarpoolingCompoundingForm
  compoundingCarCustomerResToTwoWayForm: (
    _: CompoundingCarCustomer
  ) => CreateTwoWayCompoundingCarForm
  compoundingCarCustomerResToOneWayForm: (
    _: CompoundingCarCustomer
  ) => CreateOneWayCompoundingCarForm
  getCarpoolingFormFromStorage: () => CreateCarpoolingCompoundingForm
  getTwoWayFormFromStorage: () => CreateTwoWayCompoundingCarForm
  getOneWayFormFromStorage: () => CreateOneWayCompoundingCarForm
  getConvenientFormFromStorage: () => CreateConvenientCompoundingForm
  compoundingCarResToCarpoolingForm: (_: CompoundingCarRes) => CreateCarpoolingCompoundingForm
  compoundingCarResToOneWayForm: (_: CompoundingCarRes) => CreateOneWayCompoundingCarForm
  compoundingCarResToTwoWayForm: (_: CompoundingCarRes) => CreateTwoWayCompoundingCarForm
  compoundingCarResToConvenientForm: (_: CompoundingCarRes) => CreateConvenientCompoundingForm
}

export const useCompoundingForm = (): Res => {
  const vehicleTypes = useSelector((state: RootState) => state.compoundingCarData.vehicleTypes)

  const seats = (limit: number) =>
    Array.from({
      length: limit,
    }).map((_, index) => ({
      label: `${index + 1}`,
      value: index + 1,
    }))

  const clearOneWayForm = () => {
    setToSessionStorage(ONE_WAY_FROM_LOCATION, undefined)
    setToSessionStorage(ONE_WAY_DISTANCE, undefined)
    setToSessionStorage(ONE_WAY_TO_LOCATION, undefined)
    setToSessionStorage(ONE_WAY_CAR_ID, undefined)
    setToSessionStorage(ONE_WAY_EXPECTED_GOING_ON_DATE, undefined)
    setToSessionStorage(ONE_WAY_NOTE, undefined)
    setToSessionStorage(ONE_WAY_IS_CHECKED_POLICY, undefined)
    setToSessionStorage(ONE_WAY_PRICE, undefined)
    setToSessionStorage(ONE_WAY_DURATION, undefined)
  }

  const clearTwoWayForm = () => {
    setToSessionStorage(TWO_WAY_FROM_LOCATION, undefined)
    setToSessionStorage(TWO_WAY_DISTANCE, undefined)
    setToSessionStorage(TWO_WAY_PRICE, undefined)
    setToSessionStorage(TWO_WAY_TO_LOCATION, undefined)
    setToSessionStorage(TWO_WAY_CAR_ID, undefined)
    setToSessionStorage(TWO_WAY_EXPECTED_GOING_ON_DATE, undefined)
    setToSessionStorage(TWO_WAY_NOTE, undefined)
    setToSessionStorage(TWO_WAY_IS_A_DAY_TOUR, undefined)
    setToSessionStorage(TWO_WAY_HOUR_OF_WAIT_TIME, undefined)
    setToSessionStorage(TWO_WAY_IS_CHECKED_POLICY, undefined)
    setToSessionStorage(TWO_WAY_EXPECTED_PICKING_UP_DATE, undefined)
    setToSessionStorage(TWO_WAY_DURATION, undefined)
  }

  const clearCarpoolingForm = () => {
    setToSessionStorage(CARPOOLING_FROM_STATION, undefined)
    setToSessionStorage(CARPOOLING_FROM_PICK_UP_STATION_ID, undefined)
    setToSessionStorage(CARPOOLING_DISTANCE, undefined)
    setToSessionStorage(CARPOOLING_TO_STATION, undefined)
    setToSessionStorage(CARPOOLING_CAR_ID, undefined)
    setToSessionStorage(CARPOOLING_EXPECTED_GOING_ON_DATE, undefined)
    setToSessionStorage(CARPOOLING_NOTE, undefined)
    setToSessionStorage(CARPOOLING_IS_CHECKED_POLICY, undefined)
    setToSessionStorage(CARPOOLING_PRICE_PER_PASSENGER, undefined)
    setToSessionStorage(CARPOOLING_NUMBER_SEAT, undefined)
    setToSessionStorage(CARPOOLING_IS_PICKING_UP_FROM_START, undefined)
    setToSessionStorage(CARPOOLING_IS_PICKING_UP_FROM_START, undefined)
    setToSessionStorage(CARPOOLING_DURATION, undefined)
  }

  const clearConvenientForm = () => {
    setToSessionStorage(CONVENIENT_CAR_ID, undefined)
    setToSessionStorage(CONVENIENT_DISTANCE, undefined)
    setToSessionStorage(CONVENIENT_DURATION, undefined)
    setToSessionStorage(CONVENIENT_EXPECTED_GOING_ON_DATE, undefined)
    setToSessionStorage(CONVENIENT_FROM_STATION, undefined)
    setToSessionStorage(CONVENIENT_IS_CHECKED_POLICY, undefined)
    setToSessionStorage(CONVENIENT_NOTE, undefined)
    setToSessionStorage(CONVENIENT_PRICE_PER_PASSENGER, undefined)
    setToSessionStorage(CONVENIENT_TO_STATION, undefined)
  }

  const calcPriceFromProvinceIds = async (params: CalcPriceParams) => {
    const {
      params: { car_id, from_province_id, to_province_id },
      onSuccess,
      onErr,
    } = params
    try {
      const res: AxiosResponse<any> = await userAPI.getCarPriceUnit({
        car_id,
        from_province_id,
        to_province_id,
      })

      if (res?.result?.code !== 200) {
        onErr && onErr()
        return
      }
      const price = Number(res?.result?.data?.[0]?.price_unit)
      onSuccess(price || 0)
    } catch (error) {
      onErr && onErr()
      console.log(error)
    }
  }

  const compoundingCarCustomerResToCarpoolingForm = (
    data: CompoundingCarCustomer
  ): CreateCarpoolingCompoundingForm => {
    return {
      car_id: {
        label: data.car.name,
        value: data.car.car_id,
        number_seat: data.car.number_seat,
      },
      distance: data.distance,
      expected_going_on_date: data.expected_going_on_date,
      from_location: undefined,
      is_checked_policy: true,
      note: data?.note || "",
      price_per_passenger: data.amount_total,
      from_station: {
        address: data?.from_address,
        lat: data?.from_latitude,
        lng: data?.from_longitude,
        province_name: data?.from_province?.province_name,
        province_id: data?.from_province?.province_id,
        station_id: data?.from_pick_up_station?.station_id,
        station_name: data?.to_address || data?.from_pick_up_station?.station_name,
      },
      to_station: {
        address: data?.to_address,
        lat: data?.from_latitude + "",
        lng: data?.from_longitude + "",
        province_name: data?.to_province?.province_name,
        province_id: data?.to_province?.province_id,
        station_id: data?.to_pick_up_station?.station_id,
        station_name: data?.from_address || data?.to_pick_up_station?.station_name,
      },
      number_seat: {
        label: data.number_seat + "",
        value: data.number_seat,
      },
      duration: data.duration,
    }
  }

  const commonCompoundingParams = (data: CompoundingCarCustomer): CreateCommonCompoundingForm => {
    return {
      car_id: {
        label: data.car.name,
        value: data.car.car_id,
      },
      distance: data.distance,
      expected_going_on_date: data.expected_going_on_date,
      from_location: {
        address: data.from_address,
        lat: Number(data.from_latitude),
        lng: Number(data.from_longitude),
        province_id: Number(data.from_province.province_id),
      },
      to_location: {
        address: data.to_address,
        lat: Number(data.to_latitude),
        lng: Number(data.to_longitude),
        province_id: Number(data.to_province.province_id),
      },
      is_checked_policy: true,
      note: data?.note || "",
      duration: data.duration,
      price: data.price_unit.price_unit,
    }
  }

  const compoundingCarCustomerResToTwoWayForm = (
    data: CompoundingCarCustomer
  ): CreateTwoWayCompoundingCarForm => {
    const { expected_going_on_date, expected_picking_up_date } = data
    let is_a_day_tour = data.is_a_day_tour
    let hour_of_wait_time: OptionType | undefined = undefined

    if (moment(expected_going_on_date).isSame(expected_picking_up_date, "day")) {
      is_a_day_tour = true

      const hours =
        moment(expected_picking_up_date).get("hour") - moment(expected_going_on_date).get("hour")
      hour_of_wait_time = hoursBackList.find((item) => item.time >= hours)
    }

    return {
      ...commonCompoundingParams(data),
      is_a_day_tour,
      expected_picking_up_date: (data?.expected_picking_up_date || undefined) as string,
      hour_of_wait_time,
    }
  }

  const compoundingCarCustomerResToOneWayForm = (
    compoundingCar: CompoundingCarCustomer
  ): CreateOneWayCompoundingCarForm => {
    return commonCompoundingParams(compoundingCar)
  }

  const compoundingCarResToCarpoolingForm = (
    compoundingCar: CompoundingCarRes
  ): CreateCarpoolingCompoundingForm => {
    const {
      from_address,
      from_latitude,
      from_longitude,
      to_latitude,
      to_longitude,
      from_province,
      to_province,
    } = compoundingCar

    return {
      from_station: {
        address: from_address,
        lat: from_latitude,
        lng: from_longitude,
        province_id: from_province.province_id,
        province_name: from_province?.province_name,
        station_id: compoundingCar.from_pick_up_station?.station_id,
        station_name: compoundingCar.from_pick_up_station?.station_name,
      },
      number_seat: {
        label: `${compoundingCar.number_seat_in_car - compoundingCar.number_available_seat}`,
        value: compoundingCar.number_seat_in_car - compoundingCar.number_available_seat,
      },
      price_per_passenger: compoundingCar?.price_unit?.price_unit,
      car_id: {
        label: compoundingCar.car.name,
        number_seat: compoundingCar.car.number_seat,
        value: compoundingCar.car.car_id,
      },
      expected_going_on_date: compoundingCar.expected_going_on_date,
      is_checked_policy: true,
      to_station: {
        address: compoundingCar.to_address,
        lat: to_latitude,
        lng: to_longitude,
        province_id: to_province.province_id,
        province_name: to_province.province_name,
        station_id: compoundingCar.to_pick_up_station?.station_id,
        station_name: compoundingCar.to_pick_up_station?.station_name,
      },
      note: compoundingCar.note,
      distance: compoundingCar.distance,
      duration: compoundingCar?.duration || 0,
    }
  }

  const compoundingCarResToConvenientForm = (
    compoundingCar: CompoundingCarRes
  ): CreateConvenientCompoundingForm => {
    const {
      from_address,
      from_latitude,
      from_longitude,
      to_latitude,
      to_longitude,
      from_province,
      to_province,
    } = compoundingCar

    return {
      from_station: {
        address: from_address,
        lat: from_latitude,
        lng: from_longitude,
        province_id: from_province.province_id,
        province_name: from_province?.province_name,
        station_id: compoundingCar.from_pick_up_station?.station_id,
        station_name: compoundingCar.from_pick_up_station?.station_name,
      },
      price_per_passenger: compoundingCar?.price_unit?.price_unit,
      car_id: {
        label: compoundingCar.car.name,
        number_seat: compoundingCar.car.number_seat,
        value: compoundingCar.car.car_id,
      },
      expected_going_on_date: compoundingCar.expected_going_on_date,
      is_checked_policy: true,
      to_station: {
        address: compoundingCar.to_address,
        lat: to_latitude,
        lng: to_longitude,
        province_id: to_province.province_id,
        province_name: to_province.province_name,
        station_id: compoundingCar.to_pick_up_station?.station_id,
        station_name: compoundingCar.to_pick_up_station?.station_name,
      },
      note: compoundingCar.note,
      distance: compoundingCar.distance,
      duration: compoundingCar?.duration || 0,
    }
  }

  const compoundingCarResToOneWayForm = (
    compoundingCar: CompoundingCarRes
  ): CreateOneWayCompoundingCarForm => {
    const {
      note,
      distance,
      price_unit: { price_unit: price },
      from_address,
      to_address,
      from_province,
      to_province,
      duration,
      from_latitude,
      from_longitude,
      to_latitude,
      to_longitude,
    } = compoundingCar

    return {
      price,
      car_id: {
        label: compoundingCar.car.name,
        value: compoundingCar.car.car_id,
      },
      expected_going_on_date: compoundingCar.expected_going_on_date,
      is_checked_policy: true,
      note,
      distance,
      from_location: {
        address: from_address || from_province.province_name,
        lat: Number(from_latitude) || 0,
        lng: Number(from_longitude) || 0,
        province_id: from_province.province_id,
      },
      to_location: {
        address: to_address || to_province.province_name,
        lat: Number(to_latitude) || 0,
        lng: Number(to_longitude) || 0,
        province_id: to_province.province_id,
      },
      duration,
    }
  }

  const compoundingCarResToTwoWayForm = (
    data: CompoundingCarRes
  ): CreateTwoWayCompoundingCarForm => {
    const {
      note,
      distance,
      price_unit: { price_unit: price },
      from_address,
      to_address,
      from_province,
      to_province,
      duration,
      from_latitude,
      from_longitude,
      to_latitude,
      to_longitude,
      expected_going_on_date,
      expected_picking_up_date,
    } = data

    let is_a_day_tour = data.is_a_day_tour
    let hour_of_wait_time: OptionType | undefined = undefined

    if (moment(expected_going_on_date).isSame(expected_picking_up_date, "day")) {
      is_a_day_tour = true

      const hours =
        moment(expected_picking_up_date).get("hour") - moment(expected_going_on_date).get("hour")
      hour_of_wait_time = hoursBackList.find((item) => item.time >= hours)
    }

    return {
      from_location: {
        address: from_address || from_province?.province_name,
        lat: Number(from_latitude) || 0,
        lng: Number(from_longitude) || 0,
        province_id: from_province.province_id,
      },
      to_location: {
        address: to_address || to_province?.province_name,
        lat: Number(to_latitude) || 0,
        lng: Number(to_longitude) || 0,
        province_id: to_province.province_id,
      },
      car_id: {
        label: data.car.name,
        value: data.car.car_id,
      },
      price,
      expected_going_on_date,
      expected_picking_up_date,
      is_checked_policy: true,
      note,
      distance,
      duration,
      is_a_day_tour,
      hour_of_wait_time,
    }
  }

  const getCarpoolingFormFromStorage = (): CreateCarpoolingCompoundingForm => {
    const dateFromLocalStorage = getFromSessionStorage(CARPOOLING_EXPECTED_GOING_ON_DATE)
    const isAfter = moment().isAfter(moment(dateFromLocalStorage))
    if (isAfter) {
      setToSessionStorage(CARPOOLING_EXPECTED_GOING_ON_DATE, undefined)
    }
    const expected_going_on_date = isAfter ? undefined : dateFromLocalStorage

    return {
      car_id: getFromSessionStorage(CARPOOLING_CAR_ID),
      distance: getFromSessionStorage(CARPOOLING_DISTANCE),
      expected_going_on_date,
      from_station: getFromSessionStorage(CARPOOLING_FROM_STATION),
      to_station: getFromSessionStorage(CARPOOLING_TO_STATION),
      is_checked_policy: getFromSessionStorage(CARPOOLING_IS_CHECKED_POLICY),
      note: getFromSessionStorage(CARPOOLING_NOTE) || "",
      number_seat: getFromSessionStorage(CARPOOLING_NUMBER_SEAT),
      price_per_passenger: getFromSessionStorage(CARPOOLING_PRICE_PER_PASSENGER),
      duration: getFromSessionStorage(CARPOOLING_DURATION),
      from_location: getFromSessionStorage(CARPOOLING_FROM_LOCATION),
    }
  }

  const getConvenientFormFromStorage = (): CreateConvenientCompoundingForm => {
    const dateFromLocalStorage = getFromSessionStorage(CONVENIENT_EXPECTED_GOING_ON_DATE)
    const isAfter = moment().isAfter(moment(dateFromLocalStorage))
    if (isAfter) {
      setToSessionStorage(CARPOOLING_EXPECTED_GOING_ON_DATE, undefined)
    }
    const expected_going_on_date = isAfter ? undefined : dateFromLocalStorage

    return {
      car_id: getFromSessionStorage(CONVENIENT_CAR_ID),
      distance: getFromSessionStorage(CONVENIENT_DISTANCE),
      expected_going_on_date,
      from_station: getFromSessionStorage(CONVENIENT_FROM_STATION),
      to_station: getFromSessionStorage(CONVENIENT_TO_STATION),
      is_checked_policy: getFromSessionStorage(CONVENIENT_IS_CHECKED_POLICY),
      note: getFromSessionStorage(CONVENIENT_NOTE) || "",
      price_per_passenger: getFromSessionStorage(CONVENIENT_PRICE_PER_PASSENGER),
      duration: getFromSessionStorage(CONVENIENT_DURATION),
    }
  }

  const getTwoWayFormFromStorage = (): CreateTwoWayCompoundingCarForm => {
    const dateFromLocalStorage = getFromSessionStorage(TWO_WAY_EXPECTED_GOING_ON_DATE)
    const isAfter = moment().isAfter(moment(dateFromLocalStorage))
    if (isAfter) {
      setToSessionStorage(TWO_WAY_EXPECTED_GOING_ON_DATE, undefined)
    }
    const expected_going_on_date = isAfter ? undefined : dateFromLocalStorage

    return {
      car_id: getFromSessionStorage(TWO_WAY_CAR_ID),
      distance: getFromSessionStorage(TWO_WAY_DISTANCE),
      expected_going_on_date,
      from_location: getFromSessionStorage(TWO_WAY_FROM_LOCATION),
      to_location: getFromSessionStorage(TWO_WAY_TO_LOCATION),
      is_checked_policy: getFromSessionStorage(TWO_WAY_IS_CHECKED_POLICY),
      note: getFromSessionStorage(TWO_WAY_NOTE) || "",
      is_a_day_tour: getFromSessionStorage(TWO_WAY_IS_A_DAY_TOUR) || false,
      expected_picking_up_date: getFromSessionStorage(TWO_WAY_EXPECTED_PICKING_UP_DATE) || "",
      hour_of_wait_time: getFromSessionStorage(TWO_WAY_HOUR_OF_WAIT_TIME),
      duration: getFromSessionStorage(TWO_WAY_DURATION),
      price: getFromSessionStorage(TWO_WAY_PRICE),
    }
  }

  const getOneWayFormFromStorage = (): CreateOneWayCompoundingCarForm => {
    const dateFromLocalStorage = getFromSessionStorage(ONE_WAY_EXPECTED_GOING_ON_DATE)
    const isAfter = moment().isAfter(moment(dateFromLocalStorage))
    if (isAfter) {
      setToSessionStorage(ONE_WAY_EXPECTED_GOING_ON_DATE, undefined)
    }
    const expected_going_on_date = isAfter ? undefined : dateFromLocalStorage

    return {
      car_id: getFromSessionStorage(ONE_WAY_CAR_ID),
      distance: getFromSessionStorage(ONE_WAY_DISTANCE),
      expected_going_on_date,
      from_location: getFromSessionStorage(ONE_WAY_FROM_LOCATION),
      to_location: getFromSessionStorage(ONE_WAY_TO_LOCATION),
      is_checked_policy: getFromSessionStorage(ONE_WAY_IS_CHECKED_POLICY),
      note: getFromSessionStorage(ONE_WAY_NOTE) || "",
      duration: getFromSessionStorage(ONE_WAY_DURATION),
      price: getFromSessionStorage(ONE_WAY_PRICE),
    }
  }

  return {
    seats,
    vehicleTypeOptions: vehicleTypes,
    clearCarpoolingForm,
    clearOneWayForm,
    clearTwoWayForm,
    calcPriceFromProvinceIds,
    compoundingCarCustomerResToCarpoolingForm,
    compoundingCarCustomerResToOneWayForm,
    compoundingCarCustomerResToTwoWayForm,
    getCarpoolingFormFromStorage,
    getOneWayFormFromStorage,
    getTwoWayFormFromStorage,
    compoundingCarResToCarpoolingForm,
    compoundingCarResToOneWayForm,
    compoundingCarResToTwoWayForm,
    compoundingCarResToConvenientForm,
    clearConvenientForm,
    getConvenientFormFromStorage,
  }
}
