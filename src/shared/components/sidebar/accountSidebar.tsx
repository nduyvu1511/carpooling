import { SignoutIcon } from "@/assets"
import { toggleBodyOverflow, toImageUrl } from "@/helper"
import { useAuth } from "@/hooks"
import { SidebarItem } from "@/models"
import Image from "next/image"
import { useRouter } from "next/router"

interface AccountSidebarProps {
  navList: SidebarItem[]
  avatar: string
  name: string
  phone: string
  onClick?: Function
}

const AccountSidebar = ({ navList, avatar, name, phone, onClick }: AccountSidebarProps) => {
  const router = useRouter()
  const { logout } = useAuth()

  return (
    <div className="">
      <div className="flex items-center pb-[14px] mb-[14px] border-b border-solid border-border-color">
        <div className="relative w-[32px] h-[32px] overflow-hidden rounded-[50%] mr-[12px]">
          <Image src={toImageUrl(avatar)} layout="fill" alt="" objectFit="cover" />
        </div>
        <div className="flex-1">
          <p className="text-14 font-medium leading-26 mb-[4px] line-clamp-1 word-wrap-anywhere mr-[50px] md:mr-0">
            {name}
          </p>
          <p className="text-12 leading-16 line-clamp-1">{phone}</p>
        </div>
      </div>

      <ul className="">
        {navList.map(({ icon, label, path, child }, index) => (
          <li
            onClick={() => {
              onClick?.()
              router.push(path)
            }}
            className={`mb-4 ${child ? "relative" : ""} hover:bg-gray-color-1 rounded-[5px]`}
            key={index}
          >
            <div
              className={`flex items-center p-[10px] cursor-pointer ${
                path === router.pathname ? "bg-primary rounded-[5px] text-white-color" : ""
              }`}
            >
              <span className="text-24">{icon}</span>
              <span className={`text-14 ml-[12px] font-medium flex-1 line-clamp-1 leading-26`}>
                {label}
              </span>
            </div>
          </li>
        ))}

        <li
          className={`last:mb-0 mt-[12px] border-t px-12 border-solid border-border-color flex items-center`}
        >
          <SignoutIcon className="w-[20px] h-[20px] text-error" />
          <button
            onClick={() => {
              toggleBodyOverflow("unset")
              logout(() => {
                router.push("/")
              })
            }}
            className="py-[8px] w-full text-left px-[12px] leading-26 cursor-pointer text-error text-14 font-medium"
          >
            Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  )
}

export { AccountSidebar }
