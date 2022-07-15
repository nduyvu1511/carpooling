import { CompoundingCarRes } from "@/models"
import { Navigation } from "swiper"
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
      <div className="grid grid-cols-3 gap-[40px]">
        <div className="rounded-[20px] skeleton aspect-1"></div>
        <div className="rounded-[20px] skeleton aspect-1"></div>
        <div className="rounded-[20px] skeleton aspect-1"></div>
      </div>
    )
  return (
    <Swiper
      className="swiper-hover"
      spaceBetween={40}
      slidesPerView={3}
      onSlideChange={() => {}}
      onSwiper={(swiper) => {}}
      modules={[Navigation]}
      navigation={true}
    >
      {places?.length > 0 &&
        places.map((item, index) => (
          <SwiperSlide key={index}>
            <PlaceItem
              placeItem={{
                car_type: item.car.name,
                date: item.expected_going_on_date,
                from_province: item.from_province.province_brief_name,
                to_province: item.to_province.province_brief_name,
                image: item.from_province.image_url.url,
              }}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  )
}
