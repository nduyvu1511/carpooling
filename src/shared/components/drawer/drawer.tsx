import { CloseIcon } from "@/assets"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef } from "react"
import { CSSTransition } from "react-transition-group"

interface DrawerProps {
  onClose?: Function
  isShow: boolean
}

const Drawer = ({ onClose, isShow }: DrawerProps) => {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className={`fixed z-[2000] inset-0 ${isShow ? "opacity-100 visible" : "invisible opacity-0"}`}
    >
      <CSSTransition in={isShow} classNames="drawer" timeout={300}>
        <div
          className={`absolute z-10 max-w-[300px] w-screen top-0 bottom-0 right-0 transform transition-all duration-300 bg-white-color`}
        >
          <div className="flex justify-end mt-[10px] mr-[10px]">
            <button onClick={() => onClose?.()} className="ml-auto">
              <CloseIcon className="w-[24px] h-[24px]" />
            </button>
          </div>

          <ul>
            {[
              ["Trang chủ", "/"],
              ["Về chúng tôi", "/about-us"],
              ["Hướng dẫn", "/guide"],
              ["Tin tức", "/news"],
            ].map(([label, path]) => (
              <li
                className={`px-24 py-[8px] text-sm ${
                  router.pathname === path ? "text-primary font-semibold" : ""
                }`}
                key={path}
              >
                <Link href={path}>
                  <a onClick={() => onClose?.()}>{label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </CSSTransition>

      <div
        onClick={() => onClose?.()}
        className={`absolute bg-black-60 inset-0 transition-all duration-300 ${
          isShow ? "visible opacity-100" : "invisible opacity-0"
        } `}
      ></div>
    </div>
  )
}

export { Drawer }
