import { combineReducers } from "@reduxjs/toolkit"
import { reducer as notificationsReducer } from "reapop"
import commonSlice from "./commonSlice"
import compoundingCarDataSlice from "./compoundingCarDataSlice"
import locationHistorySlice from "./locationHistorySlice"
import mapDirectionSlice from "./mapDirectionSlice"
import profileSlice from "./profileSlice"

const rootReducer = combineReducers({
  notifications: notificationsReducer(),
  common: commonSlice,
  userInfo: profileSlice,
  compoundingCarData: compoundingCarDataSlice,
  locationHistory: locationHistorySlice,
  mapDirection: mapDirectionSlice,
})

export default rootReducer
export * from "./commonSlice"
export * from "./compoundingCarDataSlice"
export * from "./locationHistorySlice"
export * from "./mapDirectionSlice"
export * from "./profileSlice"
