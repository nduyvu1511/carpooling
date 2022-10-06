import { useQueryList } from "@/hooks"
import { PromotionRes } from "@/models"
import { promotionApi } from "@/services"
import { SwiperSlide } from "swiper/react"
import { Slide } from "../common"
import { PromotionInfoItem } from "./promotionInfoItem"

interface PromotionSlideProps {
  title: string
  titleClassName?: string
}

export const PromotionSlide = ({ title, titleClassName = "" }: PromotionSlideProps) => {
  const { data } = useQueryList<PromotionRes[]>({
    fetcher: promotionApi.getSpecialPromotionList,
    initialData: undefined,
    key: "get_special_promotion_list",
    params: { limit: 12, offset: 0 },
  })
  console.log(data)

  return (
    <div className="promotion-slide">
      <h4
        className={`text-20 leading-[26 px] lg:text-24 lg:leading-[30px] font-medium  ${
          titleClassName || "mb-16 md:mb-24"
        }`}
      >
        {title}
      </h4>
      <Slide loop={false} className="pr-[1px]">
        {data &&
          data.map((item, index) => (
            <SwiperSlide className="relative aspect-[3/2]" key={index}>
              <PromotionInfoItem data={item} />
            </SwiperSlide>
          ))}
      </Slide>
    </div>
  )
}
