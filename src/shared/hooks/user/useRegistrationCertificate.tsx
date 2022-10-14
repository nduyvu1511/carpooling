import {
  RegistrationCertificateRes,
  UpdateVehicleDetailFormParams,
  UseParams,
  VehicleDetailFormParams,
} from "@/models"
import { userAPI } from "@/services"
import { AxiosResponse } from "axios"
import useSWR from "swr"
import { useFetcher } from "../async"

interface UseRegistrationCertificateRes {
  data: RegistrationCertificateRes | undefined
  isValidating: boolean
  createRegistrationCertificate: (
    para: UseParams<VehicleDetailFormParams, RegistrationCertificateRes>
  ) => void
  updateRegistrationCertificate: (
    para: UseParams<UpdateVehicleDetailFormParams, RegistrationCertificateRes>
  ) => void
}

const useRegistrationCertificate = (shouldFetch = false): UseRegistrationCertificateRes => {
  const { fetcherHandler } = useFetcher()

  const { data, isValidating } = useSWR<RegistrationCertificateRes>(
    "registration_certificate",
    shouldFetch
      ? () =>
          userAPI
            .getCertificateRegistrationVehicle()
            .then((res: AxiosResponse<RegistrationCertificateRes>) => res?.result?.data)
      : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 5000,
      revalidateOnFocus: false,
    }
  )

  const createRegistrationCertificate = async (
    para: UseParams<VehicleDetailFormParams, RegistrationCertificateRes>
  ) => {
    const { onSuccess, params, onError } = para
    fetcherHandler({
      fetcher: userAPI.createCertificateRegistrationVehicle(params),
      onSuccess: (data: RegistrationCertificateRes) => {
        onSuccess(data)
      },
      onError: () => onError?.(),
    })
  }

  const updateRegistrationCertificate = async (
    para: UseParams<UpdateVehicleDetailFormParams, RegistrationCertificateRes>
  ) => {
    const { onSuccess, params, onError } = para
    fetcherHandler({
      fetcher: userAPI.updateCertificateRegistrationVehicle(params),
      onSuccess: (data: RegistrationCertificateRes) => {
        onSuccess(data)
      },
      onError: () => onError?.(),
    })
  }

  return {
    data,
    isValidating,
    createRegistrationCertificate,
    updateRegistrationCertificate,
  }
}

export { useRegistrationCertificate }
