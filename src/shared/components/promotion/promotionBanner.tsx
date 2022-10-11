import { ArrowRightIcon, ClockIcon } from "@/assets"
import { toImageUrl } from "@/helper"
import { useBreakpoint } from "@/hooks"
import { PromotionRes } from "@/models"
import { promotionApi } from "@/services"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { Autoplay, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import useSWR from "swr"
import { Spinner } from "../loading"

const ITEM_HEIGHT = 118

const PromotionBanner = () => {
  const breakpoints = useBreakpoint()
  const [index, setIndex] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)

  const { isValidating, data } = useSWR<PromotionRes[] | undefined>(
    "get_special_promotion_list",
    () =>
      promotionApi
        .getSpecialPromotionList({})
        .then((res) => res?.result?.data || [])
        .catch((err) => console.log(err))
  )

  const handleSlideChange = (index: number) => {
    setIndex(index)
    if (index % 3 === 0) {
      ref.current?.scrollTo({ top: index * ITEM_HEIGHT, behavior: "smooth" })
    }
  }

  if (isValidating) return <Spinner className="py-[60px]" size={30} />

  if (!data?.length) return null
  return (
    <div className="flex flex-col-reverse xl:flex-row gap-x-[64px]">
      <div className="flex-1 w-full overflow-hidden">
        <Swiper
          loop
          className="promotion-banner-slide cursor-pointer "
          slidesPerView={1}
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: false }}
          onAutoplay={({ realIndex }) => handleSlideChange(realIndex)}
        >
          {[...data, ...data].map((item, index) => (
            <SwiperSlide
              className="aspect-[3/1] cursor-pointer xl:aspect-[2.17/1] rounded-[10px] xl:rounded-[16px] xl:pointer-events-none"
              key={index}
            >
              <Link href="/promotion">
                <a href="cursor-pointer">
                  <Image
                    className="rounded-[16px] cursor-pointer"
                    alt=""
                    src={toImageUrl(item?.promotion_banner_url?.image_url || "")}
                    layout="fill"
                    objectFit="cover"
                  />
                </a>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-[375px] hidden xl:block">
        <div className="flex items-center justify-between mb-24">
          <p className="text-base font-semibold">Top khuyến mãi</p>
          <Link passHref href="/promotion" className="text-base font-semibold">
            <a className="flex items-center text-xs">
              Xem thêm
              <ArrowRightIcon className="ml-8 w-4" />
            </a>
          </Link>
        </div>

        {breakpoints >= 1280 ? (
          <div ref={ref} className="h-[354px] flex flex-col overflow-hidden scrollbar-hide">
            {[...data, ...data].map((item, _index) => (
              <div className={`h-[${ITEM_HEIGHT}px] flex flex-col mb-16`} key={_index}>
                <div className="mb-8">
                  <p
                    className={`text-16 h-[54px] md:text-18 font-semibold line-clamp-2 ${
                      index === _index ? "text-primary" : "text-gray-color-7"
                    }`}
                  >
                    {item.promotion_name}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="flex items-center mb-16 text-gray-color-7">
                    <ClockIcon className="w-[14px] h-[14px] mr-8 text-gray-color-7" />
                    <span className="text-12">{moment(item.date_end).format("DD/MM/YYYY")}</span>
                    <span className="mx-8">-</span>
                    <span className="text-12">{moment(item.date_start).format("DD/MM/YYYY")}</span>
                  </p>

                  <div className="bg-[#f3f3f3] rounded-[98px] overflow-hidden h-[3px] relative">
                    {index === _index ? (
                      <div className="absolute h-full promotion-loading-gradient banner-loading"></div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { PromotionBanner }
