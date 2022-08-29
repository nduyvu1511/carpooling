import { promotionItemImage } from "@/assets"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

export const PromotionInfoItem = () => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/promotion/${1}`)}
      className="relative flex flex-col rounded-[10px]"
    >
      <span className="absolute top-24 left-[-4px] z-10 text-[10px] font- text-error bg-bg-error-2 py-6 px-[14px] rounded-tr-[20px] rounded-br-[20px]">
        Mới
      </span>

      <div className="relative aspect-[3/2] rounded-tl-[10px] rounded-tr-[10px] overflow-hidden">
        <Image src={promotionItemImage} alt="" layout="fill" objectFit="cover" />
      </div>
      <div className="border border-solid flex-1 border-blue-20   border-t-0 p-16 rounded-bl-[10px] rounded-br-[10px]">
        <Link href={`/promotion/1`}>
          <a className="text-center text-14 h-[42px] md:h-[46px] md:text-18 line-clamp-2 font-semibold text-primary leading-[20opx] md:leading-[24px] mb-16">
            Tặng ngay 100k khi hoàn tất đăng ký tài khoản
          </a>
        </Link>
        <p className="text-10 sm:text-12 text-gray-color-6 text-center mb-4">Ngày áp dụng</p>
        <p className="flex items-center justify-center">
          <span className="text-10 sm:text-12 text-blue-8">31/08/2022</span>
          <span className="mx-8">-</span>
          <span className="text-10 sm:text-12 text-blue-8">31/08/2022</span>
        </p>
      </div>
    </div>
  )
}
