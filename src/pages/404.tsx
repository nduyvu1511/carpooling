import { NotFoundIcon } from "@/assets"
import { Header } from "@/components"
import Link from "next/link"
import { useSelector } from "react-redux"
import { RootState } from "../core"

const NotFoundPage = () => {
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  return (
    <main>
      <Header />
      <div className="flex-center py-[40px] flex-col">
        <NotFoundIcon className="mb-[40px]" />
        <p className="text-base mb-[40px]">Xin lỗi! Đường dẫn trang web không tồn tại</p>
        <Link
          href={
            userInfo?.car_account_type === "car_driver"
              ? "/d"
              : userInfo?.car_account_type === "customer"
              ? "/c"
              : "/"
          }
        >
          <a className="btn-primary">Trang chủ</a>
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage
