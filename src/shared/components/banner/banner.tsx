import Image from "next/image"
import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react"

interface BannerProps {
  images: string[]
}

const Banner = ({ images }: BannerProps) => {
  return (
    <Swiper
      className="swiper-hover"
      spaceBetween={12}
      slidesPerView={"auto"}
      breakpoints={{
        768: {
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      modules={[Navigation, Autoplay]}
      navigation={true}
      autoplay={{ delay: 5000 }}
    >
      {images.map((src, index) => (
        <SwiperSlide className="relative aspect-[3/2]" key={index}>
          <Image
            className="w-full h-full rounded-[5px]"
            src={src}
            alt=""
            objectFit="cover"
            layout="fill"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export { Banner }
