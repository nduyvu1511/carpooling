import { CompoundingCarCustomerState, CustomerActivityRes, RatingState } from "@/models"
import { ridesApi } from "@/services"
import { AxiosResponse } from "axios"
import { useState } from "react"
import useSWR from "swr"

const LIMIT_ACTIVITIES_LENGTH = 12

interface Res {
  data: CustomerActivityRes[]
  isValidating: boolean
  hasMore: boolean
  fetchMoreActivities: (rating_state?: RatingState) => void
  isInitialLoading: boolean
  isFetchingMore: boolean
  activityStates: CompoundingCarCustomerState[]
  filterCompoundingActivities: (
    compounding_car_state: CompoundingCarCustomerState[],
    rating_state?: RatingState
  ) => void
  ratingValue: RatingState | undefined
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
  const [isLoading, setLoading] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetchingMore, setFetchingMore] = useState<boolean>(true)
  const [activityStates, setActivityStates] = useState<CompoundingCarCustomerState[]>([])
  const [ratingValue, setRatingValue] = useState<RatingState | undefined>()

  const fetchMoreActivities = async (rating_state?: RatingState) => {
    try {
      const newOffset = offset + LIMIT_ACTIVITIES_LENGTH
      setFetchingMore(true)
      const res: AxiosResponse<CustomerActivityRes[]> = await ridesApi.getCustomerActivities({
        limit: LIMIT_ACTIVITIES_LENGTH,
        offset: newOffset,
        compounding_car_state: activityStates,
        rating_state: rating_state
          ? rating_state === "rated"
            ? ([rating_state, "un_rating"] as any)
            : ["no_rating"]
          : [],
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

  const filterCompoundingActivities = async (
    compounding_car_state: CompoundingCarCustomerState[],
    rating_state?: RatingState
  ) => {
    try {
      // if (compounding_car_state === activityStates) return

      setLoading(true)
      setActivityStates(compounding_car_state)
      if (compounding_car_state.includes("confirm_paid") && ratingValue) {
        setRatingValue(undefined)
      }
      if (rating_state) {
        setRatingValue(rating_state)
      }
      const res: AxiosResponse<CustomerActivityRes[]> = await ridesApi.getCustomerActivities({
        compounding_car_state,
        rating_state: rating_state
          ? rating_state === "rated"
            ? ([rating_state, "un_rating"] as any)
            : ["no_rating"]
          : [],
        limit: LIMIT_ACTIVITIES_LENGTH,
        offset: 0,
      })
      setLoading(false)
      setOffset(0)
      const list: CustomerActivityRes[] = res?.result?.data || []
      setHasMore(list.length >= LIMIT_ACTIVITIES_LENGTH)
      mutate(list, false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return {
    data: data || [],
    isFetchingMore,
    isValidating: isValidating || isLoading,
    fetchMoreActivities,
    hasMore,
    isInitialLoading: error === undefined && data === undefined,
    activityStates,
    filterCompoundingActivities,
    ratingValue,
  }
}
