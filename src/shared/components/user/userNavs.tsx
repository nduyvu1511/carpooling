import { useAccountNavList, useAuth } from "@/hooks"
import { CarAccountType } from "@/models"
import Link from "next/link"
import { useRouter } from "next/router"

interface UserNavsProps {
  type: CarAccountType
}

const UserNavs = ({ type }: UserNavsProps) => {
  const { logout } = useAuth()
  const router = useRouter()
  const { accountNavList } = useAccountNavList()

  const handleLogout = () => {
    logout(() => {
      router.push("/")
    })
  }

  return (
    <ul className="p-[10px]">
      {[...accountNavList, { label: "Đăng xuất", path: "logout", icon: "" }].map(
        ({ label, path }, index) => (
          <li key={index}>
            {path === "logout" ? (
              <div className="mt-[10px] pt-[10px] border-t border-solid border-border-color">
                <a
                  onClick={handleLogout}
                  className="cursor-pointer text-14 font-medium text-gray-color-4 leading-26 py-[4px] px-[16px] block hover:bg-bg rounded-[5px] transition-all duration-100"
                >
                  {label}
                </a>
              </div>
            ) : path.includes("/account/schedules") ? (
              type === "car_driver" ? (
                <Link href={path}>
                  <a className="text-14 font-medium text-gray-color-4 leading-26 py-[4px] px-[16px] block hover:bg-bg rounded-[5px] transition-all duration-100">
                    {label}
                  </a>
                </Link>
              ) : null
            ) : (
              <Link href={path}>
                <a className="text-14 font-medium text-gray-color-4 leading-26 py-[4px] px-[16px] block hover:bg-bg rounded-[5px] transition-all duration-100">
                  {label}
                </a>
              </Link>
            )}
          </li>
        )
      )}
    </ul>
  )
}

export { UserNavs }

