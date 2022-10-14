import { setToSessionStorage } from "@/helper"
import { CarIdType, ProvinceId, VehicleTypeParams } from "@/models"
import { addressAPI, userAPI } from "@/services"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface CompoundingSlice {
  vehicleTypes: CarIdType[]
  provinces: ProvinceId[]
}

export const fetchVehicles = createAsyncThunk(
  "compounding/fetchVehicles",
  async () => (await userAPI.getCarTypes())?.result?.data
)

export const fetchProvinces = createAsyncThunk(
  "compounding/fetchProvinces",
  async () => (await addressAPI.getProvinces())?.result?.data
)

const initialState: CompoundingSlice = {
  provinces: [],
  vehicleTypes: [],
}

// try {
//   initialState.vehicleTypes = getFromSessionStorage("compounding_vehicleTypes") || []
//   initialState.provinces = getFromSessionStorage("compounding_provinces") || []
// } catch (error) {}

const compoundingCarDataSlice = createSlice({
  name: "compounding",
  initialState,
  reducers: {
    setVehicleTypes: (state, { payload }: { payload: CarIdType[] }) => {
      state.vehicleTypes = payload
      setToSessionStorage("compounding_vehicleTypes", payload)
    },

    setProvinces: (state, { payload }: { payload: ProvinceId[] }) => {
      state.provinces = payload
      setToSessionStorage("compounding_provinces", payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVehicles.fulfilled, (state, { payload }) => {
      const data = payload?.map((item: VehicleTypeParams) => ({
        label: item.name,
        value: item.car_id,
        number_seat: item.number_seat,
      }))
      state.vehicleTypes = data
      setToSessionStorage("compounding_vehicleTypes", data)
    })

    builder.addCase(fetchProvinces.fulfilled, (state, { payload }) => {
      state.provinces = payload
      setToSessionStorage("compounding_provinces", payload)
    })
  },
})

export default compoundingCarDataSlice.reducer
export const { setProvinces, setVehicleTypes } = compoundingCarDataSlice.actions
