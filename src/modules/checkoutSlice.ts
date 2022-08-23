import { PayloadType } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface checkoutSliceParams {
  currentPaymentId: number | undefined
  doesCustomerDepositSuccess: boolean | undefined
}

const initialState: checkoutSliceParams = {
  currentPaymentId: undefined,
  doesCustomerDepositSuccess: undefined,
}

const checkoutSlice = createSlice({
  name: "checkout_slice",
  initialState,
  reducers: {
    setCheckoutPaymentId: (state, { payload }: PayloadType<number | undefined>) => {
      state.currentPaymentId = payload
    },

    setCustomerDepositSuccess: (state, { payload }: PayloadType<boolean | undefined>) => {
      state.doesCustomerDepositSuccess = payload
    },
  },
})

export default checkoutSlice.reducer
export const { setCheckoutPaymentId } = checkoutSlice.actions
