import { CloseThickIcon, CouponIcon } from "@/assets"
import { useInputText } from "@/hooks"

interface PromotionFormProps {
  onSubmit?: (val: string) => void
  onFocus?: Function
  className?: string
  promotionCode?: string
}

export const PromotionForm = ({
  onSubmit,
  onFocus,
  className = "",
  promotionCode,
}: PromotionFormProps) => {
  const { onChange, value, clearValue } = useInputText(promotionCode)

  return (
    <form
      onSubmit={(e) => {
        if (!value) return
        e.preventDefault()
        onSubmit?.(value)
      }}
      className={`flex items-center h-[44px] promotion-form ${className}`}
    >
      <div className="flex flex-1 relative">
        <span className="flex-center bg-blue-10 p-12 rounded-tl-[8px] rounded-bl-[8px]">
          <CouponIcon className="w-[20px] h-[20px] text-primary" />
        </span>
        <input
          onFocus={() => onFocus?.()}
          value={value}
          onChange={onChange}
          type="text"
          className="form-input h-full flex-1 rounded-tl-0 pr-[40px] rounded-tr-[8px] rounded-br-[8px]"
          placeholder="Nhập mã khuyến mãi"
        />
        {value ? (
          <span
            onClick={() => clearValue()}
            className="p-4 absolute-vertical right-10 z-10 cursor-pointer"
          >
            <CloseThickIcon className="w-8 h-8" />
          </span>
        ) : null}
      </div>

      {onSubmit ? (
        <button
          onClick={() => onSubmit?.(value)}
          className={`text-14 font-semibold px-12 py-6 text-primary sm:btn-primary sm:ml-16 w-fit sm:px-24 sm:py-10 ${
            !value ? "pointer-events-none opacity-30" : ""
          }`}
        >
          Áp dụng
        </button>
      ) : null}
    </form>
  )
}
