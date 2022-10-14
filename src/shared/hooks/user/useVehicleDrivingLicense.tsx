import {
  DrivingLicenseParams,
  DrivingLicenseRes,
  UpdateDrivingLicenseParams,
  UseParams,
} from "@/models"
import { userAPI } from "@/services"
import { AxiosResponse } from "axios"
import useSWR from "swr"
import { useFetcher } from "../async"

interface UseVehicleDrivingLicenseRes {
  data: DrivingLicenseRes | undefined
  isValidating: boolean
  createVehicleDrivingLicense: (para: UseParams<DrivingLicenseParams, DrivingLicenseRes>) => void
  updateVehicleDrivingLicense: (
    para: UseParams<UpdateDrivingLicenseParams, DrivingLicenseRes>
  ) => void
}

const useVehicleDrivingLicense = (shouldFetch = false): UseVehicleDrivingLicenseRes => {
  const { fetcherHandler } = useFetcher()

  const { data, isValidating } = useSWR<DrivingLicenseRes>(
    "vehicle_driving_license",
    shouldFetch
      ? () =>
          userAPI
            .getDrivingLicense()
            .then((res: AxiosResponse<DrivingLicenseRes>) => res?.result?.data)
      : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 5000,
      revalidateOnFocus: false,
    }
  )

  const createVehicleDrivingLicense = async (
    para: UseParams<DrivingLicenseParams, DrivingLicenseRes>
  ) => {
    const { onSuccess, params, onError } = para
    fetcherHandler({
      fetcher: userAPI.createDrivingLicense(params),
      onSuccess: (data: DrivingLicenseRes) => {
        onSuccess(data)
      },
      onError: () => onError?.(),
    })
  }

  const updateVehicleDrivingLicense = async (
    para: UseParams<UpdateDrivingLicenseParams, DrivingLicenseRes>
  ) => {
    const { onSuccess, params, onError } = para
    fetcherHandler({
      fetcher: userAPI.updateDrivingLicense(params),
      onSuccess: (data: DrivingLicenseRes) => {
        onSuccess(data)
      },
      onError: () => onError?.(),
    })
  }

  return {
    data,
    isValidating,
    createVehicleDrivingLicense,
    updateVehicleDrivingLicense,
  }
}

export { useVehicleDrivingLicense }
