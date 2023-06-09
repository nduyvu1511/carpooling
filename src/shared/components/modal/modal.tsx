import { ArrowLeft2Icon, CloseThickIcon } from "@/assets"
import { AnimatePresence, motion } from "framer-motion"
import { ReactNode, useMemo } from "react"
import ReactPortal from "./portal"

export interface ModalProps {
  heading: string
  onClose: Function
  children: ReactNode
  className?: string
  iconType?: "close" | "back"
  overLayClose?: boolean
  show: boolean | undefined
  headerNode?: ReactNode
  overFlowAuto?: boolean
  fullScreen?: boolean
  rightHeaderNode?: ReactNode
}

const Modal = ({
  heading,
  onClose,
  children,
  className = "",
  iconType = "close",
  overLayClose = false,
  show,
  headerNode = null,
  overFlowAuto = true,
  fullScreen = false,
  rightHeaderNode = null,
}: ModalProps) => {
  const zoomInVariants = useMemo(
    () => ({
      visible: {
        opacity: 1,
        transform: "scale(1)",
        transition: {
          when: "beforeChildren",
          duration: 0.2,
          delayChildren: 0.2,
        },
      },
      hidden: {
        opacity: 0,
        transform: "scale(0.9)",
        transition: {
          when: "afterChildren",
          duration: 0.2,
        },
      },
    }),
    []
  )

  const fadeInVariants = useMemo(
    () => ({
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          duration: 0.3,
          delayChildren: 0.3,
        },
      },
      hidden: {
        opacity: 0,
        transition: {
          when: "afterChildren",
          duration: 0.3,
        },
      },
    }),
    []
  )

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <AnimatePresence>
        {show && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeInVariants}
            className={`fixed z-[3000] inset-[0] bg-black-60 flex-center ${
              overLayClose ? "cursor-pointer" : ""
            }`}
          >
            <motion.div
              className={`modal flex flex-col w-screen h-full ${
                fullScreen ? "" : "sm:max-w-[610px] sm:max-h-[650px] sm:rounded-[30px]"
              } overflow-hidden bg-white-color ${className}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={zoomInVariants}
            >
              <div className="h-[56px] border-b border-solid border-gray-color-1 w-full flex px-16 md:px-24 items-center">
                <span onClick={() => onClose()} className="w-[30px] cursor-pointer">
                  {iconType === "close" ? (
                    <CloseThickIcon className="text-blue-8 w-[14px] h-[14px]" />
                  ) : (
                    <ArrowLeft2Icon className="text-blue-8 w-[20px] h-[16px]" />
                  )}
                </span>

                <div className="flex-1">
                  <p className="text-16 font-semibold leading-20 text-center text-blue-8 line-clamp-1">
                    {heading}
                  </p>
                </div>

                {rightHeaderNode || <span className="w-[30px]"></span>}
              </div>
              {headerNode}
              <div
                className={`modal-body flex-1 flex flex-col ${
                  overFlowAuto ? "overflow-y-auto" : ""
                }`}
              >
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ReactPortal>
  )
}

export { Modal }
