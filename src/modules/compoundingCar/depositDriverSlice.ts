import {
  DepositCompoundingCarDriverFailureRes,
  DepositCompoundingCarDriverRes,
  PayloadType,
} from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface CompoundingSlice {
  deposit: DepositCompoundingCarDriverRes | undefined
  isLoading: boolean | undefined
  depositFailure: DepositCompoundingCarDriverFailureRes | undefined
}

const initialState: CompoundingSlice = {
  deposit: undefined,
  depositFailure: undefined,
  isLoading: undefined,
}

const compoundingCarDataSlice = createSlice({
  name: "deposit_driver",
  initialState,
  reducers: {
    setDeposit: (state, { payload }: PayloadType<DepositCompoundingCarDriverRes | undefined>) => {
      // state.deposit = payload
    },
    setDepositLoading: (state, { payload }: PayloadType<boolean>) => {
      // state.isLoading = payload
    },
    setDepositFailure: (
      state,
      { payload }: PayloadType<DepositCompoundingCarDriverFailureRes | undefined>
    ) => {
      // state.depositFailure = payload
    },
    clearDeposit: (state) => {
      ;(state.deposit = undefined),
        (state.depositFailure = undefined),
        (state.isLoading = undefined)
    },
  },
})

export default compoundingCarDataSlice.reducer
export const { setDeposit, setDepositFailure, setDepositLoading, clearDeposit } =
  compoundingCarDataSlice.actions
