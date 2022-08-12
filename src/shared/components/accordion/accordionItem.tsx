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
}

const AccordionItem = ({
  isActive,
  children,
  onClick,
  title,
  maxHeight = 10000,
  titleClassName = "",
  className = "",
}: AccordionItemProps) => {
  return (
    <div>
      <div
        onClick={() => onClick?.()}
        className={`flex items-center justify-between p-12 md:p-24 ${
          isActive ? "bg-[#F1F5FF]" : "bg-white-color"
        } cursor-pointer border-b border-solid border-border-color ${className}`}
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
          className={`tranform transition-all duration-300 ${isActive ? "rotate-[180deg]" : ""}`}
        >
          <ArrowDownIcon className="w-[10px] sm:w-[20px]" />
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isActive ? "my-12 md:my-24" : "m0"
        }`}
      >
        <div
          style={{ maxHeight: isActive ? maxHeight : 0 }}
          className={`transition-all duration-300 px-12 md:px-24 overflow-hidden`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export { AccordionItem }
