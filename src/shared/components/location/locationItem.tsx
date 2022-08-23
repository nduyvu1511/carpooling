import { LocationIcon4 } from "@/assets"

type GoogleMapLocation = google.maps.places.AutocompletePrediction

interface LocationItemProps {
  location: GoogleMapLocation
  onSelect?: (value: GoogleMapLocation) => void
}

const LocationItem = ({ location, onSelect }: LocationItemProps) => {
  return (
    // <div className="flex">
    //   <LocationIcon4 className="mr-8" />
    //   <p className="flex-1 text-sm">{location}</p>
    // </div>

    <div
      onClick={() => onSelect && onSelect(location)}
      className="flex items-stretch px-12 py-[10px] hover:bg-bg cursor-pointer"
    >
      <LocationIcon4 className="mr-[12px] mt-8" />
      <p className="flex-1 text-sm line-clamp-2">{location.description}</p>

      {/* <span className="btn-reset location__item-icon">{arrowRightIcon()}</span> */}
    </div>
  )
}

export { LocationItem }
