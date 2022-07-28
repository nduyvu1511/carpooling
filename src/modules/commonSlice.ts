import { toggleBodyOverflow } from "@/helper"
import { AuthModalType, PayloadType } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface CommonSliceParams {
  isScreenLoading: boolean
  authModalType: AuthModalType | undefined
  isShowSummaryDetail: boolean
}

const initialState: CommonSliceParams = {
  isScreenLoading: false,
  authModalType: undefined,
  isShowSummaryDetail: false,
}

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setScreenLoading: (state, { payload }: PayloadType<boolean>) => {
      state.isScreenLoading = payload
      try {
        if (payload) {
          toggleBodyOverflow("hidden")
        } else {
          toggleBodyOverflow("unset")
        }
      } catch (error) {
        console.log(error)
      }
    },

    setAuthModalType: (state, { payload }: PayloadType<AuthModalType | undefined>) => {
      if (payload === undefined) {
        toggleBodyOverflow("unset")
      } else {
        toggleBodyOverflow("hidden")
      }
      state.authModalType = payload
    },

    setShowSummaryDetail: (state, { payload }: PayloadType<boolean>) => {
      if (!payload) {
        toggleBodyOverflow("unset")
      } else {
        toggleBodyOverflow("hidden")
      }
      state.isShowSummaryDetail = payload
    },
  },
})

export default commonSlice.reducer
export const { setScreenLoading, setAuthModalType, setShowSummaryDetail } = commonSlice.actions
