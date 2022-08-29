import Image from "next/image"

interface GuideItemProps {
  icon: string
  label: string
  desc: string[]
  reverse?: boolean
  index: number
}

export const GuideItem = ({ icon, desc, label, reverse = false, index }: GuideItemProps) => {
  return (
    <div
      className={`flex flex-col-reverse sm:flex-row ${
        reverse ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
    >
      <div className={`flex-1 flex-center`}>
        <div className="relative h-[237px] lg:h-[352px] w-[80%] lg:w-full flex-center">
          <Image src={icon} layout="fill" alt="" objectFit="contain" />
        </div>
      </div>

      <div className="w-[20px] lg:w-[60px]"></div>

      <div className="flex-1 mb-[30px] md:mb-0">
        <h3 className="text-18 font-medium leading-24 md:text-20 md:font-semibold md:leading-28 lg:text-28 lg:font-medium lg:leading-[36px] text-primary mb-16 lg:mb-24">
          {index}. {label}
        </h3>
        {desc.map((text, index) => (
          <p
            key={index}
            className="text-sm leading-[22px] lg:text-base mb-12 md:mb-16 lg:mb-24 last:mb-0"
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  )
}
