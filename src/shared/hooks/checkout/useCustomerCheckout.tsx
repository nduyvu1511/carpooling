import {
  CompoundingCarCustomer,
  ConfirmTransactionParams,
  CreatePaymentParams,
  CreatePaymentRes,
  UseParams,
} from "@/models"
import { ridesApi } from "@/services"
import { AxiosResponse } from "axios"
import { useState } from "react"
import { useFetcher } from "../async"

interface UseCustomerCheckoutRes {
  createPayment: (props: UseParams<CreatePaymentParams, CreatePaymentRes>) => void
  confirmTransaction: (props: UseParams<ConfirmTransactionParams, any>) => void
  confirmDepositCompoundingCarCustomer: (
    compounding_car_customer_id: number,
    cb?: Function,
    onErr?: Function
  ) => void
  confirmDepositLoading: boolean
  confirmPayFullForCompoundingCarCustomer: (
    compounding_car_customer_id: number,
    cb: (params: CompoundingCarCustomer) => void,
    onErr?: Function
  ) => void
}

export const useCustomerCheckout = (): UseCustomerCheckoutRes => {
  const [confirmDepositLoading, setConfirmDepositLoading] = useState<boolean>(false)
  const { fetcherHandler } = useFetcher()

  const createPayment = async (props: UseParams<CreatePaymentParams, CreatePaymentRes>) => {
    const { params, onSuccess, onError } = props
    fetcherHandler({
      fetcher: ridesApi.createPayment(params),
      onSuccess: (params: CreatePaymentRes) => {
        onSuccess(params)
      },
      onError: () => onError?.(),
    })
  }

  const confirmTransaction = async (props: UseParams<ConfirmTransactionParams, any>) => {
    const { params, onSuccess, onError } = props
    fetcherHandler({
      fetcher: ridesApi.confirmTransaction(params),
      onSuccess: (params: any) => {
        onSuccess(params)
      },
      onError: () => onError?.(),
    })
  }

  const confirmDepositCompoundingCarCustomer = async (
    compounding_car_customer_id: number,
    cb?: Function,
    onErr?: Function
  ) => {
    try {
      setConfirmDepositLoading(true)
      const res: AxiosResponse<CompoundingCarCustomer> =
        await ridesApi.confirmDepositCompoundingCarCustomer({
          compounding_car_customer_id: compounding_car_customer_id,
        })
      setConfirmDepositLoading(false)
      const result: CompoundingCarCustomer = res?.result?.data
      if (result?.state === "deposit") {
        cb && cb()
      } else {
        onErr && onErr()
      }
    } catch (err) {
      setConfirmDepositLoading(false)
      onErr && onErr()
      console.log(err)
    }
  }

  const confirmPayFullForCompoundingCarCustomer = async (
    compounding_car_customer_id: number,
    cb: (params: CompoundingCarCustomer) => void,
    onErr?: Function
  ) => {
    try {
      setConfirmDepositLoading(true)
      const res: AxiosResponse<CompoundingCarCustomer> =
        await ridesApi.customerConfirmPayFullCompoundingCar({
          compounding_car_customer_id,
        })
      setConfirmDepositLoading(false)
      const result = res?.result?.data
      if (result?.state === "confirm_paid") {
        cb && cb(result)
      } else {
        onErr && onErr()
      }
    } catch (err) {
      setConfirmDepositLoading(false)
      onErr && onErr()
      console.log(err)
    }
  }

  return {
    confirmTransaction,
    createPayment,
    confirmDepositCompoundingCarCustomer,
    confirmDepositLoading,
    confirmPayFullForCompoundingCarCustomer,
  }
}
