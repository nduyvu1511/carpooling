import { MessageIcon, PhoneIcon2 } from "@/assets"
import { toImageUrl } from "@/helper"
import { useChatActions } from "@/hooks"
import { CarDriverId } from "@/models"
import Image from "next/image"
import { Star } from "../star"

interface DriverInfoSummaryProps {
  driver: CarDriverId
  compounding_car_id: number
  titleClassName?: string
}

export const DriverInfoSummary = ({
  driver,
  titleClassName = "",
  compounding_car_id,
}: DriverInfoSummaryProps) => {
  const { createSingleChat } = useChatActions()

  const handleCreateChat = () => {
    createSingleChat({
      params: { partner_id: driver.partner_id, compounding_car_id },
      onSuccess: () => {},
    })
  }
  return (
    <div className="">
      <p className={`text-16 uppercase font-semibold mb-16 ${titleClassName}`}>Thông tin tài xế</p>

      {driver?.partner_id ? (
        <div className="">
          <div className="flex items-start">
            <div className="flex items-center flex-1 mr-16">
              <div className="relative w-[80px] h-[80px] rounded-[50%] overflow-hidden mr-16">
                <Image
                  src={toImageUrl(driver.avatar_url.image_url)}
                  alt={driver.partner_name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold line-clamp-1 text-primary">
                  {driver.partner_name}
                </p>
                <p className="text-sm font-semibold">
                  <Star ratingValue={driver.rating_number * 20} readonly size={14} />
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <a href={`tel:${driver.phone}`} className="mr-12 md:mr-24">
                <PhoneIcon2 className="text-primary w-[18px] h-[18px]" />
              </a>
              <button onClick={() => handleCreateChat()}>
                <MessageIcon className="text-primary w-[24px] h-[24px]" />
              </button>
            </div>
          </div>

          {/*  */}
        </div>
      ) : (
        <p className="text-sm text-gray-color-7 leading-[22px]">
          Chưa có tài xế nhận chuyến, chúng tôi sẽ thông báo đến bạn sau khi có tài xế nhận chuyến.
        </p>
      )}
    </div>
  )
}
