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
      className="px-16 py-[10px] cursor-pointer hover:bg-bg flex items-stretch"
    >
      <ClockIcon className="text-blue-8 ml-[2px] w-16 h-16 mr-12 mt-4" />
      <p className="text-sm leading-[22px] flex-1 line-clamp-2">{location.address}</p>
    </div>
  )
}

export { LocationHistoryItem }
