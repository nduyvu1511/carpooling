import { useAuth } from "@/hooks"
import { LoginByOTP, UserInfo } from "@/models"
import { setProfile } from "@/modules"
import React from "react"
import { useDispatch } from "react-redux"
import { OTP } from "../form"

interface LoginProps {
  onLoginSuccess?: (_: UserInfo) => void
}

export const Login = ({ onLoginSuccess }: LoginProps) => {
  const dispatch = useDispatch()
  const { loginByOTP } = useAuth()

  const handleLoginWithOTP = (params: LoginByOTP) => {
    loginByOTP({
      params,
      onSuccess: (res) => {
        const { token, refresh_token, ...userInfo } = res
        dispatch(setProfile(userInfo))
        setTimeout(() => {
          onLoginSuccess?.(userInfo)
        }, 200)
      },
      config: { toggleOverFlow: false },
    })
  }

  return (
    <OTP
      view="page"
      type="login"
      onVerifyOTP={(stringee_access_token) => {
        handleLoginWithOTP({ type: "stringee", stringee_access_token })
      }}
    />
  )
}
