import { CompoundingCarDriverRes } from "@/models"
import { ridesApi } from "@/services"
import { useMemo } from "react"
import { useFetcher } from "../async"
import { useCompoundingCarDriver } from "./useCompoundingCarDriver"

interface Res {
  compoundingCar: CompoundingCarDriverRes | undefined
  isInitialLoading: boolean
  isValidating: boolean
  confirmDoneCompoundingCar: (id: number, cb?: Function, _cb?: Function) => void
  startRunningCompoundingCar: (compounding_car_id: number, cb?: Function, _cb?: Function) => void
  confirmStateCompoundingCarCustomer: (
    params: {
      compounding_car_customer_id: number
      customer_id: number
      state: "done" | "in_process"
    },
    onSuccess?: Function,
    onErr?: Function
  ) => void
  getNumberOfPassengersPickedUp: number
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

  const startRunningCompoundingCar = async (
    compounding_car_id: number,
    onSuccess?: Function,
    onErr?: Function
  ) => {
    fetcherHandler({
      fetcher: ridesApi.startRunningCompoundingCar({ compounding_car_id }),
      onSuccess: () => onSuccess?.(),
      onError: () => onErr?.(),
    })
  }

  const confirmStateCompoundingCarCustomer = async (
    params: {
      compounding_car_customer_id: number
      customer_id: number
      state: "in_process" | "done"
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
        if (!compoundingCar) return
        mutateCompoundingCar(
          {
            ...compoundingCar,
            compounding_car_customers: (compoundingCar.compounding_car_customers || []).map(
              (item) =>
                item.compounding_car_customer_id === params.compounding_car_customer_id
                  ? { ...item, state: params.state }
                  : item
            ),
          },
          false
        )
        onSuccess?.()
      },
      onError: () => onErr?.(),
    })
  }

  const getNumberOfPassengersPickedUp: number = useMemo(() => {
    if (!compoundingCar) return 0
    return compoundingCar.compounding_car_customers.reduce(
      (a, b) => a + (b.state === "done" ? 1 : 0),
      0
    )
  }, [compoundingCar])

  return {
    confirmDoneCompoundingCar,
    startRunningCompoundingCar,
    confirmStateCompoundingCarCustomer,
    compoundingCar,
    isInitialLoading,
    isValidating,
    getNumberOfPassengersPickedUp,
  }
}

export { useCompoundingCarProcess }
