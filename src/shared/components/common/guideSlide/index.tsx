/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

type GuideItem = {
  step: string
  label: string
  image: string
}

interface GuideSlideProps {
  data: GuideItem[]
}

export const GuideSlide = ({ data }: GuideSlideProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const ref = useRef<SwiperRef>(null)

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index)
    if (ref.current?.swiper) {
      ref.current?.swiper.slideTo(index)
    }
  }

  useEffect(() => {
    handleSlideChange(0)
  }, [data])

  return (
    <div className="md:grid md:grid-cols-240 gap-40 md:gap-[80px] lg:gap-[160px] guide-slide">
      <div className="flex-center mb-40 md:md-0">
        <img src={data[currentIndex]?.image} alt="" />
      </div>

      <div className="md:hidden">
        <Swiper
          ref={ref}
          loop
          slidesPerView={'auto'}
          initialSlide={currentIndex}
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: false }}
          onAutoplay={({ realIndex }) => handleSlideChange(realIndex)}
          spaceBetween={12}
          onSlideChange={(e) => handleSlideChange(e.realIndex)}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <StepItem
                onClick={() => handleSlideChange(index)}
                active={index === currentIndex}
                data={item}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden md:block">
        {data.map((item, index) => (
          <div className="mb-8 last:mb-0" key={item.label}>
            <StepItem
              onClick={() => handleSlideChange(index)}
              active={index === currentIndex}
              data={item}
            />
          </div>
        ))}
      </div>

      {/* <Swiper
        loop
        className="md:hidden"
        slidesPerView={'auto'}
        initialSlide={currentIndex}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: false }}
        onAutoplay={({ realIndex }) => handleSlideChange(realIndex)}
        spaceBetween={12}
        onSlideChange={(e) => setCurrentIndex(e.realIndex)}
      /> */}
    </div>
  )
}

const StepItem = ({
  data,
  onClick,
  active
}: {
  onClick?: () => void
  active?: boolean
  data: GuideItem
}) => {
  return (
    <div className="mb-8 last:mb-0" key={data.label}>
      <div
        onClick={() => onClick?.()}
        className={`py-12 px-16 rounded-[8px] cursor-pointer transition duration-200 ${
          active ? 'guide-item-linear' : 'bg-white-color'
        }`}
      >
        <p className="flex items-start mb-4 relative select-none">
          <span
            className={`mr-8 relative bottom-8 text-16 font-semibold ${
              active ? 'text-brand' : 'text-guide'
            }`}
          >
            .
          </span>
          <span className={`text-16 font-semibold ${active ? 'text-brand' : 'text-guide'}`}>
            {data.step}
          </span>
        </p>
        <p
          className={`text-14 font-semibold select-none ${
            active ? 'text-white-color' : 'text-text-color'
          }`}
        >
          {data.label}
        </p>
      </div>
    </div>
  )
}
