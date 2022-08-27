import { useRouter } from "next/router"
import { SwiperSlide } from "swiper/react"
import { Slide } from "../common"
import { PromotionInfoItem } from "./promotionInfoItem"

interface PromotionSlideProps {
  title: string
}

export const PromotionSlide = ({ title }: PromotionSlideProps) => {
  const router = useRouter()

  return (
    <div className="">
      <h4 className="h4 mb-16 md:mb-24">{title}</h4>
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
