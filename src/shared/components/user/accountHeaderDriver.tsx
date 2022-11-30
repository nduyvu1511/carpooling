import { EditIcon, MailIcon, PhoneIcon } from "@/assets"
import { toImageUrl } from "@/helper"
import { UserInfo } from "@/models"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { AccountSummary } from "./accountSummary"
import { AccountTag } from "./accountTag"

interface AccountHeaderDriverProps {
  data: UserInfo
}

export const AccountHeaderDriver = ({ data }: AccountHeaderDriverProps) => {
  const router = useRouter()

  return (
    <div className="mb-24">
      <div className="flex">
        <div
          onClick={() =>
            router.push(`/${data?.car_account_type === "car_driver" ? "d" : "c"}/account/profile`)
          }
          className="cursor-pointer w-[90px] h-[90px] md:w-[160px] md:h-[160px] mr-24 md:mr-40 rounded-[50%] bg-bg-primary border border-solid border-[#DAE2FD] flex-center relative mb-[18px]"
        >
          <div className="relative w-[90px] h-[90px] md:w-[150px] md:h-[150px] rounded-[50%] overflow-hidden">
            <Image
              src={toImageUrl(data?.avatar_url.image_url || "")}
              layout="fill"
              alt=""
              objectFit="cover"
            />
          </div>

          <span className="w-[24px] h-[24px] absolute bottom-0 right-0 md:bottom-[10px] md:right-[10px] flex-center bg-primary rounded-[50%]">
            <EditIcon className="w-[12px] h-[12px] text-white-color" />
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-center flex-1 mb-12 md:mb-16">
            <p className="text-base text-[18px] leading-[26px] md:text-[20px] md:leading-[28px] mr-10 md:mr-12 text-primary font-semibold line-clamp-1 word-wrap-anywhere">
              {data?.partner_name}
            </p>

            <AccountTag userInfo={data} />
          </div>

          {data?.verified_car_driver_account === "inactive_account" ? (
            <Link passHref href="/d/register">
              <a className="text-primary text-sm underline">Bổ sung thông tin tài xế</a>
            </Link>
          ) : data?.verified_car_driver_account === "blocked_account" ? (
            <p className="text-sm">Tài khoản đã bị khóa</p>
          ) : (
            <>
              <div className="mb-16 block md:flex md:items-center">
                <p className="flex items-center mb-4 md:mb-0">
                  <PhoneIcon className="mr-8 text-gray-color-7" />
                  <span className="text-xs md:text-sm text-gray-color-7 md:text-gray-color-7 flex-1">
                    {data.phone}
                  </span>
                </p>

                {data?.email ? (
                  <>
                    <span className="h-10 border-l border-l-gray-10 border-solid mx-12 hidden md:block"></span>

                    <p className="flex items-center">
                      <MailIcon className="mr-8" fill="#767676" />
                      <span className="text-xs md:text-sm text-gray-color-7 md:text-gray-color-7 flex-1">
                        {data.email}
                      </span>
                    </p>
                  </>
                ) : null}
              </div>

              <div className="hidden md:block">
                <AccountSummary data={data} />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="md:hidden">
        <AccountSummary data={data} />
      </div>
    </div>
  )
}
