import { CreateUserFormParams, UpdateUserInfoParams, UseParams, UserInfo } from "@/models"
import { userApi } from "@/services"
import { AxiosResponse } from "axios"
import useSWR from "swr"
import { useFetcher } from "../async"

interface UserRes {
  data: UserInfo | undefined
  isValidating: boolean
  createUserInfo: (para: UseParams<CreateUserFormParams, UserInfo>) => void
  updateUserInfo: (
    para: UseParams<UpdateUserInfoParams, UserInfo> & { showLoading?: boolean }
  ) => void
}

const useProfile = (shouldFetch = false): UserRes => {
  const { fetcherHandler } = useFetcher()

  const { data, isValidating, mutate } = useSWR<UserInfo>(
    "get_user_info",
    shouldFetch
      ? () =>
          userApi.getUserInfo().then((res: AxiosResponse<UserInfo>) => {
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
      fetcher: userApi.createUserInfo(params),
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
      fetcher: userApi.updateUserInfo(params),
      onSuccess: (data: UserInfo) => {
        mutate(data, false)
        onSuccess(data)
      },
      onError: () => onError?.(),
      config: { showScreenLoading: showLoading },
    })
  }

  return { data, isValidating, createUserInfo, updateUserInfo }
}

export { useProfile }
