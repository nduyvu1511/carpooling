import store from "@/core/store"
import { setProfile } from "@/modules"
import axios from "axios"
import { userApi } from "./userApi"

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
          await userApi.logout()
          store?.dispatch(setProfile(undefined))
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
export * from "./addressApi"
export * from "./chatApi"
export * from "./compoundingCarApi"
export * from "./newsApi"
export * from "./promotionApi"
export * from "./ratingApi"
export * from "./userApi"
export * from "./vehicleApi"
