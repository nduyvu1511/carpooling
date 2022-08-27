import React, { ReactNode } from "react"

interface HomeSectionProps {
  children: ReactNode
  title?: string
  showBg?: boolean
}

export const HomeSection = ({ children, title, showBg = false }: HomeSectionProps) => {
  return (
    <div className={`mt-[64px] md:mt-[100px] lg:mt-[160px] ${showBg ? "bg-bg-primary" : ""}`}>
      <div className="container">
        {title ? <h1 className="h1 text-primary text-center">{title}</h1> : null}
        <div className="mt-[32px] md:mt-[40px] lg:mt-[80px]">{children}</div>
      </div>
    </div>
  )
}
