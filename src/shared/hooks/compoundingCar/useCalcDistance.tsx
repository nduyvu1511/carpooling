import { lngLatToKms } from "@/helper"
import { CalcDistanceRes, LatLng, UseParams } from "@/models"

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
  const calculateDistanceBetweenTwoCoordinates = (
    _params: UseParams<CalcDistanceParams, CalcDistanceRes>
  ) => {
    const { params, onSuccess, onError } = _params
    const { origin, destination } = params
    console.log(params)
    if (!window?.google) {
      const distance = lngLatToKms({
        from: origin,
        to: destination,
      })
      onSuccess({
        distance: distance,
        duration: distance / 60,
      })
      return
    }

    const service = new google.maps.DistanceMatrixService()
    try {
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          // transitOptions: TransitOptions,
          // drivingOptions: google.maps.dri,
          // unitSystem: UnitSystem,
          avoidHighways: true,
          avoidTolls: true,
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
      const distance = lngLatToKms({
        from: origin,
        to: destination,
      })
      onSuccess({
        distance: distance,
        duration: distance / 60,
      })
      onError?.()
    }
  }

  return { calculateDistanceBetweenTwoCoordinates }
}
