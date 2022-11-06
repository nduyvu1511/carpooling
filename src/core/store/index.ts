import { AnyAction, configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk, { ThunkDispatch } from "redux-thunk"
import rootReducer from "../../modules"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userInfo", "locationHistory", "mapDirection", "checkout", "roomHistory"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
})

export default store
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
