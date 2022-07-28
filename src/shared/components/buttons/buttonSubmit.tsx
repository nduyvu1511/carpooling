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
      className={`w-full ${
        view === "modal"
          ? "absolute left-[0] bottom-[0] right-[0] p-12 bg-white-color"
          : "fixed bottom-0 right-0 left-0 bg-white-color p-12 md:static md:p-0"
      } ${parentClassName}`}
    >
      <button
        onClick={() => onClick && onClick()}
        type="submit"
        className={`btn-primary mx-auto md:mx-[unset] h-[40px] md:h-fit ${
          showMargin ? "" : ""
        } hover:border-none border-none hover:text-white-color ${
          isError ? "btn-disabled-clickable" : ""
        } ${disabled ? "btn-disabled" : ""} ${className} ${view === "modal" ? "mx-auto" : ""}`}
      >
        {title || "Xác nhận"}
      </button>
    </div>
  )
}
