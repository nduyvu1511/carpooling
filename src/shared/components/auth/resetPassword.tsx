import { CreatePasswordForm, OTP } from "@/components"
import { toggleBodyOverflow } from "@/helper"
import { usePassword } from "@/hooks"
import { useEffect, useState } from "react"

interface ResetPasswordProps {
  onSuccess?: Function
  defaultPhoneNumber?: string
  view?: "modal" | "page"
}

const ResetPassword = ({ onSuccess, defaultPhoneNumber, view }: ResetPasswordProps) => {
  const { resetPassword } = usePassword()
  const [firebaseToken, setFirebaseToken] = useState<string>()

  useEffect(() => {
    ;(document?.querySelector(".form-input") as HTMLInputElement)?.focus()
  }, [])

  const handleResetPassword = (params: { password: string; re_password: string }) => {
    if (!firebaseToken) return
    resetPassword({
      params: { ...params, firebase_access_token: firebaseToken },
      onSuccess: () => {
        view === "modal" && toggleBodyOverflow("hidden")
        onSuccess?.()
      },
      onError: () => {
        view === "modal" && toggleBodyOverflow("hidden")
      },
    })
  }

  return (
    <div className="">
      <div className="">
        {!firebaseToken ? (
          <OTP
            view={view}
            defaultPhoneNumber={defaultPhoneNumber}
            type="resetPassword"
            onVerifyOTP={(token) => {
              setFirebaseToken(token)
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
