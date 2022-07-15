import { CalendarIcon, CarIcon, LocationIcon, OneWayIcon } from "@/assets"
import { toImageUrl } from "@/helper"
import moment from "moment"
import Image from "next/image"

interface PlaceItemProps {
  placeItem: {
    image: any
    from_province: string
    to_province: string
    car_type: string
    date: string
  }
}

export const PlaceItem = ({
  placeItem: { image, from_province, to_province, car_type, date },
}: PlaceItemProps) => {
  return (
    <div onClick={() => {}} className="cursor-pointer rounded-[20px] ">
      <div className="relative aspect-[4/3] overflow-hidden group rounded-tl-[20px] rounded-tr-[20px]">
        <Image
          className="select-none transform group-hover:scale-110 transition-all duration-500"
          src={toImageUrl(image)}
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </div>
      <div className="p-24 border border-solid border-border-color-1 border-t-0 rounded-bl-[20px] rounded-br-[20px]">
        <div className="flex items-stretch mb-24">
          <span className="text-xl flex-1">{from_province}</span>
          <OneWayIcon className="mx-[8px] w-[16px] h-[16px] my-auto" />
          <span className="text-xl flex-1 text-right">{to_province}</span>
        </div>

        <div className="flex justify-between items-center">
          <p className="flex items-center">
            <CarIcon className="mr-[8px] w-[16px] h-[16px] text-gray-color-5" />
            <span className="text-base normal-case">{car_type}</span>
          </p>
          <p className="flex items-center">
            <CalendarIcon className="mr-[8px] w-[16px] h-[16px] text-gray-color-5" />
            <span className="text-base">{moment(date).format("DD/MM/YYYY")}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
