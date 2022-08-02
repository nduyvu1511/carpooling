import { newsImage } from "@/assets"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const NewsItem = () => {
  return (
    <div className="">
      <div className="mb-[8px] lg:mb-[16px]">
        <div className="relative aspect-1 overflow-hidden rounded-[5px] lg:rounded-[10px] group">
          <Image
            className="select-none transform group-hover:scale-110 transition-all duration-500"
            src={newsImage}
            layout="fill"
            objectFit="cover"
            alt=""
          />
        </div>
      </div>

      <div className="">
        <div className="">
          <p className="line-clamp-1 text-[10px] md:text-12 lg:text-14 text-gray-color-3 font-normal mb-[4px] lg:mb-[8px]">
            1/12/2022
          </p>
          <Link href="/">
            <a className="text-14 font-semibold md:font-medium leading-[22px] md:text-[20px] md:leading-[28px] text-primary line-clamp-2">
              Tham khảo bảng giá bảo hiểm xe các hãng
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export { NewsItem }
