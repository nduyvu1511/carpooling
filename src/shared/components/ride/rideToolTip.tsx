import { RideInfoIcon } from "@/assets"

interface RideToolTipProps {
  percentage: number
  desc: string
  className?: string
}

const RideToolTip = ({ percentage, desc = "", className = "" }: RideToolTipProps) => {
  return (
    <div className={`p-8 flex bg-blue-05 items-start rounded-[5px] ${className}`}>
      <RideInfoIcon className="mt-2" />
      <p className="text-[10px] leading-16 sm:text-12 sm:leading-[18px] flex-1 ml-[10px] sm:ml-[14px] text-primary">
        Vui lòng đặt cọc {Math.round(percentage)}% số tiền để tiếp tục {desc ? `, ${desc}` : ""}
      </p>
    </div>
  )
}

export { RideToolTip }
