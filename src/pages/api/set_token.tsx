// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ResponseType } from "@/models"
import Cookies from "cookies"
import httpProxy from "http-proxy"
import type { NextApiRequest, NextApiResponse } from "next"

export const config = {
  api: {
    bodyParser: true,
  },
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<any>>) {
  if (req.method !== "POST") {
    return res.status(404).json({
      result: {
        message: "method not supported",
        data: [],
        success: false,
        validate_token: false,
        code: 404,
      },
    })
  }

  if (!req.body?.params?.token) {
    return res.status(400).json({
      result: {
        message: "Missing token in params",
        data: [],
        success: false,
        validate_token: false,
        code: 400,
      },
    })
  }
  return new Promise((resolve) => {
    // don't send cookies to API server
    const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== "development" })
    cookies.set("access_token", req.body.params.token, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(new Date().setDate(new Date().getDate() + 3)),
    })
    ;(res as NextApiResponse<ResponseType<any>>).status(200).json({
      result: {
        message: "Add token successfully",
        data: [],
        success: true,
        validate_token: true,
        code: 200,
      },
    })

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
