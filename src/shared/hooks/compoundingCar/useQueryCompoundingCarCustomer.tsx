import {
  CompoundingCarCustomerFilterParams,
  CompoundingCarFilterParams,
  CompoundingCarRes,
  CompoundingFilterForm,
  CompoundingFilterParams,
  CompoundingListDriverParams,
  GetCompoundingCarCustomerList,
} from "@/models"
import { ridesApi } from "@/services"
import { AxiosResponse } from "axios"
import { useState } from "react"
import useSWR from "swr"

interface Res {
  data: CompoundingCarRes[]
  isValidating: boolean
  isFetchingMore: boolean
  hasMore: boolean
  filterRides: (params: CompoundingListDriverParams) => void
  fetchMoreRides: (params: CompoundingListDriverParams) => void
  isInitialLoading: boolean
  getQueryParams: (
    params: CompoundingCarCustomerFilterParams | undefined
  ) => GetCompoundingCarCustomerList
  fromRouterQueryToDefaultValuesForm: (
    params: CompoundingFilterParams
  ) => CompoundingFilterForm | undefined
}

interface Props {
  params?: CompoundingListDriverParams
}

const LIMIT = 12

export const useQueryCompoundingCarCustomer = ({ params }: Props): Res => {
  const { data, isValidating, mutate, error } = useSWR<CompoundingCarRes[]>(
    "query_compounding_car_customer",
    () =>
      ridesApi
        .getCompoundingCarListForCustomer({ ...params, offset: 0, limit: LIMIT })
        .then((res: AxiosResponse<any>) => {
          const list = res?.result?.data || []
          handleSetHasMore(list.length)
          setOffset(0)
          return list
        })
        .catch((err) => console.log(err)),
    {
      dedupingInterval: 10000,
      revalidateOnMount: false,
    }
  )
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isFetchingMore, setFetchingMore] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [offset, setOffset] = useState<number>(0)

  const handleSetHasMore = (length: number) => {
    setHasMore(length >= LIMIT)
  }

  const filterRides = async (params: CompoundingListDriverParams) => {
    try {
      setLoading(true)
      const res: AxiosResponse<CompoundingCarRes[]> =
        await ridesApi.getCompoundingCarListForCustomer({
          ...params,
          limit: params.limit || LIMIT,
          offset: 0,
        })
      setOffset(0)
      setLoading(false)
      const list: CompoundingCarRes[] = res?.result?.data || []
      handleSetHasMore(list.length)
      mutate(list, false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const fetchMoreRides = async (params: CompoundingListDriverParams) => {
    try {
      setFetchingMore(true)
      const newOffset = offset + LIMIT
      const res: AxiosResponse<CompoundingCarRes[]> =
        await ridesApi.getCompoundingCarListForCustomer({
          ...params,
          limit: params.limit || LIMIT,
          offset: newOffset,
        })
      setFetchingMore(false)
      const list: CompoundingCarRes[] = res?.result?.data || []
      handleSetHasMore(list.length)
      setOffset(newOffset)
      mutate([...(data || []), ...list], false)
    } catch (error) {
      setFetchingMore(false)
    }
  }

  const fromRouterQueryToDefaultValuesForm = (
    params: CompoundingFilterParams
  ): CompoundingFilterForm | undefined => {
    return undefined
  }

  function getQueryParams(
    params: CompoundingCarCustomerFilterParams | undefined
  ): GetCompoundingCarCustomerList {
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
    if (car_id) {
      queryObj.car_id = Number(car_id)
    }
    if (number_seat) {
      queryObj.number_seat = Number(number_seat)
    }
    Object.keys(queryObj).forEach(
      (item) => !(queryObj as any)?.[item] && delete (queryObj as any)[item]
    )
    return queryObj
  }

  return {
    data: data || [],
    isValidating: isValidating || isLoading,
    isFetchingMore,
    hasMore,
    filterRides,
    fetchMoreRides,
    isInitialLoading: data === undefined && error === undefined,
    getQueryParams,
    fromRouterQueryToDefaultValuesForm,
  }
}
