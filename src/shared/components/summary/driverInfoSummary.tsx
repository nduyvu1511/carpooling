import { toImageUrl } from "@/helper"
import { CarDriverId } from "@/models"
import Image from "next/image"
import { Star } from "../star"

interface DriverInfoSummaryProps {
  driver: CarDriverId
  titleClassName?: string
}

export const DriverInfoSummary = ({ driver, titleClassName = "" }: DriverInfoSummaryProps) => {
  return (
    <div className="">
      <p className={`text-16 uppercase font-semibold text-blue-7 mb-24 ${titleClassName}`}>
        Thông tin tài xế
      </p>

      {driver?.partner_id ? (
        <div className="">
          <div className="flex items-center mb-24">
            <div className="relative w-[60px] h-[60px] rounded-[50%] overflow-hidden mr-[16px]">
              <Image
                src={toImageUrl(driver.avatar_url.image_url)}
                alt={driver.partner_name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{driver.partner_name}</p>
              <p className="text-sm font-semibold">
                <Star ratingValue={driver.rating_number * 20} readonly size={14} />
              </p>
            </div>
          </div>
          <ul>
            <li className="flex items-center">
              <p className="text-xs w-[150px]">Số điện thoại</p>
              <a
                href={`tel:${driver.phone}`}
                className="text-14 md:text-16 font-medium whitespace-nowrap ml-auto text-primary underline"
              >
                {driver.phone}
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <p className="text-sm md:text-base">
            Chưa có tài xế nhận chuyến, chúng tôi sẽ thông báo đến bạn sau khi có tài xế nhận
            chuyến.
          </p>
        </div>
      )}
    </div>
  )
}
