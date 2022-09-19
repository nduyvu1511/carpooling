import {
  ArrowRightIcon,
  ClockIcon,
  promotionBanner1,
  promotionBanner2,
  promotionBanner3,
} from "@/assets"
import { useBreakpoint } from "@/hooks"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { Autoplay, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"

const ITEM_HEIGHT = 118

const PromotionBanner = () => {
  const breakpoints = useBreakpoint()
  const banners = [promotionBanner1, promotionBanner2, promotionBanner3, promotionBanner2]
  const [index, setIndex] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)

  const handleSlideChange = (index: number) => {
    setIndex(index)
    if (index % 3 === 0) {
      ref.current?.scrollTo({ top: index * ITEM_HEIGHT, behavior: "smooth" })
    }
  }

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
          {banners.map((url, index) => (
            <SwiperSlide
              className="aspect-[3/1] cursor-pointer xl:aspect-[2.17/1] rounded-[10px] xl:rounded-[16px] xl:pointer-events-none"
              key={index}
            >
              <Link href="/promotion">
                <a href="cursor-pointer">
                  <Image
                    className="rounded-[16px] cursor-pointer"
                    alt=""
                    src={url}
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
            {Array.from({ length: banners.length }).map((_, _index) => (
              <div className={`h-[${ITEM_HEIGHT}px] flex flex-col mb-16`} key={_index}>
                <div className="mb-8">
                  <p
                    className={`text-16 h-[54px] md:text-18 font-semibold line-clamp-2 ${
                      index === _index ? "text-primary" : "text-gray-color-7"
                    }`}
                  >
                    Thế giới ExxeVn mở ra, hàng trăm ưu đãi đang chờ bạn!
                  </p>
                </div>
                <div className="flex-1">
                  <p className="flex items-center mb-16 text-gray-color-7">
                    <ClockIcon className="w-[14px] h-[14px] mr-8" />
                    <span className="text-12">31/08/2022</span>
                    <span className="mx-8">-</span>
                    <span className="text-12">31/08/2022</span>
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
