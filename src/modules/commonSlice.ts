import { toggleBodyOverflow } from "@/helper"
import { AuthModalType, AuthModalTypeSlice, PayloadType } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface CommonSliceParams {
  isScreenLoading: boolean
  authModalType: AuthModalTypeSlice
  isShowSummaryDetail: boolean
  isLoadedGoogleMap: boolean
}

const initialState: CommonSliceParams = {
  isScreenLoading: false,
  authModalType: undefined,
  isShowSummaryDetail: false,
  isLoadedGoogleMap: false,
}

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setScreenLoading: (
      state,
      {
        payload: { show, toggleOverFlow = true },
      }: { payload: { show: boolean; toggleOverFlow?: boolean } }
    ) => {
      state.isScreenLoading = show
      if (!toggleOverFlow) return
      if (show) {
        toggleBodyOverflow("hidden")
      } else {
        toggleBodyOverflow("unset")
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

    setLoadedGoogleMap: (state, { payload }: PayloadType<boolean>) => {
      state.isLoadedGoogleMap = payload
    },
  },
})

export default commonSlice.reducer
export const { setScreenLoading, setAuthModalType, setShowSummaryDetail, setLoadedGoogleMap } =
  commonSlice.actions
