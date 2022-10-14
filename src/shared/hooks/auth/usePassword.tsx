import { ResetPasswordParams, ResetPasswordRes } from "@/models"
import { userAPI } from "@/services"
import { AxiosResponse } from "axios"
import useSWR, { KeyedMutator } from "swr"
import { useFetcher } from "../async"

interface ChangePasswordProps {
  handleSuccess: (_: any) => void
  password: string
  re_password: string
  old_password: string
}

interface CreatePasswordProps {
  handleSuccess: Function
  password: string
  re_password: string
}

interface DoResetPasswordParams {
  params: ResetPasswordParams
  onSuccess: Function
  onError?: Function
}

interface UsePasswordRes {
  data: boolean
  isValidating: boolean
  createPassword: (props: CreatePasswordProps) => void
  changePassword: (props: ChangePasswordProps) => void
  resetPassword: (props: DoResetPasswordParams) => void
  mutate: KeyedMutator<any>
}

export const usePassword = (shouldFetch = false): UsePasswordRes => {
  const { fetcherHandler } = useFetcher()

  const { data, isValidating, mutate } = useSWR(
    "check_password",
    shouldFetch
      ? () =>
          userAPI.checkHasPassword().then((res: AxiosResponse<any>) => {
            if (res?.result?.success) {
              return res?.result?.data?.has_password || false
            }
            return false
          })
      : null,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  const createPassword = async (props: CreatePasswordProps) => {
    const { password, handleSuccess, re_password } = props
    if (!password || !re_password) return
    fetcherHandler({
      fetcher: userAPI.createNewPassword({
        password,
        re_password,
      }),
      onSuccess: () => {
        mutate(true, false)
        handleSuccess()
      },
    })
  }

  const resetPassword = async (props: DoResetPasswordParams) => {
    const { params, onSuccess, onError } = props
    fetcherHandler({
      fetcher: userAPI.resetPassword(params),
      onSuccess: (res) => onSuccess?.(res),
      onError: () => onError?.(),
    })
  }

  const changePassword = async (props: ChangePasswordProps) => {
    const { password, handleSuccess, re_password, old_password } = props
    if (!password || !re_password) return
    fetcherHandler<ResetPasswordRes>({
      fetcher: userAPI.changePassword({
        password,
        re_password,
        old_password,
      }),
      onSuccess: (res) => {
        handleSuccess(res)
      },
      config: { successMsg: "Đổi mật khẩu thành công!" },
    })
  }

  return {
    createPassword,
    data,
    isValidating,
    mutate,
    changePassword,
    resetPassword,
  }
}
