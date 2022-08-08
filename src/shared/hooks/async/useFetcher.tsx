import { FetcherConfig } from "@/models"
import { setScreenLoading } from "@/modules"
import { AxiosPromise, AxiosResponse } from "axios"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

export interface FetcherHandlerParams<T> {
  fetcher: AxiosPromise<T>
  onSuccess: (params: T) => void
  onError?: (data: any) => void
  config?: FetcherConfig
}

export interface Res {
  fetcherHandler: <T>(params: FetcherHandlerParams<T>) => void
}

const useFetcher = () => {
  const dispatch = useDispatch()

  const fetcherHandler = async <T,>(params: FetcherHandlerParams<T>) => {
    const { fetcher, onSuccess, onError, config } = params
    const {
      showScreenLoading = true,
      errorMsg,
      successMsg,
      showErrorMsg = true,
      toggleOverFlow = true,
    } = config || {}
    try {
      showScreenLoading && dispatch(setScreenLoading({ show: true, toggleOverFlow }))
      const res: AxiosResponse<T> = await fetcher
      showScreenLoading && dispatch(setScreenLoading({ show: false, toggleOverFlow }))
      if (res?.result?.code !== 200) {
        showErrorMsg &&
          setTimeout(() => {
            dispatch(
              notify(
                errorMsg || res?.result?.message || "Có lỗi xảy ra vui lòng thử lại sau",
                "error"
              )
            )
          }, 0)
        onError?.(res?.result?.data)
        return
      }
      successMsg && setTimeout(() => dispatch(notify(successMsg, "success")), 0)
      onSuccess(res?.result?.data)
      return res?.result?.data
    } catch (error) {
      showScreenLoading && dispatch(setScreenLoading({ show: false, toggleOverFlow }))
      onError?.(undefined)
    }
  }

  return {
    fetcherHandler,
  }
}

export { useFetcher }
