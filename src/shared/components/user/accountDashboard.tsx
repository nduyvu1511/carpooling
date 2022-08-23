import { ArrowRightIcon, EditIcon } from "@/assets"
import { toImageUrl } from "@/helper"
import { useAccountNavList, useAuth } from "@/hooks"
import { UserInfo } from "@/models"
import Image from "next/image"
import { useRouter } from "next/router"
import { RatingTag } from "../rating"
import { AccountTag } from "./accountTag"

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
      <div className="flex-center flex-col mb-[18px] md:mb-24">
        <div
          onClick={() =>
            router.push(
              `/${userInfo?.car_account_type === "car_driver" ? "d" : "c"}/account/profile`
            )
          }
          className="cursor-pointer w-[95px] h-[95px] rounded-[50%] bg-bg-primary border border-solid border-[#DAE2FD] flex-center relative mb-[18px]"
        >
          <div className="relative w-[80px] h-[80px] rounded-[50%] overflow-hidden">
            <Image
              src={toImageUrl(userInfo?.avatar_url.image_url || "")}
              layout="fill"
              alt=""
              objectFit="cover"
            />
          </div>

          <span className="w-[24px] h-[24px] absolute bottom-[10px] right-[0px] flex-center bg-primary rounded-[50%]">
            <EditIcon className="w-[12px] h-[12px] text-white-color" />
          </span>
        </div>

        <div className="flex items-center flex-col">
          <div className="flex items-center flex-1 mb-12">
            <p className="h3 text-primary font-semibold flex-1 line-clamp-1 word-wrap-anywhere">
              {userInfo?.partner_name}
            </p>
            {userInfo?.rating_number ? (
              <div className="ml-16">
                <RatingTag
                  onClick={() => router.push("/d/account/rating")}
                  value={userInfo.rating_number}
                />
              </div>
            ) : null}
          </div>
          <AccountTag userInfo={userInfo} />
        </div>
      </div>

      <div className="">
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
