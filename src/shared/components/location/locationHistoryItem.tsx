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
      className="px-[16px] py-[8px] cursor-pointer hover:bg-bg flex items-center"
    >
      <ClockIcon className="text-blue-8" />
      <p className="text-sm ml-[12px] flex-1">{location.address}</p>
    </div>
  )
}

export { LocationHistoryItem }
