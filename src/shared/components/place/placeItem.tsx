import { ArrowLineRightIcon, ArrowRightIcon, CalendarIcon, CarIcon, MinusIcon } from "@/assets"
import { toFirstUpperCase, toImageUrl } from "@/helper"
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
    <div onClick={() => {}} className="cursor-pointer rounded-[5px] overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden group">
        <Image
          className="select-none transform group-hover:scale-110 transition-all duration-500"
          src={toImageUrl(image)}
          layout="fill"
          objectFit="cover"
          alt=""
        />

        <div className="absolute h-full bottom-0 left-0 right-0 place-linear-gradient"></div>

        <div className="p-[12px] lg:p-16 absolute bottom-0 left-0 right-0 ">
          <div className="flex items-stretch mb-[8px]">
            <span className="text-[13px] sm:text-[14px] md:text-16 font-semibold flex-1 text-white-color line-clamp-1">
              {from_province}
            </span>
            <span className="my-auto mx-[4px]">
              <MinusIcon className="text-white-color fill-white-color sm:hidden" />
              <ArrowLineRightIcon className="hidden sm:block w-16 h-16 text-white-color" />
            </span>
            <span className="text-[13px] sm:text-[14px] md:text-16 font-semibold flex-1 text-white-color line-clamp-1 text-right">
              {to_province}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <p className="flex items-center">
              <CarIcon className="mr-[5px] md:mr-[8px] w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] text-white-color" />
              <span className="line-clamp-1 text-[10px] md:text-[14px] text-white-color font-normal md:font-medium">
                {toFirstUpperCase(car_type)}
              </span>
            </p>
            <p className="flex items-center">
              <CalendarIcon className="mr-[5px] md:mr-[8px] w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] text-white-color" />
              <span className="line-clamp-1 text-[10px] md:text-[14px] font-normal md:font-medium text-white-color">
                {moment(date).format("DD/MM/YYYY")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
