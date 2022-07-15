import { AccountTypeForm, OTP } from "@/components"
import { useAuth } from "@/hooks"
import { CarAccountType } from "@/models"
import { setAuthModalType, setProfile, setScreenLoading } from "@/modules"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"

interface RegisterModalProps {
  onSuccess: Function
}

export const Register = ({ onSuccess }: RegisterModalProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { getTokenFromFirebaseAccessToken, register, setToken: setTokenToCookie } = useAuth()
  const [token, setToken] = useState<string>("")

  const handleGenerateToken = async (firebase_access_token: string) => {
    getTokenFromFirebaseAccessToken(firebase_access_token, (token) => {
      setToken(token)
    })
  }

  const handleRegister = async (car_account_type: CarAccountType) => {
    if (!token) return
    dispatch(setScreenLoading(true))
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
          <OTP
            type="register"
            onVerifyOTP={(token) => {
              handleGenerateToken(token)
            }}
          >
            <div className="mb-[40px]">
              <p className="text-12 leading-[15px]">
                Bằng việc đăng kí, bạn đã đồng ý với Exxe về{" "}
                <Link href="/">
                  <a className="text-active">Điều khoản dịch vụ</a>
                </Link>{" "}
                &{" "}
                <Link href="/">
                  <a className="text-active text-12 leading-[15px]">Chính sách bảo mật.</a>
                </Link>
              </p>
            </div>
          </OTP>
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
