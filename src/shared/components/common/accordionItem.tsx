import { ArrowDownIcon } from "@/assets"
import { ReactNode } from "react"

interface AccordionItemProps {
  isActive?: boolean
  children: ReactNode
  onClick?: Function
  title: string
  maxHeight?: number
  titleClassName?: string
  className?: string
  allowTransition?: boolean
  showBg?: boolean
}

const AccordionItem = ({
  isActive,
  children,
  onClick,
  title,
  maxHeight = 10000,
  titleClassName = "",
  className = "",
  allowTransition = true,
  showBg = true,
}: AccordionItemProps) => {
  return (
    <div>
      <div
        onClick={() => onClick?.()}
        className={`accordion-item flex items-center justify-between p-custom ${
          isActive ? "bg-gray-05 shadow-shadow-1" : `${showBg ? "bg-gray-05" : "bg-white-color"}`
        } cursor-pointer border-t border-solid border-border-color ${className}`}
      >
        <h3
          className={`flex-1 mr-12 select-none ${
            titleClassName
              ? titleClassName
              : "text-[18px] md:text-[20px] lg:text-[28px] font-medium text-primary"
          }`}
        >
          {title}
        </h3>
        <span
          className={`tranform ${allowTransition ? "transition-all duration-300" : ""} ${
            isActive ? "rotate-[180deg]" : ""
          }`}
        >
          <ArrowDownIcon className="w-[10px] sm:w-[20px]" />
        </span>
      </div>
      <div
        className={`overflow-hidden ${allowTransition ? "transition-all duration-300" : ""} ${
          isActive ? "my-12 md:my-16 lg:my-24" : "my-0"
        }`}
      >
        <div
          style={{ maxHeight: isActive ? maxHeight : 0 }}
          className={`${
            allowTransition ? "transition-all duration-300" : ""
          } px-custom overflow-hidden`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export { AccordionItem }
