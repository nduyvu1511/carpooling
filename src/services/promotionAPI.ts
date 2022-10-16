import {
  ApplyPromotionCustomerParams,
  ApplyPromotionDriverParams,
  CancelPromotionCustomerParams,
  CancelPromotionDriverParams,
  GetDetailPromotionParams,
  ListQuery,
  SavePromotionParams,
  SearchPromotionParams,
} from "@/models"
import axiosClient from "."

export const promotionApi = {
  getSpecialPromotionList: (params: ListQuery) => {
    return axiosClient.post("/api/compounding_car_promotion_controller/get_special_promotion", {
      params,
    })
  },

  getPromotionList: (params: ListQuery) => {
    return axiosClient.post("/api/compounding_car_promotion_controller/get_list_promotion", {
      params,
    })
  },

  getNewPromotionList: (params: ListQuery) => {
    return axiosClient.post("/api/compounding_car_promotion_controller/get_list_new_promotion", {
      params,
    })
  },

  savePromotion: (params: SavePromotionParams) => {
    return axiosClient.post("/api/compounding_car_promotion_controller/save_promotion", { params })
  },

  searchPromotion: (params: SearchPromotionParams) => {
    return axiosClient.post("/api/compounding_car_promotion_controller/search_promotion", {
      params,
    })
  },

  getSavedPromotionList: (params: ListQuery) => {
    return axiosClient.post("/api/compounding_car_promotion_controller/get_list_my_promotion", {
      params,
    })
  },

  getDetailPromotion: (params: GetDetailPromotionParams) => {
    return axiosClient.post("/api/compounding_car_promotion_controller/get_detail_promotion", {
      params,
    })
  },

  applyPromotionForCustomer: (params: ApplyPromotionCustomerParams) => {
    return axiosClient.post(
      "/api/compounding_car_promotion_controller/apply_promotion_for_customer",
      { params }
    )
  },

  applyPromotionForDriver: (params: ApplyPromotionDriverParams) => {
    return axiosClient.post(
      "/api/compounding_car_promotion_controller/apply_promotion_for_car_driver",
      { params }
    )
  },

  cancelPromotionForCustomer: (params: CancelPromotionCustomerParams) => {
    return axiosClient.post(
      "/api/compounding_car_promotion_controller/cancel_apply_promotion_for_customer",
      { params }
    )
  },

  cancelPromotionForDriver: (params: CancelPromotionDriverParams) => {
    return axiosClient.post(
      "/api/compounding_car_promotion_controller/cancel_apply_promotion_for_car_driver",
      { params }
    )
  },

  getPromotionListCanApply: (id: number) => {
    return axiosClient.post(
      "/api/compounding_car_promotion_controller/get_list_promotion_can_apply",
      { compounding_car_customer_id: id }
    )
  },
}
