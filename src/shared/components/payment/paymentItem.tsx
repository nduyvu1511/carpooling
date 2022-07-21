import { PaymentRes } from "@/models"

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
        isActive ? "bg-primary text-white-color border-none" : ""
      } transition-all duration-150 cursor-pointer`}
    >
      <span className="">{payment.name}</span>
    </div>
  )
}

export { PaymentItem }
