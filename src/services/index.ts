import { setProfile } from "@/modules"
import axios from "axios"
import { store } from "../core"
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
        if (response?.data?.result?.code === 401) {
          await userApi.logout()
          store.dispatch(setProfile(undefined))
          window.location.href = "/"
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
export * from "./compoundingCarApi"
export * from "./ratingApi"
export * from "./userApi"
export * from "./vehicleApi"
