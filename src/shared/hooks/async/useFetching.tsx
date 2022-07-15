import { AxiosPromise, AxiosResponse } from "axios"
import useSWR from "swr"
import { KeyedMutator, PublicConfiguration } from "swr/dist/types"

interface Res<T> {
  isValidating: boolean
  data: T | undefined
  mutate: KeyedMutator<T>
  error: any
  isInitialLoading: boolean
}

interface Props {
  key: string
  config?: Partial<PublicConfiguration<any>>
  fetcher: AxiosPromise
}

const useFetching = <T,>({ fetcher, key, config }: Props): Res<T> => {
  const { data, isValidating, error, mutate } = useSWR<any, any>(
    key,
    () =>
      fetcher
        .then((res: AxiosResponse<any, any>) => res?.result?.data)
        .catch((err) => console.log(err)),
    config
  )

  return {
    data,
    isValidating,
    error,
    mutate,
    isInitialLoading: error === undefined && data === undefined,
  }
}

export { useFetching }
