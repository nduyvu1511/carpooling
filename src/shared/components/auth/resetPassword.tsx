import { CreatePasswordForm, OTP } from "@/components"
import { usePassword } from "@/hooks"
import { useEffect, useState } from "react"

interface ResetPasswordProps {
  onSuccess?: (token: string) => void
  defaultPhoneNumber?: string
  view?: "modal" | "page"
}

const ResetPassword = ({ onSuccess, defaultPhoneNumber, view }: ResetPasswordProps) => {
  const { resetPassword } = usePassword()
  const [token, setToken] = useState<string>()

  useEffect(() => {
    ;(document?.querySelector(".form-input") as HTMLInputElement)?.focus()
  }, [])

  const handleResetPassword = (params: { password: string; re_password: string }) => {
    if (!token) return
    resetPassword({
      params: { ...params, stringee_access_token: token },
      onSuccess: ({ token }: { token: string }) => {
        onSuccess?.(token)
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
              setToken(token)
            }}
          />
        ) : (
          <CreatePasswordForm onSubmit={(params) => handleResetPassword(params)} />
        )}
      </div>
    </div>
  )
}

export { ResetPassword }
