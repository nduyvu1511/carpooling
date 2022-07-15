import {
  CreatePaymentDriverParams,
  CreatePaymentRes,
  DepositCompoundingCarDriverFailureRes,
  DepositCompoundingCarDriverRes,
  UseParams,
} from "@/models"
import { setScreenLoading } from "@/modules"
import { ridesApi } from "@/services"
import { AxiosResponse } from "axios"
import { useDispatch } from "react-redux"
import { useFetcher } from "../async"

interface FetchDepositCompoundingCarDriver {
  compounding_car_id: number
  onSuccess?: (params: DepositCompoundingCarDriverRes) => void
  onError?: (params: DepositCompoundingCarDriverFailureRes) => void
  showLoading?: boolean
}

interface UseDriverCheckoutRes {
  cancelDepositCompoundingCarDriver: (compounding_car_id: number, cb?: Function) => void
  createPaymentForDriver: (props: UseParams<CreatePaymentDriverParams, CreatePaymentRes>) => void
  confirmCustomerPayFullForCompoundingCar: (
    compounding_car_customer_id: number,
    onSuccess: Function,
    onError?: Function
  ) => void
  fetchDepositCompoundingCarDriver: (params: FetchDepositCompoundingCarDriver) => void
}

export const useDriverCheckout = (): UseDriverCheckoutRes => {
  const { fetcherHandler } = useFetcher()
  const dispatch = useDispatch()

  const fetchDepositCompoundingCarDriver = async ({
    compounding_car_id,
    onError,
    onSuccess,
    showLoading,
  }: FetchDepositCompoundingCarDriver) => {
    try {
      showLoading && dispatch(setScreenLoading(true))
      const res: AxiosResponse<any> = await ridesApi.getDepositCompoundingCarDriver({
        compounding_car_id,
      })
      if (!res?.result?.success) {
        onError?.(res.result)
      } else {
        onSuccess?.(res.result.data)
      }
      showLoading && dispatch(setScreenLoading(false))
    } catch (error) {
      showLoading && dispatch(setScreenLoading(false))
    }
  }

  const cancelDepositCompoundingCarDriver = async (compounding_car_id: number, cb?: Function) => {
    fetcherHandler({
      fetcher: ridesApi.cancelDepositForDriver({
        compounding_car_id,
      }),
      onSuccess: () => {
        cb?.()
      },
      config: { successMsg: "Hủy giao dịch thành công" },
    })
  }

  const createPaymentForDriver = async (
    props: UseParams<CreatePaymentDriverParams, CreatePaymentRes>
  ) => {
    const { params, onSuccess, onError } = props
    fetcherHandler({
      fetcher: ridesApi.createPaymentForDriver(params),
      onSuccess: (data: CreatePaymentRes) => {
        onSuccess?.(data)
      },
      onError: () => onError?.(),
    })
  }

  const confirmCustomerPayFullForCompoundingCar = async (
    compounding_car_customer_id: number,
    onSuccess: Function,
    onError?: Function
  ) => {
    fetcherHandler({
      fetcher: ridesApi.driverConfirmCustomerPayFullForCompoundingCar({
        compounding_car_customer_id,
      }),
      onSuccess: () => {
        onSuccess?.()
      },
      onError: onError?.(),
      config: { showScreenLoading: false },
    })
  }

  return {
    cancelDepositCompoundingCarDriver,
    createPaymentForDriver,
    confirmCustomerPayFullForCompoundingCar,
    fetchDepositCompoundingCarDriver,
  }
}
