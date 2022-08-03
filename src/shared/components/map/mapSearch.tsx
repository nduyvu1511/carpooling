import { RootState } from "@/core/store"
import { useAddress, useClickOutside } from "@/hooks"
import { FromLocation } from "@/models"
import { addLocationSearchHistory } from "@/modules"
import { useRef, useState } from "react"
import { MdOutlineLocationOff } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import { Spinner } from "../loading"
import { LocationHistoryItem, LocationItem } from "../location"

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
      console.log(location.description)
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
      <div className="mb-[1px]">
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
        <div className="block-element max-h-[300px] flex-col flex  rounded-[5px]">
          {searchValues ? (
            <div className="flex-1 flex flex-col">
              {loading ? (
                <Spinner className="py-80px" size={40} />
              ) : (
                <>
                  <ul className="overflow-y-auto">
                    {status === "OK" &&
                      locations?.length > 0 &&
                      locations.map((item, index) => (
                        <li key={index} className="">
                          <LocationItem
                            location={item}
                            onSelect={(val) => getLocationFromSearchResult(val)}
                          />
                        </li>
                      ))}
                  </ul>

                  {status && status !== "OK" ? (
                    <div className="px-12 py-[24px] flex-1 flex-col flex-center">
                      <p className="flex-center mb-[12px] text-sm">
                        <MdOutlineLocationOff className="mr-[8px] text-base" />
                        Không tìm được vị trí
                      </p>
                      <p className="text-sm leading-[20px]">
                        Kiểm tra lại chính tả hoặc chọn vị trí trên bản đồ để xác định vị trí của
                        bạn
                      </p>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          ) : searchHistoryList?.length > 0 ? (
            <ul className="overflow-y-auto flex-1 scrollbar-hide border border-solid border-border-color">
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
}
