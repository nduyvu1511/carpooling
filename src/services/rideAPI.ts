import {
  CancelCompoundingCarDriverParams,
  CancelCompoundingCarParams,
  CompoundingCarCustomer,
  CompoundingCarDriverRes,
  CompoundingListDriverParams,
  ConfirmCompoundingCar,
  ConfirmPayFullCustomerParams,
  ConfirmTransactionParams,
  CreateCarpoolingCompoundingCar,
  CreateCompoundingCarDriver,
  CreateCompoundingCarParams,
  CreatePaymentDriverParams,
  CreatePaymentMethodParams,
  CreatePaymentParams,
  DriverConfirmCompoundingCarCustomerParams,
  GetCompoundingCarCustomerList,
  GetCompoundingCarCustomerStateParams,
  GetCompoundingCarDriverStateParams,
  GetDetailCompounding,
  GetDetailCompoundingCustomer,
  ListQuery,
  ReasonsCancelCompoundingCarParams,
  UpdateCompoundingCar,
  UpdateCompoundingCarCustomer,
  UpdateCompoundingCarDriver,
} from "@/models"
import { AxiosResponse } from "axios"
import axiosClient from "."

const rideAPI = {
  getCompoundingCarListForCustomer: (params: GetCompoundingCarCustomerList) => {
    return axiosClient.post("/api/compounding_car_controller/get_compounding_car_by_compounding", {
      params,
    })
  },

  getCompoundingCarListForDriver: (params: CompoundingListDriverParams) => {
    return axiosClient.post("/api/compounding_car_controller/get_compounding_car_by_no_driver", {
      params,
    })
  },

  createCompoundingCar: (params: CreateCompoundingCarParams) => {
    return axiosClient.post("/api/compounding_car_controller/create_compounding_car", {
      params,
    })
  },

  createCompoundingCarCustomer: (params: GetDetailCompoundingCustomer) => {
    return axiosClient.post("/api/compounding_car_controller/create_compounding_car_customer", {
      params,
    })
  },

  confirmCreateCompoundingCar: (params: UpdateCompoundingCarCustomer) => {
    return axiosClient.post("/api/compounding_car_controller/confirm_compounding_car", {
      params,
    })
  },

  confirmCarpoolingCompoundingCarCustomer: (
    params: GetDetailCompoundingCustomer
  ): Promise<AxiosResponse<CompoundingCarCustomer>> => {
    return axiosClient.post("/api/compounding_car_controller/confirm_compounding_car_customer", {
      params,
    })
  },

  getDetailCompoundingCar: (
    params: GetDetailCompounding
  ): Promise<AxiosResponse<CompoundingCarDriverRes>> => {
    return axiosClient.post("/api/compounding_car_controller/get_detail_compounding_car", {
      params,
    })
  },

  getDetailCompoundingCarCustomer: (params: UpdateCompoundingCarCustomer) => {
    return axiosClient.post("/api/compounding_car_controller/get_detail_compounding_car_customer", {
      params,
    })
  },

  createExistedCarpoolingCompoundingCar: (params: CreateCarpoolingCompoundingCar) => {
    return axiosClient.post("/api/compounding_car_controller/create_compounding_car_customer", {
      params,
    })
  },

  getPendingCompoundingCar: (params: ListQuery) => {
    return axiosClient.post("/api/compounding_car_controller/get_pending_compounding_car", {
      params,
    })
  },

  confirmCompoundingCar: (params: ConfirmCompoundingCar) => {
    return axiosClient.post("/api/compounding_car_controller/confirm_compounding_car", {
      params,
    })
  },

  customerCancelCompoundingCarBeforeDeposit: (params: CancelCompoundingCarParams) => {
    return axiosClient.post("/api/compounding_car_controller/cancel_compounding_car", {
      params,
    })
  },

  updateCompoundingCar: (params: UpdateCompoundingCar) => {
    return axiosClient.post("/api/compounding_car_controller/update_compounding_car", {
      params,
    })
  },

  getCustomerActivities: (params: GetCompoundingCarCustomerStateParams) => {
    return axiosClient.post(
      "/api/compounding_car_controller/get_history_compounding_car_customer",
      {
        params,
      }
    )
  },

  getHistoryCompoundingCarDriver: (params: GetCompoundingCarDriverStateParams) => {
    return axiosClient.post(
      "/api/compounding_car_for_driver_controller/get_history_compounding_car_driver",
      {
        params,
      }
    )
  },

  confirmDepositCompoundingCarCustomer: (params: ConfirmTransactionParams) => {
    return axiosClient.post("/api/payment/vnpay/confirm_transaction", {
      params,
    })
  },

  customerConfirmPayFullCompoundingCar: (params: ConfirmPayFullCustomerParams) => {
    return axiosClient.post("/api/compounding_car_controller/confirm_payment_compounding_car", {
      params,
    })
  },

  getPaymentMethods: () => {
    return axiosClient.post("/api/payment_controller/get_payment_method_in_app", {
      params: {},
    })
  },

  createPayment: (params: CreatePaymentParams) => {
    return axiosClient.post("/api/vnpay_for_compounding_car_app_controller/create_payment", {
      params,
    })
  },

  confirmTransaction: (params: ConfirmTransactionParams) => {
    return axiosClient.post("/api/payment/vnpay/confirm_transaction", {
      params,
    })
  },

  getDepositCompoundingCarDriver: (params: GetDetailCompounding) => {
    return axiosClient.post("/api/compounding_car_controller/get_deposit_compounding_car_driver", {
      params,
    })
  },

  createPaymentForDriver: (params: CreatePaymentDriverParams) => {
    return axiosClient.post(
      "/api/vnpay_for_compounding_car_app_controller/create_payment_for_car_driver",
      {
        params,
      }
    )
  },

  confirmDepositForDriver: (params: GetDetailCompounding) => {
    return axiosClient.post(
      "/api/compounding_car_controller/confirm_deposit_compounding_car_driver",
      {
        params,
      }
    )
  },

  cancelDepositForDriver: (params: CancelCompoundingCarDriverParams) => {
    return axiosClient.post("/api/compounding_car_controller/cancel_compounding_car_driver", {
      params,
    })
  },

  getPendingDepositCompoundingList: () => {
    return axiosClient.post(
      "/api/compounding_car_controller/get_pending_deposit_compounding_car_driver",
      {
        params: {},
      }
    )
  },

  createCompoundingCarForDriver: (params: CreateCompoundingCarDriver) => {
    return axiosClient.post("/api/compounding_car_for_driver_controller/create_compounding_car", {
      params,
    })
  },

  confirmCompoundingCarForDriver: (params: GetDetailCompounding) => {
    return axiosClient.post("/api/compounding_car_for_driver_controller/confirm_compounding_car", {
      params,
    })
  },

  updateCompoundingCarForDriver: (params: UpdateCompoundingCarDriver) => {
    return axiosClient.post("/api/compounding_car_for_driver_controller/update_compounding_car", {
      params,
    })
  },

  startRunningCompoundingCar: (params: GetDetailCompounding) => {
    return axiosClient.post(
      "/api/compounding_car_for_driver_controller/start_running_compounding_car",
      {
        params,
      }
    )
  },

  confirmDoneCompoundingCar: (params: GetDetailCompounding) => {
    return axiosClient.post(
      "/api/compounding_car_for_driver_controller/confirm_done_compounding_car",
      {
        params,
      }
    )
  },

  getDriverSchedules: (params: ListQuery) => {
    return axiosClient.post(
      "/api/compounding_car_for_driver_controller/get_plan_compounding_car_driver",
      {
        params,
      }
    )
  },

  customerPayForRemainingAmount: (params: CreatePaymentMethodParams) => {
    return axiosClient.post("/api/compounding_car_controller/payment_compounding_car_customer", {
      params,
    })
  },

  driverConfirmCustomerPayFullForCompoundingCar: (params: ConfirmCompoundingCar) => {
    return axiosClient.post(
      "/api/compounding_car_controller/confirm_payment_compounding_car_customer_by_driver",
      {
        params,
      }
    )
  },

  driverConfirmWaitingForCustomer: (params: DriverConfirmCompoundingCarCustomerParams) => {
    return axiosClient.post(
      "/api/compounding_car_controller/waiting_customer_compounding_car_customer",
      {
        params,
      }
    )
  },

  driverConfirmCompoundingCarCustomer: (params: DriverConfirmCompoundingCarCustomerParams) => {
    return axiosClient.post(
      "/api/compounding_car_controller/confirm_done_compounding_car_customer",
      {
        params,
      }
    )
  },

  driverConfirmPickingUpCompoundingCarCustomer: (
    params: DriverConfirmCompoundingCarCustomerParams
  ) => {
    return axiosClient.post(
      "/api/compounding_car_controller/confirm_picking_up_compounding_car_customer",
      {
        params,
      }
    )
  },

  getCompoundingCarTemplates: (limit = 12, offset = 0) => {
    return axiosClient.post("/api/compounding_car_controller/data_compounding_car_template", {
      params: {
        limit,
        offset,
      },
    })
  },

  getReasonsToCancelCompoundingCar: (params: ReasonsCancelCompoundingCarParams) => {
    return axiosClient.post("/api/compounding_car_controller/get_cancel_reason_compounding_car", {
      params,
    })
  },

  cancelCompoundingCar: (params: CancelCompoundingCarParams) => {
    return axiosClient.post("/api/compounding_car_controller/cancel_compounding_car", {
      params,
    })
  },

  getDriverCompoundingCarInvoice: (params: { compounding_car_id: number }) => {
    return axiosClient.post(
      "/api/compounding_car_for_driver_controller/done_compounding_car_invoice",
      {
        params,
      }
    )
  },

  getAmountBalanceInCashWallet: () => {
    return axiosClient.post("/api/wallet_controller/get_available_money_in_cash_wallet", {})
  },
}

export { rideAPI }
