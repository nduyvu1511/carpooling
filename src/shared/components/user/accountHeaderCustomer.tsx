import { EditIcon } from "@/assets"
import { toImageUrl } from "@/helper"
import { UserInfo } from "@/models"
import Image from "next/image"
import { useRouter } from "next/router"
import { RatingTag } from "../rating"
import { AccountTag } from "./accountTag"

interface AccountHeaderCustomerProps {
  data: UserInfo
}

export const AccountHeaderCustomer = ({ data }: AccountHeaderCustomerProps) => {
  const router = useRouter()

  return (
    <div className="flex-center flex-col mb-24">
      <div
        onClick={() =>
          router.push(`/${data?.car_account_type === "car_driver" ? "d" : "c"}/account/profile`)
        }
        className="cursor-pointer w-[95px] h-[95px] rounded-[50%] bg-bg-primary border border-solid border-[#DAE2FD] flex-center relative mb-[18px]"
      >
        <div className="relative w-[80px] h-[80px] rounded-[50%] overflow-hidden">
          <Image
            src={toImageUrl(data?.avatar_url.image_url || "")}
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
            {data?.partner_name}
          </p>

          {data?.rating_number ? (
            <div className="ml-16">
              <RatingTag
                onClick={() => router.push("/d/account/rating")}
                value={data.rating_number}
              />
            </div>
          ) : null}
        </div>

        <AccountTag userInfo={data} />
      </div>
    </div>
  )
}
