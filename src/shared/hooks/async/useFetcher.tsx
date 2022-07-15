import { setScreenLoading } from "@/modules"
import { AxiosPromise, AxiosResponse } from "axios"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

export interface FetcherHandlerParams<T> {
  fetcher: AxiosPromise<T>
  onSuccess: (params: T) => void
  onError?: (data: any) => void
  config?: {
    showScreenLoading?: boolean
    errorMsg?: string
    successMsg?: string
    showErrorMsg?: boolean
  }
}

export interface Res {
  fetcherHandler: <T>(params: FetcherHandlerParams<T>) => void
}

const useFetcher = () => {
  const dispatch = useDispatch()

  const fetcherHandler = async <T,>(params: FetcherHandlerParams<T>) => {
    const { fetcher, onSuccess, onError, config } = params
    const { showScreenLoading = true, errorMsg, successMsg, showErrorMsg = true } = config || {}
    try {
      showScreenLoading && dispatch(setScreenLoading(true))
      const res: AxiosResponse<T> = await fetcher
      showScreenLoading && dispatch(setScreenLoading(false))
      if (res?.result?.code !== 200) {
        onError?.(res?.result?.data)
        showErrorMsg &&
          setTimeout(() => {
            dispatch(
              notify(
                errorMsg || res?.result?.message || "Có lỗi xảy ra vui lòng thử lại sau",
                "error"
              )
            )
          }, 0)
        return
      }
      successMsg && setTimeout(() => dispatch(notify(successMsg, "success")), 0)
      onSuccess(res?.result?.data)
      return res?.result?.data
    } catch (error) {
      onError?.(undefined)
      showScreenLoading && dispatch(setScreenLoading(false))
    }
  }

  return {
    fetcherHandler,
  }
}

export { useFetcher }
