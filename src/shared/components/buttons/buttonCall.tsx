import { PhoneIcon } from "@/assets"
import React from "react"

const ButtonCall = () => {
  return (
    <div className="fixed bottom-[20px] right-[20px] z-[100]">
      <a
        className="text-base font-semibold w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-[50%] bg-orange-50 flex-center"
        href="tel:1900998880"
      >
        <PhoneIcon className="text-white-color w-[18px]" />
      </a>
    </div>
  )
}

export { ButtonCall }
