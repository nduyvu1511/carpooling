import { LocationSearchHistory } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

export interface LocationHistorySlice {
  searchHistoryList: LocationSearchHistory[]
}

const initialState: LocationHistorySlice = {
  searchHistoryList: [],
}

const locationSlice = createSlice({
  name: "location_history",
  initialState,
  reducers: {
    addLocationSearchHistory: (state, { payload }: { payload: LocationSearchHistory }) => {
      if (state.searchHistoryList?.some((item) => item.id === payload.id)) {
        const newSearchHistory = [...state.searchHistoryList].filter(
          (item) => item.id !== payload.id
        )
        state.searchHistoryList = [payload, ...newSearchHistory]
        return
      }

      if (state.searchHistoryList?.length < 10) {
        state.searchHistoryList.unshift(payload)
      } else {
        state.searchHistoryList.pop()
        state.searchHistoryList.unshift(payload)
      }
    },
  },
})

export default locationSlice.reducer
export const { addLocationSearchHistory } = locationSlice.actions
