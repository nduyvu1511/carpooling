import { CheckCircleIcon, ErrorCircleIcon, WarningIcon } from "@/assets"
import { ReactNode } from "react"
import { CSSTransition } from "react-transition-group"

interface AlertProps {
  onClose?: Function
  desc: string
  className?: string
  type?: "warning" | "error" | "success" | "info"
  onConfirm: Function
  leftBtnLabel?: string
  rightBtnLabel?: string
  showLeftBtn?: boolean
  children?: ReactNode
  disabledBtn?: boolean
  show: boolean | undefined
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
  show,
}: AlertProps) => {
  return (
    <>
      <CSSTransition in={show} classNames="modal-down" unmountOnExit timeout={300}>
        <div
          className={`flex flex-col max-h-[666px] ${
            !children ? "max-w-[350px] sm:max-w-[448px]" : "sm:max-w-modal-width"
          } w-full fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[4000] overflow-hidden bg-white-color rounded-[20px] sm:rounded-[30px] px-24 sm:px-[40px] ${className}`}
        >
          <div className="flex-1 flex-center flex-col mb-24 flex-center sm:mb-[40px]">
            {type == "error" ? (
              <ErrorCircleIcon className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] my-24 sm:my-[40px]" />
            ) : type === "success" ? (
              <CheckCircleIcon className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] my-24 sm:my-[40px]" />
            ) : type === "info" ? (
              <WarningIcon
                color="#007BFF"
                className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] my-24 sm:my-[40px]"
              />
            ) : (
              <WarningIcon className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] my-24 sm:my-[40px]" />
            )}
            <p className="text-sm sm:text-base line-clamp-4 text-center">{desc}</p>
          </div>

          {children ? (
            <div className="mb-[40px] overflow-auto scrollbar-hide">{children}</div>
          ) : null}

          <div className="flex-center mb-24 sm:mb-[40px]">
            {showLeftBtn ? (
              <button
                onClick={() => onClose?.()}
                className="btn px-[26px] py-[8px] mr-[16px] sm:mr-24 bg-disabled"
              >
                {leftBtnLabel}
              </button>
            ) : null}
            <button
              onClick={() => onConfirm()}
              className={`btn px-[26px] py-[8px] text-white-color ${
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
      </CSSTransition>

      <CSSTransition in={show} classNames="fade" timeout={300} unmountOnExit>
        <div className={`fixed z-[3999] inset-[0] bg-black-60`}></div>
      </CSSTransition>
    </>
  )
}

export { Alert }
