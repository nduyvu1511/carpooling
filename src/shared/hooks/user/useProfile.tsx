import {
  CreateUserFormParams,
  IdentityCardRes,
  UpdateUserInfoParams,
  UseParams,
  UserInfo,
} from "@/models"
import { userAPI } from "@/services"
import { AxiosResponse } from "axios"
import useSWR from "swr"
import { useFetcher } from "../async"
import { useAuth } from "../auth"

interface UserRes {
  data: UserInfo | undefined
  isValidating: boolean
  createUserInfo: (para: UseParams<CreateUserFormParams, UserInfo>) => void
  updateUserInfo: (
    para: UseParams<UpdateUserInfoParams, UserInfo> & { showLoading?: boolean }
  ) => void
  updateUserInfoIdentityCard: (_: IdentityCardRes) => void
}

const useProfile = (shouldFetch = false): UserRes => {
  const { fetcherHandler } = useFetcher()
  const { updateChatUser } = useAuth()

  const { data, isValidating, mutate } = useSWR<UserInfo>(
    "get_user_info",
    shouldFetch
      ? () =>
          userAPI.getUserInfo().then((res: AxiosResponse<UserInfo>) => {
            return res?.result?.data
          })
      : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 5000,
      revalidateOnFocus: false,
    }
  )

  const createUserInfo = async (para: UseParams<CreateUserFormParams, UserInfo>) => {
    const { onSuccess, params, onError } = para
    fetcherHandler({
      fetcher: userAPI.createUserInfo(params),
      onSuccess: (data: UserInfo) => {
        onSuccess(data)
      },
      onError: () => onError?.(),
    })
  }

  const updateUserInfo = async (
    para: UseParams<UpdateUserInfoParams, UserInfo> & { showLoading?: boolean }
  ) => {
    const { onSuccess, params, onError, showLoading = true } = para
    fetcherHandler({
      fetcher: userAPI.updateUserInfo(params),
      onSuccess: (data: UserInfo) => {
        mutate(data, false)
        onSuccess(data)
        updateChatUser({
          params: data,
          onSuccess: () => {},
        })
      },
      onError: () => onError?.(),
      config: { showScreenLoading: showLoading },
    })
  }

  const updateUserInfoIdentityCard = async (params: IdentityCardRes) => {
    if (!data) return
    mutate({ ...data, identity_card_id: params }, false)
  }

  return { data, isValidating, createUserInfo, updateUserInfo, updateUserInfoIdentityCard }
}

export { useProfile }
