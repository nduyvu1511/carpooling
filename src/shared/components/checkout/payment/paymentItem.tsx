import { formatMoneyVND, toImageUrl } from "@/helper"
import { PaymentRes } from "@/models"
import Image from "next/image"

interface PaymentItemProps {
  payment: PaymentRes
  onChange?: (params: PaymentRes) => void
  isActive?: boolean
  className?: string
}

const PaymentItem = ({ payment, onChange, isActive, className = "" }: PaymentItemProps) => {
  return (
    <div
      onClick={() => onChange?.(payment)}
      className={`cursor-pointer text-sm block-element p-12 shadow-shadow-1 border border-solid rounded-[8px] select-none ${
        isActive ? "border-[1px] border-primary bg-bg-primary" : "border-border-color"
      } transition-all duration-150 cursor-pointer ${className}`}
    >
      <div className="flex items-center mb-16">
        {payment?.image_url?.url ? (
          <div className="w-[18px] h-[18px] relative overflow-hidden">
            <Image
              src={toImageUrl(payment.image_url.url)}
              alt=""
              objectFit="contain"
              layout="fill"
            />
          </div>
        ) : null}
        <p className="flex-1 ml-12 text-sm line-clamp-1">{payment.name}</p>
      </div>

      <p className="text-[10px] leading-[18px] text-gray-color-7">
        {payment.provider === "exxe_wallet"
          ? `Số dư: ${formatMoneyVND(payment.money_in_cash_wallet || 0)}`
          : payment?.brief || payment.name}
      </p>
    </div>
  )
}

export { PaymentItem }
