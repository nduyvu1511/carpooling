import { CloseIcon, LocationIcon2, LocationOff } from "@/assets"
import { useClickOutside, useCurrentLocation } from "@/hooks"
import { LatLng } from "@/models"
import { useRef, useState } from "react"
import Geocode from "react-geocode"
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import { Spinner } from "../loading"
import { LocationItem } from "../location"

const requestOptions = {
  componentRestrictions: { country: "vn" },
}

interface InputLocationProps {
  showCurrentLocation?: boolean
  className?: string
  placeholder?: string
  onSelect?: (params: LocationSearch) => void
  onClearValue?: () => void
}

export interface LocationSearch extends LatLng {
  location: string
}

export const InputLocation = ({
  placeholder,
  showCurrentLocation = false,
  onSelect,
  onClearValue,
}: InputLocationProps) => {
  const { getCurrentLocation } = useCurrentLocation()
  const ref = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false)
  const {
    value: searchValues,
    setValue,
    suggestions: { data: locations, loading, status },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 500, requestOptions })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentLocation, setCurrentLocation] = useState<LocationSearch>()

  useClickOutside([searchRef], () => {
    setShowSearchResult(false)
  })

  const handleGetCurrentLocation = () => {
    if (isLoading) return

    if (currentLocation?.location) {
      onSelect?.(currentLocation)
      setValue(currentLocation.location)
      return
    }

    setIsLoading(true)
    try {
      getCurrentLocation({
        params: {},
        onSuccess: ({ lat, lng }) => {
          Geocode.fromLatLng(lat + "", lng + "").then(
            (response) => {
              setIsLoading(false)
              const location = response.results?.[0]?.formatted_address
              if (location) {
                setValue(location)
                onSelect?.({ lat, lng, location })
                setCurrentLocation({ lat, lng, location })
              }
            },
            () => {
              setIsLoading(false)
            }
          )
        },
      })
    } catch (error) {
      setIsLoading(false)
    }
  }

  const getLocationFromSearchResult = async (
    location: google.maps.places.AutocompletePrediction
  ) => {
    setValue(location.description)
    clearSuggestions()
    try {
      const results = await getGeocode({ address: location.description })
      const { lat, lng } = getLatLng(results?.[0])
      const newLocation: LocationSearch = {
        lat,
        lng,
        location: location.description,
      }
      onSelect?.(newLocation)
      setShowSearchResult(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div ref={searchRef} className={"relative flex-1 flex"}>
      <div className="relative flex-1">
        <input
          ref={ref}
          type="text"
          value={searchValues}
          onChange={(e) => {
            const { value } = e.target
            setValue(value)
            clearSuggestions()
            onClearValue?.()
          }}
          onClick={() => setShowSearchResult(true)}
          onFocus={() => setShowSearchResult(true)}
          placeholder={placeholder}
          className={`h-[42px] text-ellipsis md:h-[48px] flex-1  border border-solid px-12 border-gray-20 md:border-gray-color-2 outline-none w-full rounded-[5px] md:rounded-[8px] text-14 md:text-16 text-medium ${
            searchValues ? "pr-[36px]" : ""
          }`}
        />
        {searchValues ? (
          <span
            onClick={() => {
              setValue("")
              clearSuggestions()
              onClearValue?.()
            }}
            className="absolute-vertical right-12"
          >
            <CloseIcon className="w-[16px] h-[16px]" />
          </span>
        ) : null}
      </div>

      {!showCurrentLocation ? (
        <span
          onClick={handleGetCurrentLocation}
          className="flex-center bg-primary-opacity w-[42px] md:w-[48px] h-[42px] md:h-[48px] rounded-[8px] ml-12 cursor-pointer"
        >
          {!isLoading ? <LocationIcon2 /> : <Spinner size={18} />}
        </span>
      ) : null}

      {showSearchResult ? (
        <div className="z-[100] block-element shadow-lg max-h-[350px] overflow-y-auto flex-col flex rounded-none rounded-bl-[10px] rounded-br-[10px] absolute w-[calc(100%)] top-[50px] left-[0]">
          {searchValues ? (
            <div className="flex-1 flex flex-col">
              {loading ? (
                <Spinner className="py-[30px]" size={20} />
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
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
