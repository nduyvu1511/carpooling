import { CompoundingCarRes } from "@/models"
import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { PlaceItem } from "./placeItem"

interface PlaceSlideProps {
  places: CompoundingCarRes[]
  showLoading?: boolean
}

export const PlaceSlide = ({ places, showLoading = false }: PlaceSlideProps) => {
  if (showLoading)
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-[16px] pr-12 md:pr-[16px]">
        <div className="rounded-[5px] skeleton aspect-1"></div>
        <div className="rounded-[5px] skeleton aspect-1"></div>
        <div className="rounded-[5px] skeleton aspect-1 hidden lg:block"></div>
        <div className="rounded-[5px] skeleton aspect-1 hidden md:block"></div>
      </div>
    )
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
      onSlideChange={() => {}}
      onSwiper={(swiper) => {}}
      modules={[Navigation, Autoplay]}
      navigation={true}
      autoplay={{ delay: 4000 }}
    >
      {places?.length > 0 &&
        places.map((item, index) => (
          <SwiperSlide key={index}>
            <PlaceItem
              placeItem={{
                car_type: item.car.name.slice(3),
                date: item.expected_going_on_date,
                from_province: item.from_province.province_short_name,
                to_province: item.to_province.province_short_name,
                image: item.from_province.image_url.url,
              }}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  )
}
