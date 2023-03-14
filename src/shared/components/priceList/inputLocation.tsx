import { CloseIcon, LocationOff } from "@/assets"
import { useClickOutside } from "@/hooks"
import { LatLng } from "@/models"
import { useRef, useState } from "react"
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import { Spinner } from "../loading"
import { LocationItem } from "../location"

const requestOptions = {
  componentRestrictions: { country: "vn" },
}

interface InputLocationProps {
  onSelect?: (params: LocationSearch) => void
  className?: string
  placeholder?: string
}

export interface LocationSearch extends LatLng {
  location: string
}

export const InputLocation = ({ placeholder, onSelect }: InputLocationProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false)
  const {
    value: searchValues,
    setValue,
    suggestions: { data: locations, loading, status },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 500, requestOptions })

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
    <div ref={searchRef} className={"relative flex-1"}>
      <div className="relative">
        <input
          ref={ref}
          type="text"
          value={searchValues}
          onChange={(e) => {
            setValue(e.target.value)
            clearSuggestions()
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
            }}
            className="absolute-vertical right-12"
          >
            <CloseIcon className="w-[16px] h-[16px]" />
          </span>
        ) : null}
      </div>

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
