import store from "@/core/store"
import { resetChatState, setProfile } from "@/modules"
import axios from "axios"
import { userAPI } from "./userAPI"

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN_URL,
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

axiosClient.interceptors.request.use(async (config) => {
  return config
})

try {
  axiosClient.interceptors.response.use(
    async (response) => {
      if (response?.data) {
        if (response?.data?.result?.code === 401 || response?.data?.result?.code === 403) {
          await userAPI.logout()
          store?.dispatch(setProfile(undefined))
          store.dispatch(resetChatState())

          return
        }

        return response.data
      }
      return response
    },
    (err) => {
      throw err
    }
  )
} catch (error) {
  console.log(error)
}

export default axiosClient
export * from "./addressAPI"
export * from "./chatAPI"
export * from "./rideAPI"
export * from "./newsAPI"
export * from "./promotionAPI"
export * from "./ratingAPI"
export * from "./userAPI"
export * from "./chatAPI"
export * from "./notificationAPI"
