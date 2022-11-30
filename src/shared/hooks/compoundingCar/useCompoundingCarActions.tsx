import {
  CompoundingCarCustomer,
  CompoundingCarRes,
  ConfirmCompoundingCar,
  CreateCarpoolingCompoundingCar,
  CreateCompoundingCar,
  CreateConvenientCompoundingCar,
  UpdateCompoundingCar,
  UpdateConvenientCompoundingCar,
  UseParams,
} from "@/models"
import { chatAPI, rideAPI } from "@/services"
import { useFetcher } from "../async"

interface UseCompoundingCarActions {
  createCompoundingCar: (params: UseParams<CreateCompoundingCar, CompoundingCarCustomer>) => void
  driverConfirmCompoundingCar: (_params: UseParams<{ compounding_car_id: number }, any>) => void
  confirmCompoundingCar: (
    _params: UseParams<{ compounding_car_customer_id: number }, CompoundingCarCustomer>
  ) => void
  updateCompoundingCar: (_params: UseParams<UpdateCompoundingCar, CompoundingCarCustomer>) => void
  customerCancelCompoundingCarBeforeDeposit: (
    _params: UseParams<ConfirmCompoundingCar, any>
  ) => void
  createExistingCompoundingCar: (
    _params: UseParams<CreateCarpoolingCompoundingCar, CompoundingCarCustomer>
  ) => void
  confirmExistedCompoundingCarCustomer: (
    params: UseParams<{ compounding_car_customer_id: number }, any>
  ) => any
  updateDriverCompoundingCar: (_params: UseParams<UpdateConvenientCompoundingCar, any>) => void
  createCompoundingCarForDriver: (
    _params: UseParams<CreateConvenientCompoundingCar, CompoundingCarRes>
  ) => void
}

export const useCompoundingCarActions = (): UseCompoundingCarActions => {
  const { fetcherHandler } = useFetcher()

  const createCompoundingCar = async (
    _params: UseParams<CreateCompoundingCar, CompoundingCarCustomer>
  ) => {
    const { params, onSuccess, onError, config } = _params

    fetcherHandler({
      fetcher: rideAPI.createCompoundingCar(params),
      onSuccess: (data: CompoundingCarCustomer) => {
        onSuccess(data)
      },
      onError: () => {
        onError?.()
      },

      config,
    })
  }

  const createCompoundingCarForDriver = async (
    _params: UseParams<CreateConvenientCompoundingCar, CompoundingCarRes>
  ) => {
    const { params, onSuccess, onError, config } = _params

    fetcherHandler({
      fetcher: rideAPI.createCompoundingCarForDriver(params),
      onSuccess: (data: CompoundingCarRes) => {
        onSuccess(data)
      },
      onError: () => {
        onError?.()
      },

      config,
    })
  }

  const createExistingCompoundingCar = async (
    _params: UseParams<CreateCarpoolingCompoundingCar, CompoundingCarCustomer>
  ) => {
    const { params, onSuccess, onError, config } = _params

    fetcherHandler({
      fetcher: rideAPI.createExistedCarpoolingCompoundingCar(params),
      onSuccess: (data: CompoundingCarCustomer) => {
        onSuccess(data)
      },
      onError: () => {
        onError?.()
      },
      config,
    })
  }

  const customerCancelCompoundingCarBeforeDeposit = async (
    _params: UseParams<ConfirmCompoundingCar, any>
  ) => {
    const { params, onSuccess, onError, config } = _params
    fetcherHandler({
      fetcher: rideAPI.customerCancelCompoundingCarBeforeDeposit(params),
      onSuccess: (data: CompoundingCarCustomer) => {
        chatAPI.leaveRoomByCompoundingCarId(data.compounding_car_id)
        onSuccess(data)
      },
      onError: () => {
        onError?.()
      },

      config: { ...config, successMsg: "Hủy chuyến đi thành công!" },
    })
  }

  const confirmCompoundingCar = async (
    _params: UseParams<{ compounding_car_customer_id: number }, any>
  ) => {
    const {
      params: { compounding_car_customer_id },
      onSuccess,
      onError,
    } = _params

    fetcherHandler({
      fetcher: rideAPI.confirmCompoundingCar({
        compounding_car_customer_id,
      }),
      onSuccess,
      onError: () => {
        onError?.()
      },
    })
  }

  const driverConfirmCompoundingCar = async (
    _params: UseParams<{ compounding_car_id: number }, any>
  ) => {
    const {
      params: { compounding_car_id },
      onSuccess,
      onError,
    } = _params

    fetcherHandler({
      fetcher: rideAPI.confirmCompoundingCarForDriver({
        compounding_car_id,
      }),
      onSuccess,
      onError: () => {
        onError?.()
      },
    })
  }

  const confirmExistedCompoundingCarCustomer = async (
    _params: UseParams<{ compounding_car_customer_id: number }, any>
  ) => {
    const {
      params: { compounding_car_customer_id },
      onSuccess,
      onError,
      config,
    } = _params

    fetcherHandler({
      fetcher: rideAPI.confirmCarpoolingCompoundingCarCustomer({
        compounding_car_customer_id,
      }),
      onSuccess,
      onError: () => {
        onError?.()
      },
      config,
    })
  }

  const updateCompoundingCar = async (_params: UseParams<UpdateCompoundingCar, any>) => {
    const { params, onSuccess, onError, config } = _params

    fetcherHandler({
      fetcher: rideAPI.updateCompoundingCar(params),
      onSuccess,
      onError: () => {
        onError?.()
      },
      config,
    })
  }

  const updateDriverCompoundingCar = async (
    _params: UseParams<UpdateConvenientCompoundingCar, any>
  ) => {
    const { params, onSuccess, onError, config } = _params

    fetcherHandler({
      fetcher: rideAPI.updateCompoundingCarForDriver(params),
      onSuccess,
      onError: () => onError?.(),
      config,
    })
  }

  return {
    confirmCompoundingCar,
    createCompoundingCar,
    updateCompoundingCar,
    createExistingCompoundingCar,
    confirmExistedCompoundingCarCustomer,
    customerCancelCompoundingCarBeforeDeposit,
    driverConfirmCompoundingCar,
    updateDriverCompoundingCar,
    createCompoundingCarForDriver,
  }
}
