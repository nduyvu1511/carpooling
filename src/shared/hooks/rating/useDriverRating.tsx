import { RatingRes } from "@/models"
import { ratingAPI } from "@/services"
import { AxiosResponse } from "axios"
import { useState } from "react"
import useSWR, { KeyedMutator } from "swr"

interface Res {
  data: RatingRes[]
  isValidating: boolean
  isFetchingMore: boolean
  fetchMoreRatings: Function
  hasMore: boolean
  isInitialLoading: boolean
  mutate: KeyedMutator<RatingRes[]>
}

export const useDriverRating = (limit = 12): Res => {
  const { data, isValidating, mutate, error } = useSWR<RatingRes[]>(
    "get_driver_rating",
    () =>
      ratingAPI
        .getRatingListByDriver()
        .then((res: AxiosResponse<any>) => res?.result?.data || [])
        .catch((err) => console.log(err)),
    {
      dedupingInterval: 10000,
    }
  )
  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetchingMore, setFetchingMore] = useState<boolean>(false)

  const fetchMoreRatings = async () => {
    try {
      const newOffset = offset + limit
      setFetchingMore(true)
      const res: AxiosResponse<RatingRes[]> = await ratingAPI.getRatingListByCustomer({
        limit,
        offset: newOffset,
      })
      setFetchingMore(false)
      setOffset(newOffset)
      const list: RatingRes[] = res?.result?.data || []
      setHasMore(list.length >= limit)
      mutate([...(data || []), ...list], false)
    } catch (error) {
      setFetchingMore(false)
      console.log(error)
    }
  }

  return {
    data: data || [],
    isValidating,
    fetchMoreRatings,
    isFetchingMore,
    hasMore,
    isInitialLoading: error === undefined && data === undefined,
    mutate,
  }
}
