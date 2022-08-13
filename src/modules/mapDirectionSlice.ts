import { DirectionLngLat, LocationSearchHistory } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

export interface LocationHistorySlice {
  searchHistoryList: LocationSearchHistory[]
}

type DirectionsResult = google.maps.DirectionsResult

interface MapDirectionSlice {
  directionsResult: DirectionsResult | undefined
  latLng: DirectionLngLat | undefined
}

const initialState: MapDirectionSlice = {
  directionsResult: undefined,
  latLng: undefined,
}

const mapDirectionSlice = createSlice({
  name: "map_direction_slice",
  initialState,
  reducers: {
    setDirectionsResult: (state, { payload }: { payload: DirectionsResult | undefined }) => {
      state.directionsResult = payload
    },

    setDirectionLatLng: (state, { payload }: { payload: DirectionLngLat | undefined }) => {
      state.latLng = payload
    },
  },
})

export default mapDirectionSlice.reducer
export const { setDirectionsResult, setDirectionLatLng } = mapDirectionSlice.actions
