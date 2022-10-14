import { PaymentRes } from "@/models"
import { userAPI } from "@/services"
import useSWR from "swr"

interface Res {
  isValidating: boolean
  isInitialLoading: boolean
  data: PaymentRes[]
}

export const usePaymentMethodRechargeMoney = (): Res => {
  const { isValidating, mutate, data, error } = useSWR<PaymentRes[]>(
    "usePaymentMethodRechargeMoney",
    () =>
      userAPI
        .getPaymentMethodListForRechargeMoney()
        .then((res) => res?.result?.data)
        .catch((err) => console.log(err)),
    {
      dedupingInterval: 1000 * 10,
    }
  )
  return {
    data: data || [],
    isInitialLoading: data === undefined && error === undefined,
    isValidating,
  }
}
