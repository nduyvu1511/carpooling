import { GetPromotionDetail, QueryCommonParams } from "@/models"
import axiosClient from "."

const notificationAPI = {
  getPromotionList: (params: QueryCommonParams) => {
    return axiosClient.post("/api/compounding_car_notification_controller/get_list_notification", {
      params,
    })
  },

  getPromotionDetail: (params: GetPromotionDetail) => {
    return axiosClient.post(
      "/api/compounding_car_notification_controller/get_detail_notification",
      {
        params,
      }
    )
  },
}

export { notificationAPI }
