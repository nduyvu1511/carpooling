import { LoginToSocket, UserData } from "@/models"
import { chatApi } from "@/services"

// interface LoginToSocketParams {
//   params: LoginToSocket
//   onMessagesCome?: (params: MessageRes) => void

// }

interface UseChatRes {
  loginToSocket: (_: LoginToSocket) => Promise<UserData | null>
}

export const useChat = (): UseChatRes => {
  const loginToSocket = async (): Promise<UserData | null> => {
    try {
      const res = await chatApi.loginToSocket()
      const user: UserData = res.data
      return user
    } catch (error) {
      console.log(error)
      return null
    }
  }

  return {
    loginToSocket,
  }
}
