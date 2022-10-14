import { VehicleBrandRes } from "@/models"
import { userAPI } from "@/services"
import { AxiosResponse } from "axios"
import useSWR from "swr"
import { PublicConfiguration } from "swr/dist/types"

interface Res {
  isValidating: boolean
  data: VehicleBrandRes[] | undefined
}

export const useFetchCarBrand = (config?: Partial<PublicConfiguration>): Res => {
  const { data, isValidating } = useSWR<VehicleBrandRes[]>(
    "get_car_brand",
    () =>
      userAPI
        .getCarBrands()
        .then((res: AxiosResponse<any>) => res?.result?.data)
        .catch((err) => console.log(err)),
    {
      dedupingInterval: 1000,
      ...config,
    } as any
  )

  return {
    data,
    isValidating,
  }
}
