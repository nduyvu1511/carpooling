import { ReactNode } from "react"
import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { Swiper } from "swiper/react"

interface SlideProps {
  children: ReactNode
}

const Slide = ({ children }: SlideProps) => {
  return (
    <Swiper
      className="swiper-hover custom-swiper pb-[1px]"
      spaceBetween={12}
      slidesPerView={"auto"}
      breakpoints={{
        768: {
          spaceBetween: 16,
        },
        1024: {
          spaceBetween: 24,
          slidesPerView: 4,
        },
      }}
      modules={[Navigation, Autoplay]}
      navigation={true}
      // autoplay={{ delay: 5000 }}
      loop
    >
      {children}
    </Swiper>
  )
}

export { Slide }
