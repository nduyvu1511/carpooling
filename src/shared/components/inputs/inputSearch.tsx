import { SearchIcon } from "@/assets"
import { useDebounce, useInputText } from "@/hooks"
import { InputHTMLAttributes, useEffect } from "react"

interface InputSearchProps {
  attributes: InputHTMLAttributes<HTMLInputElement>
  onChange?: (val: string) => void
  className?: string
}

export const InputSearch = ({
  onChange: onChangeProps,
  className = "",
  ...attributes
}: InputSearchProps) => {
  const { onChange, value } = useInputText("")
  const searchTerms = useDebounce(value, 400)

  useEffect(() => {
    if (!searchTerms) return
    onChangeProps?.(searchTerms)
  }, [searchTerms])

  return (
    <div className="relative lg:w-[376px]">
      <SearchIcon className="absolute-vertical left-[13px] w-[14px] text-gray-color-4" />
      <input
        className={`pl-[44px] pr-[20px] h-[32px] outline-none text-12 leading-[16px] font-normal placeholder:text-gray-color-2 text-gray-color-4 w-full rounded-[20px] border border-solid border-gray-color-2 ${className}`}
        value={value}
        onChange={onChange}
        {...attributes.attributes}
        type="text"
      />
    </div>
  )
}
