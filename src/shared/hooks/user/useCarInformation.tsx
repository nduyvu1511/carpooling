import { CarInformationRes, CreateCarInformation, UpdateCarInformation, UseParams } from "@/models"
import { userAPI } from "@/services"
import useSWR from "swr"
import { useFetcher } from "../async"

interface UseCarInformationRes {
  data: CarInformationRes | undefined
  isValidating: boolean
  createCarInformation: (para: UseParams<CreateCarInformation, CarInformationRes>) => void
  updateCarInformation: (para: UseParams<UpdateCarInformation, CarInformationRes>) => void
}

const useCarInformationn = (shouldFetch = false): UseCarInformationRes => {
  const { fetcherHandler } = useFetcher()

  const { data, isValidating } = useSWR<undefined | CarInformationRes>(
    "create_car_information",
    shouldFetch ? () => userAPI.getCarInformation().then((res) => res?.result?.data?.[0]) : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 5000,
      revalidateOnFocus: false,
    }
  )

  const createCarInformation = async (para: UseParams<CreateCarInformation, CarInformationRes>) => {
    const { onSuccess, params, onError } = para
    fetcherHandler({
      fetcher: userAPI.createCarInformation(params),
      onSuccess: (data: CarInformationRes) => {
        onSuccess(data)
      },
      onError: () => onError?.(),
    })
  }

  const updateCarInformation = async (para: UseParams<UpdateCarInformation, CarInformationRes>) => {
    const { onSuccess, params, onError } = para
    fetcherHandler({
      fetcher: userAPI.updateCarInformation(params),
      onSuccess: (data: CarInformationRes) => {
        onSuccess(data)
      },
      onError: () => onError?.(),
    })
  }

  return {
    data,
    isValidating,
    createCarInformation,
    updateCarInformation,
  }
}

export { useCarInformationn }
