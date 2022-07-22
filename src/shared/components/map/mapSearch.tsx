import { RootState } from "@/core/store"
import { useAddress, useClickOutside } from "@/hooks"
import { FromLocation } from "@/models"
import { addLocationSearchHistory } from "@/modules"
import { useRef, useState } from "react"
import { MdOutlineLocationOff } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import { LocationHistoryItem } from "../location"

interface MapSearchProps {
  onSelect?: (val: FromLocation) => void
}

export const MapSearch = ({ onSelect }: MapSearchProps) => {
  const { getProvinceIdByGooglePlace } = useAddress()
  const dispatch = useDispatch()
  const { searchHistoryList } = useSelector((state: RootState) => state.locationHistory)

  const {
    ready,
    value: searchValues,
    setValue,
    suggestions: { data: locations, loading, status },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: ["vi"] }, types: ["(regions)"] },
  })
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
      <div className="mb-[4px]">
        <input
          type="text"
          onChange={(e) => {
            setValue(e.target.value)
            clearSuggestions()
          }}
          onFocus={() => setShowSearchResult(true)}
          className="form-input h-[40px] rounded-[4px] border border-solid border-border-color shadow-shadow-1"
          placeholder="Tìm kiếm vị trí..."
          disabled={!ready}
        />
      </div>

      {showSearchResult ? (
        <div className="block-element max-h-[300px] h-full flex-col flex">
          {searchValues ? (
            <div className="location__result">
              {loading ? (
                <div className="px-12 py-12">
                  {/* {Array.from({ length: 4 }).map((_, index) => (
                    <LocationItem key={index} location={null as any} isLoading={true} />
                  ))} */}
                </div>
              ) : null}

              <ul className="overflow-y-auto">
                {status === "OK" &&
                  locations?.length > 0 &&
                  locations.map((item, index) => (
                    <li key={index} className="">
                      {/* <LocationItem
                        location={item}
                        onSelect={(val) => getLocationFromSearchResult(val)}
                      /> */}
                    </li>
                  ))}
              </ul>

              {status && status !== "OK" ? (
                <div className="px-12 py-[24px]">
                  <p className="flex-center mb-[12px] text-sm">
                    <MdOutlineLocationOff className="mr-[8px] text-16" />
                    Không tìm được vị trí
                  </p>
                  <p className="text-sm leading-[20px] font-normal">
                    Kiểm tra lại chính tả hoặc chọn vị trí trên bản đồ để xác định vị trí của bạn
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <ul className="overflow-y-auto flex-1 scrollbar-hide">
              {searchHistoryList?.length > 0 &&
                searchHistoryList.map((item, index) => (
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
          )}
        </div>
      ) : null}
    </div>
  )
}
