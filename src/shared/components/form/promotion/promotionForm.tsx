import { CouponIcon } from "@/assets"
import { useInputText } from "@/hooks"

interface PromotionFormProps {
  onSubmit?: (val: string) => void
}

export const PromotionForm = ({ onSubmit }: PromotionFormProps) => {
  const { onChange, value } = useInputText()

  return (
    <form
      onSubmit={(e) => {
        if (!value) return
        e.preventDefault()
        onSubmit?.(value)
      }}
      className="flex items-center h-[44px] promotion-form"
    >
      <div className="mr-16 flex rounded-[8px] overflow-hidden flex-1">
        <span className="flex-center bg-blue-10 p-12">
          <CouponIcon className="w-[20px] h-[20px]" />
        </span>
        <input
          value={value}
          onChange={onChange}
          type="text"
          className="form-input h-full flex-1 rounded-tl-0"
          placeholder="Nhập mã khuyến mãi"
        />
      </div>

      <button
        onClick={() => onSubmit?.(value)}
        className={`btn-primary px-24 py-10 text-14 ${!value ? "btn-disabled" : ""}`}
      >
        Áp dụng
      </button>
    </form>
  )
}
