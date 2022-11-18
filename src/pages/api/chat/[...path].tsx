import { ResponseType } from "@/models"
import Cookies from "cookies"
import httpProxy from "http-proxy"
import type { NextApiRequest, NextApiResponse } from "next"

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<any>>) {
  return new Promise((resolve) => {
    const cookies = new Cookies(req, res)
    const token = cookies.get("chat_access_token")
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc1ZWYyOTU3ZjFlMGQ0MTJiNGQ5MGEiLCJ1c2VyX2lkIjoic2hvcF8xIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjY4NjczMzIxLCJleHAiOjE3MDAyMDkzMjF9.TLw3HbFlqV_3A7Xc5J6GQpg058ZwWEO3Zc4Nz-N6Ahg"

    if (token) {
      req.headers.Authorization = `Bearer ${token}`
    }
    // don't send cookies to API server
    req.url = `${process.env.NEXT_PUBLIC_CHAT_API_URL}${req.url?.replace("/chat", "")}`
    proxy.once("proxyRes", () => {
      resolve(true)
    })

    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_CHAT_API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    })
  })
}
