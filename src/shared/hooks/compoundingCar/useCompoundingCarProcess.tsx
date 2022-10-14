import { isObjectHasValue } from "@/helper"
import {
  CompoundingCarCustomer,
  CompoundingCarCustomerWithState,
  CompoundingCarDriverRes,
  CompoundingCarRes,
  DriverConfirmCompoundingCarCustomerParams,
  UseParams,
} from "@/models"
import { rideAPI } from "@/services"
import { AxiosResponse } from "axios"
import produce from "immer"
import { useMemo, useState } from "react"
import useSWR, { KeyedMutator } from "swr"
import { useFetcher } from "../async"

interface Res {
  compoundingCarMap: CompoundingCarDriverRes | undefined
  compoundingCar: CompoundingCarDriverRes | undefined
  isInitialLoading: boolean
  isValidating: boolean
  mutateCompoundingCar: KeyedMutator<CompoundingCarDriverRes>
  confirmDoneCompoundingCar: (_: UseParams<number, CompoundingCarRes>) => void
  startRunningCompoundingCar: (_: UseParams<number, CompoundingCarRes>) => void
  mutateCompoundingCarCustomer: (params: CompoundingCarCustomer) => void
  confirmCustomerPayFullForCompoundingCar: (_: UseParams<number, CompoundingCarCustomer>) => void
  confirmWaitingForCompoundingCarCustomer: (
    _: UseParams<DriverConfirmCompoundingCarCustomerParams, CompoundingCarCustomer>
  ) => void
  confirmStateCompoundingCarCustomer: (
    _: UseParams<
      CompoundingCarCustomerWithState & {
        customer_id: number
      },
      CompoundingCarCustomer
    >
  ) => void
  getNumberOfNotPickedUp: number
  getNumberOfPassengersCanceled: number
  getTotalPassenger: number
  getNumberOfPassengersPickedUp: number
  getNumberOfPassengersDone: number
  getNumberOfPassengersPaid: number
}

const useCompoundingCarProcess = (compounding_car_id: number | undefined): Res => {
  const { fetcherHandler } = useFetcher()
  const {
    error,
    data: compoundingCar,
    isValidating,
    mutate: mutateCompoundingCar,
  } = useSWR<CompoundingCarDriverRes, any>(
    compounding_car_id ? `get_compounding_car_schedules_driver_${compounding_car_id}` : null,
    () =>
      rideAPI
        .getDetailCompoundingCar({
          compounding_car_id: Number(compounding_car_id),
        })
        .then((res: AxiosResponse<any>) => {
          const data = res?.result?.data
          if (isObjectHasValue(data)) {
            setCompoundingCarMap(data)
            return data
          }
          return null
        })
        .catch((err) => console.log(err))
  )

  const [compoundingCarMap, setCompoundingCarMap] = useState<CompoundingCarDriverRes>()

  const confirmDoneCompoundingCar = async (_: UseParams<number, CompoundingCarRes>) => {
    const { onSuccess, params: compounding_car_id, config, onError } = _
    fetcherHandler({
      fetcher: rideAPI.confirmDoneCompoundingCar({ compounding_car_id }),
      onSuccess: (data) => onSuccess?.(data),
      onError: () => onError?.(),
      config,
    })
  }

  const confirmWaitingForCompoundingCarCustomer = async (
    _: UseParams<DriverConfirmCompoundingCarCustomerParams, CompoundingCarCustomer>
  ) => {
    const { onSuccess, params, config, onError } = _
    fetcherHandler<CompoundingCarCustomer>({
      fetcher: rideAPI.driverConfirmWaitingForCustomer(params),
      onSuccess: (data) => {
        if (!compoundingCar?.compounding_car_customers?.length) return
        mutateCompoundingCarCustomer(data)

        onSuccess?.(data)
      },
      onError: () => onError?.(),
      config,
    })
  }

  const confirmCustomerPayFullForCompoundingCar = async (
    _: UseParams<number, CompoundingCarCustomer>
  ) => {
    const { onSuccess, params: compounding_car_customer_id, config, onError } = _
    fetcherHandler<CompoundingCarCustomer>({
      fetcher: rideAPI.driverConfirmCustomerPayFullForCompoundingCar({
        compounding_car_customer_id,
      }),
      onSuccess: (data) => {
        mutateCompoundingCarCustomer(data)
        onSuccess?.(data)
      },
      onError: onError?.(),
      config,
    })
  }

  const startRunningCompoundingCar = async (_: UseParams<number, CompoundingCarRes>) => {
    const { onSuccess, params: compounding_car_id, config, onError } = _
    fetcherHandler({
      fetcher: rideAPI.startRunningCompoundingCar({
        compounding_car_id,
      }),
      onSuccess: (data) => {
        if (!compoundingCar) return
        mutateCompoundingCar(
          produce(compoundingCar, (draft) => {
            draft.state = "start_running"
          }),
          false
        )
        onSuccess?.(data)
      },
      onError: () => onError?.(),
      config,
    })
  }

  const confirmStateCompoundingCarCustomer = async (
    _: UseParams<
      CompoundingCarCustomerWithState & {
        customer_id: number
      },
      CompoundingCarCustomer
    >
  ) => {
    const { onSuccess, params, config, onError } = _
    fetcherHandler({
      fetcher:
        params.state === "done"
          ? rideAPI.driverConfirmCompoundingCarCustomer(params)
          : rideAPI.driverConfirmPickingUpCompoundingCarCustomer(params),
      onSuccess: (data) => {
        mutateCompoundingCarCustomer(data)
        onSuccess?.(data)
      },
      onError: () => onError?.(),
      config,
    })
  }

  const mutateCompoundingCarCustomer = (params: CompoundingCarCustomer) => {
    if (!compoundingCar?.compounding_car_customers?.length) return

    if (!params?.compounding_car_customer_id) {
      mutateCompoundingCar()
      return
    }

    if (params?.state === "in_process" || params?.state === "confirm_paid") {
      mutateCompoundingCar(
        produce(compoundingCar, (draft) => {
          draft.compounding_car_customers = draft.compounding_car_customers.filter(
            ({ compounding_car_customer_id }) =>
              compounding_car_customer_id !== params.compounding_car_customer_id
          )
          draft.compounding_car_customers.push(params)
        }),
        false
      )
      return
    }

    const index = compoundingCar.compounding_car_customers.findIndex(
      (item) => item.compounding_car_customer_id === params.compounding_car_customer_id
    )

    if (!index) {
      mutateCompoundingCar()
      return
    }

    mutateCompoundingCar(
      produce(compoundingCar, (draft) => {
        draft.compounding_car_customers[index] = params
      }),
      false
    )
  }

  const getNumberOfPassengersPickedUp: number = useMemo(() => {
    if (!compoundingCar?.compounding_car_customers?.length) return 0
    return compoundingCar.compounding_car_customers.reduce(
      (a, b) =>
        a + (b.state === "in_process" || b.state === "confirm_paid" || b.state === "done" ? 1 : 0),
      0
    )
  }, [compoundingCar])

  const getNumberOfPassengersDone: number = useMemo(() => {
    if (!compoundingCar?.compounding_car_customers?.length) return 0
    return compoundingCar.compounding_car_customers.reduce(
      (a, b) => a + (b.state === "done" || b.state === "confirm_paid" ? 1 : 0),
      0
    )
  }, [compoundingCar])

  const getNumberOfPassengersPaid: number = useMemo(() => {
    if (!compoundingCar?.compounding_car_customers?.length) return 0
    return compoundingCar.compounding_car_customers.reduce(
      (a, b) => a + (b.state === "confirm_paid" ? 1 : 0),
      0
    )
  }, [compoundingCar])

  const getNumberOfPassengersCanceled: number = useMemo(() => {
    if (!compoundingCar?.compounding_car_customers?.length) return 0
    return compoundingCar.compounding_car_customers.reduce(
      (a, b) => a + (b.state === "cancel" ? 1 : 0),
      0
    )
  }, [compoundingCar])

  const getTotalPassenger: number = useMemo(() => {
    // if (getTotalPassenger > 0) return getTotalPassenger
    if (!compoundingCar?.compounding_car_customers?.length) return 0
    return compoundingCar?.compounding_car_customers?.length
  }, [compoundingCar?.compounding_car_customers?.length])

  const getNumberOfNotPickedUp: number = useMemo(() => {
    if (!compoundingCar?.compounding_car_customers?.length) return 0
    const total =
      compoundingCar.compounding_car_customers.length -
      (getNumberOfPassengersPaid + getNumberOfPassengersPickedUp + getNumberOfPassengersDone)
    return total > 0 ? total : 0
  }, [
    getNumberOfPassengersPaid,
    getNumberOfPassengersPickedUp,
    getNumberOfPassengersDone,
    compoundingCar,
  ])

  return {
    confirmDoneCompoundingCar,
    startRunningCompoundingCar,
    confirmStateCompoundingCarCustomer,
    compoundingCar,
    isInitialLoading: error === undefined && compoundingCar === undefined,
    isValidating,
    getNumberOfPassengersPickedUp,
    mutateCompoundingCarCustomer,
    getNumberOfPassengersDone,
    confirmCustomerPayFullForCompoundingCar,
    getNumberOfPassengersPaid,
    confirmWaitingForCompoundingCarCustomer,
    mutateCompoundingCar,
    getNumberOfPassengersCanceled,
    getNumberOfNotPickedUp,
    getTotalPassenger,
    compoundingCarMap,
  }
}

export { useCompoundingCarProcess }
