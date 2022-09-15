import { PayloadType, UserData } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface ChatSlice {
  isTyping: boolean
  userData: UserData | undefined
}

const initialState: ChatSlice = {
  isTyping: false,
  userData: undefined,
}

const chatSlice = createSlice({
  name: "chat_slice",
  initialState,
  reducers: {
    setTyping: (state, { payload }: PayloadType<boolean>) => {
      state.isTyping = payload
    },
    setUserData: (state, { payload }: PayloadType<UserData | undefined>) => {
      state.userData = payload
    },
  },
})

export default chatSlice.reducer
export const { setTyping, setUserData } = chatSlice.actions
