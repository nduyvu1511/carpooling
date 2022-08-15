import { RootState } from "@/core/store"
import { isArrayHasValue } from "@/helper"
import { DirectionLngLat, DirectionRes, DirectionsResult, UseParams } from "@/models"
import { setDirectionsResult } from "@/modules"
import { useDispatch, useSelector } from "react-redux"

interface Res {
  addToDirections: (params: DirectionLngLat) => void
  directionsResult: DirectionRes | undefined
  getDirections: (params: UseParams<DirectionLngLat, DirectionsResult>) => void
}

export const useDirections = (): Res => {
  const dispatch = useDispatch()
  const directionsResult = useSelector((state: RootState) => state.mapDirection.directionsResult)
  const directionsResultList = useSelector(
    (state: RootState) => state.mapDirection.directionsResultList
  )

  const getDirections = (_: UseParams<DirectionLngLat, DirectionsResult>) => {
    const { onSuccess, params, onError } = _
    if (!window?.google?.maps?.DirectionsService) return

    new google.maps.DirectionsService().route(
      {
        origin: params.origin,
        destination: params.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          onSuccess?.(result)
        } else {
          onError?.()
        }
      }
    )
  }

  const addToDirections = (params: DirectionLngLat) => {
    if (!isArrayHasValue(directionsResultList)) {
      getDirections({
        params,
        onSuccess: (data) => {
          // console.log("directions back 1: ", data)
          // dispatch(addToDirectionsResultList(data))
          // dispatch(setDirectionsResult(data))
        },
      })

      return
    }

    const directionsResult = directionsResultList?.find(
      ({ request }) =>
        request.origin.location.lat === params.origin.lat &&
        request.origin.location.lng === params.origin.lng &&
        request.destination.location.lat === params.destination.lat &&
        request.destination.location.lng === params.destination.lng
    )
    // console.log({ params })
    // console.log({
    //   directions: directionsResultList?.map((item: DirectionRes) => ({
    //     origin: item.request.origin.location,
    //     destination: item.request.destination.location,
    //   })),
    // })

    // console.log({ "directionsResult found": directionsResult })

    if (directionsResult) {
      dispatch(setDirectionsResult(directionsResult))
      return
    }

    getDirections({
      params,
      onSuccess: (data) => {
        // console.log("directions back 2: ", data)
        // dispatch(addToDirectionsResultList(data))
        // dispatch(setDirectionsResult(data))
      },
    })
  }

  return { addToDirections, directionsResult, getDirections }
}
