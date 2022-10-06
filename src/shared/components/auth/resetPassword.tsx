import { CreatePasswordForm, OTP } from "@/components"
import { usePassword } from "@/hooks"
import { useEffect, useState } from "react"

interface ResetPasswordProps {
  onSuccess?: Function
  defaultPhoneNumber?: string
  view?: "modal" | "page"
}

const ResetPassword = ({ onSuccess, defaultPhoneNumber, view }: ResetPasswordProps) => {
  const { resetPassword } = usePassword()
  const [token, settoken] = useState<string>()

  useEffect(() => {
    ;(document?.querySelector(".form-input") as HTMLInputElement)?.focus()
  }, [])

  const handleResetPassword = (params: { password: string; re_password: string }) => {
    if (!token) return
    resetPassword({
      params: { ...params, firebase_access_token: token },
      onSuccess: () => {
        onSuccess?.()
      },
      onError: () => {},
    })
  }

  return (
    <div className="reset-password-page">
      <div className="">
        {!token ? (
          <OTP
            view={view}
            defaultPhoneNumber={defaultPhoneNumber}
            type="resetPassword"
            onVerifyOTP={(token) => {
              settoken(token)
            }}
          />
        ) : (
          <div className="">
            <CreatePasswordForm onSubmit={(params) => handleResetPassword(params)} />
          </div>
        )}
      </div>
    </div>
  )
}

export { ResetPassword }
