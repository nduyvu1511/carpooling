import { AxiosPromise, AxiosResponse } from "axios"
import { useEffect, useState } from "react"

interface Res<T> {
  isLoading: boolean
  hasMore: boolean
  filter: (fetcher: AxiosPromise, cb?: Function, err?: Function) => void
  fetchMore: (fetcher: AxiosPromise, cb?: Function, err?: Function) => void
  isInitialLoading: boolean
  isFetchingMore: boolean
  offset: number
  data: T[] | undefined
}

interface Props {
  fetcher: AxiosPromise<any>
  limit?: number
}

export const useQueryList = <T,>({ fetcher, limit = 12 }: Props): Res<T> => {
  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isFetchingMore, setFetchingMore] = useState<boolean>(false)
  const [data, setData] = useState<T[]>()
  const [error, setError] = useState()

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const res: AxiosResponse<T[]> = await fetcher
        setLoading(false)
        setData(res.result.data || [])
      } catch (error) {
        setError(error as any)
        setLoading(false)
      }
    })()
  }, [])

  const filter = async (fetcher: AxiosPromise, cb?: Function, err?: Function) => {
    try {
      setLoading(true)
      const res: AxiosResponse<T[]> = await fetcher
      setLoading(false)
      setOffset(0)
      const list = res?.result?.data || []
      setData(list)
      setHasMore(list.length >= limit)
      cb?.(list)
    } catch (error) {
      setLoading(false)
      err?.()
      console.log(error)
    }
  }

  const fetchMore = async (fetcher: AxiosPromise, cb?: Function, err?: Function) => {
    try {
      setFetchingMore(true)
      const res: AxiosResponse<T[]> = await fetcher
      setFetchingMore(false)
      setOffset(offset + limit)
      const list = res?.result?.data || []
      setHasMore(list.length >= limit)
      setData([...(data || []), ...list])
      cb?.()
    } catch (error) {
      err?.()
      setFetchingMore(false)
      console.log(error)
    }
  }

  return {
    data,
    isLoading: isLoading,
    hasMore,
    fetchMore,
    filter,
    isInitialLoading: data === undefined && error === undefined,
    isFetchingMore,
    offset,
  }
}
