import { authentication, fbProvider, googleProvider } from "@/core"
import { isObjectHasValue } from "@/helper"
import { useFetcher } from "@/hooks"
import {
  loginFormParams,
  LoginRes,
  RegisterParams,
  UpdateUserInfoParams,
  UseParams,
  UserInfo,
} from "@/models"
import { setProfile, setScreenLoading } from "@/modules"
import { userApi } from "@/services"
import { AxiosResponse } from "axios"
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

interface otpProps {
  otpInput: string
  handleSuccess: (token: string) => void
  handleError?: Function
}

interface LoginWithPhoneNumberProps {
  firebaseToken: string
  onSuccess: (token: string) => void
  onError?: Function
}

interface UseAuthRes {
  loginWithFacebook: (handleSuccess: (token: string) => void, handleError?: Function) => void
  loginWithGoogle: (handleSuccess: (token: string) => void) => void
  loginWithPhoneNumber: (props: LoginWithPhoneNumberProps) => void
  getUserInfo: (handleSuccess: (props: UserInfo) => void, handleError?: Function) => void
  loginWithPassword: (loginForm: loginFormParams, handleSuccess: (params: LoginRes) => void) => void
  OTPVerifier: (props: otpProps) => void
  checkPhoneExist: (
    phone: string,
    type: "login" | "register" | "resetPassword",
    onSuccess: Function,
    onErr?: Function
  ) => void
  logout: (cb?: Function) => void
  register: (_params: UseParams<RegisterParams, UserInfo>) => void
  getTokenFromFirebaseAccessToken: (
    firebase_access_token: string,
    cb: (t: string) => void,
    onErr?: Function
  ) => void
  setToken: (token: string, cb: Function, onErr?: Function) => void
}

export const useAuth = (): UseAuthRes => {
  const dispatch = useDispatch()
  const { fetcherHandler } = useFetcher()

  const loginWithFacebook = async (
    handleSuccess: (token: string) => void,
    handleError?: Function
  ) => {
    try {
      const result: any = await signInWithPopup(authentication, fbProvider)
      const credential: any = FacebookAuthProvider.credentialFromResult(result)
      const facebook_access_token = credential.accessToken

      fetcherHandler<{ token: string }>({
        fetcher: userApi.firebaseAuth({
          type: "facebook",
          facebook_access_token,
        }),
        onSuccess: ({ token }) => {
          handleSuccess(token)
        },
        onError: () => {
          handleError?.()
        },
      })
    } catch (error: any) {
      handleError?.()
      dispatch(setScreenLoading(false))
    }
  }

  const setToken = async (token: string, cb: Function, onErr?: Function) => {
    fetcherHandler<null>({
      fetcher: userApi.setToken(token),
      onSuccess: () => {
        cb()
      },
      onError: () => {
        onErr?.()
      },
    })
  }

  const getTokenFromFirebaseAccessToken = async (
    firebase_access_token: string,
    cb: (t: string) => void,
    onErr?: Function
  ) => {
    try {
      const res: AxiosResponse<{ token: string }> = await userApi.getTokenFromFirebase({
        firebase_access_token,
      })
      if (res?.result?.code !== 200) {
        dispatch(notify(res?.result?.message || "Có lỗi xảy ra, vui lòng thử lại!", "error"))
        onErr && onErr()
        return
      }
      cb(res?.result?.data?.token || "")
    } catch (error) {
      onErr && onErr()
    }
  }

  const register = async (_params: UseParams<RegisterParams, UserInfo>) => {
    const { onSuccess, params, onError } = _params

    fetcherHandler<UserInfo>({
      fetcher: userApi.updateUserInfo(params as UpdateUserInfoParams),
      onSuccess: (userInfo) => {
        onSuccess(userInfo)
      },
      onError: () => {
        onError?.()
      },
    })
  }

  const loginWithGoogle = async (handleSuccess: (token: string) => void) => {
    try {
      const response: any = await signInWithPopup(authentication, googleProvider)
      const credential = GoogleAuthProvider.credentialFromResult(response)
      const firebase_access_token = credential?.idToken
      if (!googleProvider || !firebase_access_token || !response?.user) return
      dispatch(setScreenLoading(true))

      const res: AxiosResponse<any> = await userApi.firebaseAuth({
        type: "data_google",
        data_in_token: response.user,
        firebase_access_token,
      })
      dispatch(setScreenLoading(false))
      const token = res?.result?.data?.token
      if (res?.result?.code !== 200) {
        dispatch(
          notify({
            type: "danger",
            title: res?.result?.message || "",
          })
        )
        return
      }

      handleSuccess(token)
    } catch (error) {
      console.log(error)
      dispatch(setScreenLoading(false))
    }
  }

  const OTPVerifier = async (props: otpProps) => {
    const { otpInput, handleSuccess, handleError } = props
    const confirmationResult = window.confirmationResult
    dispatch(setScreenLoading(true))

    try {
      const responseToken = await confirmationResult.confirm(otpInput)
      const firebaseToken = responseToken?._tokenResponse?.idToken
      dispatch(setScreenLoading(false))

      if (firebaseToken) {
        handleSuccess(firebaseToken)
      } else {
        handleError && handleError()
        dispatch(notify("Vui lòng nhập đúng mã OTP", "error"))
      }
    } catch (error) {
      dispatch(setScreenLoading(false))
      dispatch(
        notify("Vui lòng nhập đúng mã OTP", "error", {
          position: "top-center",
        })
      )
    }
  }

  const logout = async (cb?: Function) => {
    try {
      const res: AxiosResponse<any> = await userApi.logout()
      if (res?.result?.code !== 200) return
      dispatch(setProfile(undefined))
      cb?.()
    } catch (error) {
      console.log(error)
    }
  }

  const loginWithPhoneNumber = async (props: LoginWithPhoneNumberProps) => {
    const { onSuccess, firebaseToken, onError } = props
    fetcherHandler<{ token: string }>({
      fetcher: userApi.firebaseAuth({ firebase_access_token: firebaseToken }),
      onSuccess: (data) => {
        onSuccess(data.token)
      },
      onError: () => {
        onError?.()
      },
    })
  }

  const loginWithPassword = async (
    loginForm: loginFormParams,
    handleSuccess: (params: LoginRes) => void
  ) => {
    fetcherHandler<LoginRes>({
      fetcher: userApi.login(loginForm),
      onSuccess: ({ car_account_type }: LoginRes) => {
        handleSuccess({ car_account_type })
      },
    })
  }

  const checkPhoneExist = async (
    phone: string,
    type: "login" | "register" | "resetPassword",
    onSuccess: Function,
    onErr?: Function
  ) => {
    try {
      dispatch(setScreenLoading(true))
      const res: AxiosResponse<any> = await userApi.checkPhoneExist(phone)
      dispatch(setScreenLoading(false))
      const hasPw = res?.result?.success
      if (hasPw !== true && hasPw !== false) {
        return
      }

      if (type === "register") {
        if (hasPw && res?.result?.data?.car_account_type) {
          onErr && onErr()
          return
        }
        onSuccess && onSuccess()
      } else {
        hasPw ? onSuccess() : onErr && onErr()
      }
    } catch (error) {
      dispatch(setScreenLoading(false))
    }
  }

  const getUserInfo = async (handleSuccess: (props: UserInfo) => void, handleError?: Function) => {
    try {
      const res: AxiosResponse<UserInfo> = await userApi.getUserInfo()
      if (res?.result?.code !== 200 || !isObjectHasValue(res?.result?.data)) {
        handleError && handleError()
        return
      }
      handleSuccess(res.result?.data)
    } catch (error) {
      console.log(error)
      handleError && handleError()
    }
  }

  return {
    loginWithFacebook,
    loginWithGoogle,
    getUserInfo,
    loginWithPhoneNumber,
    loginWithPassword,
    OTPVerifier,
    checkPhoneExist,
    logout,
    getTokenFromFirebaseAccessToken,
    register,
    setToken,
  }
}
