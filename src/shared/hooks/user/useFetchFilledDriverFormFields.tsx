import { FilledDataFieldsKey, FilledDataFieldsRes } from "@/models"
import { userApi } from "@/services"
import { AxiosResponse } from "axios"
import useSWR from "swr"

interface Res {
  isValidating: boolean
  data: FilledDataFieldsRes | undefined
  setFillDataForm: (key: FilledDataFieldsKey) => void
  isInitialLoading: boolean
}

export const useFetchFilledDriverFormFields = (shouldFetch = true): Res => {
  const { data, isValidating, mutate, error } = useSWR<FilledDataFieldsRes>(
    "get_filled_data_fields",
    shouldFetch
      ? () =>
          userApi
            .getFilledDataFields()
            .then((res: AxiosResponse<FilledDataFieldsRes>) => res?.result?.data)
      : null,
    {
      dedupingInterval: 1000,
    }
  )

  const setFillDataForm = (key: FilledDataFieldsKey) => {
    if (!data) return
    mutate({ ...data, [key]: true } as FilledDataFieldsRes, false)
  }

  return {
    data,
    isValidating,
    setFillDataForm,
    isInitialLoading: data === undefined && error === undefined,
  }
}
