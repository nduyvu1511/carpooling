import { CompoundingCarRes } from "@/models"
import { SwiperSlide } from "swiper/react"
import { Slide } from "../common"
import { PlaceItem } from "./placeItem"

interface PlaceSlideProps {
  data: CompoundingCarRes[]
  showLoading?: boolean
}

export const PlaceSlide = ({ data, showLoading }: PlaceSlideProps) => {
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
      {data &&
        data?.length > 0 &&
        data?.map((item, index) => (
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
