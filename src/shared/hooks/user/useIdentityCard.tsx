import { IdCardParams, IdCardUpdateParams, IdentityCardRes, UseParams } from "@/models"
import { userApi } from "@/services"
import { AxiosResponse } from "axios"
import useSWR from "swr"
import { useFetcher } from "../async"

interface UseIdentityCardRes {
  data: IdentityCardRes | undefined
  isValidating: boolean
  createIdentityCard: (para: UseParams<IdCardParams, IdentityCardRes>) => void
  updateIdentityCard: (para: UseParams<IdCardUpdateParams, IdentityCardRes>) => void
}

const useIdentityCard = (shouldFetch = false): UseIdentityCardRes => {
  const { fetcherHandler } = useFetcher()

  const { data, isValidating } = useSWR<IdentityCardRes>(
    "identity_card",
    shouldFetch
      ? () =>
          userApi.getIdentityCard().then((res: AxiosResponse<IdentityCardRes>) => res?.result?.data)
      : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 5000,
      revalidateOnFocus: false,
    }
  )

  const createIdentityCard = async (para: UseParams<IdCardParams, IdentityCardRes>) => {
    const { onSuccess, params, onError } = para
    fetcherHandler({
      fetcher: userApi.createIdentityCard(params),
      onSuccess: (data: IdentityCardRes) => {
        onSuccess(data)
      },
      onError: () => onError?.(),
    })
  }

  const updateIdentityCard = async (para: UseParams<IdCardUpdateParams, IdentityCardRes>) => {
    const { onSuccess, params, onError } = para
    fetcherHandler({
      fetcher: userApi.updateIdentityCard(params),
      onSuccess: (data: IdentityCardRes) => {
        onSuccess(data)
      },
      onError: () => onError?.(),
    })
  }

  return { data, isValidating, createIdentityCard, updateIdentityCard }
}

export { useIdentityCard }
