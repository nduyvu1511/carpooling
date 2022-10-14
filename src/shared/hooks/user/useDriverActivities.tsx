import { CompoundingCarDriverState, DriverActivityRes } from "@/models"
import { rideAPI } from "@/services"
import { useState } from "react"
import { useQueryList } from "../async"

const LIMIT_ACTIVITIES_LENGTH = 12

interface Res {
  data: DriverActivityRes[]
  isLoading: boolean
  hasMore: boolean
  filterCompoundingActivities: (compounding_car_state: CompoundingCarDriverState[]) => void
  fetchMoreActivities: () => void
  activityStates: CompoundingCarDriverState[]
  setActivityStates: (params: CompoundingCarDriverState[]) => void
  isFetchingMore?: boolean
}

export const useDriverActivities = (): Res => {
  const { data, error, fetchMoreItem, filterList, hasMore, isFetchingMore, isValidating, offset } =
    useQueryList<DriverActivityRes[]>({
      initialData: undefined,
      key: "query_activity_for_driver",
      limit: 12,
      fetcher: rideAPI.getHistoryCompoundingCarDriver,
      params: { limit: LIMIT_ACTIVITIES_LENGTH, offset: 0 },
    })

  const [activityStates, setActivityStates] = useState<CompoundingCarDriverState[]>([])

  const filterCompoundingActivities = async (
    compounding_car_state: CompoundingCarDriverState[]
  ) => {
    if (compounding_car_state === activityStates) return
    setActivityStates(compounding_car_state)
    filterList(
      rideAPI.getHistoryCompoundingCarDriver({
        compounding_car_state,
        limit: LIMIT_ACTIVITIES_LENGTH,
        offset: 0,
      })
    )
  }

  const fetchMoreActivities = async () => {
    const newOffset = offset + LIMIT_ACTIVITIES_LENGTH
    fetchMoreItem(
      rideAPI.getHistoryCompoundingCarDriver({
        compounding_car_state: activityStates,
        limit: LIMIT_ACTIVITIES_LENGTH,
        offset: newOffset,
      })
    )
  }

  return {
    data: data || [],
    isLoading: isValidating,
    fetchMoreActivities,
    filterCompoundingActivities,
    hasMore,
    activityStates,
    setActivityStates,
    isFetchingMore,
  }
}
