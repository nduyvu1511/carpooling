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
    if (!window?.google) return

    console.log({
      origins: [`${origin.lat},${origin.lng}`],
      destinations: [`${destination.lat},${destination.lng}`],
    })

    const service = new google.maps.DistanceMatrixService()
    try {
      service.getDistanceMatrix(
        {
          origins: [`${origin.lat},${origin.lng}`],
          destinations: [`${destination.lat},${destination.lng}`],
          travelMode: google.maps.TravelMode.DRIVING,
          // transitOptions: TransitOptions,
          // drivingOptions: google.maps.dri,
          // unitSystem: UnitSystem,
          avoidHighways: true,
          avoidTolls: true,
        },
        (data) => {
          const value = data?.rows?.[0]?.elements?.[0]
          console.log(value)
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
