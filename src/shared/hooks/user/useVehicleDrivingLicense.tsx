import {
  DrivingLicenseParams,
  DrivingLicenseRes,
  UpdateDrivingLicenseParams,
  UseParams,
} from "@/models"
import { userApi } from "@/services"
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
          userApi
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
      fetcher: userApi.createDrivingLicense(params),
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
      fetcher: userApi.updateDrivingLicense(params),
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
