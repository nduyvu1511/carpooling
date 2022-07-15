import { lngLatToKms } from "@/helper"
import { LatLng, UseParams } from "@/models"

interface CalcDistanceParams {
  origin: LatLng
  destination: LatLng
}

interface Res {
  calculateDistanceBetweenTwoCoordinates: (params: UseParams<CalcDistanceParams, number>) => void
}

export const useCalcDistance = (): Res => {
  const calculateDistanceBetweenTwoCoordinates = (
    _params: UseParams<CalcDistanceParams, number>
  ) => {
    const { params, onSuccess, onError } = _params
    const { origin, destination } = params
    console.log(params)
    if (!window?.google) {
      const distance = lngLatToKms({
        from: origin,
        to: destination,
      })
      onSuccess(distance)
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
          console.log({ data })
          const distance = data?.rows?.[0]?.elements?.[0]?.distance?.value
          onSuccess(distance || 100)
        }
      )
    } catch (error) {
      const distance = lngLatToKms({
        from: origin,
        to: destination,
      })
      onSuccess(distance)
      onError?.()
    }
  }

  return { calculateDistanceBetweenTwoCoordinates }
}
