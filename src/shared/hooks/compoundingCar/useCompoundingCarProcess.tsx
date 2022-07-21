import {
  CompoundingCarCustomer,
  CompoundingCarCustomerWithState,
  CompoundingCarDriverRes,
  DriverConfirmCompoundingCarCustomerParams,
} from "@/models"
import { ridesApi } from "@/services"
import { useMemo } from "react"
import { KeyedMutator } from "swr"
import { useFetcher } from "../async"
import { useCompoundingCarDriver } from "./useCompoundingCarDriver"

interface Res {
  compoundingCar: CompoundingCarDriverRes | undefined
  isInitialLoading: boolean
  isValidating: boolean
  confirmDoneCompoundingCar: (id: number, cb?: Function, _cb?: Function) => void
  startRunningCompoundingCar: (compounding_car_id: number, cb?: Function, _cb?: Function) => void
  confirmStateCompoundingCarCustomer: (
    params: CompoundingCarCustomerWithState & {
      customer_id: number
    },
    onSuccess?: Function,
    onErr?: Function
  ) => void
  getNumberOfPassengersPickedUp: number
  getNumberOfPassengersDone: number
  getNumberOfPassengersPaid: number
  changeOrderOfCompoudingCarCustomerToLast: (id: number) => void
  confirmCustomerPayFullForCompoundingCar: (
    compounding_car_customer_id: number,
    onSuccess?: Function,
    onError?: Function
  ) => void
  confirmWaitingForCompoundingCarCustomer: (
    params: DriverConfirmCompoundingCarCustomerParams,
    onSuccess?: Function,
    onErr?: Function
  ) => void
  mutateCompoundingCar: KeyedMutator<CompoundingCarDriverRes>
  getNumberOfNotPickedUp: number
}

const useCompoundingCarProcess = (compounding_car_id: number | undefined): Res => {
  const { fetcherHandler } = useFetcher()
  const {
    data: compoundingCar,
    isValidating,
    isInitialLoading,
    mutate: mutateCompoundingCar,
  } = useCompoundingCarDriver({
    key: "get_compounding_car_schedules_driver",
    type: "once",
    compounding_car_id: Number(compounding_car_id),
  })

  const confirmDoneCompoundingCar = async (
    compounding_car_id: number,
    onSuccess?: Function,
    onErr?: Function
  ) => {
    fetcherHandler({
      fetcher: ridesApi.confirmDoneCompoundingCar({ compounding_car_id }),
      onSuccess: () => onSuccess?.(),
      onError: () => onErr?.(),
    })
  }

  const confirmWaitingForCompoundingCarCustomer = async (
    params: DriverConfirmCompoundingCarCustomerParams,
    onSuccess?: Function,
    onErr?: Function
  ) => {
    fetcherHandler({
      fetcher: ridesApi.driverConfirmWaitingForCustomer(params),
      onSuccess: () => {
        changeOrderOfCompoudingCarCustomerToLast(params.compounding_car_customer_id)
        changeCompoundingCarCustomerState({
          compounding_car_customer_id: params.compounding_car_customer_id,
          state: "confirm_paid",
        })
        onSuccess?.()
      },
      onError: () => onErr?.(),
    })
  }

  const confirmCustomerPayFullForCompoundingCar = async (
    compounding_car_customer_id: number,
    onSuccess?: Function,
    onError?: Function
  ) => {
    fetcherHandler({
      fetcher: ridesApi.driverConfirmCustomerPayFullForCompoundingCar({
        compounding_car_customer_id,
      }),
      onSuccess: () => {
        changeOrderOfCompoudingCarCustomerToLast(compounding_car_customer_id)
        changeCompoundingCarCustomerState({
          compounding_car_customer_id,
          state: "confirm_paid",
        })
        onSuccess?.()
      },
      onError: onError?.(),
    })
  }

  const startRunningCompoundingCar = async (
    compounding_car_id: number,
    onSuccess?: Function,
    onErr?: Function
  ) => {
    fetcherHandler({
      fetcher: ridesApi.startRunningCompoundingCar({
        compounding_car_id,
      }),
      onSuccess: () => {
        if (!compoundingCar) return
        mutateCompoundingCar({ ...compoundingCar, state: "start_running" }, false)
        onSuccess?.()
      },
      onError: () => onErr?.(),
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
    params: CompoundingCarCustomerWithState & {
      customer_id: number
    },

    onSuccess?: Function,
    onErr?: Function
  ) => {
    fetcherHandler({
      fetcher:
        params.state === "done"
          ? ridesApi.driverConfirmCompoundingCarCustomer(params)
          : ridesApi.driverConfirmPickingUpCompoundingCarCustomer(params),
      onSuccess: () => {
        changeOrderOfCompoudingCarCustomerToLast(params.compounding_car_customer_id)
        changeCompoundingCarCustomerState({
          compounding_car_customer_id: params.compounding_car_customer_id,
          state: params.state,
        })
        onSuccess?.()
      },
      onError: () => onErr?.(),
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
      (a, b) => a + (b.state === "in_process" ? 1 : 0),
      0
    )
  }, [compoundingCar])

  const getNumberOfPassengersDone: number = useMemo(() => {
    if (!compoundingCar?.compounding_car_customers?.length) return 0
    return compoundingCar.compounding_car_customers.reduce(
      (a, b) => a + (b.state === "done" ? 1 : 0),
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

  const getNumberOfNotPickedUp: number = useMemo(() => {
    if (!compoundingCar?.compounding_car_customers?.length) return 0
    return (
      compoundingCar.compounding_car_customers.length -
      (getNumberOfPassengersPaid + getNumberOfPassengersPickedUp + getNumberOfPassengersDone)
    )
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
    isInitialLoading,
    isValidating,
    getNumberOfPassengersPickedUp,
    changeOrderOfCompoudingCarCustomerToLast,
    getNumberOfPassengersDone,
    confirmCustomerPayFullForCompoundingCar,
    getNumberOfPassengersPaid,
    confirmWaitingForCompoundingCarCustomer,
    mutateCompoundingCar,
    getNumberOfNotPickedUp,
  }
}

export { useCompoundingCarProcess }
