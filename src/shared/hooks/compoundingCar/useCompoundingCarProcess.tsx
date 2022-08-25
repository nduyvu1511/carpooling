import { isObjectHasValue } from "@/helper"
import {
  CompoundingCarCustomer,
  CompoundingCarCustomerWithState,
  CompoundingCarDriverRes,
  CompoundingCarRes,
  DriverConfirmCompoundingCarCustomerParams,
  UseParams,
} from "@/models"
import { ridesApi } from "@/services"
import { AxiosResponse } from "axios"
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
  changeOrderOfCompoudingCarCustomerToLast: (id: number) => void
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
      ridesApi
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
      fetcher: ridesApi.confirmDoneCompoundingCar({ compounding_car_id }),
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
      fetcher: ridesApi.driverConfirmWaitingForCustomer(params),
      onSuccess: (data) => {
        console.log(data)
        // changeOrderOfCompoudingCarCustomerToLast(params.compounding_car_customer_id)
        // changeCompoundingCarCustomerState({
        //   compounding_car_customer_id: params.compounding_car_customer_id,
        //   state: "waiting_customer",
        // })
        mutateCompoundingCar()
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
      fetcher: ridesApi.driverConfirmCustomerPayFullForCompoundingCar({
        compounding_car_customer_id,
      }),
      onSuccess: (data) => {
        changeOrderOfCompoudingCarCustomerToLast(compounding_car_customer_id)
        changeCompoundingCarCustomerState({
          compounding_car_customer_id,
          state: "confirm_paid",
        })
        onSuccess?.(data)
      },
      onError: onError?.(),
      config,
    })
  }

  const startRunningCompoundingCar = async (_: UseParams<number, CompoundingCarRes>) => {
    const { onSuccess, params: compounding_car_id, config, onError } = _
    fetcherHandler({
      fetcher: ridesApi.startRunningCompoundingCar({
        compounding_car_id,
      }),
      onSuccess: (data) => {
        if (!compoundingCar) return
        mutateCompoundingCar({ ...compoundingCar, state: "start_running" }, false)
        onSuccess?.(data)
      },
      onError: () => onError?.(),
      config,
    })
  }

  const changeCompoundingCarCustomerState = (params: CompoundingCarCustomerWithState) => {
    if (!compoundingCar?.compounding_car_customers?.length) return
    mutateCompoundingCar({
      ...compoundingCar,
      compounding_car_customers: [...(compoundingCar.compounding_car_customers || [])].map((item) =>
        item.compounding_car_customer_id === params.compounding_car_customer_id
          ? { ...item, state: params.state }
          : item
      ),
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
          ? ridesApi.driverConfirmCompoundingCarCustomer(params)
          : ridesApi.driverConfirmPickingUpCompoundingCarCustomer(params),
      onSuccess: (data) => {
        changeOrderOfCompoudingCarCustomerToLast(params.compounding_car_customer_id)
        changeCompoundingCarCustomerState({
          compounding_car_customer_id: params.compounding_car_customer_id,
          state: params.state,
        })
        onSuccess?.(data)
      },
      onError: () => onError?.(),
      config,
    })
  }

  const changeOrderOfCompoudingCarCustomerToLast = (id: number) => {
    if (!compoundingCar) return
    const compoundingCarCustomerList = [...compoundingCar.compounding_car_customers] || []
    mutateCompoundingCar(
      {
        ...compoundingCar,
        compounding_car_customers: [
          ...compoundingCarCustomerList.filter(
            ({ compounding_car_customer_id }) => compounding_car_customer_id !== id
          ),
          compoundingCarCustomerList.find(
            (item) => item.compounding_car_customer_id === id
          ) as CompoundingCarCustomer,
        ],
      },
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
    changeOrderOfCompoudingCarCustomerToLast,
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
