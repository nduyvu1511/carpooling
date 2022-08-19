import { toImageUrl } from "@/helper"
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
      className={`flex items-center text-sm block-element p-12 shadow-shadow-1 border border-solid border-border-color rounded-[5px] last:mb-0 ${
        isActive ? "border-[1px] border-primary bg-bg-primary" : ""
      } transition-all duration-150 cursor-pointer`}
    >
      {payment?.image_url?.url ? (
        <div className="w-[18px] h-[18px] relative overflow-hidden">
          <Image src={toImageUrl(payment.image_url.url)} alt="" objectFit="contain" layout="fill" />
        </div>
      ) : null}
      <span className="flex-1 mx-12 text-sm">{payment.name}</span>

      {/* <InputRadio color="#2E4CB7" isChecked={!!isActive} onCheck={() => onChange?.(payment)} /> */}
    </div>
  )
}

export { PaymentItem }
