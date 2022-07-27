import { useRouter } from "next/router"
import { ReactNode } from "react"
import { CSSTransition } from "react-transition-group"

interface DrawerProps {
  isShow: boolean
  children: ReactNode
  onClose?: Function
}

const Drawer = ({ children, isShow, onClose }: DrawerProps) => {
  const router = useRouter()

  return (
    <>
      <CSSTransition in={isShow} classNames="slide" unmountOnExit timeout={300}>
        <div className="fixed flex flex-col z-[1001] inset-0 bg-white-color">{children}</div>
      </CSSTransition>

      <CSSTransition in={isShow} classNames="fade" unmountOnExit timeout={300}>
        <div
          onClick={() => onClose?.()}
          className={`fixed z-[1000] bg-black-60 inset-0 transition-all duration-300 ${
            isShow ? "visible opacity-100" : "invisible opacity-0"
          } `}
        ></div>
      </CSSTransition>
    </>
  )
}

export { Drawer }
