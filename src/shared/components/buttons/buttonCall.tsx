import { PhoneIcon } from "@/assets"
import { PHONE } from "@/helper"

const ButtonCall = () => {
  return (
    <div className="fixed bottom-[20px] right-[20px] z-[100]">
      <a
        className="text-base font-semibold w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-[50%] button-call-linear-gradient flex-center"
        href={`tel:${PHONE}`}
      >
        <PhoneIcon className="text-white-color w-[18px]" />
      </a>
    </div>
  )
}

export { ButtonCall }
