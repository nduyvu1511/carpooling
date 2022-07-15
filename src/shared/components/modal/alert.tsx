import { CheckCircleIcon, ErrorCircleIcon, WarningIcon } from "@/assets"
import { ReactNode } from "react"

interface AlertProps {
  onClose: Function
  desc: string
  className?: string
  type?: "warning" | "error" | "success" | "info"
  onConfirm: Function
  leftBtnLabel?: string
  rightBtnLabel?: string
  showLeftBtn?: boolean
  children?: ReactNode
  disabledBtn?: boolean
}

const Alert = ({
  onClose,
  desc,
  className = "",
  type = "success",
  onConfirm,
  leftBtnLabel = "Quay lại",
  rightBtnLabel = "Xác nhận",
  showLeftBtn = true,
  children,
  disabledBtn = false,
}: AlertProps) => {
  return (
    <div className="fixed inset-[0] z-[4000]">
      <div
        className={`flex flex-col max-h-[666px] ${
          !children ? "sm:max-w-[448px]" : "sm:max-w-modal-width"
        } w-full absolute-center overflow-hidden bg-white-color sm:rounded-[30px] px-[40px] z-10 ${className}`}
      >
        <div className="flex-1 flex-center flex-col mb-[40px]">
          {type == "error" ? (
            <ErrorCircleIcon className="w-[80px] h-[80px] my-[40px]" />
          ) : type === "success" ? (
            <CheckCircleIcon className="w-[80px] h-[80px] my-[40px]" />
          ) : type === "info" ? (
            <WarningIcon color="#007BFF" className="w-[80px] h-[80px] my-[40px]" />
          ) : (
            <WarningIcon className="w-[80px] h-[80px] my-[40px]" />
          )}
          <p className="line-clamp-3 text-16 font-medium leading-26 text-center">{desc}</p>
        </div>

        {children ? <div className="mb-[40px] overflow-auto scrollbar-hide">{children}</div> : null}

        <div className="flex-center mb-[40px]">
          {showLeftBtn ? (
            <button
              onClick={() => onClose()}
              className="btn px-[26px] py-[8px] mr-[20px] bg-disabled"
            >
              {leftBtnLabel}
            </button>
          ) : null}
          <button
            onClick={() => onConfirm()}
            className={`btn px-[26px] py-[8px] bg-gray-color-1 text-white-color ${
              type === "success"
                ? "bg-success"
                : type === "warning"
                ? "bg-warning"
                : type === "info"
                ? "bg-info"
                : "bg-error"
            } ${disabledBtn ? "btn-disabled" : ""}`}
          >
            {rightBtnLabel}
          </button>
        </div>
      </div>

      <div className={`absolute inset-[0] bg-black-60`}></div>
    </div>
  )
}

export { Alert }

