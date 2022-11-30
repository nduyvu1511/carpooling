import { RootState } from "@/core/store"
import { CalcDistanceRes, LatLng, UseParams } from "@/models"
import { setScreenLoading } from "@/modules"
import { useDispatch, useSelector } from "react-redux"

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
  const dispatch = useDispatch()
  const isLoaded = useSelector((state: RootState) => state.common.isLoadedGoogleMap)

  const calculateDistanceBetweenTwoCoordinates = (
    _params: UseParams<CalcDistanceParams, CalcDistanceRes>
  ) => {
    const { params, onSuccess, onError } = _params
    const { origin, destination } = params
    if (!isLoaded) return

    const { config } = _params

    const service = new google.maps.DistanceMatrixService()

    try {
      config?.showScreenLoading && dispatch(setScreenLoading({ show: true, toggleOverFlow: false }))
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
          config?.showScreenLoading &&
            dispatch(setScreenLoading({ show: false, toggleOverFlow: false }))

          const value = data?.rows?.[0]?.elements?.[0]
          if (!value?.duration) return
          onSuccess({
            duration: value.duration.value / (60 * 60),
            distance: value.distance.value / 1000,
          })
        }
      )
    } catch (error) {
      config?.showScreenLoading &&
        dispatch(setScreenLoading({ show: false, toggleOverFlow: false }))

      onError?.()
      console.log(error)
    }
  }

  return { calculateDistanceBetweenTwoCoordinates }
}
