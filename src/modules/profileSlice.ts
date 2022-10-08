import { UserInfo } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface profileSlice {
  userInfo: UserInfo | undefined
  msgUnreadCount: number | undefined
}

const initialState: profileSlice = {
  userInfo: undefined,
  msgUnreadCount: undefined,
}

const profileSlice = createSlice({
  name: "user_info",
  initialState,
  reducers: {
    setProfile: (state, { payload }: { payload: UserInfo | undefined }) => {
      state.userInfo = payload
    },

    setMessageUnreadCount: (state, { payload }: { payload: number | undefined }) => {
      state.msgUnreadCount = payload
    },
  },
})

export const { setProfile, setMessageUnreadCount } = profileSlice.actions

export default profileSlice.reducer
