import { OtpForm, PhoneForm } from "@/components"
import { useAuth, useOTP } from "@/hooks"
import { ReactNode, useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

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
  const { requestOTPCode, verifyOTPCode } = useOTP()
  const [expandForm, setExpandForm] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>(defaultPhoneNumber)

  const handleGenerateOTPCode = (phone: string) => {
    requestOTPCode({
      params: { phone },
      onSuccess: () => {
        setExpandForm(true)
        sessionStorage.setItem("phoneNumberInput", phone)
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
    setPhone(phone)

    if (!type) {
      handleGenerateOTPCode(phone)
    } else {
      checkPhoneExist({
        params: { phone, type },
        onSuccess: () => {
          handleGenerateOTPCode(phone)
        },
        onError: () => {
          if (type === "register") {
            dispatch(notify("SĐT đã tồn tại, vui lòng đăng nhập!", "warning"))
            onRedirectToLogin?.()
          } else if (type === "login") {
            dispatch(notify("Không tìm thấy SĐT, vui lòng đăng ký", "warning"))
          }
        },
        config: { toggleOverFlow: view === "page" },
      })
    }
  }

  return (
    <>
      {!expandForm ? (
        <PhoneForm phone={phone} onSubmit={onGenerateOTPCode}>
          {children}
        </PhoneForm>
      ) : (
        <div className="otp__form">
          <OtpForm
            phoneNumber={phone || ""}
            onSubmit={(val) => handleVerifyOTP(val)}
            resendOTPCode={() => {
              handleGenerateOTPCode(phone)
            }}
          />
        </div>
      )}
    </>
  )
}
