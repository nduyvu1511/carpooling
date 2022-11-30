import { ArrowRightIcon } from "@/assets"
import { useAccountNavList, useAuth } from "@/hooks"
import { UserInfo } from "@/models"
import { useRouter } from "next/router"
import { AccountHeaderCustomer } from "./accountHeaderCustomer"
import { AccountHeaderDriver } from "./accountHeaderDriver"

interface AccountDashboardProps {
  activePath?: string
  userInfo: UserInfo
}

const AccountDashboard = ({ activePath, userInfo }: AccountDashboardProps) => {
  const router = useRouter()
  const { accountNavList } = useAccountNavList()
  const { logout } = useAuth()

  return (
    <div className="p-custom">
      <div className="">
        <p className="text-base font-semibold mb-16 md:mb-24">Tài khoản</p>

        {userInfo?.car_account_type === "car_driver" ? (
          <AccountHeaderDriver data={userInfo} />
        ) : (
          <AccountHeaderCustomer data={userInfo} />
        )}
      </div>

      <div className="">
        <p className="text-base font-semibold mb-16 md:mb-24">Khác</p>

        <ul>
          {accountNavList.map(({ icon, label, path }, index) => (
            <li
              onClick={() => router.push(path)}
              key={index}
              className={`cursor-pointer flex items-center text-sm font-semibold px-12 py-[14px] border-b border-solid border-border-color ${
                activePath === path ? "bg-primary text-white-color rounded-[5px]" : "text-primary"
              }`}
            >
              <span className="">{icon}</span>
              <span className="mx-[10px] flex-1">{label}</span>
              <ArrowRightIcon className="text-white w-[8px] h-[13px]" />
            </li>
          ))}
          <li className="flex items-center mt-24">
            <button
              onClick={() =>
                logout(() => {
                  router.push("/")
                })
              }
              className="btn-primary-outline mx-auto rounded-[5px] h-[40px]"
            >
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export { AccountDashboard }
