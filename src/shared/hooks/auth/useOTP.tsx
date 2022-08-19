import { authentication } from "@/core/config"
import { PhoneParams, UseParams } from "@/models"
import { setScreenLoading } from "@/modules"
import { ApplicationVerifier, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { useDispatch } from "react-redux"

declare global {
  interface Window {
    recaptchaVerifier: any
    confirmationResult: any
  }
}

interface UseOTPRes {
  generateOTPCode: (_: UseParams<PhoneParams, PhoneParams>) => void
}

export const useOTP = (): UseOTPRes => {
  const dispatch = useDispatch()

  const generateRecaptcha = () => {
    return new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response: any) => {},

        "expired-callback": () => {},
      },
      authentication
    )
  }

  const generateOTPCode = async (_: UseParams<PhoneParams, PhoneParams>) => {
    const {
      onSuccess,
      params: { phone },
      config,
      onError,
    } = _
    if (!phone) return

    dispatch(setScreenLoading({ show: true, toggleOverFlow: config?.toggleOverFlow }))

    try {
      const verify: ApplicationVerifier = generateRecaptcha()
      const confirmationResult = await signInWithPhoneNumber(
        authentication,
        `+84${phone.slice(1)}`,
        verify
      )
      dispatch(setScreenLoading({ show: false, toggleOverFlow: config?.toggleOverFlow }))
      onSuccess({ phone })
      window.confirmationResult = confirmationResult
    } catch (error) {
      dispatch(setScreenLoading({ show: false, toggleOverFlow: config?.toggleOverFlow }))
      generateRecaptcha().clear()
      onError?.()
    }
  }

  return {
    generateOTPCode,
  }
}
