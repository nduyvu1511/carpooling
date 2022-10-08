// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from "cookies"
import httpProxy, { ProxyResCallback } from "http-proxy"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  result: {
    success: boolean
    message: string
    validate_token: boolean
    data: any
    code: 200 | 400 | 404 | 403 | 409 | 500
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
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

  return new Promise((resolve) => {
    // don't send cookies to API server
    req.url = `${process.env.NEXT_PUBLIC_API_URL}${req.url?.replace("/api", "")}`
    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = ""
      proxyRes.on("data", function (chunk) {
        body += chunk
      })
      proxyRes.on("end", function () {
        try {
          const {
            result: { data, message, code },
          } = JSON.parse(body)

          if (code !== 200) {
            return (res as NextApiResponse<Data>).status(200).json({
              result: {
                message,
                data,
                success: false,
                validate_token: true,
                code,
              },
            })
          }
          // convert token to cookies
          const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== "development" })
          cookies.set("access_token", data.token, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(new Date().setDate(new Date().getDate() + 3)),
          })
          ;(res as NextApiResponse<Data>).status(200).json({
            result: {
              message: "Đăng nhập thành công",
              data,
              success: true,
              validate_token: true,
              code: 200,
            },
          })
        } catch (error) {
          ;(res as NextApiResponse<Data>).status(500).json({
            result: {
              message: "something went wrong",
              data: [],
              success: false,
              validate_token: false,
              code: 500,
            },
          })
        }

        resolve(true)
      })
    }

    proxy.once("proxyRes", handleLoginResponse)
    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    })
  })
}
