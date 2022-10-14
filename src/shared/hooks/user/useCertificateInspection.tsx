import {
  CertificateInspectionParams,
  CertificateInspectionRes,
  UpdateCertificateInspectionParams,
  UseParams,
} from "@/models"
import { userAPI } from "@/services"
import { AxiosResponse } from "axios"
import useSWR from "swr"
import { useFetcher } from "../async"

interface UseCertificateInspectionRes {
  data: CertificateInspectionRes | undefined
  isValidating: boolean
  createCertificateInspection: (
    para: UseParams<CertificateInspectionParams, CertificateInspectionRes>
  ) => void
  updateCertificateInspection: (
    para: UseParams<UpdateCertificateInspectionParams, CertificateInspectionRes>
  ) => void
}

const useCertificateInspection = (shouldFetch = false): UseCertificateInspectionRes => {
  const { fetcherHandler } = useFetcher()

  const { data, isValidating } = useSWR<CertificateInspectionRes>(
    "certificate_inspection",
    shouldFetch
      ? () =>
          userAPI
            .getCertificateInspection()
            .then((res: AxiosResponse<CertificateInspectionRes>) => res?.result?.data)
      : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 5000,
      revalidateOnFocus: false,
    }
  )

  const createCertificateInspection = async (
    para: UseParams<CertificateInspectionParams, CertificateInspectionRes>
  ) => {
    const { onSuccess, params, onError } = para
    fetcherHandler({
      fetcher: userAPI.createCertificateInspection(params),
      onSuccess: (data: CertificateInspectionRes) => {
        onSuccess(data)
      },
      onError: () => onError?.(),
    })
  }

  const updateCertificateInspection = async (
    para: UseParams<UpdateCertificateInspectionParams, CertificateInspectionRes>
  ) => {
    const { onSuccess, params, onError } = para
    fetcherHandler({
      fetcher: userAPI.updateCertificateInspection(params),
      onSuccess: (data: CertificateInspectionRes) => {
        onSuccess(data)
      },
      onError: () => onError?.(),
    })
  }

  return {
    data,
    isValidating,
    createCertificateInspection,
    updateCertificateInspection,
  }
}

export { useCertificateInspection }
