import { LogoIcon } from "@/assets"
import { setAuthModalType } from "@/modules"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { HeaderWrapper } from ".."

export const Header = () => {
  const dispatch = useDispatch()

  return (
    <HeaderWrapper>
      <section className="w-full">
        <div className="container">
          <div className="flex items-center">
            <div className="">
              <LogoIcon />
            </div>
            <div className="flex-1 flex justify-center">
              <ul className="flex items-center">
                {[
                  ["Về chúng tôi", "/ve-chung-toi"],
                  ["Hướng dẫn", "/huong-dan"],
                  // ["Ưu đãi", "/uu-dai"],
                  ["Tin tức", "/tin-tuc"],
                ].map(([label, path]) => (
                  <li className="mr-[40px] last:mr-0" key={path}>
                    <Link href={path}>
                      <a className="font-semibold text-[16px] leading-[20px]">{label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center">
              <button
                onClick={() => dispatch(setAuthModalType("login"))}
                className="btn-primary mr-[24px] px-[35px] py-[11px]"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => dispatch(setAuthModalType("register"))}
                className="btn-primary-outline px-[35px] py-[11px]"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </section>
    </HeaderWrapper>
  )
}
