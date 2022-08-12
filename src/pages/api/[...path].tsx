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
  if (req.method !== "POST") {
    return res.status(404).json({
      result: {
        message: "method not supported",
        success: false,
        data: [],
        validate_token: false,
        code: 404,
      },
    })
  }

  return new Promise((resolve) => {
    const cookies = new Cookies(req, res)
    const token = cookies.get("access_token")

    if (token) {
      req.headers.Authorization = `Bearer ${token}`
    }
    // don't send cookies to API server
    req.url = `${process.env.NEXT_PUBLIC_API_URL}${req.url?.replace("/api", "")}`
    console.log(req.url)
    proxy.once("proxyRes", () => {
      resolve(true)
    })
    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    })
  })
}
