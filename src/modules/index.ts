import { combineReducers } from "@reduxjs/toolkit"
import { reducer as notificationsReducer } from "reapop"
import commonSlice from "./commonSlice"
import compoundingCarDataSlice from "./compoundingCarDataSlice"
import locationHistorySlice from "./locationHistorySlice"
import profileSlice from "./profileSlice"

const rootReducer = combineReducers({
  notifications: notificationsReducer(),
  common: commonSlice,
  userInfo: profileSlice,
  compoundingCarData: compoundingCarDataSlice,
  locationHistory: locationHistorySlice,
})

export default rootReducer
export * from "./commonSlice"
export * from "./compoundingCarDataSlice"
export * from "./locationHistorySlice"
export * from "./profileSlice"
