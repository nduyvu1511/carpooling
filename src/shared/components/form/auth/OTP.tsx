import { OtpForm, PhoneForm } from "@/components"
import { authentication } from "@/core/config"
import { useAuth } from "@/hooks"
import { setScreenLoading } from "@/modules"
import { ApplicationVerifier, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { ReactNode, useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

declare global {
  interface Window {
    recaptchaVerifier: any
    confirmationResult: any
  }
}

interface LoginOtpProps {
  onVerifyOTP: (token: string) => void
  type?: "register" | "login" | "resetPassword"
  children?: ReactNode
  btnClassName?: string
  defaultPhoneNumber?: string
  view?: "modal" | "page"
  onRedirectToLogin?: Function
}

export const OTP = ({
  onVerifyOTP,
  type,
  children,
  defaultPhoneNumber = "",
  view = "modal",
  onRedirectToLogin,
}: LoginOtpProps) => {
  const dispatch = useDispatch()
  const { OTPVerifier, checkPhoneExist } = useAuth()
  const [expandForm, setExpandForm] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>(defaultPhoneNumber)

  const generateRecaptcha = () => {
    return new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response: any) => {
          setExpandForm(true)
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },

        "expired-callback": () => {
          console.log("this is expired callback call")
          // Response expired. Ask user to solve reCAPTCHA again.
        },
      },
      authentication
    )
  }

  // Generate OTP input
  const generateOTPCode = async (phoneNumber: string) => {
    if (!phoneNumber) return

    dispatch(setScreenLoading({ show: true, toggleOverFlow: view === "page" }))
    const verify: ApplicationVerifier = generateRecaptcha()
    try {
      const confirmationResult = await signInWithPhoneNumber(
        authentication,
        `+84${phoneNumber.slice(1)}`,
        verify
      )
      dispatch(setScreenLoading({ show: false, toggleOverFlow: view === "page" }))
      setPhone(phoneNumber)
      window.confirmationResult = confirmationResult
      setExpandForm(true)
    } catch (error) {
      dispatch(setScreenLoading({ show: false, toggleOverFlow: view === "page" }))
      generateRecaptcha().clear()
      console.log("error goes here")
    }
  }

  // Validate OTP
  const handleVerifyOTP = async (otpInput: string) => {
    OTPVerifier({
      otpInput,
      handleSuccess: (token) => {
        onVerifyOTP(token)
      },
      handleError: () => {},
      config: { toggleOverFlow: view === "page" },
    })
  }

  const handleGenerateOTPCode = (phone: string) => {
    if (type === undefined) {
      generateOTPCode(phone)
      return
    }

    checkPhoneExist({
      params: { phone, type },
      onSuccess: () => {
        generateOTPCode(phone)
      },
      onError: () => {
        if (type === "register") {
          dispatch(notify("SĐT đã tồn tại, vui lòng thử đăng nhập!", "warning"))
          onRedirectToLogin?.()
        } else if (type === "login") {
          dispatch(notify("Không tìm thấy SĐT, vui lòng thử lại", "warning"))
        }
      },
      config: { toggleOverFlow: view === "page" },
    })
  }

  return (
    <>
      {!expandForm ? (
        <PhoneForm phone={phone} onSubmit={(phone) => handleGenerateOTPCode(phone)}>
          {children}
        </PhoneForm>
      ) : (
        <div className="otp__form">
          <OtpForm
            reGenerateRecaptcha={() => {
              setExpandForm(false)
              generateRecaptcha().clear()
            }}
            phoneNumber={phone || ""}
            onSubmit={(val) => handleVerifyOTP(val)}
          />
        </div>
      )}

      <div id="recaptcha-container"></div>
    </>
  )
}
