import { useScrollTop } from "@/hooks"
import { ReactNode } from "react"

const HeaderWrapper = ({
  children,
  size = 80,
  className = "",
}: {
  children: ReactNode
  size?: number
  className?: string
}) => {
  const height = useScrollTop()

  return (
    <header
      className={`h-[60px] md:h-[80px] sticky top-0 flex items-center bg-white-color z-[1000] ${
        height > 24 ? "shadow-md" : ""
      } ${className}`}
    >
      {children}
    </header>
  )
}

export { HeaderWrapper }
