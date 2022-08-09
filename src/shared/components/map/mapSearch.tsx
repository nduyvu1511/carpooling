import { CloseIcon } from "@/assets"
import { RootState } from "@/core/store"
import { useAddress, useClickOutside } from "@/hooks"
import { FromLocation } from "@/models"
import { addLocationSearchHistory } from "@/modules"
import { memo, useRef, useState } from "react"
import { MdOutlineLocationOff } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import { Spinner } from "../loading"
import { LocationHistoryItem, LocationItem } from "../location"

interface MapSearchProps {
  onSelect?: (val: FromLocation) => void
}

const requestOptions = {
  componentRestrictions: { country: ["vi"] },
  types: ["country"],
}
const MapSearch = memo(function MapSearchChild({ onSelect }: MapSearchProps) {
  const { getProvinceIdByGooglePlace } = useAddress()
  const dispatch = useDispatch()
  const { searchHistoryList } = useSelector((state: RootState) => state.locationHistory)

  const {
    ready,
    value: searchValues,
    setValue,
    suggestions: { data: locations, loading, status },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 500, requestOptions })
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useClickOutside([searchRef], () => {
    setShowSearchResult(false)
  })

  const getLocationFromSearchResult = (location: google.maps.places.AutocompletePrediction) => {
    getGeocode({ address: location.description }).then((results) => {
      const { lat, lng } = getLatLng(results?.[0])
      const province_id = getProvinceIdByGooglePlace(location.description)
      if (!province_id) return

      const newLocation: FromLocation = {
        lat,
        lng,
        address: location.description,
        province_id: 0,
      }

      dispatch(addLocationSearchHistory({ ...newLocation, id: location.place_id }))
      onSelect && onSelect(newLocation)
      setShowSearchResult(false)
    })
  }

  return (
    <div ref={searchRef} className="">
      <div className="relative">
        <input
          type="text"
          value={searchValues}
          onChange={(e) => {
            setValue(e.target.value)
            clearSuggestions()
          }}
          onFocus={() => setShowSearchResult(true)}
          className={`form-input h-[40px] pr-[40px] ${
            !showSearchResult
              ? "sm:rounded-[10px]"
              : "sm:rounded-tl-[10px] sm:rounded-tr-[10px] rounded-none"
          } border border-solid border-border-color shadow-shadow-1`}
          placeholder="Tìm kiếm vị trí..."
          disabled={!ready}
        />

        {searchValues ? (
          <button onClick={() => setValue("", false)} className="absolute-vertical right-[10px]">
            <CloseIcon className="w-[18px]" />
          </button>
        ) : null}
      </div>

      {showSearchResult ? (
        <div className="block-element max-h-[300px] flex-col flex rounded-none rounded-bl-[10px] rounded-br-[10px]">
          {searchValues ? (
            <div className="flex-1 flex flex-col">
              {loading ? (
                <Spinner className="py-80px" size={40} />
              ) : (
                <>
                  <ul className="overflow-y-auto py-8">
                    {status === "OK" ? (
                      locations?.map((item, index) => (
                        <li key={index} className="">
                          <LocationItem
                            location={item}
                            onSelect={(val) => getLocationFromSearchResult(val)}
                          />
                        </li>
                      ))
                    ) : (
                      <div className="px-12 py-[24px] flex-1 flex-col flex-center">
                        <p className="flex-center mb-[12px] text-sm text-gray-color-3">
                          <MdOutlineLocationOff className="mr-[8px] text-base text-gray-color-3" />
                          Không tìm được vị trí
                        </p>
                        <p className="text-sm text-gray-color-3 leading-[20px]">
                          Kiểm tra lại chính tả hoặc chọn vị trí trên bản đồ để xác định vị trí của
                          bạn
                        </p>
                      </div>
                    )}
                  </ul>
                </>
              )}
            </div>
          ) : searchHistoryList?.length > 0 ? (
            <ul className="overflow-y-auto flex-1 py-8 scrollbar-hide border border-solid border-border-color">
              {searchHistoryList.map((item, index) => (
                <li key={index}>
                  <LocationHistoryItem
                    location={item}
                    onSelect={(location) => {
                      onSelect && onSelect(location)
                      setShowSearchResult(false)
                    }}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  )
})

export { MapSearch }
