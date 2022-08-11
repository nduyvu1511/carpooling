import { LogoIcon, MenuIcon, PhoneIcon, UserCircleIcon } from "@/assets"
import { Drawer, HeaderWrapper } from "@/components"
import { toggleBodyOverflow } from "@/helper"
import { useBackRouter, useClickOutside } from "@/hooks"
import { setAuthModalType } from "@/modules"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Menu } from "../menu"

export const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const menuRef = useRef<HTMLDivElement>(null)
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
                <Link href="/" passHref>
                  <a className="cursor-pointer">
                    <LogoIcon />
                  </a>
                </Link>
              </div>

              <div className="flex-1 justify-center hidden sm:flex">
                <ul className="flex items-center">
                  {[
                    ["Trang chủ", "/"],
                    ["Về chúng tôi", "/about-us"],
                    ["Hướng dẫn", "/guide"],
                    ["Tin tức", "/news"],
                    ["Liên hệ", "/contact"],
                  ].map(([label, path]) => (
                    <li
                      className={`mr-[40px] last:mr-0 ${path === "/" ? "hidden lg:block" : ""} ${
                        path === router.pathname ? "text-primary" : ""
                      }`}
                      key={path}
                    >
                      <Link href={path}>
                        <a
                          className={`font-semibold text-[16px] leading-[20px] ${
                            path === router.pathname ? "text-primary" : ""
                          }`}
                        >
                          {label}
                        </a>
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

                <button onClick={() => toggleShowDrawer(true)} className="ml-24 block sm:hidden">
                  <MenuIcon />
                </button>

                <div className="mr-[16px] items-center hidden xl:flex">
                  <PhoneIcon className="mr-8 w-[15px]" />
                  <a className="text-base font-semibold text-primary" href="tel:1900998880">
                    1900 998 880
                  </a>
                </div>

                <button
                  onClick={() => dispatch(setAuthModalType("login"))}
                  className="btn-primary mr-[16px] leading-[22px] px-[28px] py-[11px] hidden xl:block"
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
        width={400}
        showCloseBtn={false}
        onClose={() => toggleShowDrawer(false)}
        isShow={showDrawer}
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
    </>
  )
}
