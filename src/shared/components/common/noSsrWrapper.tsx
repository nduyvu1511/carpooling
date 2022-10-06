import { LayoutProps } from "@/models"
import dynamic from "next/dynamic"

const NoSSRWrapper_ = ({ children }: LayoutProps) => {
  return <>{children}</>
}

export const NoSSRWrapper = dynamic(() => Promise.resolve(NoSSRWrapper_), {
  ssr: false,
})
