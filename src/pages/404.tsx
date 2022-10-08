import { NotFoundIcon } from "@/assets"
import { AuthHeader, Header, Seo } from "@/components"
import Link from "next/link"
import { useSelector } from "react-redux"
import { RootState } from "../core"

const NotFoundPage = () => {
  const { userInfo } = useSelector((state: RootState) => state.userInfo)

  return (
    <main>
      <Seo description="" thumbnailUrl="" title="Không tìm thấy đường dẫn" url="404" />
      {userInfo?.car_account_type ? <AuthHeader /> : <Header />}
      <div className="flex-center py-[40px] flex-col px-12">
        <NotFoundIcon className="mb-[40px] w-[60%]" />
        <p className="text-sm md:text-base mb-[40px] text-center">
          Xin lỗi! Đường dẫn trang web không tồn tại
        </p>
        <div className="flex w-full">
          <Link
            href={
              userInfo?.car_account_type === "car_driver"
                ? "/d"
                : userInfo?.car_account_type === "customer"
                ? "/c"
                : "/"
            }
          >
            <a className="btn-primary mx-auto">Trang chủ</a>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
