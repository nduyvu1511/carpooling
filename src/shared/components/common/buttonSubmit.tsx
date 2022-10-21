interface ButtonSubmitProps {
  title?: string
  onClick?: Function
  isError?: boolean
  className?: string
  view?: "modal" | "page"
  disabled?: boolean
  showMargin?: boolean
  parentClassName?: string
}

export const ButtonSubmit = ({
  onClick,
  isError,
  title,
  className = "",
  view,
  disabled = false,
  showMargin = true,
  parentClassName = "",
}: ButtonSubmitProps) => {
  return (
    <div
      className={`w-full p-12 sm:p-[16px] ${
        view === "modal"
          ? "absolute left-[0] bottom-[0] right-[0] bg-white-color flex-center"
          : "fixed z-[1000] bottom-0 right-0 left-0 bg-white-color md:static md:p-0"
      } btn-submit ${parentClassName} z-[100]`}
    >
      <button
        onClick={() => !disabled && onClick?.()}
        type="submit"
        className={`btn-primary mx-auto md:mx-[unset] h-[48px] ${
          showMargin ? "" : ""
        } hover:border-none border-none hover:text-white-color ${
          isError ? "btn-disabled-clickable" : ""
        } ${disabled ? "btn-disabled" : ""} ${className}`}
      >
        {title || "Xác nhận"}
      </button>
    </div>
  )
}
