import { CompoundingCarCustomerState, CustomerActivityRes, RatingState } from "@/models"
import { rideAPI } from "@/services"
import { useState } from "react"
import { useQueryList } from "../async"

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
  const { data, error, fetchMoreItem, filterList, hasMore, isFetchingMore, isValidating, offset } =
    useQueryList<CustomerActivityRes[]>({
      initialData: undefined,
      key: "query_activity_for_customer",
      limit: 12,
      fetcher: rideAPI.getCustomerActivities,
      params: { limit: LIMIT_ACTIVITIES_LENGTH, offset: 0 },
    })

  const [activityStates, setActivityStates] = useState<CompoundingCarCustomerState[]>([])
  const [ratingValue, setRatingValue] = useState<RatingState | undefined>()

  const fetchMoreActivities = async (rating_state?: RatingState) => {
    const newOffset = offset + LIMIT_ACTIVITIES_LENGTH
    fetchMoreItem(
      rideAPI.getCustomerActivities({
        limit: LIMIT_ACTIVITIES_LENGTH,
        offset: newOffset,
        compounding_car_state: activityStates,
        rating_state: rating_state
          ? rating_state === "rated"
            ? ([rating_state, "un_rating"] as any)
            : ["no_rating"]
          : [],
      })
    )
  }

  const filterCompoundingActivities = async (
    compounding_car_state: CompoundingCarCustomerState[],
    rating_state?: RatingState
  ) => {
    setRatingValue(rating_state)
    setActivityStates(compounding_car_state)
    if (compounding_car_state === activityStates) {
      if (!rating_state) return
      if (rating_state === ratingValue) return
    }

    filterList(
      rideAPI.getCustomerActivities({
        compounding_car_state,
        rating_state: rating_state
          ? rating_state === "rated"
            ? ([rating_state, "un_rating"] as any)
            : ["no_rating"]
          : [],
        limit: LIMIT_ACTIVITIES_LENGTH,
        offset: 0,
      })
    )
  }

  return {
    data: data || [],
    isFetchingMore,
    isValidating,
    fetchMoreActivities,
    hasMore,
    isInitialLoading: error === undefined && data === undefined,
    activityStates,
    filterCompoundingActivities,
    ratingValue,
  }
}
