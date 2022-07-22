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
    <div className={`flex items-center ${reverse ? "flex-row-reverse" : "flex-row"}`}>
      <div className="flex-1">
        <div className="relative h-[352px] flex-center">
          <Image src={icon} layout="fill" alt="" objectFit="contain" />
        </div>
      </div>
      <div className="w-[60px]"></div>
      <div className="flex-1">
        <h2 className="text-primary font-medium text-[40px] leading-[48px] mb-[40px]">
          {index}. {label}
        </h2>
        <p className="font-normal text-[16px] leading-[26px]">{desc}</p>
      </div>
    </div>
  )
}
