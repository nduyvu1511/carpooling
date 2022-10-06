import { isObjectHasValue } from "@/helper"
import { useFetcher } from "@/hooks"
import {
  CheckPhoneExistParams,
  LoginByOTP,
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
import { useDispatch } from "react-redux"

interface UseAuthRes {
  getUserInfo: (handleSuccess: (props: UserInfo) => void, handleError?: Function) => void
  loginWithPassword: (_params: UseParams<LoginFormParams, LoginRes>) => void
  checkPhoneExist: (_params: UseParams<CheckPhoneExistParams, undefined>) => void
  logout: (cb?: Function) => void
  register: (_params: UseParams<RegisterParams, UserInfo>) => void
  getTokenFromFirebaseAccessToken: (_params: UseParams<string, string>) => void
  setToken: (params: UseParams<string, undefined>) => void
  loginByOTP: (params: UseParams<LoginByOTP, any>) => void
}

export const useAuth = (): UseAuthRes => {
  const dispatch = useDispatch()
  const { fetcherHandler } = useFetcher()

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

  const logout = async (cb?: Function) => {
    try {
      const res: AxiosResponse<any> = await userApi.logout()
      if (res?.result?.code !== 200) return
      cb?.()
      dispatch(setProfile(undefined))
    } catch (error) {
      console.log(error)
    }
  }

  const loginByOTP = async (_params: UseParams<LoginByOTP, string>) => {
    const { onSuccess, params, onError, config } = _params
    fetcherHandler<{ token: string }>({
      fetcher: userApi.loginByOTP(params),
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
    getUserInfo,
    loginWithPassword,
    checkPhoneExist,
    logout,
    getTokenFromFirebaseAccessToken,
    register,
    setToken,
    loginByOTP,
  }
}
