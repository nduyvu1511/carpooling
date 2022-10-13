import { useAppDispatch } from "@/core/store"
import { MessageRes, UserRes } from "@/models"
import {
  fetchMessageUnreadCount,
  setChatProfile,
  setSocketInstance,
  updateMessageUnreadCount,
} from "@/modules"
import { userApi } from "@/services"
import { useRouter } from "next/router"
import { io, Socket } from "socket.io-client"
import { useChatNotification } from "./useChatNotification"

interface UseSocketRes {
  connectSocket: (cb?: (socket: Socket) => void) => Promise<Socket<any> | undefined>
}

export const useSocket = (): UseSocketRes => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { createNotification } = useChatNotification()

  // This function only run at first time
  const connectSocket = async () => {
    // token is stored in http only request, so to get token, this is only way to do that
    const res = await userApi.getChatToken()
    const access_token = res.result?.data?.chat_access_token
    if (!access_token) return

    dispatch(fetchMessageUnreadCount())

    const socket = io(process.env.NEXT_PUBLIC_CHAT_SOCKET_URL as string, {
      query: {
        access_token,
      },
    })

    socket.emit("login")

    socket.on("connect", () => {
      if (socket.connected) {
        dispatch(setSocketInstance(socket))

        socket.on("login", (res: UserRes) => {
          dispatch(setChatProfile(res))
        })

        socket.on("receive_unread_message", (data: MessageRes) => {
          dispatch(updateMessageUnreadCount({ room_id: data.room_id, type: "increase" }))
          if (router.pathname !== "/chat") {
            createNotification(data)
          }
        })
      }
    })

    return socket
  }

  return {
    connectSocket,
  }
}
