import { LogoIcon, MenuIcon, UserCircleIcon } from "@/assets"
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

  return (
    <>
      <HeaderWrapper>
        <section className="w-full">
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="my-auto">
                <Link href="/" passHref>
                  <a className="cursor-pointer">
                    <LogoIcon className="h-[40px] w-[72px] lg:h-[50px] lg:w-[90px]" />
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
                <div ref={menuRef} className="relative block lg:hidden">
                  {/* <button onClick={() => setShowMenu(true)}>
                    <UserCircleIcon className="w-[26px] h-[26px] sm:w-[33px] sm:h-[33px]" />
                  </button> */}

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

                <button
                  onClick={() => {
                    toggleBodyOverflow("hidden")
                    setShowDrawer(true)
                  }}
                  className="ml-24 block sm:hidden"
                >
                  <MenuIcon />
                </button>

                <button
                  onClick={() => dispatch(setAuthModalType("login"))}
                  className="btn-primary mr-[24px] px-[35px] py-[11px] hidden lg:block"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => dispatch(setAuthModalType("register"))}
                  className="btn-primary-outline px-[35px] py-[11px] hidden lg:block"
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </section>
      </HeaderWrapper>

      <Drawer
        width={414}
        showCloseBtn={false}
        onClose={() => {
          setShowDrawer(false)
          toggleBodyOverflow("hidden")
        }}
        isShow={showDrawer}
      >
        <Menu
          onClickLogin={() => {
            dispatch(setAuthModalType("login"))
            setShowDrawer(false)
          }}
          onClickRegister={() => {
            dispatch(setAuthModalType("register"))
            setShowDrawer(false)
          }}
          onClose={() => {
            toggleBodyOverflow("unset")
            setShowDrawer(false)
          }}
        />
      </Drawer>
    </>
  )
}
