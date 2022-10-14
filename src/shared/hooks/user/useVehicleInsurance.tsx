import {
  UpdateVehicleInsuranceParams,
  UseParams,
  VehicleInsuranceParams,
  VehicleInsuranceRes,
} from "@/models"
import { userAPI } from "@/services"
import { AxiosResponse } from "axios"
import useSWR from "swr"
import { useFetcher } from "../async"

interface UseVehicleInsuranceRes {
  data: VehicleInsuranceRes | undefined
  isValidating: boolean
  createVehicleInsurance: (para: UseParams<VehicleInsuranceParams, VehicleInsuranceRes>) => void
  updateVehicleInsurance: (
    para: UseParams<UpdateVehicleInsuranceParams, VehicleInsuranceRes>
  ) => void
}

const useVehicleInsurance = (shouldFetch = false): UseVehicleInsuranceRes => {
  const { fetcherHandler } = useFetcher()

  const { data, isValidating } = useSWR<VehicleInsuranceRes>(
    "vehicle_insurance",
    shouldFetch
      ? () =>
          userAPI
            .getVehicleInsurance()
            .then((res: AxiosResponse<VehicleInsuranceRes>) => res?.result?.data)
      : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 5000,
      revalidateOnFocus: false,
    }
  )

  const createVehicleInsurance = async (
    para: UseParams<VehicleInsuranceParams, VehicleInsuranceRes>
  ) => {
    const { onSuccess, params, onError } = para
    fetcherHandler({
      fetcher: userAPI.createVehicleInsurance(params),
      onSuccess: (data: VehicleInsuranceRes) => {
        onSuccess(data)
      },
      onError: () => onError?.(),
    })
  }

  const updateVehicleInsurance = async (
    para: UseParams<UpdateVehicleInsuranceParams, VehicleInsuranceRes>
  ) => {
    const { onSuccess, params, onError } = para
    fetcherHandler({
      fetcher: userAPI.updateVehicleInsurance(params),
      onSuccess: (data: VehicleInsuranceRes) => {
        onSuccess(data)
      },
      onError: () => onError?.(),
    })
  }

  return {
    data,
    isValidating,
    createVehicleInsurance,
    updateVehicleInsurance,
  }
}

export { useVehicleInsurance }
