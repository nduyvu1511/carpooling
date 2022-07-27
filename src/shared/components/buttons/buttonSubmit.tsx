interface ButtonSubmitProps {
  title?: string
  onClick?: Function
  isError?: boolean
  className?: string
  view?: "modal" | "page"
  disabled?: boolean
  showMargin?: boolean
}

export const ButtonSubmit = ({
  onClick,
  isError,
  title,
  className = "",
  view,
  disabled = false,
  showMargin = true,
}: ButtonSubmitProps) => {
  return (
    <div
      className={`flex-center w-full ${
        view === "modal" ? "absolute left-[0] bottom-[0] right-[0] py-[16px] bg-white-color" : ""
      }`}
    >
      <button
        onClick={() => onClick && onClick()}
        type="submit"
        className={`${
          showMargin ? "mx-[16px]" : ""
        } btn-primary hover:border-none border-none hover:text-white-color ${
          isError ? "btn-disabled-clickable" : ""
        } ${disabled ? "btn-disabled" : ""} ${className} `}
      >
        {title || "Xác nhận"}
      </button>
    </div>
  )
}
