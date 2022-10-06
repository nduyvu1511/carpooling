import { combineReducers } from "@reduxjs/toolkit"
import { reducer as notificationsReducer } from "reapop"
import chatSlice from "./chatSlice"
import checkoutSlice from "./checkoutSlice"
import commonSlice from "./commonSlice"
import compoundingCarDataSlice from "./compoundingCarDataSlice"
import locationHistorySlice from "./locationHistorySlice"
import mapDirectionSlice from "./mapDirectionSlice"
import profileSlice from "./profileSlice"
import roomHistorySlice from "./roomHistorySlice"

const rootReducer = combineReducers({
  notifications: notificationsReducer(),
  common: commonSlice,
  userInfo: profileSlice,
  compoundingCarData: compoundingCarDataSlice,
  locationHistory: locationHistorySlice,
  mapDirection: mapDirectionSlice,
  checkout: checkoutSlice,
  chat: chatSlice,
  roomHistory: roomHistorySlice,
})

export default rootReducer
export * from "./chatSlice"
export * from "./checkoutSlice"
export * from "./commonSlice"
export * from "./compoundingCarDataSlice"
export * from "./locationHistorySlice"
export * from "./mapDirectionSlice"
export * from "./profileSlice"
export * from "./roomHistorySlice"
