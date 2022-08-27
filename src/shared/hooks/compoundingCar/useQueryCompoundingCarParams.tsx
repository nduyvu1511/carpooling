import {
  CompoundingCarCustomerFilterParams,
  CompoundingCarFilterParams,
  CompoundingListDriverParams,
  GetCompoundingCarCustomerList,
} from "@/models"

const useQueryCompoundingCarParams = () => {
  const getValueFromQuery = (
    params: CompoundingCarCustomerFilterParams | undefined
  ): GetCompoundingCarCustomerList => {
    if (!params) return {}
    const { order_by, from_province_id, to_province_id, car_id, number_seat } = params
    let queryObj: GetCompoundingCarCustomerList = {
      ...params,
      offset: 0,
    }
    if (order_by) {
      delete (queryObj as CompoundingCarFilterParams).order_by
      Object.keys(queryObj).forEach((key) => {
        if (
          key === "sort_by_highest_price" ||
          key === "sort_by_lowest_price" ||
          key === "sort_by_distance"
        ) {
          delete (queryObj as CompoundingListDriverParams)?.[key]
        }
      })
      queryObj[order_by] = true
    }
    if (from_province_id) {
      queryObj.from_province_id = Number(from_province_id)
    }
    if (to_province_id) {
      queryObj.to_province_id = Number(to_province_id)
    }
    if (number_seat) {
      queryObj.number_seat = Number(number_seat)
    }
    if (car_id) {
      queryObj.car_id = Number(car_id)
    }
    Object.keys(queryObj).forEach(
      (key) => !(queryObj as any)?.[key] && delete (queryObj as any)[key]
    )
    return queryObj
  }

  return {
    getValueFromQuery,
  }
}

export { useQueryCompoundingCarParams }
