import React, { ReactNode } from "react"

interface HomeSectionProps {
  children: ReactNode
  title?: string
  showBg?: boolean
}

export const HomeSection = ({ children, title, showBg = false }: HomeSectionProps) => {
  return (
    <div className={`mt-[64px] md:mt-[80px] lg:mt-[120px] ${showBg ? "bg-bg-primary" : ""}`}>
      <div className="container py-0">
        {title ? (
          <h1 className="h1 text-primary text-center mb-[32px] md:mb-[40px] lg:mb-[80px]">
            {title}
          </h1>
        ) : null}
        {children}
      </div>
    </div>
  )
}
