import React from "react"

interface ToolTipProps {
  title: string
  className?: string
}

const Tooltip = ({ title, className = "" }: ToolTipProps) => {
  return (
    <span
      className={`px-[12px] py-[8px] bg-white rounded-[6px] border border-solid border-border-color
     whitespace-nowrap before block-element absolute-horizontal top-[calc(100%+10px)] text-sm text-[13px] ${className}`}
    >
      {title}
    </span>
  )
}

export { Tooltip }
