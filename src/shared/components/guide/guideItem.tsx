import Image from "next/image"

interface GuideItemProps {
  icon: string
  label: string
  desc: string
  reverse?: boolean
  index: number
}

export const GuideItem = ({ icon, desc, label, reverse = false, index }: GuideItemProps) => {
  return (
    <div className={`flex flex-col sm:flex-row ${reverse ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
      <div className={`flex-1 flex-center mb-[30px] md:mb-0`}>
        <div className="relative h-[237px] lg:h-[352px] w-[80%] lg:w-full flex-center">
          <Image src={icon} layout="fill" alt="" objectFit="contain" />
        </div>
      </div>

      <div className="w-[20px] lg:w-[60px]"></div>

      <div className="flex-1">
        <h2 className="h2 text-primary mb-[16px] md:mb-24 lg:mb-[40px]">
          {index}. {label}
        </h2>
        <p className="text-base">{desc}</p>
      </div>
    </div>
  )
}
