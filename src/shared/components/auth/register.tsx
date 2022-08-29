import { AccountTypeForm, OTP } from "@/components"
import { toggleBodyOverflow } from "@/helper"
import { useAuth } from "@/hooks"
import { CarAccountType } from "@/models"
import { setAuthModalType, setProfile } from "@/modules"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { AuthBg } from "./authBg"

interface RegisterModalProps {
  onSuccess: Function
  onRedirectToLogin?: Function
}

export const Register = ({ onSuccess, onRedirectToLogin }: RegisterModalProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { getTokenFromFirebaseAccessToken, register, setToken: setTokenToCookie } = useAuth()
  const [token, setToken] = useState<string>()

  const handleGenerateToken = async (firebase_access_token: string) => {
    toggleBodyOverflow("hidden")
    getTokenFromFirebaseAccessToken({
      params: firebase_access_token,
      onSuccess: (token) => {
        setToken(token)
        toggleBodyOverflow("hidden")
      },
      config: { toggleOverFlow: false },
    })
  }

  const handleRegister = async (car_account_type: CarAccountType) => {
    if (!token) return
    register({
      params: { car_account_type, token },
      onSuccess: (userInfo) => {
        setTokenToCookie({
          params: token,
          onSuccess: () => {
            dispatch(setProfile({ ...userInfo, car_account_type }))
            if (car_account_type === "customer") {
              onSuccess()
            } else {
              dispatch(setAuthModalType(undefined))
              setTimeout(() => {
                router.push("/d/register")
              }, 0)
            }
          },
          config: { toggleOverFlow: false },
        })
      },
      config: { toggleOverFlow: false },
    })
  }

  return (
    <div className="register-container">
      {!token ? (
        <div className="">
          <div className="relative z-[1000]">
            <OTP
              view="modal"
              type="register"
              onVerifyOTP={(token) => {
                handleGenerateToken(token)
              }}
              onRedirectToLogin={onRedirectToLogin}
            >
              <div className="mb-[40px]">
                <p className="text-12 leading-[15px]">
                  Bằng việc đăng kí, bạn đã đồng ý với Exxe về{" "}
                  <a
                    target="_blank"
                    rel="noopen noreferrer"
                    href="/terms-&-conditions"
                    className="cursor-pointer text-active"
                  >
                    Điều khoản dịch vụ
                  </a>{" "}
                  &{" "}
                  <a
                    target="_blank"
                    rel="noopen noreferrer"
                    href="/terms-&-conditions"
                    className="cursor-pointer text-active text-12 leading-[15px]"
                  >
                    Chính sách bảo mật.
                  </a>
                </p>
              </div>
            </OTP>
          </div>

          <AuthBg />
        </div>
      ) : (
        <AccountTypeForm
          onSubmit={(type) => {
            handleRegister(type)
          }}
        />
      )}
    </div>
  )
}
