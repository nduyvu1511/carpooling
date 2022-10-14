import { FilledDataFieldsKey, FilledDataFieldsRes } from "@/models"
import { userAPI } from "@/services"
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
          userAPI.getFilledDataFields().then((res: AxiosResponse<FilledDataFieldsRes>) => {
            const data = res?.result?.data

            return {
              car_driving_license: data?.car_driving_license,
              car_registration_certificate: data?.car_registration_certificate,
              compulsory_car_insurance: data?.compulsory_car_insurance,
              identity_card: data?.identity_card,
              periodical_inspection_certificate: data?.periodical_inspection_certificate,
              user_information: data?.user_information,
            } as FilledDataFieldsRes
          })
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
