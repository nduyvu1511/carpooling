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
import { useRef, useState } from "react"
import { Autoplay } from "swiper"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"

const PromotionBanner = () => {
  const breakpoints = useBreakpoint()
  const banners = [promotionBanner1, promotionBanner2, promotionBanner3]
  const [index, setIndex] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col-reverse xl:flex-row gap-x-[64px]">
      <div className="flex-1 w-full overflow-hidden">
        <Swiper
          loop
          className="pointer-events-none"
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 5000 }}
          onAutoplay={() => {
            const _index = index > 7 ? 0 : index + 1
            console.log({ _index })
            if (_index % 3 === 0) {
              ref.current?.scrollTo({ top: _index * 118, behavior: "smooth" })
            }
            setIndex(_index)
          }}
        >
          {banners.map((url) => (
            <SwiperSlide className="aspect-[2.17/1] rounded-[16px]" key={url}>
              <Image className="rounded-[16px]" alt="" src={url} layout="fill" objectFit="cover" />
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
            {Array.from({ length: 9 }).map((_, _index) => (
              <div className={`h-[118px] flex flex-col mb-16`} key={_index}>
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
