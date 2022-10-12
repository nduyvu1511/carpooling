import { RootState } from "@/core/store"
import { GOOGLE_MAP_API_KEY } from "@/helper"
import { CalcDistanceRes, LatLng, UseParams } from "@/models"
import { useLoadScript } from "@react-google-maps/api"
import { useSelector } from "react-redux"

interface CalcDistanceParams {
  origin: LatLng
  destination: LatLng
}

interface Res {
  calculateDistanceBetweenTwoCoordinates: (
    params: UseParams<CalcDistanceParams, CalcDistanceRes>
  ) => void
}

export const useCalcDistance = (): Res => {
  const isLoaded = useSelector((state: RootState) => state.common.isLoadedGoogleMap)


  const calculateDistanceBetweenTwoCoordinates = (
    _params: UseParams<CalcDistanceParams, CalcDistanceRes>
  ) => {
    const { params, onSuccess, onError } = _params
    const { origin, destination } = params
    if (!isLoaded) return

    const service = new google.maps.DistanceMatrixService()
    try {
      service.getDistanceMatrix(
        {
          origins: [{ lng: origin.lng, lat: origin.lat }],
          destinations: [{ lng: destination.lng, lat: destination.lat }],
          travelMode: google.maps.TravelMode.DRIVING,
          // transitOptions: TransitOptions,
          // drivingOptions: google.maps.dri,
          // unitSystem: UnitSystem,
          // avoidHighways: true,
          // avoidTolls: true,
        },
        (data) => {
          const value = data?.rows?.[0]?.elements?.[0]
          if (!value?.duration) return
          onSuccess({
            duration: value.duration.value / (60 * 60),
            distance: value.distance.value / 1000,
          })
        }
      )
    } catch (error) {
      onError?.()
      console.log(error)
    }
  }

  return { calculateDistanceBetweenTwoCoordinates }
}
