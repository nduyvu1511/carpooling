import { OtpForm, PhoneForm } from "@/components"
import { useAuth, useOTP } from "@/hooks"
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
  const { checkPhoneExist } = useAuth()
  const [expandForm, setExpandForm] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>(defaultPhoneNumber)
  const { requestOTPCode, verifyOTPCode } = useOTP()

  // // Generate OTP input
  // const generateOTPCode = async (phoneNumber: string) => {
  //   if (!phoneNumber) return

  //   dispatch(setScreenLoading({ show: true, toggleOverFlow: view === "page" }))
  //   const verify: ApplicationVerifier = generateRecaptcha()
  //   try {
  //     const confirmationResult = await signInWithPhoneNumber(
  //       authentication,
  //       `+84${phoneNumber.slice(1)}`,
  //       verify
  //     )
  //     dispatch(setScreenLoading({ show: false, toggleOverFlow: view === "page" }))
  //     setPhone(phoneNumber)
  //     window.confirmationResult = confirmationResult
  //     setExpandForm(true)
  //   } catch (error) {
  //     dispatch(setScreenLoading({ show: false, toggleOverFlow: view === "page" }))
  //     generateRecaptcha().clear()
  //     console.log("error goes here")
  //   }
  // }

  const handleGenerateOTPCode = (phone: string) => {
    requestOTPCode({
      params: { phone },
      onSuccess: (res) => {
        setExpandForm(true)
      },
    })
  }

  // Validate OTP
  const handleVerifyOTP = async (otp_code: string) => {
    verifyOTPCode({
      params: { otp_code, phone },
      onSuccess: ({ stringee_access_token }: { stringee_access_token: string }) => {
        onVerifyOTP(stringee_access_token)
      },
    })
  }

  const onGenerateOTPCode = (phone: string) => {
    requestOTPCode({
      params: { phone },
      onSuccess: (res) => {
        setExpandForm(true)
      },
    })

    if (type === undefined) {
      // generateOTPCode(phone)
      return
    }

    checkPhoneExist({
      params: { phone, type },
      onSuccess: () => {
        // generateOTPCode(phone)
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
        <PhoneForm
          phone={phone}
          onSubmit={(phone) => {
            handleGenerateOTPCode(phone)
            setPhone(phone)
          }}
        >
          {children}
        </PhoneForm>
      ) : (
        <div className="otp__form">
          <OtpForm
            reGenerateRecaptcha={() => {
              setExpandForm(false)
              // generateRecaptcha().clear()
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
