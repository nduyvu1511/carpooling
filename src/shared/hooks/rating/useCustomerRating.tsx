import { RatingRes } from "@/models"
import { ratingAPI } from "@/services"
import { AxiosResponse } from "axios"
import { useState } from "react"
import useSWR from "swr"

interface Res {
  data: RatingRes[]
  isValidating: boolean
  mutateUpdateRating: (params: RatingRes, cb?: Function) => void
  mutateDeleteRating: (params: number, cb?: Function) => void
  fetchMoreRatings: () => void
  isFetchingMore: boolean
  hasMore: boolean
}

export const useCustomerRating = (limit = 12): Res => {
  const { data, isValidating, mutate } = useSWR<RatingRes[]>(
    "get_customer_rating",
    () =>
      ratingAPI
        .getRatingListByCustomer()
        .then((res: AxiosResponse<any>) => {
          const list = res.result?.data || []
          setHasMore(list.length >= limit)
          return list
        })
        .catch((err) => console.log(err)),
    {
      dedupingInterval: 10000,
    }
  )
  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetchingMore, setFetchingMore] = useState<boolean>(false)

  const mutateUpdateRating = (params: RatingRes, cb?: Function) => {
    if (!data?.length) return
    const newRatings = [...data].map((item) =>
      item.rating_id === params.rating_id ? params : item
    )
    mutate(newRatings, false)
  }

  const mutateDeleteRating = (id: number, cb?: Function) => {
    if (!data?.length) return
    const newRatings = [...data].filter((item) => item.rating_id !== id)
    mutate(newRatings, false)
  }

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
    mutateUpdateRating,
    mutateDeleteRating,
    fetchMoreRatings,
    hasMore,
    isFetchingMore,
  }
}
