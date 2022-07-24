import { ArrowDownIcon } from "@/assets"
import { ReactNode } from "react"

interface AccordionItemProps {
  isActive?: boolean
  children: ReactNode
  onClick?: Function
  title: string
  maxHeight?: number
  titleClassName?: string
}

const AccordionItem = ({
  isActive,
  children,
  onClick,
  title,
  maxHeight = 1000,
  titleClassName = "",
}: AccordionItemProps) => {
  return (
    <div>
      <div
        onClick={() => onClick?.()}
        className="flex items-center justify-between p-24 bg-[#F1F5FF] cursor-pointer border-b border-solid border-border-color"
      >
        <h3 className={`h3 text-primary ${titleClassName}`}>{title}</h3>
        <span
          className={`tranform transition-all duration-300 ${isActive ? "rotate-[180deg]" : ""}`}
        >
          <ArrowDownIcon className="w-[20px] h-[20px]" />
        </span>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${isActive ? "my-24" : "m0"}`}>
        <div
          style={{ maxHeight: isActive ? maxHeight : 0 }}
          className={`transition-all duration-300 px-24 overflow-hidden`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export { AccordionItem }

