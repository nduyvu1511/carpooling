import {
  CompoundingCarCustomer,
  ConfirmPayFullCustomerParams,
  ConfirmTransactionParams,
  CreatePaymentParams,
  CreatePaymentRes,
  UseParams,
} from "@/models"
import { rideAPI } from "@/services"
import { useFetcher } from "../async"

interface UseCustomerCheckoutRes {
  createPayment: (props: UseParams<CreatePaymentParams, CreatePaymentRes>) => void
  confirmTransaction: (props: UseParams<ConfirmTransactionParams, any>) => void
  confirmDepositCompoundingCarCustomer: (_: UseParams<number, undefined>) => void
  confirmPayFullForCompoundingCarCustomer: (
    _: UseParams<ConfirmPayFullCustomerParams, CompoundingCarCustomer>
  ) => void
}

export const useCustomerCheckout = (): UseCustomerCheckoutRes => {
  const { fetcherHandler } = useFetcher()

  const createPayment = async (props: UseParams<CreatePaymentParams, CreatePaymentRes>) => {
    const { params, onSuccess, onError } = props
    fetcherHandler({
      fetcher: rideAPI.createPayment(params),
      onSuccess: (params: CreatePaymentRes) => {
        onSuccess(params)
      },
      onError: () => onError?.(),
    })
  }

  const confirmTransaction = async (props: UseParams<ConfirmTransactionParams, any>) => {
    const { params, onSuccess, onError } = props
    fetcherHandler({
      fetcher: rideAPI.confirmTransaction(params),
      onSuccess: (params: any) => {
        onSuccess(params)
      },
      onError: () => onError?.(),
    })
  }

  const confirmDepositCompoundingCarCustomer = async (_: UseParams<number, undefined>) => {
    const { params: compounding_car_customer_id, onSuccess, config, onError } = _
    fetcherHandler<CompoundingCarCustomer>({
      fetcher: rideAPI.confirmDepositCompoundingCarCustomer({
        compounding_car_customer_id,
      }),
      onSuccess: (data) => {
        if (data?.state === "deposit") {
          onSuccess(undefined)
        } else {
          onError?.()
        }
      },
      onError: () => onError?.(),
      config,
    })
  }

  const confirmPayFullForCompoundingCarCustomer = async (
    _: UseParams<ConfirmPayFullCustomerParams, CompoundingCarCustomer>
  ) => {
    const { onSuccess, params, onError } = _

    fetcherHandler({
      fetcher: rideAPI.customerPayForRemainingAmount(params),
      onSuccess: (result) => {
        if (result?.state === "done") {
          onSuccess?.(result)
        } else {
          onError?.()
        }
      },
    })
  }

  return {
    confirmTransaction,
    createPayment,
    confirmDepositCompoundingCarCustomer,
    confirmPayFullForCompoundingCarCustomer,
  }
}
