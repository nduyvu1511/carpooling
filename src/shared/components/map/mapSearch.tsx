import { CloseIcon, LocationOff } from "@/assets"
import { RootState } from "@/core/store"
import { useAddress, useClickOutside } from "@/hooks"
import { FromLocation } from "@/models"
import { addLocationSearchHistory } from "@/modules"
import { memo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import { Spinner } from "../loading"
import { LocationHistoryItem, LocationItem } from "../location"

interface MapSearchProps {
  onSelect?: (val: FromLocation) => void
}

const requestOptions = {
  componentRestrictions: { country: "vn" },
}

const MapSearch = memo(function MapSearchChild({ onSelect }: MapSearchProps) {
  const ref = useRef<HTMLInputElement>(null)
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

  useClickOutside([ref.current], () => {
    clearSuggestions()
  })

  useClickOutside([searchRef], () => {
    setShowSearchResult(false)
  })

  const getLocationFromSearchResult = async (
    location: google.maps.places.AutocompletePrediction
  ) => {
    setValue(location.description)
    clearSuggestions()
    try {
      const results = await getGeocode({ address: location.description })
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
      onSelect?.(newLocation)
      setShowSearchResult(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div ref={searchRef} className="">
      <div className="relative">
        <input
          ref={ref}
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
        <div className="block-element max-h-[300px] overflow-y-auto scrollbar-hide flex-col flex rounded-none rounded-bl-[10px] rounded-br-[10px]">
          {searchValues ? (
            <div className="flex-1 flex flex-col">
              {loading ? (
                <Spinner className="py-80px" size={40} />
              ) : (
                <>
                  {status === "OK" ? (
                    <ul className={`overflow-y-auto py-8`}>
                      {locations?.map((item, index) => (
                        <li key={index} className="">
                          <LocationItem
                            location={item}
                            onSelect={(val) => getLocationFromSearchResult(val)}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : status === "ZERO_RESULTS" ? (
                    <div className="px-12 py-[24px] flex-1 flex-col flex-center">
                      <p className="flex-center mb-[12px] text-sm text-gray-color-3">
                        <LocationOff className="mr-[8px] text-lg text-gray-color-3" />
                        Không tìm được vị trí
                      </p>
                      <p className="text-sm text-gray-color-3 leading-[20px]">
                        Kiểm tra lại chính tả hoặc chọn vị trí trên bản đồ để xác định vị trí của
                        bạn
                      </p>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          ) : searchHistoryList?.length > 0 ? (
            <ul className="overflow-y-auto flex-1 py-8 scrollbar-hide border border-solid border-border-color border-t-0">
              {searchHistoryList.map((item, index) => (
                <li key={index}>
                  <LocationHistoryItem
                    location={item}
                    onSelect={(location) => {
                      onSelect?.(location)
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
