import { RequestOTPCode, UseParams, VerifyOTPCode } from "@/models"
import { userAPI } from "@/services"
import { useFetcher } from "../async"

interface UseOTPRes {
  verifyOTPCode: (_: UseParams<VerifyOTPCode, any>) => void
  requestOTPCode: (_: UseParams<RequestOTPCode, any>) => void
}

export const useOTP = (): UseOTPRes => {
  const { fetcherHandler } = useFetcher()

  const requestOTPCode = (_: UseParams<RequestOTPCode, any>) => {
    const { onSuccess, params, config, onError } = _
    fetcherHandler({
      fetcher: userAPI.requestOTP(params),
      onSuccess: (res: any) => {
        onSuccess?.(res)
      },
      onError: (res: any) => {
        onError?.(res)
      },
      config,
    })
  }

  const verifyOTPCode = (_: UseParams<VerifyOTPCode, any>) => {
    const { onSuccess, params, config, onError } = _
    fetcherHandler({
      fetcher: userAPI.verifyOTP(params),
      onSuccess: (res: any) => {
        onSuccess?.(res)
      },
      onError: (res: any) => {
        onError?.(res)
      },
      config,
    })
  }

  return {
    requestOTPCode,
    verifyOTPCode,
  }
}
