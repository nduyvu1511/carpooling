import { CreatePasswordForm, OTP } from "@/components"
import { usePassword } from "@/hooks"
import { useEffect, useState } from "react"

interface ResetPasswordProps {
  onSuccess?: Function
  defaultPhoneNumber?: string
}

const ResetPassword = ({ onSuccess, defaultPhoneNumber }: ResetPasswordProps) => {
  const { resetPassword } = usePassword()
  const [firebaseToken, setFirebaseToken] = useState<string>()

  useEffect(() => {
    ;(document?.querySelector(".form-input") as HTMLInputElement).focus()
  }, [])

  const handleResetPassword = (params: { password: string; re_password: string }) => {
    if (!firebaseToken) return
    resetPassword({
      params: { ...params, firebase_access_token: firebaseToken },
      onSuccess: () => {
        onSuccess?.()
      },
    })
  }

  return (
    <div className="">
      <div className="">
        {!firebaseToken ? (
          <OTP
            defaultPhoneNumber={defaultPhoneNumber}
            type="resetPassword"
            onVerifyOTP={(token) => {
              console.log("firebase token: ", token)
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
