import {
  CreateVerifiedPhoneNumber,
  UpdateVerifiedPhoneNumber,
  UseParams,
  VerifiedPhoneNumberRes,
} from "@/models"
import { userAPI } from "@/services"
import useSWR from "swr"
import { useFetcher } from "../async"

interface UseVerifiedPhoneNumber {
  data: VerifiedPhoneNumberRes | undefined
  isValidating: boolean
  createVerifiedPhoneNumber: (
    para: UseParams<CreateVerifiedPhoneNumber, VerifiedPhoneNumberRes>
  ) => void
  updateVerifiedPhoneNumber: (
    para: UseParams<UpdateVerifiedPhoneNumber, VerifiedPhoneNumberRes>
  ) => void
}

const useVerifyPhoneNumber = (shouldFetch = false): UseVerifiedPhoneNumber => {
  const { fetcherHandler } = useFetcher()

  const { data, isValidating } = useSWR<VerifiedPhoneNumberRes>(
    "verified_phone_number",
    shouldFetch ? () => userAPI.getVerifiedPhoneNumber().then((res) => res?.result?.data) : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 5000,
      revalidateOnFocus: false,
    }
  )

  const createVerifiedPhoneNumber = async (
    para: UseParams<CreateVerifiedPhoneNumber, VerifiedPhoneNumberRes>
  ) => {
    const { onSuccess, params, onError } = para
    fetcherHandler({
      fetcher: userAPI.createVerifiedPhoneNumber(params),
      onSuccess: (data: VerifiedPhoneNumberRes) => {
        onSuccess(data)
      },
      onError: () => onError?.(),
    })
  }

  const updateVerifiedPhoneNumber = async (
    para: UseParams<UpdateVerifiedPhoneNumber, VerifiedPhoneNumberRes>
  ) => {
    const { onSuccess, params, onError } = para
    fetcherHandler({
      fetcher: userAPI.updateVerifiedPhoneNumber(params),
      onSuccess: (data: VerifiedPhoneNumberRes) => {
        onSuccess(data)
      },
      onError: () => onError?.(),
    })
  }

  return {
    data,
    isValidating,
    createVerifiedPhoneNumber,
    updateVerifiedPhoneNumber,
  }
}

export { useVerifyPhoneNumber }
