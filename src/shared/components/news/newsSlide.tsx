import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { NewsItem } from "./newsItem"

const NewsSlide = () => {
  return (
    <Swiper
      className="swiper-hover"
      spaceBetween={12}
      slidesPerView={"auto"}
      breakpoints={{
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      }}
      onSlideChange={() => {}}
      onSwiper={(swiper) => {}}
      modules={[Navigation, Autoplay]}
      navigation={true}
      autoplay={{ delay: 5000 }}
    >
      <SwiperSlide className="relative aspect-[3/2]">
        <NewsItem />
      </SwiperSlide>
      <SwiperSlide className="relative aspect-[3/2]">
        <NewsItem />
      </SwiperSlide>
      <SwiperSlide className="relative aspect-[3/2]">
        <NewsItem />
      </SwiperSlide>
      <SwiperSlide className="relative aspect-[3/2]">
        <NewsItem />
      </SwiperSlide>
      <SwiperSlide className="relative aspect-[3/2]">
        <NewsItem />
      </SwiperSlide>
    </Swiper>
  )
}

export { NewsSlide }
