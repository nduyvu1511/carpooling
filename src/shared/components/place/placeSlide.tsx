import { CompoundingCarRes } from "@/models"
import { SwiperSlide } from "swiper/react"
import { Slide } from "../common"
import { PlaceItem } from "./placeItem"

interface PlaceSlideProps {
  places: CompoundingCarRes[]
  showLoading?: boolean
}

export const PlaceSlide = ({ places, showLoading = false }: PlaceSlideProps) => {
  if (showLoading)
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-16 pr-12 md:pr-16">
        <div className="rounded-[5px] skeleton aspect-1"></div>
        <div className="rounded-[5px] skeleton aspect-1"></div>
        <div className="rounded-[5px] skeleton aspect-1 hidden lg:block"></div>
        <div className="rounded-[5px] skeleton aspect-1 hidden md:block"></div>
      </div>
    )
  return (
    <Slide>
      {places?.length > 0 &&
        places.map((item, index) => (
          <SwiperSlide key={index}>
            <PlaceItem
              placeItem={{
                car_type: item?.car?.name ? item.car?.name?.slice(3) : "",
                date: item.expected_going_on_date,
                from_province: item.from_province.province_short_name,
                to_province: item.to_province.province_short_name,
                image: item.to_province.image_url.url,
              }}
            />
          </SwiperSlide>
        ))}
    </Slide>
  )
}
