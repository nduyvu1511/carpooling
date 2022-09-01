import { PaymentRes } from "@/models"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import { PaymentItem } from "./paymentItem"

interface PaymentSlideProps {
  isLoading?: boolean
  data: PaymentRes[]
  onChange: (_: PaymentRes) => void
  currentPaymentSelected?: number | undefined
}

export const PaymentSlide = ({
  data,
  onChange,
  currentPaymentSelected,
  isLoading,
}: PaymentSlideProps) => {
  return (
    <div className="payment__slide flex">
      <Swiper
        className="payment__slide flex-1 pb-[1px]"
        spaceBetween={12}
        slidesPerView={"auto"}
        breakpoints={{
          768: {
            spaceBetween: 16,
          },
        }}
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SwiperSlide className="skeleton h-[90px] rounded-[8px]" key={index}></SwiperSlide>
            ))
          : data?.length > 0
          ? data?.map((item) => (
              <SwiperSlide key={item.acquirer_id}>
                <PaymentItem
                  payment={item}
                  isActive={currentPaymentSelected === item.acquirer_id}
                  onChange={onChange}
                />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  )
}
