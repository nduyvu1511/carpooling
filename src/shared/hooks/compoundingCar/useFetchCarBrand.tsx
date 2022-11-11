import { OptionType } from "@/models"
import { userAPI } from "@/services"
import useSWR from "swr"
import { PublicConfiguration } from "swr/dist/types"

interface Res {
  isValidating: boolean
  data: OptionType[] | undefined
}

export const useFetchCarBrand = (config?: Partial<PublicConfiguration>): Res => {
  const { data, isValidating } = useSWR<any>(
    "get_car_brands",
    () =>
      userAPI.getCarBrands().then(
        (res) =>
          res?.result?.data?.map((item) => ({
            label: item.brand_name,
            value: item.brand_id,
          })) || []
      ),
    {
      dedupingInterval: 1000 * 60 * 60,
      ...config,
    }
  )

  return {
    data,
    isValidating,
  }
}
