import { PaymentRes } from "@/models"
import Image from "next/image"

interface PaymentItemProps {
  payment: PaymentRes
  onChange?: (params: PaymentRes) => void
  isActive?: boolean
}

const PaymentItem = ({ payment, onChange, isActive }: PaymentItemProps) => {
  return (
    <div
      onClick={() => onChange?.(payment)}
      className={`flex items-center text-sm block-element px-[16px] py-[10px] shadow-shadow-1 border border-solid border-border-color rounded-[5px] last:mb-0 ${
        isActive ? "text-white-color bg-primary border-primary" : ""
      } transition-all duration-150 cursor-pointer`}
    >
      {payment.image ? (
        <div className="max-w-[50px] w-full h-[32px] relative overflow-hidden mr-[16px]">
          <Image
            src={`data:image/png;base64, ${payment.image}`}
            alt=""
            objectFit="contain"
            layout="fill"
          />
        </div>
      ) : null}
      <span className="flex-1">{payment.name}</span>
    </div>
  )
}

export { PaymentItem }
