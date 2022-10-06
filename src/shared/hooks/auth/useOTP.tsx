import { RequestOTPCode, UseParams, VerifyOTPCode } from "@/models"
import { userApi } from "@/services"
import { useFetcher } from "../async"

declare global {
  interface Window {
    recaptchaVerifier: any
    confirmationResult: any
  }
}

interface UseOTPRes {
  verifyOTPCode: (_: UseParams<VerifyOTPCode, any>) => void
  requestOTPCode: (_: UseParams<RequestOTPCode, any>) => void
}

export const useOTP = (): UseOTPRes => {
  const { fetcherHandler } = useFetcher()

  const requestOTPCode = (_: UseParams<RequestOTPCode, any>) => {
    const { onSuccess, params, config, onError } = _
    fetcherHandler({
      fetcher: userApi.requestOTP(params),
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
      fetcher: userApi.verifyOTP(params),
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
