import { PaymentMethod, PaymentMethodItem as PaymentMethodItemType } from "@/models"

interface PaymentMethodItemProps {
  data: PaymentMethodItemType
  onChange?: (val: PaymentMethod) => void
  value?: PaymentMethod
  className?: string
}

export const PaymentMethodItem = ({ data, value, onChange, className }: PaymentMethodItemProps) => {
  return (
    <div
      onClick={() => onChange?.(data.value)}
      className={`cursor-pointer text-sm block-element p-12 shadow-shadow-1 border border-solid rounded-[8px] ${
        value === data.value ? "border-[1px] border-primary bg-bg-primary" : "border-[#F3F3F3]"
      } transition-all duration-150 cursor-pointer ${className}`}
    >
      <div className="flex items-center mb-16">
        {data.icon}
        <p className="flex-1 ml-12 text-sm line-clamp-1">{data.label}</p>
      </div>

      <p className="text-[10px] leading-[18px] text-gray-color-7">{data.brief}</p>
    </div>
  )
}
