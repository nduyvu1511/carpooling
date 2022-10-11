import { RoomItem } from "../chat/room"

interface RoomLoadingProps {
  className?: string
}

export const RoomLoading = ({ className = "" }: RoomLoadingProps) => {
  return (
    <div className={className}>
      <div className="h-[44px] sm:h-[52px] w-full skeleton rounded-[5px] mb-12 md:mb-16 lg:mb-24"></div>
      <RoomItem data={null} />
      <RoomItem data={null} />
      <RoomItem data={null} />
      <RoomItem data={null} />
      <RoomItem data={null} />
    </div>
  )
}
