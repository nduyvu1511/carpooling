import { isObjectHasValue, toImageUrl } from "@/helper"
import { useFetcher } from "@/hooks"
import {
  CheckPhoneExistParams,
  GetTokenParams,
  LoginByOTP,
  LoginFormParams,
  LoginRes,
  LoginWithPasswordRes,
  RegisterParams,
  UpdateUserInfoParams,
  UseParams,
  UserInfo,
  UserLoginRes,
  UserRes,
} from "@/models"
import { setProfile } from "@/modules"
import { chatApi, userApi } from "@/services"
import { AxiosResponse } from "axios"
import { useDispatch } from "react-redux"

interface UseAuthRes {
  getUserInfo: (handleSuccess: (props: UserInfo) => void, handleError?: Function) => void
  loginWithPassword: (_params: UseParams<LoginFormParams, LoginWithPasswordRes>) => void
  checkPhoneExist: (_params: UseParams<CheckPhoneExistParams, UserInfo | undefined>) => void
  logout: (cb?: Function) => void
  register: (_params: UseParams<RegisterParams, UserInfo>) => void
  setToken: (params: UseParams<string, undefined>) => void
  loginByOTP: (params: UseParams<LoginByOTP, LoginRes>) => void
  getTokenByOTP: (params: UseParams<LoginByOTP, LoginRes>) => void
  createChatUser: (_params: UseParams<UserInfo, UserLoginRes>) => void
  updateChatUser: (_params: UseParams<UserInfo, UserRes>) => void
  setChatToken: (
    _params: UseParams<{ access_token: string; refresh_token: string }, undefined>
  ) => void
  loginToChatServer: (params: GetTokenParams) => void
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

  const setChatToken = async (
    _params: UseParams<{ access_token: string; refresh_token: string }, undefined>
  ) => {
    const { params, onSuccess, onError } = _params
    fetcherHandler<null>({
      fetcher: userApi.setChatToken(params),
      onSuccess: () => onSuccess(undefined),
      onError: () => onError?.(),
      config: { showErrorMsg: false, showScreenLoading: false },
    })
  }

  const createChatUser = async (_params: UseParams<UserInfo, UserLoginRes>) => {
    const { params, onSuccess, onError } = _params
    try {
      const res = await chatApi.createUser({
        avatar: params.avatar_url?.image_url ? toImageUrl(params.avatar_url.image_url) : "",
        phone: params.phone,
        role: params.car_account_type,
        user_id: params.partner_id,
        user_name: params.partner_name,
        bio: params?.description || "",
        date_of_birth: params?.date_of_birth,
        gender: params?.gender || "",
      })
      if (res?.success) {
        onSuccess?.(res.data)
      } else {
        onError?.()
      }
    } catch (error) {
      onError?.()
    }
  }

  const loginToChatServer = async (params: GetTokenParams) => {
    try {
      const res = await chatApi.generateToken(params)
      if (res?.success) {
        await userApi.setChatToken(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateChatUser = async (_params: UseParams<UserInfo, UserRes>) => {
    const { params, onSuccess, onError } = _params
    try {
      const res = await chatApi.updateUser({
        avatar: params.avatar_url?.image_url ? toImageUrl(params.avatar_url.image_url) : "",
        bio: params?.description || "",
        date_of_birth: params?.date_of_birth || "",
        gender: params?.gender || "",
        user_name: params?.partner_name || "",
      })
      if (res?.success) {
        onSuccess?.(res.data)
      } else {
        onError?.()
      }
    } catch (error) {
      onError?.()
    }
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

  const loginByOTP = async (_params: UseParams<LoginByOTP, LoginRes>) => {
    const { onSuccess, params, onError, config } = _params
    fetcherHandler<LoginRes>({
      fetcher: userApi.loginByOTP(params),
      onSuccess: (data) => {
        onSuccess(data)
        loginToChatServer({ phone: data.phone, user_id: data.partner_id })
      },
      onError: () => {
        onError?.()
      },
      config,
    })
  }

  const getTokenByOTP = async (_params: UseParams<LoginByOTP, LoginRes>) => {
    const { onSuccess, params, onError, config } = _params
    fetcherHandler({
      fetcher: userApi.getTokenByOTP(params),
      onSuccess: (data) => {
        onSuccess(data)
      },
      onError: () => {
        onError?.()
      },
      config,
    })
  }

  const loginWithPassword = async (_params: UseParams<LoginFormParams, LoginWithPasswordRes>) => {
    const { onSuccess, params, config, onError } = _params
    fetcherHandler<LoginRes>({
      fetcher: userApi.login(params),
      onSuccess: (params) => {
        onSuccess(params)
      },
      onError: onError?.(),
      config,
    })
  }

  const checkPhoneExist = async (
    _params: UseParams<CheckPhoneExistParams, UserInfo | undefined>
  ) => {
    const {
      onSuccess,
      params: { phone, type },
      config,
      onError,
    } = _params

    fetcherHandler<UserInfo>({
      fetcher: userApi.checkPhoneExist(phone),
      onSuccess: (res) => {
        type === "register" ? onError?.() : onSuccess?.(res)
      },
      onError: () => {
        type === "register" ? onSuccess?.(undefined) : onError?.()
      },
      config: { ...config, showErrorMsg: false },
    })
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
    register,
    setToken,
    loginByOTP,
    getTokenByOTP,
    createChatUser,
    updateChatUser,
    setChatToken,
    loginToChatServer,
  }
}
