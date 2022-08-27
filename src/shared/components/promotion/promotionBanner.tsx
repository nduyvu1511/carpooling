import {
  ArrowRightIcon,
  ClockIcon,
  promotionBanner1,
  promotionBanner2,
  promotionBanner3,
} from "@/assets"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

interface SlideProps {
  className?: string
}

const PromotionBanner = ({ className }: SlideProps) => {
  const banners = [promotionBanner1, promotionBanner2, promotionBanner3]
  const [index, setIndex] = useState<number>(0)

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setIndex(index > 1 ? 0 : index + 1)
  //   }, 5000)

  //   return () => clearInterval(id)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [index])

  return (
    <div className="grid grid-cols-grid-promotion-banner gap-x-[64px]">
      <div className="flex w-full h-full overflow-hidden">
        <Swiper
          className={`h-full w-full ${className}`}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 5000 }}
          onAutoplay={(params) => {
            // console.log(params.activeIndex)
            setIndex(index > 1 ? 0 : index + 1)
          }}
          onSwiper={() => {
            console.log("hello")
          }}
          loop
          pagination={{ clickable: true }}
        >
          {banners.map((url) => (
            <SwiperSlide className="aspect-[3/1]" key={url}>
              <Image className="rounded-[16px]" alt="" src={url} layout="fill" objectFit="cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="">
        <div className="flex items-center justify-between mb-24">
          <p className="text-base font-semibold">Top khuyến mãi</p>
          <Link passHref href="/promotion/1" className="text-base font-semibold">
            <a className="flex items-center text-xs">
              Xem thêm
              <ArrowRightIcon className="ml-8 w-4" />
            </a>
          </Link>
        </div>

        <div className="overflow-y-auto">
          {Array.from({ length: 3 }).map((_, _index) => (
            <div className="mb-16" key={_index}>
              <p className="text-16 md:text-18 mb-8 font-semibold text-primary">
                Thế giới ExxeVn mở ra, hàng trăm ưu đãi đang chờ bạn!
              </p>

              <p className="flex items-center mb-16">
                <ClockIcon className="w-[14px] h-[14px] mr-8" />
                <span className="text-12">31/08/2022</span>
                <span className="text-12">31/08/2022</span>
              </p>

              <div className="bg-[#f3f3f3] h-[3px] relative">
                {index === _index ? (
                  <div className="absolute h-full bg-primary banner-loading"></div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { PromotionBanner }
