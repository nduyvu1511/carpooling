import { useRouter } from "next/router"
import { ReactNode } from "react"

interface ScreenContainerProps {
  children: ReactNode
  heading: string
  onBackBtnClick?: Function
  rightHeaderElement?: ReactNode
}

export const ScreenContainer = ({
  children,
  heading,
  onBackBtnClick,
  rightHeaderElement,
}: ScreenContainerProps) => {
  const router = useRouter()

  return <section className="content-container"></section>
}
