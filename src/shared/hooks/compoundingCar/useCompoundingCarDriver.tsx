import { isObjectHasValue } from "@/helper"
import { CompoundingCarDriverRes } from "@/models"
import { rideAPI } from "@/services"
import { AxiosResponse } from "axios"
import useSWR, { KeyedMutator } from "swr"

interface Res {
  data: CompoundingCarDriverRes | undefined
  isValidating: boolean
  mutate: KeyedMutator<CompoundingCarDriverRes>
  isInitialLoading: boolean
}

interface UseCompoundingCarProps {
  key: string
  type: "autoFocus" | "once"
  compounding_car_id?: number
}

export const useCompoundingCarDriver = ({
  type,
  key,
  compounding_car_id,
}: UseCompoundingCarProps): Res => {
  const { isValidating, data, mutate, error } = useSWR<CompoundingCarDriverRes, any>(
    compounding_car_id ? key : null,
    () =>
      rideAPI
        .getDetailCompoundingCar({
          compounding_car_id: Number(compounding_car_id),
        })
        .then((res: AxiosResponse<any>) => {
          const data = res?.result?.data
          if (isObjectHasValue(data)) return data
          return null
        })
        .catch((err) => console.log(err)),

    type === "once"
      ? {
          dedupingInterval: 1000,
        }
      : {
          dedupingInterval: 100,
          revalidateOnFocus: true,
        }
  )

  return {
    isValidating,
    data,
    mutate,
    isInitialLoading: error === undefined && data === undefined,
  }
}
