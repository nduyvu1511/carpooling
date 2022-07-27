import { CompoundingCarRes, CompoundingListDriverParams } from "@/models"
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

  return {
    data: data || [],
    isValidating: isValidating || isLoading,
    isFetchingMore,
    hasMore,
    filterRides,
    fetchMoreRides,
    isInitialLoading: data === undefined && error === undefined,
  }
}
