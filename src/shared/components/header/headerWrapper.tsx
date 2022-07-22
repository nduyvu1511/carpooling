import { useScrollTop } from "@/hooks"
import { ReactNode } from "react"

const HeaderWrapper = ({ children, size = 80 }: { children: ReactNode; size?: number }) => {
  const height = useScrollTop()

  return (
    <header
      className={`h-[${size}px] sticky top-0 flex items-center bg-white-color z-[1000] ${
        height > size ? "shadow-md" : ""
      }`}
    >
      {children}
    </header>
  )
}

export { HeaderWrapper }
