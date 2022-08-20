import {
  CompoundingCarCustomer,
  ConfirmTransactionParams,
  CreatePaymentParams,
  CreatePaymentRes,
  UseParams,
} from "@/models"
import { ridesApi } from "@/services"
import { useFetcher } from "../async"

interface UseCustomerCheckoutRes {
  createPayment: (props: UseParams<CreatePaymentParams, CreatePaymentRes>) => void
  confirmTransaction: (props: UseParams<ConfirmTransactionParams, any>) => void
  confirmDepositCompoundingCarCustomer: (_: UseParams<number, undefined>) => void
  confirmPayFullForCompoundingCarCustomer: (
    compounding_car_customer_id: number,
    cb: (params: CompoundingCarCustomer) => void,
    onErr?: Function
  ) => void
}

export const useCustomerCheckout = (): UseCustomerCheckoutRes => {
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

  const confirmDepositCompoundingCarCustomer = async (_: UseParams<number, undefined>) => {
    const { params: compounding_car_customer_id, onSuccess, config, onError } = _
    fetcherHandler<CompoundingCarCustomer>({
      fetcher: ridesApi.confirmDepositCompoundingCarCustomer({
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
    compounding_car_customer_id: number,
    cb: (params: CompoundingCarCustomer) => void,
    onErr?: Function
  ) => {
    fetcherHandler({
      fetcher: ridesApi.customerConfirmPayFullCompoundingCar({
        compounding_car_customer_id,
      }),
      onSuccess: (result) => {
        if (result?.state === "confirm_paid") {
          cb && cb(result)
        } else {
          onErr && onErr()
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
