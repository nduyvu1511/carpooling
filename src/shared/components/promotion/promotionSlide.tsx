import { SwiperSlide } from "swiper/react"
import { Slide } from "../common"
import { PromotionInfoItem } from "./promotionInfoItem"

interface PromotionSlideProps {
  title: string
  titleClassName?: string
}

export const PromotionSlide = ({ title, titleClassName = "" }: PromotionSlideProps) => {
  return (
    <div className="promotion-slide">
      <h4
        className={`text-20 leading-[26 px] lg:text-24 lg:leading-[30px] font-medium  ${
          titleClassName || "mb-16 md:mb-24"
        }`}
      >
        {title}
      </h4>
      <Slide>
        {Array.from({ length: 6 }).map((_, index) => (
          <SwiperSlide className="relative aspect-[3/2]" key={index}>
            <PromotionInfoItem />
          </SwiperSlide>
        ))}
      </Slide>
    </div>
  )
}
