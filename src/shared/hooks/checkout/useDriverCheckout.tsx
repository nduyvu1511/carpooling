import {
  CancelCompoundingCarDriverParams,
  CompoundingCarDriverRes,
  CreatePaymentDriverParams,
  CreatePaymentRes,
  DepositCompoundingCarDriverFailureRes,
  DepositCompoundingCarDriverRes,
  UseParams,
} from "@/models"
import { setScreenLoading } from "@/modules"
import { chatAPI, rideAPI } from "@/services"
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
  createPaymentForDriver: (props: UseParams<CreatePaymentDriverParams, CreatePaymentRes>) => void
  fetchDepositCompoundingCarDriver: (params: FetchDepositCompoundingCarDriver) => void
  confirmDepositForCarDriver: (
    _: UseParams<{ compounding_car_id: number }, CompoundingCarDriverRes>
  ) => void
  cancelDepositCompoundingCarDriver: (_: UseParams<CancelCompoundingCarDriverParams, any>) => void
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
      showLoading && dispatch(setScreenLoading({ show: true }))
      const res: AxiosResponse<any> = await rideAPI.getDepositCompoundingCarDriver({
        compounding_car_id,
      })
      if (!res?.result?.success) {
        onError?.(res.result)
      } else {
        onSuccess?.(res.result.data)
      }
      showLoading && dispatch(setScreenLoading({ show: false }))
    } catch (error) {
      showLoading && dispatch(setScreenLoading({ show: false }))
    }
  }

  const cancelDepositCompoundingCarDriver = async (
    _: UseParams<CancelCompoundingCarDriverParams, any>
  ) => {
    const { onSuccess, params, config, onError } = _
    fetcherHandler({
      fetcher: rideAPI.cancelDepositForDriver(params),
      onSuccess: (data) => {
        onSuccess?.(data)
      },
      onError: onError?.(),
      config,
    })
  }

  const confirmDepositForCarDriver = async (
    _: UseParams<{ compounding_car_id: number }, CompoundingCarDriverRes>
  ) => {
    const {
      onSuccess,
      params: { compounding_car_id },
      config,
      onError,
    } = _

    fetcherHandler({
      fetcher: rideAPI.confirmDepositForDriver({ compounding_car_id }),
      onSuccess: (data) => onSuccess?.(data),
      onError: () => onError?.(),
      config,
    })
  }

  const createPaymentForDriver = async (
    props: UseParams<CreatePaymentDriverParams, CreatePaymentRes>
  ) => {
    const { params, onSuccess, onError } = props
    fetcherHandler({
      fetcher: rideAPI.createPaymentForDriver(params),
      onSuccess: (data: CreatePaymentRes) => {
        onSuccess?.(data)
      },
      onError: () => onError?.(),
    })
  }

  return {
    cancelDepositCompoundingCarDriver,
    createPaymentForDriver,
    fetchDepositCompoundingCarDriver,
    confirmDepositForCarDriver,
  }
}
