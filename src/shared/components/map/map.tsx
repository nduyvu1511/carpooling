import { LocationIcon, LocationIcon2, LocationIcon3 } from "@/assets"
import { GOOGLE_MAP_API_KEY } from "@/helper"
import { useAddress, useCurrentLocation } from "@/hooks"
import { DirectionLngLat, FromLocation, LatlngAddress } from "@/models"
import { DirectionsRenderer, GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Geocode from "react-geocode"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { Spinner } from "../loading"
import { MapSearch } from "./mapSearch"

type MapOptions = google.maps.MapOptions
type DirectionsResult = google.maps.DirectionsResult
type LatLngLiteral = google.maps.LatLngLiteral

Geocode.setApiKey(GOOGLE_MAP_API_KEY)
Geocode.setLanguage("vi")
Geocode.setRegion("vi")

interface MapProps {
  onChooseLocation?: (params: FromLocation) => void
  defaultLocation?: FromLocation
  viewOnly?: boolean
  direction?: DirectionLngLat
  prevProvinceId?: number
}
export const Map = ({
  onChooseLocation,
  defaultLocation,
  viewOnly = false,
  direction,
  prevProvinceId,
}: MapProps) => {
  const dispatch = useDispatch()
  const mapRef = useRef<GoogleMap>()
  const { getCurrentLocation } = useCurrentLocation({})
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      gestureHandling: viewOnly ? "none" : "auto",
      styles: [
        // {
        //   featureType: "all",
        //   elementType: "labels.text",
        //   stylers: [
        //     {
        //       visibility: "off",
        //     },
        //   ],
        // },
        {
          featureType: "poi",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const [libraries] = useState(["places", "geometry"])
  const { getProvinceIdByGooglePlace } = useAddress()
  const [currentLocation, setCurrenLocation] = useState<LatLngLiteral>()
  const [currentAddress, setCurrentAddress] = useState<LatlngAddress>()
  const [directionRes, setDirectionRes] = useState<DirectionsResult>()
  const [centerMapLoading, setCenterMapLoading] = useState<boolean>(false)
  const onLoad = useCallback((map: any) => (mapRef.current = map), [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: libraries as any,
  })

  const getAddressFromLngLat = ({ lng, lat }: { lng: number; lat: number }) => {
    try {
      setCenterMapLoading(true)
      Geocode.fromLatLng(lat + "", lng + "", process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY).then(
        (response) => {
          setCenterMapLoading(false)
          const address = response.results[0].formatted_address
          setCurrentAddress({ address, lat, lng })
        },
        (error) => {
          setCenterMapLoading(false)
        }
      )
    } catch (error) {
      setCenterMapLoading(false)
    }
  }

  useEffect(() => {
    if (viewOnly) return
    if (defaultLocation?.province_id && defaultLocation?.lat) {
      setCurrentAddress(defaultLocation)
      setCurrenLocation(defaultLocation)
      return
    }

    getCurrentLocation(({ lat, lng }) => {
      setCurrenLocation({ lat, lng })
      getAddressFromLngLat({ lat, lng })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultLocation])

  const pantoCurrentLocation = () => {
    if (!currentLocation) {
      dispatch(notify("Không tìm thấy vị trí của bạn", "info"))
      return
    }
    mapRef.current?.panTo(currentLocation)
    getAddressFromLngLat({ lat: currentLocation.lat, lng: currentLocation.lng })
  }

  const handleDragEnd = () => {
    if (!mapRef?.current) return
    const center = (mapRef as any)?.current?.getCenter()
    if (!center?.lat) return
    getAddressFromLngLat({ lat: center.lat(), lng: center.lng() })
  }

  const handleConfirmLocation = () => {
    if (!currentAddress?.address) return

    const province_id = getProvinceIdByGooglePlace(currentAddress.address)
    if (!province_id) {
      dispatch(notify("Vui lòng chọn vị trí hợp lệ", "warning"))
      return
    }

    if (province_id === prevProvinceId) {
      dispatch(notify("Exxe chỉ hỗ chợ những quốc xe khác tỉnh", "warning"))
      return
    }
    onChooseLocation && onChooseLocation({ ...currentAddress, province_id })
  }

  useEffect(() => {
    if (!direction || !window?.google) return

    const directionsService = new google.maps.DirectionsService()
    const { destination, origin } = direction
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.TRANSIT,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log("result: ", result)
          result && setDirectionRes(result)
        } else {
          console.error(`error fetching directions ${result?.routes}`)
        }
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoaded ? (
        <div className="flex flex-col w-full h-full">
          <GoogleMap
            zoom={16}
            center={currentLocation}
            options={options}
            mapContainerClassName="flex-1 relative"
            onDragEnd={() => {
              !viewOnly && handleDragEnd()
            }}
            onLoad={onLoad}
          >
            {direction && directionRes ? (
              <DirectionsRenderer
                options={{
                  polylineOptions: {
                    zIndex: 50,
                    strokeColor: "#1976D2",
                    strokeWeight: 5,
                  },
                }}
                directions={directionRes}
              />
            ) : null}

            {defaultLocation ? <Marker position={defaultLocation} /> : null}

            {/* {!viewOnly && currentLocation && !defaultLocation ? (
              <Marker position={currentLocation} icon={"BiCurrentLocation"} />
            ) : null} */}

            {!viewOnly ? (
              <div className="absolute max-w-[400px] w-full top-[0] sm:top-[4px] left-0 sm:left-[4px] z-[100]">
                {mapRef?.current ? (
                  <MapSearch
                    onSelect={(address) => {
                      console.log(address)
                      mapRef.current?.panTo({
                        lat: address.lat,
                        lng: address.lng,
                      })
                      getAddressFromLngLat(address)
                    }}
                  />
                ) : null}
              </div>
            ) : null}

            {/* Icon center */}
            {!viewOnly ? (
              <span className="z-10">
                <LocationIcon className="absolute-center w-[30px] h-[30px] text-error" />
              </span>
            ) : null}

            {!viewOnly ? (
              <span
                onClick={pantoCurrentLocation}
                className="absolute right-[20px] bottom-[20px] z-[10] w-[30px] flex-center h-[30px] bg-white-color rounded-[50%] block-element border border-solid border-border-color"
              >
                <LocationIcon3 className="w-[24px] h-[24px] text-gray-color-3" />
              </span>
            ) : null}
          </GoogleMap>

          <div className="">
            {!viewOnly ? (
              <>
                <div className="left-[0] right-[0] bottom-[0] p-12 md:p-24 bg-white-color">
                  <div className="flex items-center h-[60px] bg-bg mb-12 md:mb-24 px-12">
                    <LocationIcon2 className="mr-[24px] fill-error" />
                    <span className="text-14 leading-[22px] font-medium line-clamp-2 flex-1">
                      {centerMapLoading ? "Đang tải..." : currentAddress?.address || ""}
                    </span>
                  </div>

                  <span
                    onClick={handleConfirmLocation}
                    className={`btn-primary mx-auto ${
                      !currentAddress?.lat || centerMapLoading ? "btn-disabled" : ""
                    }`}
                  >
                    Xác nhận
                  </span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : (
        <Spinner className="py-[40px]" />
      )}
    </>
  )
}
