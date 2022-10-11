// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from "next/server"
// eslint-disable-next-line @next/next/no-server-import-in-page
import type { NextRequest } from "next/server"
import Cookies from "cookies"

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest, res: NextResponse) {
  console.log("customer pages")
  // const cookies = new Cookies(req, res)
  // const token = req.cookies.get("access_token")
  // console.log("calling middleware with token: ", token)
  // if (req.url !== "http://localhost:3000/" && !token) {
  //   return NextResponse.redirect("http://localhost:3000/")
  // }
  // return NextResponse.redirect(new URL("/about-2", request.url))
}
