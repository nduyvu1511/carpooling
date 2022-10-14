import { isObjectHasValue } from "@/helper"
import { CompoundingCarCustomer } from "@/models"
import { rideAPI } from "@/services"
import { AxiosResponse } from "axios"
import useSWR, { KeyedMutator } from "swr"

interface Res {
  data: CompoundingCarCustomer | undefined
  isValidating: boolean
  isInitialLoading: boolean
  mutate: KeyedMutator<CompoundingCarCustomer>
}

interface Props {
  key: string
  type: "once" | "autoFocus"
  compounding_car_customer_id?: number
}

export const useCompoundingCarCustomer = ({
  key,
  type,
  compounding_car_customer_id,
}: Props): Res => {
  const { isValidating, data, error, mutate } = useSWR<CompoundingCarCustomer, any>(
    compounding_car_customer_id ? key : null,
    () =>
      rideAPI
        .getDetailCompoundingCarCustomer({
          compounding_car_customer_id: Number(compounding_car_customer_id),
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
    isInitialLoading: error === undefined && data === undefined,
    mutate,
  }
}
