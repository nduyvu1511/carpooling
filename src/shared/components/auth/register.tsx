import { AccountTypeForm, OTP } from "@/components"
import { toggleBodyOverflow } from "@/helper"
import { useAuth } from "@/hooks"
import { CarAccountType } from "@/models"
import { setAuthModalType, setProfile, setScreenLoading } from "@/modules"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { AuthBg } from "./authBg"

interface RegisterModalProps {
  onSuccess: Function
}

export const Register = ({ onSuccess }: RegisterModalProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { getTokenFromFirebaseAccessToken, register, setToken: setTokenToCookie } = useAuth()
  const [token, setToken] = useState<string>("")

  const handleGenerateToken = async (firebase_access_token: string) => {
    toggleBodyOverflow("hidden")
    getTokenFromFirebaseAccessToken(firebase_access_token, (token) => {
      setToken(token)
      toggleBodyOverflow("hidden")
    })
  }

  const handleRegister = async (car_account_type: CarAccountType) => {
    if (!token) return
    // dispatch(setScreenLoading(true))
    register({
      params: { car_account_type, token },
      onSuccess: (userInfo) => {
        setTokenToCookie(token, () => {
          dispatch(setProfile({ ...userInfo, car_account_type }))
          if (car_account_type === "customer") {
            onSuccess()
          } else {
            dispatch(setAuthModalType(undefined))
            setTimeout(() => {
              router.push("/d/register")
            }, 0)
          }
        })
      },
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
        <div className="py-12">
          <AccountTypeForm
            onSubmit={(type) => {
              handleRegister(type)
            }}
          />
        </div>
      )}
    </div>
  )
}
