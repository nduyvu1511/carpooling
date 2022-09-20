import { CloseThickIcon, CouponIcon } from "@/assets"
import { useDebounce, useInputText } from "@/hooks"
import { useEffect, useRef } from "react"

interface PromotionFormProps {
  onSubmit?: (val: string) => void
  onFocus?: Function
  className?: string
  promotionCode?: string
  onCancelPromotion?: Function
  onChange?: (val: string) => void
  readonly?: boolean
  disabled?: boolean
}

export const PromotionForm = ({
  onSubmit,
  onFocus,
  className = "",
  promotionCode,
  onCancelPromotion,
  onChange: onChangeProps,
  readonly = false,
  disabled,
}: PromotionFormProps) => {
  const secondRef = useRef<boolean>(false)
  const { onChange, value, clearValue } = useInputText("")
  const searchTerm = useDebounce(value, 500)

  useEffect(() => {
    if (secondRef.current === false) {
      secondRef.current = true
      return
    }
    onChangeProps?.(searchTerm)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  return (
    <form
      onSubmit={(e) => {
        if (disabled) return
        if (!value) return
        e.preventDefault()
        onSubmit?.(value)
      }}
      className={`flex items-center h-[44px] promotion-form ${className} ${
        disabled ? "pointer-events-none" : ""
      }`}
    >
      <div className="flex flex-1 relative">
        <span className="flex-center bg-blue-10 p-12 rounded-tl-[8px] rounded-bl-[8px]">
          <CouponIcon className="w-[20px] h-[20px] text-primary" />
        </span>
        <input
          style={{ userSelect: readonly ? "none" : "auto" }}
          readOnly={readonly}
          onFocus={() => onFocus?.()}
          value={promotionCode || value}
          onChange={onChange}
          type="text"
          className="form-input h-full flex-1 rounded-tl-0 pr-[40px] rounded-tr-[8px] rounded-br-[8px]"
          placeholder="Tìm kiếm khuyến mãi"
        />
        {promotionCode || value ? (
          <span
            onClick={() => {
              if (disabled) return
              if (promotionCode) {
                onCancelPromotion?.()
              }
              clearValue()
            }}
            className="p-4 absolute-vertical right-10 z-10 cursor-pointer"
          >
            <CloseThickIcon className="w-[9px] h-[9px]" />
          </span>
        ) : null}
      </div>

      {/* {onSubmit ? (
        <button
          onClick={() => onSubmit?.(value)}
          className={`text-14 font-semibold px-12 py-6 text-primary sm:btn-primary sm:ml-16 w-fit sm:px-24 sm:py-10 ${
            !value ? "pointer-events-none opacity-30" : ""
          }`}
        >
          Áp dụng
        </button>
      ) : null} */}
    </form>
  )
}
