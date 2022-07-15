import { CustomerActivityRes } from "@/models"
import { ridesApi } from "@/services"
import { AxiosResponse } from "axios"
import { useState } from "react"
import useSWR from "swr"

const LIMIT_ACTIVITIES_LENGTH = 12

interface Res {
  data: CustomerActivityRes[]
  isValidating: boolean
  hasMore: boolean
  fetchMoreActivities: () => void
  isInitialLoading: boolean
  isFetchingMore: boolean
}

export const useCustomerActivities = (): Res => {
  const { data, isValidating, mutate, error } = useSWR<CustomerActivityRes[]>(
    "compounding_driver_activities",
    () =>
      ridesApi
        .getCustomerActivities({
          limit: LIMIT_ACTIVITIES_LENGTH,
        })
        .then((res: AxiosResponse<any>) => {
          const list: CustomerActivityRes[] = res?.result?.data || []
          setHasMore(list.length >= LIMIT_ACTIVITIES_LENGTH)
          return list as any
        })
        .catch((err) => console.log(err)),
    {
      dedupingInterval: 10000,
    }
  )
  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetchingMore, setFetchingMore] = useState<boolean>(true)

  const fetchMoreActivities = async () => {
    try {
      const newOffset = offset + LIMIT_ACTIVITIES_LENGTH
      setFetchingMore(true)
      const res: AxiosResponse<CustomerActivityRes[]> = await ridesApi.getCustomerActivities({
        limit: LIMIT_ACTIVITIES_LENGTH,
        offset: newOffset,
      })
      setFetchingMore(false)
      setOffset(newOffset)
      const list: CustomerActivityRes[] = res?.result?.data || []
      setHasMore(list.length >= LIMIT_ACTIVITIES_LENGTH)
      mutate([...(data || []), ...list], false)
    } catch (error) {
      setFetchingMore(false)
      console.log(error)
    }
  }

  return {
    data: data || [],
    isFetchingMore,
    isValidating,
    fetchMoreActivities,
    hasMore,
    isInitialLoading: error === undefined && data === undefined,
  }
}
