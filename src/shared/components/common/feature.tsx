import { feature1, feature2, feature3, feature4, feature5, feature6, feature7 } from "@/assets"
import Image from "next/image"
import { SwiperSlide } from "swiper/react"
import { Slide } from "./slide"

export const Feature = () => {
  return (
    <Slide>
      {[feature1, feature2, feature3, feature4, feature5, feature6, feature7].map((src, index) => (
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
    </Slide>
  )
}
