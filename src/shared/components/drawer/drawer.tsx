import { CloseIcon } from "@/assets"
import { ReactNode } from "react"
import { CSSTransition } from "react-transition-group"

interface DrawerProps {
  isShow: boolean
  children: ReactNode
  onClose?: Function
  showCloseBtn?: boolean
  width?: number
  direction?: "left" | "bottom" | "right" | "top"
  headerChild?: ReactNode
}

const Drawer = ({
  children,
  isShow,
  onClose,
  showCloseBtn = true,
  width = 236,
  direction = "right",
  headerChild = null,
}: DrawerProps) => {
  return (
    <>
      <CSSTransition in={isShow} classNames="slide" unmountOnExit timeout={300}>
        <div
          style={{ maxWidth: width, width: "100%" }}
          className={`fixed flex flex-col z-[1001] bg-white-color ${
            direction === "right"
              ? "bottom-0 top-0 right-0"
              : direction === "left"
              ? "bottom-0 top-0 left-0"
              : direction === "bottom"
              ? "bottom-0 left-0 right-0"
              : "top-0 left-0 right-0"
          }`}
        >
          {headerChild || showCloseBtn ? (
            <div className="flex items-center justify-between p-12">
              <div className="flex-1 mr-[16px]">{headerChild}</div>

              {showCloseBtn ? (
                <button onClick={() => onClose?.()} className="ml-auto right-0 top-0">
                  <CloseIcon />
                </button>
              ) : null}
            </div>
          ) : null}

          <div className="flex-1 flex flex-col">{children}</div>
        </div>
      </CSSTransition>

      <CSSTransition in={isShow} classNames="fade" unmountOnExit timeout={300}>
        <div
          onClick={() => onClose?.()}
          className={`fixed cursor-pointer z-[1000] bg-black-60 inset-0 transition-all duration-300 ${
            isShow ? "visible opacity-100" : "invisible opacity-0"
          } `}
        ></div>
      </CSSTransition>
    </>
  )
}

export { Drawer }
