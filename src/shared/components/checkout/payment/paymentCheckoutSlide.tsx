import { PaymentIcon, WalletIcon } from "@/assets"
import { formatMoneyVND } from "@/helper"
import { PaymentMethod, PaymentMethodItem as PaymentMethodItemType } from "@/models"
import { useMemo } from "react"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import { PaymentMethodItem } from "./paymentMethodItem"

interface PaymentCheckoutSlideProps {
  isLoading?: boolean
  onChange: (_: PaymentMethod) => void
  currentValue?: PaymentMethod
  amountBalance: number
}

export const PaymentCheckoutSlide = ({
  onChange,
  isLoading,
  amountBalance,
  currentValue,
}: PaymentCheckoutSlideProps) => {
  const paymentList: PaymentMethodItemType[] = useMemo(() => {
    return [
      {
        value: "exxe_wallet",
        label: "Ví EXXE",
        icon: <WalletIcon className="w-16" />,
        brief: `Số dư: ${formatMoneyVND(amountBalance || 0)}`,
      },
      {
        value: "cash",
        label: "Tiền mặt",
        icon: <PaymentIcon className="w-16" />,
        brief: "Thanh toán cho tài xế",
      },
      {
        value: "transfer",
        label: "Chuyển khoản",
        icon: <WalletIcon className="w-16" />,
        brief: `Thẻ ATM/NAPAS `,
      },
    ] as PaymentMethodItemType[]
  }, [amountBalance])

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
          : paymentList.map((data) => (
              <SwiperSlide key={data.value}>
                <PaymentMethodItem
                  data={data}
                  onChange={(val) => onChange?.(val)}
                  value={currentValue}
                  className={`${
                    data.value === "transfer" ? "bg-bg pointer-events-none opacity-30" : ""
                  }`}
                />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  )
}
