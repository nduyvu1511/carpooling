import { CloseIcon, MailIcon, PhoneIcon } from "@/assets"
import { useRouter } from "next/router"

interface MenuProps {
  onClickLogin?: Function
  onClickRegister?: Function
  onClose?: Function
}

export const Menu = ({ onClose, onClickLogin, onClickRegister }: MenuProps) => {
  const router = useRouter()

  return (
    <div className={`flex-1 flex flex-col justify-between bg-bg-primary`}>
      <div className="flex justify-end mt-[10px] mr-[10px]">
        <button onClick={() => onClose?.()} className="ml-auto">
          <CloseIcon className="w-[26px] h-[26px]" />
        </button>
      </div>

      <ul className="flex-1 flex flex-col items-center mt-[40px]">
        {[
          ["Đăng nhập", "login"],
          ["Đăng ký", "register"],
          ["Trang chủ", "/"],
          ["Về chúng tôi", "/about-us"],
          ["Hướng dẫn", "/guide"],
          ["Tin tức", "/news"],
        ].map(([label, path]) => (
          <li className={`px-24 mb-[32px] last:mb-0 text-14`} key={path}>
            <button
              className=""
              onClick={() => {
                if (path === "login") {
                  onClickLogin?.()
                } else if (path === "register") {
                  onClickRegister?.()
                } else {
                  router.push(path)
                  onClose?.()
                }
              }}
            >
              <span
                className={`text-base ${
                  router.pathname === path ? "text-primary font-semibold" : "font-semibold"
                }`}
              >
                {label}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mb-[40px] flex-col flex-center text-sm font-semibold text-primary">
        <p className="flex items-center mb-[16px]">
          <PhoneIcon className="text-[14px] mr-[10px]" />
          <a href="tel:0123456789">0123456789</a>
        </p>
        <p className="flex items-center">
          <MailIcon className="text-[14px] mr-[10px]" />
          <a href="mailto:exxevn2022@gmail.com">exxevn2022@gmail.com</a>
        </p>
      </div>
    </div>
  )
}
