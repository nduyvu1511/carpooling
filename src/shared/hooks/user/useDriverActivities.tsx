import { CompoundingCarDriverState, DriverActivityRes } from "@/models"
import { ridesApi } from "@/services"
import { AxiosResponse } from "axios"
import { useState } from "react"
import useSWR from "swr"

const LIMIT_ACTIVITIES_LENGTH = 12

interface Res {
  data: DriverActivityRes[]
  isLoading: boolean
  hasMore: boolean
  filterCompoundingActivities: (compounding_car_state: CompoundingCarDriverState[]) => void
  fetchMoreActivities: () => void
  activityStates: CompoundingCarDriverState[]
  setActivityStates: (params: CompoundingCarDriverState[]) => void
}

export const useDriverActivities = (): Res => {
  const { data, isValidating, mutate } = useSWR<DriverActivityRes[]>(
    "compounding_driver_activities",
    () =>
      ridesApi
        .getHistoryCompoundingCarDriver({
          limit: LIMIT_ACTIVITIES_LENGTH,
        })
        .then((res: AxiosResponse<any>) => {
          const list: DriverActivityRes[] = res?.result?.data || []
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
  const [isLoading, setLoading] = useState<boolean>(false)
  const [activityStates, setActivityStates] = useState<CompoundingCarDriverState[]>([])

  const filterCompoundingActivities = async (
    compounding_car_state: CompoundingCarDriverState[]
  ) => {
    try {
      setLoading(true)
      // const newStates = getNewActivityStates(compounding_car_state)
      setActivityStates(compounding_car_state)
      const res: AxiosResponse<DriverActivityRes[]> = await ridesApi.getHistoryCompoundingCarDriver(
        {
          compounding_car_state,
          limit: LIMIT_ACTIVITIES_LENGTH,
          offset: 0,
        }
      )
      setLoading(false)
      setOffset(0)
      const list: DriverActivityRes[] = res?.result?.data || []
      setHasMore(list.length >= LIMIT_ACTIVITIES_LENGTH)
      mutate(list, false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const fetchMoreActivities = async () => {
    try {
      const newOffset = offset + LIMIT_ACTIVITIES_LENGTH
      const res: AxiosResponse<DriverActivityRes[]> = await ridesApi.getHistoryCompoundingCarDriver(
        {
          compounding_car_state: activityStates,
          limit: LIMIT_ACTIVITIES_LENGTH,
          offset: newOffset,
        }
      )
      setOffset(newOffset)
      const list: DriverActivityRes[] = res?.result?.data || []
      setHasMore(list.length >= LIMIT_ACTIVITIES_LENGTH)
      mutate([...(data || []), ...list], false)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    data: data || [],
    isLoading: isValidating || isLoading,
    fetchMoreActivities,
    filterCompoundingActivities,
    hasMore,
    activityStates,
    setActivityStates,
  }
}
