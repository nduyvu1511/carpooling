import Link from "next/link"
import React from "react"
import { InputCheckbox } from "./inputCheckbox"

interface InputPolicyProps {
  isError?: boolean
  onChange: () => void
  value?: boolean
  onBlur: any
}

const InputPolicy = ({ onBlur, onChange, isError, value }: InputPolicyProps) => {
  return (
    <div className={`flex cursor-default items-center ${isError ? "" : ""}`}>
      <p className="mr-[12px]">
        <InputCheckbox
          className={`${isError ? "border-error" : ""}`}
          size={20}
          isChecked={!!value}
          onCheck={() => {
            onChange()
            onBlur()
          }}
          type="circle"
        />
      </p>
      <span
        className={`text-[13px] leading-[18px] select-none flex-1 ${isError ? "text-error" : ""}`}
        onClick={() => {
          onChange()
          onBlur()
        }}
      >
        Tôi đã đồng ý với Exxe về{" "}
        <Link href="/terms-&-conditions">
          <a target="_blank" className={`${isError ? "text-error" : "text-active"}`}>
            Điều khoản dịch vụ
          </a>
        </Link>{" "}
        &{" "}
        <Link href="/terms-&-conditions">
          <a rel="noreferrer noopener" className={`${isError ? "text-error" : "text-active"}`}>
            Chính sách bảo mật.
          </a>
        </Link>
      </span>
    </div>
  )
}

export { InputPolicy }
