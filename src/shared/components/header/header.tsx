import { LogoIcon, MenuIcon, PhoneIcon, UserCircleIcon } from "@/assets"
import { AuthModal, Drawer, HeaderWrapper } from "@/components"
import { RootState } from "@/core/store"
import { PHONE, toggleBodyOverflow } from "@/helper"
import { useBackRouter, useClickOutside } from "@/hooks"
import { setAuthModalType } from "@/modules"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Menu } from "../menu"

export const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const menuRef = useRef<HTMLDivElement>(null)
  const authModalType = useSelector((state: RootState) => state.common.authModalType)

  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showDrawer, setShowDrawer] = useState<boolean>(false)

  useClickOutside([menuRef], () => {
    setShowMenu(false)
  })

  useBackRouter({
    cb: () => {
      setShowMenu(false)
      setShowDrawer(false)
      toggleBodyOverflow("unset")
    },
  })

  const toggleShowDrawer = (status: boolean) => {
    setShowDrawer(status)
    if (status) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  return (
    <>
      <HeaderWrapper>
        <section className="w-full">
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="my-auto">
                <Link href="/">
                  <a className="cursor-pointer">
                    <LogoIcon />
                  </a>
                </Link>
              </div>

              <div className="flex-1 justify-center hidden md:flex">
                <ul className="flex items-center">
                  {[
                    ["Về chúng tôi", "/about-us"],
                    ["Hướng dẫn", "/guide"],
                    ["Tin tức", "/news"],
                    ["Ưu đãi", "/promotion"],
                    ["Liên hệ", "/contact"],
                  ].map(([label, path]) => (
                    <li
                      className={`mr-[40px] nav-link-hover last:mr-0 ${
                        path === "/" ? "hidden lg:block" : ""
                      } ${
                        path === router.pathname
                          ? "border-b border-gray-color-4 border-solid hover:before:w-0"
                          : ""
                      }`}
                      key={path}
                    >
                      <Link href={path}>
                        <a className="font-semibold text-16 leading-[20px]">{label}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center">
                <div ref={menuRef} className="relative block xl:hidden">
                  <button onClick={() => setShowMenu(true)}>
                    <UserCircleIcon className="w-[26px] h-[26px] hidden sm:block sm:w-[33px] xl:hidden sm:h-[33px]" />
                  </button>

                  {showMenu ? (
                    <div className="absolute right-0 top-[calc(100%+10px)] p-8 block-element border border-solid border-border-color">
                      <button
                        onClick={() => {
                          dispatch(setAuthModalType("login"))
                          setShowMenu(false)
                        }}
                        className="btn bg-primary rounded-[5px] whitespace-nowrap mb-[12px]"
                      >
                        Đăng nhập
                      </button>
                      <button
                        onClick={() => {
                          dispatch(setAuthModalType("register"))
                          setShowMenu(false)
                        }}
                        className="btn text-text-color rounded-[5px] whitespace-nowrap"
                      >
                        Đăng ký
                      </button>
                    </div>
                  ) : null}
                </div>

                <button onClick={() => toggleShowDrawer(true)} className="ml-24 block md:hidden">
                  <MenuIcon />
                </button>

                <div className="mr-16 items-center hidden xl:flex">
                  <PhoneIcon className="mr-8 w-[15px] h-[15px]" />
                  <a className="text-base font-semibold text-primary" href={`tel:${PHONE}`}>
                    0847 878 788
                  </a>
                </div>

                <button
                  onClick={() => dispatch(setAuthModalType("login"))}
                  className="btn-primary mr-16 leading-[22px] px-[28px] py-[11px] hidden xl:block"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => dispatch(setAuthModalType("register"))}
                  className="btn-primary-outline leading-[22px] px-[28px] py-[11px] hidden xl:block"
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </section>
      </HeaderWrapper>

      <Drawer
        width={420}
        showCloseBtn={false}
        onClose={() => toggleShowDrawer(false)}
        isShow={showDrawer}
        transitionDirection="right"
      >
        <Menu
          onClickLogin={() => {
            dispatch(setAuthModalType("login"))
            toggleShowDrawer(false)
          }}
          onClickRegister={() => {
            dispatch(setAuthModalType("register"))
            toggleShowDrawer(false)
          }}
          onClose={() => toggleShowDrawer(false)}
        />
      </Drawer>

      <AuthModal show={authModalType} />
    </>
  )
}
