import { guide4 } from "@/assets"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface CheckoutPaidProps {
  link: string
}

export const CheckoutPaid = ({ link }: CheckoutPaidProps) => {
  return (
    <div className="flex-center flex-col">
      <div className="relative w-full max-w-[200px] h-[300px]">
        <Image src={guide4} layout="fill" alt="" objectFit="contain" />
      </div>
      <p className="text-sm text-gray-color-3 text-center">
        Chuyến đi đã được thanh toán, xem chi tiết trong{" "}
        <Link href={link}>
          <a className="text-primary hover:underline font-semibold">Hóa đơn</a>
        </Link>
      </p>
    </div>
  )
}
