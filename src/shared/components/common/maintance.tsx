import { mainTanceImage } from "@/assets"
import { RootState } from "@/core/store"
import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"

const Maintance = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

  return (
    <div className="flex-center flex-col px-custom">
      <div className="relative mb-24 min-h-[200px] lg:min-h-[400px] w-full">
        <Image src={mainTanceImage} alt="" layout="fill" objectFit="contain" />
      </div>
      <p className="text-base mb-24">
        Trang web hiện đang bảo trì, chúng tôi sẽ cố gắng trở lại sớm. Cảm ơn đã chờ đợi!{" "}
      </p>

      <Link
        href={`${
          userInfo?.car_account_type === "car_driver"
            ? "d"
            : userInfo?.car_account_type === "customer"
            ? "/c"
            : "/"
        }`}
        className="btn-primary"
      >
        <a className="btn-primary">Trang chủ</a>
      </Link>
    </div>
  )
}

export { Maintance }
