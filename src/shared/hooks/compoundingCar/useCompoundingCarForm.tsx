import { RootState } from "@/core/store"
import {
  CARPOOLING_CAR_ID,
  CARPOOLING_DISTANCE,
  CARPOOLING_EXPECTED_GOING_ON_DATE,
  CARPOOLING_FROM_PICK_UP_STATION_ID,
  CARPOOLING_FROM_STATION,
  CARPOOLING_IS_CHECKED_POLICY,
  CARPOOLING_IS_PICKING_UP_FROM_START,
  CARPOOLING_NOTE,
  CARPOOLING_NUMBER_SEAT,
  CARPOOLING_PRICE_PER_PASSENGER,
  CARPOOLING_TO_STATION,
  getFromLocalStorage,
  hoursBackList,
  ONE_WAY_CAR_ID,
  ONE_WAY_DISTANCE,
  ONE_WAY_EXPECTED_GOING_ON_DATE,
  ONE_WAY_FROM_LOCATION,
  ONE_WAY_IS_CHECKED_POLICY,
  ONE_WAY_NOTE,
  ONE_WAY_PRICE,
  ONE_WAY_TO_LOCATION,
  setToLocalStorage,
  setToSessionStorage,
  TWO_WAY_CAR_ID,
  TWO_WAY_DISTANCE,
  TWO_WAY_EXPECTED_GOING_ON_DATE,
  TWO_WAY_EXPECTED_PICKING_UP_DATE,
  TWO_WAY_FROM_LOCATION,
  TWO_WAY_HOUR_OF_WAIT_TIME,
  TWO_WAY_IS_A_DAY_TOUR,
  TWO_WAY_IS_CHECKED_POLICY,
  TWO_WAY_NOTE,
  TWO_WAY_PRICE,
  TWO_WAY_TO_LOCATION
} from "@/helper"
import {
  CarIdType,
  CompoundingCarCustomer,
  CompoundingCarRes,
  CreateCarpoolingCompoundingForm,
  CreateCommonCompoundingForm,
  CreateOneWayCompoundingCarForm,
  CreateTwoWayCompoundingCarForm,
  OptionModel
} from "@/models"
import { vehicleApi } from "@/services"
import { AxiosResponse } from "axios"
import { useSelector } from "react-redux"

export interface CalcPriceParams {
  params: { to_province_id: number; from_province_id: number; car_id: number }
  onSuccess: (params: number) => void
  onErr?: Function
}

interface Res {
  vehicleTypeOptions: CarIdType[]
  seats: (limit: number) => OptionModel[]
  clearOneWayCompoundingCar: Function
  clearTwoWayCompoundingCar: Function
  clearCarpoolingWayCompoundingCar: Function
  calcPriceFromProvinceIds: (params: CalcPriceParams) => void
  compoundingCarCustomerResToCarpoolingForm: (
    compoundingCar: CompoundingCarCustomer
  ) => CreateCarpoolingCompoundingForm
  compoundingCarCustomerResToTwoWayForm: (
    compoundingCar: CompoundingCarCustomer
  ) => CreateTwoWayCompoundingCarForm
  compoundingCarCustomerResToOneWayForm: (
    compoundingCar: CompoundingCarCustomer
  ) => CreateOneWayCompoundingCarForm
  carpoolingCompoundingFormFromLocalStorage: () => CreateCarpoolingCompoundingForm
  twoWayCompoundingCarFormFromLocalStorage: () => CreateTwoWayCompoundingCarForm
  oneWayCompoundingCarFormFromLocalStorage: () => CreateOneWayCompoundingCarForm
  compoundingCarResToCarpoolingForm: (
    compoundingCar: CompoundingCarRes
  ) => CreateCarpoolingCompoundingForm
  compoundingCarResToOneWayForm: (
    compoundingCar: CompoundingCarRes
  ) => CreateOneWayCompoundingCarForm
  compoundingCarResToTwoWayForm: (
    compoundingCar: CompoundingCarRes
  ) => CreateTwoWayCompoundingCarForm
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

  const clearOneWayCompoundingCar = () => {
    setToLocalStorage(ONE_WAY_FROM_LOCATION, undefined)
    setToLocalStorage(ONE_WAY_DISTANCE, undefined)
    setToLocalStorage(ONE_WAY_TO_LOCATION, undefined)
    setToLocalStorage(ONE_WAY_CAR_ID, undefined)
    setToLocalStorage(ONE_WAY_EXPECTED_GOING_ON_DATE, undefined)
    setToLocalStorage(ONE_WAY_NOTE, undefined)
    setToLocalStorage(ONE_WAY_IS_CHECKED_POLICY, undefined)
    setToLocalStorage(ONE_WAY_PRICE, undefined)
  }

  const clearTwoWayCompoundingCar = () => {
    setToLocalStorage(TWO_WAY_FROM_LOCATION, undefined)
    setToLocalStorage(TWO_WAY_DISTANCE, undefined)
    setToLocalStorage(TWO_WAY_PRICE, undefined)
    setToLocalStorage(TWO_WAY_TO_LOCATION, undefined)
    setToLocalStorage(TWO_WAY_CAR_ID, undefined)
    setToLocalStorage(TWO_WAY_EXPECTED_GOING_ON_DATE, undefined)
    setToLocalStorage(TWO_WAY_NOTE, undefined)
    setToLocalStorage(TWO_WAY_IS_A_DAY_TOUR, undefined)
    setToLocalStorage(TWO_WAY_HOUR_OF_WAIT_TIME, undefined)
    setToLocalStorage(TWO_WAY_IS_CHECKED_POLICY, undefined)
    setToLocalStorage(TWO_WAY_EXPECTED_PICKING_UP_DATE, undefined)
  }

  const clearCarpoolingWayCompoundingCar = () => {
    setToLocalStorage(CARPOOLING_FROM_STATION, undefined)
    setToLocalStorage(CARPOOLING_FROM_PICK_UP_STATION_ID, undefined)
    setToLocalStorage(CARPOOLING_DISTANCE, undefined)
    setToLocalStorage(CARPOOLING_TO_STATION, undefined)
    setToLocalStorage(CARPOOLING_CAR_ID, undefined)
    setToLocalStorage(CARPOOLING_EXPECTED_GOING_ON_DATE, undefined)
    setToLocalStorage(CARPOOLING_NOTE, undefined)
    setToLocalStorage(CARPOOLING_IS_CHECKED_POLICY, undefined)
    setToLocalStorage(CARPOOLING_PRICE_PER_PASSENGER, undefined)
    setToLocalStorage(CARPOOLING_NUMBER_SEAT, undefined)
    setToLocalStorage(CARPOOLING_IS_PICKING_UP_FROM_START, undefined)
    setToSessionStorage(CARPOOLING_IS_PICKING_UP_FROM_START, undefined)
  }

  const calcPriceFromProvinceIds = async (params: CalcPriceParams) => {
    const {
      params: { car_id, from_province_id, to_province_id },
      onSuccess,
      onErr,
    } = params
    try {
      const res: AxiosResponse<any> = await vehicleApi.getCarPriceUnit({
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
    compoundingCar: CompoundingCarCustomer
  ): CreateCarpoolingCompoundingForm => {
    return {
      car_id: {
        label: compoundingCar.car.name,
        value: compoundingCar.car.car_id,
        number_seat: compoundingCar.car.number_seat,
      },
      distance: compoundingCar.distance,
      expected_going_on_date: compoundingCar.expected_going_on_date,
      from_location: compoundingCar?.is_picking_up_from_start
        ? {
            address: compoundingCar.from_address,
            lat: Number(compoundingCar.from_latitude),
            lng: Number(compoundingCar.from_longitude),
            province_id: Number(compoundingCar.from_province.province_id),
          }
        : undefined,
      is_checked_policy: true,
      note: compoundingCar?.note || "",
      price_per_passenger: compoundingCar.amount_total,
      from_station: {
        address: compoundingCar.from_address,
        lat: compoundingCar.from_pick_up_station.latitude + "",
        lng: compoundingCar.from_pick_up_station.longitude + "",
        province_name: compoundingCar.from_pick_up_station.province_id.province_name,
        province_id: compoundingCar.from_pick_up_station.province_id.province_id,
        station_id: compoundingCar.from_pick_up_station.station_id,
        station_name: compoundingCar.from_pick_up_station.station_name,
      },
      to_station: {
        address: compoundingCar.to_address,
        lat: compoundingCar.to_pick_up_station.latitude + "",
        lng: compoundingCar.to_pick_up_station.longitude + "",
        province_name: compoundingCar.to_pick_up_station.province_id.province_name,
        province_id: compoundingCar.to_pick_up_station.province_id.province_id,
        station_id: compoundingCar.to_pick_up_station.station_id,
        station_name: compoundingCar.to_pick_up_station.station_name,
      },
      number_seat: {
        label: `${compoundingCar.number_available_seat} ghế`,
        value: compoundingCar.number_available_seat,
      },
    }
  }

  const commonCompoundingParams = (
    compoundingCar: CompoundingCarCustomer
  ): CreateCommonCompoundingForm => {
    return {
      car_id: {
        label: compoundingCar.car.name,
        value: compoundingCar.car.car_id,
      },
      distance: compoundingCar.distance,
      expected_going_on_date: compoundingCar.expected_going_on_date,
      from_location: {
        address: compoundingCar.from_address,
        lat: Number(compoundingCar.from_latitude),
        lng: Number(compoundingCar.from_longitude),
        province_id: Number(compoundingCar.from_province.province_id),
      },
      to_location: {
        address: compoundingCar.to_address,
        lat: Number(compoundingCar.to_latitude),
        lng: Number(compoundingCar.to_longitude),
        province_id: Number(compoundingCar.to_province.province_id),
      },
      is_checked_policy: true,
      note: compoundingCar.note,
    }
  }

  const compoundingCarCustomerResToTwoWayForm = (
    compoundingCar: CompoundingCarCustomer
  ): CreateTwoWayCompoundingCarForm => {
    return {
      ...commonCompoundingParams(compoundingCar),
      is_a_day_tour: compoundingCar.is_a_day_tour,
      expected_picking_up_date: (compoundingCar?.expected_picking_up_date || undefined) as string,
      hour_of_wait_time: hoursBackList.find(
        (item) => item.value === compoundingCar.hour_of_wait_time
      ),
    }
  }

  const compoundingCarCustomerResToOneWayForm = (
    compoundingCar: CompoundingCarCustomer
  ): CreateOneWayCompoundingCarForm => {
    return {
      ...commonCompoundingParams(compoundingCar),
    }
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
        province_name: from_province.province_name,
        station_id: compoundingCar.from_pick_up_station.station_id,
        station_name: compoundingCar.from_pick_up_station.station_name,
      },
      number_seat: {
        label: `1 ghế`,
        value: 1,
      },
      price_per_passenger: compoundingCar.price_unit.price_unit,
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
        station_id: compoundingCar.to_pick_up_station.station_id,
        station_name: compoundingCar.to_pick_up_station.station_name,
      },
      note: compoundingCar.note,
      distance: compoundingCar.distance,
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
        address: from_province.province_name,
        lat: Number(from_latitude) || 0,
        lng: Number(from_longitude) || 0,
        province_id: from_province.province_id,
      },
      to_location: {
        address: to_province.province_name,
        lat: Number(to_latitude) || 0,
        lng: Number(to_longitude) || 0,
        province_id: to_province.province_id,
      },
      duration,
    }
  }

  const compoundingCarResToTwoWayForm = (
    compoundingCar: CompoundingCarRes
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
        address: from_address,
        lat: Number(from_latitude) || 0,
        lng: Number(from_longitude) || 0,
        province_id: from_province.province_id,
      },
      to_location: {
        address: to_address,
        lat: Number(to_latitude) || 0,
        lng: Number(to_longitude) || 0,
        province_id: to_province.province_id,
      },
      duration,
      is_a_day_tour: true,
      expected_picking_up_date: compoundingCar.expected_picking_up_date,
      hour_of_wait_time: compoundingCar.hour_of_wait_time
        ? {
            label: `${compoundingCar.hour_of_wait_time.replace("_hour", "")} Giờ`,
            value: compoundingCar.hour_of_wait_time as string,
          }
        : undefined,
    }
  }

  const carpoolingCompoundingFormFromLocalStorage = (): CreateCarpoolingCompoundingForm => ({
    car_id: getFromLocalStorage(CARPOOLING_CAR_ID),
    distance: getFromLocalStorage(CARPOOLING_DISTANCE),
    expected_going_on_date: getFromLocalStorage(CARPOOLING_EXPECTED_GOING_ON_DATE),
    from_station: getFromLocalStorage(CARPOOLING_FROM_STATION),
    to_station: getFromLocalStorage(CARPOOLING_TO_STATION),
    is_checked_policy: getFromLocalStorage(CARPOOLING_IS_CHECKED_POLICY),
    note: getFromLocalStorage(CARPOOLING_NOTE),
    number_seat: getFromLocalStorage(CARPOOLING_NUMBER_SEAT),
    price_per_passenger: getFromLocalStorage(CARPOOLING_PRICE_PER_PASSENGER),
  })

  const twoWayCompoundingCarFormFromLocalStorage = (): CreateTwoWayCompoundingCarForm => ({
    car_id: getFromLocalStorage(TWO_WAY_CAR_ID),
    distance: getFromLocalStorage(TWO_WAY_DISTANCE),
    expected_going_on_date: getFromLocalStorage(TWO_WAY_EXPECTED_GOING_ON_DATE),
    from_location: getFromLocalStorage(TWO_WAY_FROM_LOCATION),
    to_location: getFromLocalStorage(TWO_WAY_TO_LOCATION),
    is_checked_policy: getFromLocalStorage(TWO_WAY_IS_CHECKED_POLICY),
    note: getFromLocalStorage(TWO_WAY_NOTE),
    is_a_day_tour: getFromLocalStorage(TWO_WAY_IS_A_DAY_TOUR),
    expected_picking_up_date: getFromLocalStorage(TWO_WAY_EXPECTED_PICKING_UP_DATE),
    hour_of_wait_time: getFromLocalStorage(TWO_WAY_HOUR_OF_WAIT_TIME),
  })

  const oneWayCompoundingCarFormFromLocalStorage = (): CreateOneWayCompoundingCarForm => ({
    car_id: getFromLocalStorage(ONE_WAY_CAR_ID),
    distance: getFromLocalStorage(ONE_WAY_DISTANCE),
    expected_going_on_date: getFromLocalStorage(ONE_WAY_EXPECTED_GOING_ON_DATE),
    from_location: getFromLocalStorage(ONE_WAY_FROM_LOCATION),
    to_location: getFromLocalStorage(ONE_WAY_TO_LOCATION),
    is_checked_policy: getFromLocalStorage(ONE_WAY_IS_CHECKED_POLICY),
    note: getFromLocalStorage(ONE_WAY_NOTE),
  })

  return {
    seats,
    vehicleTypeOptions: vehicleTypes,
    clearCarpoolingWayCompoundingCar,
    clearOneWayCompoundingCar,
    clearTwoWayCompoundingCar,
    calcPriceFromProvinceIds,
    compoundingCarCustomerResToCarpoolingForm,
    compoundingCarCustomerResToOneWayForm,
    compoundingCarCustomerResToTwoWayForm,
    carpoolingCompoundingFormFromLocalStorage,
    oneWayCompoundingCarFormFromLocalStorage,
    twoWayCompoundingCarFormFromLocalStorage,
    compoundingCarResToCarpoolingForm,
    compoundingCarResToOneWayForm,
    compoundingCarResToTwoWayForm,
  }
}
