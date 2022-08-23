import { useAccountNavList, useAuth } from "@/hooks"
import Link from "next/link"
import { useRouter } from "next/router"

const AccountMenu = () => {
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
                  className="cursor-pointer text-14 font-medium text-blue-8 leading-26 py-[4px] px-16 block hover:bg-bg rounded-[5px] transition-all duration-100"
                >
                  {label}
                </a>
              </div>
            ) : (
              <Link href={path}>
                <a className="text-14 font-medium text-blue-8 leading-26 py-[4px] px-16 block hover:bg-bg rounded-[5px] transition-all duration-100">
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

export { AccountMenu }
