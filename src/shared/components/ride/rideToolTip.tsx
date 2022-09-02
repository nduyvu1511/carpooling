import { RideInfoIcon } from "@/assets"

interface RideToolTipProps {
  percentage?: number
  desc?: string
  className?: string
  title?: string
}

const RideToolTip = ({ percentage = 0, desc = "", className = "", title }: RideToolTipProps) => {
  return (
    <div className={`p-8 flex bg-blue-05 items-start rounded-[8px] ${className}`}>
      <RideInfoIcon className="opacity-80" />
      <p className="text-[10px] leading-16 sm:text-12 sm:leading-[18px] flex-1 ml-12 sm:ml-[14px] text-primary">
        {title ||
          `Vui lòng đặt cọc ${Math.round(percentage)}% số tiền để tiếp tục ${
            desc ? `, ${desc}` : ""
          }`}
      </p>
    </div>
  )
}

export { RideToolTip }
