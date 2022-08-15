import { DirectionRes } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface MapDirectionSlice {
  directionsResultList: DirectionRes[] | undefined
  directionsResult: DirectionRes | undefined
}

const initialState: MapDirectionSlice = {
  directionsResultList: undefined,
  directionsResult: undefined,
}

const mapDirectionSlice = createSlice({
  name: "map_direction_slice",
  initialState,
  reducers: {
    setDirectionsResult: (state, { payload }: { payload: DirectionRes | undefined }) => {
      state.directionsResult = payload
    },

    clearDirectionsResultList: (state) => {
      state.directionsResultList = []
    },

    addToDirectionsResultList: (state, { payload }: { payload: DirectionRes }) => {
      if (!state?.directionsResultList?.length) {
        state.directionsResultList = [payload]
        return
      }
      state.directionsResultList.push(payload)
    },
  },
})

export default mapDirectionSlice.reducer
export const { addToDirectionsResultList, setDirectionsResult, clearDirectionsResultList } =
  mapDirectionSlice.actions
