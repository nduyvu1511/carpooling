import { authentication, fbProvider, googleProvider } from "@/core"
import { isObjectHasValue } from "@/helper"
import { useFetcher } from "@/hooks"
import {
  CheckPhoneExistParams,
  FetcherConfig,
  LoginFormParams,
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
  config?: FetcherConfig
}

interface UseAuthRes {
  loginWithFacebook: (handleSuccess: (token: string) => void, handleError?: Function) => void
  loginWithGoogle: (handleSuccess: (token: string) => void) => void
  loginWithPhoneNumber: (_params: UseParams<string, string>) => void
  getUserInfo: (handleSuccess: (props: UserInfo) => void, handleError?: Function) => void
  loginWithPassword: (_params: UseParams<LoginFormParams, LoginRes>) => void
  OTPVerifier: (props: otpProps) => void
  checkPhoneExist: (_params: UseParams<CheckPhoneExistParams, undefined>) => void
  logout: (cb?: Function) => void
  register: (_params: UseParams<RegisterParams, UserInfo>) => void
  getTokenFromFirebaseAccessToken: (_params: UseParams<string, string>) => void
  setToken: (params: UseParams<string, undefined>) => void
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
      // dispatch(setScreenLoading(false))
    }
  }

  const setToken = async (_params: UseParams<string, undefined>) => {
    const { params, onSuccess, config, onError } = _params
    fetcherHandler<null>({
      fetcher: userApi.setToken(params),
      onSuccess: () => {
        onSuccess(undefined)
      },
      onError: () => {
        onError?.()
      },
      config,
    })
  }

  const getTokenFromFirebaseAccessToken = async (_params: UseParams<string, string>) => {
    const { onSuccess, params, config, onError } = _params
    fetcherHandler({
      fetcher: userApi.getTokenFromFirebase({
        firebase_access_token: params,
      }),
      onSuccess: ({ token }) => onSuccess(token),
      onError: () => onError?.(),
      config,
    })
  }

  const register = async (_params: UseParams<RegisterParams, UserInfo>) => {
    const { onSuccess, params, onError, config } = _params

    fetcherHandler<UserInfo>({
      fetcher: userApi.updateUserInfo(params as UpdateUserInfoParams),
      onSuccess: (userInfo) => {
        onSuccess(userInfo)
      },
      onError: () => {
        onError?.()
      },
      config,
    })
  }

  const loginWithGoogle = async (handleSuccess: (token: string) => void) => {
    try {
      const response: any = await signInWithPopup(authentication, googleProvider)
      const credential = GoogleAuthProvider.credentialFromResult(response)
      const firebase_access_token = credential?.idToken
      if (!googleProvider || !firebase_access_token || !response?.user) return
      // dispatch(setScreenLoading(true))

      const res: AxiosResponse<any> = await userApi.firebaseAuth({
        type: "data_google",
        data_in_token: response.user,
        firebase_access_token,
      })
      // dispatch(setScreenLoading(false))
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
      // dispatch(setScreenLoading(false))
    }
  }

  const OTPVerifier = async (props: otpProps) => {
    const { otpInput, handleSuccess, handleError, config } = props
    const confirmationResult = window.confirmationResult
    dispatch(setScreenLoading({ show: true, toggleOverFlow: config?.toggleOverFlow }))

    try {
      const responseToken = await confirmationResult.confirm(otpInput)
      const firebaseToken = responseToken?._tokenResponse?.idToken
      dispatch(setScreenLoading({ show: false, toggleOverFlow: config?.toggleOverFlow }))

      if (firebaseToken) {
        handleSuccess(firebaseToken)
      } else {
        handleError && handleError()
        dispatch(notify("Vui lòng nhập đúng mã OTP", "error"))
      }
    } catch (error) {
      dispatch(setScreenLoading({ show: false, toggleOverFlow: config?.toggleOverFlow }))
      dispatch(
        notify("Vui lòng nhập đúng mã OTP", "error", {
          position: "top-center",
        })
      )
      handleError && handleError()
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

  const loginWithPhoneNumber = async (_params: UseParams<string, string>) => {
    const { onSuccess, params, onError, config } = _params
    fetcherHandler<{ token: string }>({
      fetcher: userApi.firebaseAuth({ firebase_access_token: params }),
      onSuccess: (data) => {
        onSuccess(data.token)
      },
      onError: () => {
        onError?.()
      },
      config,
    })
  }

  const loginWithPassword = async (_params: UseParams<LoginFormParams, LoginRes>) => {
    const { onSuccess, params, config, onError } = _params
    fetcherHandler<LoginRes>({
      fetcher: userApi.login(params),
      onSuccess: ({ car_account_type }: LoginRes) => {
        onSuccess({ car_account_type })
      },
      onError: onError?.(),
      config,
    })
  }

  const checkPhoneExist = async (_params: UseParams<CheckPhoneExistParams, undefined>) => {
    const {
      onSuccess,
      params: { phone, type },
      config,
      onError,
    } = _params
    try {
      dispatch(setScreenLoading({ show: true, toggleOverFlow: config?.toggleOverFlow }))
      const res = await userApi.checkPhoneExist(phone)
      dispatch(setScreenLoading({ show: false, toggleOverFlow: config?.toggleOverFlow }))
      const hasPw = res?.result?.success
      if (hasPw !== true && hasPw !== false) {
        return
      }

      if (type === "register") {
        if (hasPw && res?.result?.data?.car_account_type) {
          onError?.()
          return
        }
        onSuccess(undefined)
      } else {
        hasPw ? onSuccess(undefined) : onError?.()
      }
    } catch (error) {
      dispatch(setScreenLoading({ show: false, toggleOverFlow: config?.toggleOverFlow }))
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
