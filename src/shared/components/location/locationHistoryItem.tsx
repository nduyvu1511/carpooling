import { ClockIcon } from "@/assets"
import { LocationSearchHistory } from "@/models"

interface LocationHistoryItemProps {
  location: LocationSearchHistory
  onSelect?: (params: LocationSearchHistory) => void
}

const LocationHistoryItem = ({ location, onSelect }: LocationHistoryItemProps) => {
  return (
    <div
      onClick={() => onSelect?.(location)}
      className="px-[16px] py-[8px] cursor-pointer hover:bg-bg flex items-stretch"
    >
      <ClockIcon className="text-blue-8 ml-[2px] w-[16px] h-[16px] mr-12 mt-8" />
      <p className="text-sm flex-1 line-clamp-2">{location.address}</p>
    </div>
  )
}

export { LocationHistoryItem }
