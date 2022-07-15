import { useScrollTop } from "@/hooks"
import { ReactNode } from "react"

const HeaderWrapper = ({ children }: { children: ReactNode }) => {
  const height = useScrollTop()

  return (
    <header
      className={`px-24 h-[80px] sticky top-0 flex items-center bg-white-color z-[1000] ${
        height > 80 ? "shadow-md" : ""
      }`}
    >
      {children}
    </header>
  )
}

export { HeaderWrapper }
