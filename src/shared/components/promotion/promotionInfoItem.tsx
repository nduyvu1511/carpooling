import { promotionItemImage } from "@/assets"
import { toImageUrl } from "@/helper"
import { PromotionRes } from "@/models"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

interface PromotionInfoItemProps {
  data: PromotionRes
}

export const PromotionInfoItem = ({ data }: PromotionInfoItemProps) => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/promotion/${data.promotion_id}`)}
      className="relative flex flex-col rounded-[10px] border border-solid border-blue-20 cursor-pointer"
    >
      <span className="absolute top-24 left-[-4px] z-10 text-[10px] font- text-error bg-bg-error-2 py-6 px-[14px] rounded-tr-[20px] rounded-br-[20px]">
        Mới
      </span>

      <div className="relative aspect-[3/2] rounded-tl-[10px] rounded-tr-[10px] overflow-hidden">
        <Image
          src={
            data?.promotion_image_url?.image_url
              ? toImageUrl(data.promotion_image_url.image_url)
              : promotionItemImage
          }
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex-1 p-16 rounded-bl-[10px] rounded-br-[10px]">
        <Link href={`/promotion/1`}>
          <a className="text-center text-14 h-[42px] md:h-[46px] md:text-18 line-clamp-2 font-semibold text-primary leading-[20opx] md:leading-[24px] mb-16">
            {data.promotion_name}
          </a>
        </Link>
        <p className="text-10 sm:text-12 text-gray-color-6 text-center mb-4">Ngày áp dụng</p>
        <p className="flex items-center justify-center">
          <span className="text-10 sm:text-12 text-blue-8">
            {moment(data.date_start).format("DD/MM/YYYY")}
          </span>
          <span className="mx-8">-</span>
          <span className="text-10 sm:text-12 text-blue-8">
            {moment(data.date_end).format("DD/MM/YYYY")}
          </span>
        </p>
      </div>
    </div>
  )
}
