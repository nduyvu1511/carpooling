import { PaymentRes } from "@/models"
import { ridesApi } from "@/services"
import { AxiosResponse } from "axios"
import { useState } from "react"
import useSWR from "swr"

interface UsePasswordRes {
  paymentList: PaymentRes[]
  isValidating: boolean
  currentSelectPayment: PaymentRes | undefined
  setCurrentSelectPayment: (params: PaymentRes) => void
}

export const usePayment = (): UsePasswordRes => {
  const { isValidating, data } = useSWR(
    "get_payment_list",
    () =>
      ridesApi
        .getPaymentMethods()
        .then((res: AxiosResponse<PaymentRes[]>) => {
          return res.result?.data
        })
        .catch((err) => {}),
    {
      dedupingInterval: 10000,
    }
  )

  const [currentSelectPayment, setCurrentSelectPayment] = useState<PaymentRes | undefined>(
    undefined
  )

  return {
    currentSelectPayment,
    setCurrentSelectPayment,
    paymentList: data || [],
    isValidating,
  }
}
