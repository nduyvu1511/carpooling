import {
  CompoundingCarFilterParams,
  CompoundingCarRes,
  CompoundingFilterParams,
  CompoundingListDriverParams,
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
  getQueryParams: (params: CompoundingCarFilterParams | undefined) => CompoundingListDriverParams
  fromRouterQueryToDefaultValuesForm: (
    params: CompoundingFilterParams
  ) => CompoundingFilterParams | undefined
}

interface Props {
  params?: CompoundingListDriverParams
}

const LIMIT = 12

export const useQueryCompoundingCarDriver = ({ params }: Props): Res => {
  const { data, isValidating, mutate, error } = useSWR<CompoundingCarRes[]>(
    "query_compounding_car_driver",
    () =>
      ridesApi
        .getCompoundingCarListForDriver({ ...params, offset: 0, limit: LIMIT })
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
      const res: AxiosResponse<any> = await ridesApi.getCompoundingCarListForDriver({
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
      const res: AxiosResponse<any> = await ridesApi.getCompoundingCarListForDriver({
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
  ): CompoundingFilterParams | undefined => {
    return
  }

  function getQueryParams(
    params: CompoundingCarFilterParams | undefined
  ): CompoundingListDriverParams {
    if (!params) return {}
    console.log({ params })
    const { order_by, from_province_id, to_province_id, car_id } = params
    let queryObj: CompoundingListDriverParams = {
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
    Object.keys(queryObj).forEach(
      (key) => !(queryObj as any)?.[key] && delete (queryObj as any)[key]
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
