import {
  AttachmentParams,
  Auth,
  CertificateInspectionParams,
  ChangePasswordParams,
  ConfirmRechargeRequestParams,
  ContactParams,
  CreateNewPasswordParams,
  CreateRechargeRequestParams,
  CreateUserFormParams,
  DrivingLicenseParams,
  GetDetailTransactionParams,
  GetTransactionListByWalletParams,
  IdCardParams,
  IdCardUpdateParams,
  ListQuery,
  LoginByOTP,
  LoginFormParams,
  MakeWithdrawingRequestParams,
  RequestOTPCode,
  ResetPasswordParams,
  ResetPasswordRes,
  UpdateCertificateInspectionParams,
  UpdateDrivingLicenseParams,
  UpdateUserInfoParams,
  UpdateVehicleInsuranceParams,
  VehicleDetailFormParams,
  VehicleInsuranceParams,
  VerifyOTPCode,
  GetPriceUnitParams,
  StationRes,
  VehicleTypeParams,
} from "@/models"
import { AxiosResponse } from "axios"
import axiosClient from "."

const userAPI = {
  login: (data: LoginFormParams) => {
    return axiosClient.post("/api/user_information_controller/login", {
      params: data,
    })
  },

  logout: () => {
    return axiosClient.post("/api/logout", {})
  },

  checkHasPassword: () => {
    return axiosClient.post("/api/user_information_controller/check_has_password", {})
  },

  createNewPassword: (params: CreateNewPasswordParams) => {
    return axiosClient.post("/api/user_information_controller/create_new_password", {
      params,
    })
  },

  changePassword: (data: ChangePasswordParams) => {
    return axiosClient.post("/api/user_information_controller/change-password", {
      params: data,
    })
  },

  resetPassword: (data: ResetPasswordParams): Promise<AxiosResponse<ResetPasswordRes>> => {
    return axiosClient.post("/api/user_information_controller/reset-password", {
      params: data,
    })
  },

  confirmDriverRole: (data: ResetPasswordParams) => {
    return axiosClient.post("/api/user_information_controller/update_user_information", {
      params: data,
    })
  },

  checkPhoneExist: (phone: string) => {
    return axiosClient.post("/api/user_information_controller/check_user_account", {
      params: {
        phone,
      },
    })
  },

  firebaseAuth: (params: Auth) => {
    return axiosClient.post("/api/firebase_auth", {
      params,
    })
  },

  requestOTP: (params: RequestOTPCode) => {
    return axiosClient.post("/api/connect_stringee_controller/send_otp_verification_message", {
      params,
    })
  },

  verifyOTP: (params: VerifyOTPCode) => {
    return axiosClient.post("/api/connect_stringee_controller/verify_otp_code", {
      params,
    })
  },

  loginByOTP: (params: LoginByOTP) => {
    return axiosClient.post("/api/user_information_controller/auth_otp", {
      params,
    })
  },

  getChatToken: (): Promise<AxiosResponse<{ chat_access_token: string }>> => {
    return axiosClient.get("/api/get_chat_token")
  },

  setChatToken: (params: { access_token: string; refresh_token: string }) => {
    return axiosClient.post("/api/set_chat_token", params)
  },

  // This didn't assign token to cookie
  getTokenByOTP: (params: LoginByOTP) => {
    return axiosClient.post("/api/user_information_controller/auth", {
      params,
    })
  },

  updateUserInfo: (params: UpdateUserInfoParams) => {
    return axiosClient.post("/api/user_information_controller/update_user_information", { params })
  },

  setToken: (token: string) => {
    return axiosClient.post("/api/set_token", { params: { token } })
  },

  createUserInfo: (params: CreateUserFormParams) => {
    return axiosClient.post("/api/user_information_controller/create_user_information", { params })
  },

  createAttachmentCommon: (params: AttachmentParams) => {
    return axiosClient.post("/api/user_information_controller/create_attachment_data", {
      params,
    })
  },

  createAttachmentAvatar: (params: AttachmentParams) => {
    return axiosClient.post("/api/detail_data_controller/create_attachment_data", {
      params,
    })
  },

  getUserInfo: () => {
    return axiosClient.post("/api/user_information_controller/get_user_information", {
      params: {},
    })
  },

  createIdentityCard: (params: IdCardParams) => {
    return axiosClient.post("/api/user_information_controller/create_identity_card", {
      params,
    })
  },

  updateIdentityCard: (params: IdCardUpdateParams) => {
    return axiosClient.post("/api/user_information_controller/update_identity_card", {
      params,
    })
  },

  getIdentityCard: () => {
    return axiosClient.post("/api/user_information_controller/get_identity_card", {
      params: {},
    })
  },

  createDrivingLicense: (params: DrivingLicenseParams) => {
    return axiosClient.post("/api/user_information_controller/create_car_driving_license", {
      params,
    })
  },

  updateDrivingLicense: (params: UpdateDrivingLicenseParams) => {
    return axiosClient.post("/api/user_information_controller/update_car_driving_license", {
      params,
    })
  },

  getDrivingLicense: () => {
    return axiosClient.post("/api/user_information_controller/get_car_driving_license", {
      params: {},
    })
  },

  createCertificateRegistrationVehicle: (params: VehicleDetailFormParams) => {
    return axiosClient.post(
      "/api/user_information_controller/create_car_registration_certificate",
      {
        params,
      }
    )
  },

  updateCertificateRegistrationVehicle: (params: VehicleDetailFormParams) => {
    return axiosClient.post(
      "/api/user_information_controller/update_car_registration_certificate",
      {
        params,
      }
    )
  },

  getCertificateRegistrationVehicle: () => {
    return axiosClient.post("/api/user_information_controller/get_car_registration_certificate", {
      params: {},
    })
  },

  createVehicleInsurance: (params: VehicleInsuranceParams) => {
    return axiosClient.post("/api/user_information_controller/create_compulsory_car_insurance", {
      params,
    })
  },

  updateVehicleInsurance: (params: UpdateVehicleInsuranceParams) => {
    return axiosClient.post("/api/user_information_controller/update_compulsory_car_insurance", {
      params,
    })
  },

  getVehicleInsurance: () => {
    return axiosClient.post("/api/user_information_controller/get_compulsory_car_insurance", {
      params: {},
    })
  },

  createCertificateInspection: (params: CertificateInspectionParams) => {
    return axiosClient.post(
      "/api/user_information_controller/create_periodical_inspection_certificate",
      {
        params,
      }
    )
  },

  updateCertificateInspection: (params: UpdateCertificateInspectionParams) => {
    return axiosClient.post(
      "/api/user_information_controller/update_periodical_inspection_certificate",
      {
        params,
      }
    )
  },

  getCertificateInspection: () => {
    return axiosClient.post(
      "/api/user_information_controller/get_periodical_inspection_certificate",
      {
        params: {},
      }
    )
  },

  getFilledDataFields: () => {
    return axiosClient.post("/api/user_information_controller/get_general_user_information", {
      params: {},
    })
  },

  getJournalList: (params: ListQuery) => {
    return axiosClient.post("/api/wallet_controller/get_list_journal", {
      params,
    })
  },

  getDetailTransaction: (params: GetDetailTransactionParams) => {
    return axiosClient.post("/api/wallet_controller/get_detail_transaction", {
      params,
    })
  },

  getTransactionListByWallet: (params: GetTransactionListByWalletParams) => {
    return axiosClient.post("/api/wallet_controller/get_list_transaction_by_journal", {
      params,
    })
  },

  MakeWithdrawingRequest: (params: MakeWithdrawingRequestParams) => {
    return axiosClient.post("/api/wallet_controller/make_money_withdrawing_request", {
      params,
    })
  },

  createContact: (params: ContactParams) => {
    return axiosClient.post("/api/api/v3.0/crm/create_crm_lead", {
      params,
    })
  },

  getPaymentMethodListForRechargeMoney: () => {
    return axiosClient.post("/api/payment_controller/get_payment_method_for_money_recharge", {})
  },

  createRechargeRequest: (params: CreateRechargeRequestParams) => {
    return axiosClient.post("/api/wallet_controller/create_wallet_recharge_request", {
      params,
    })
  },

  confirmRechargeRequest: (params: ConfirmRechargeRequestParams) => {
    return axiosClient.post("/api/wallet_controller/confirm_wallet_recharge_request", {
      params,
    })
  },

  getCarTypes: () => {
    return axiosClient.post<VehicleTypeParams[]>("/api/address_controller/get_car_data", {
      params: {},
    })
  },

  getCarBrands: () => {
    return axiosClient.post("/api/address_controller/get_car_brand_data", {
      params: {},
    })
  },

  getCarPriceUnit: (params: GetPriceUnitParams) => {
    return axiosClient.post("/api/address_controller/get_price_unit", {
      params,
    })
  },

  getCarUtilities: () => {
    return axiosClient.post("/api/address_controller/get_extra_utility", {
      params: {},
    })
  },

  getCarQualityStandards: () => {
    return axiosClient.post("/api/address_controller/get_quality_car_standard", {
      params: {},
    })
  },

  getPickUpStations: (province_id: number): Promise<AxiosResponse<StationRes[]>> => {
    return axiosClient.post("/api/address_controller/get_pick_up_station", {
      params: {
        province_id,
      },
    })
  },
}

export { userAPI }
