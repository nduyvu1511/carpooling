import { useChat } from "@/hooks"
import {
  MessageRes,
  RoomDetailFunctionHandler,
  RoomFunctionHandler,
  RoomRes,
  UserData,
} from "@/models"
import { setTyping } from "@/modules"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
// import io, { Socket } from "socket.io-client"
import { Spinner } from "../loading"
import { Room, RoomDetail } from "./room"

export const Chat = () => {
  const dispatch = useDispatch()
  const { loginToSocket } = useChat()

  const [roomId, setRoomId] = useState<string | undefined>()
  const [isConnected, setConnected] = useState<boolean>(false)
  // const socketIo = useRef<Socket>()
  const roomDetailRef = useRef<RoomDetailFunctionHandler>(null)
  const roomRef = useRef<RoomFunctionHandler>(null)

  // useEffect(() => {
  //   // Connect to socket
  //   const socket = io(process.env.NEXT_PUBLIC_CHAT_SOCKET_URL as string)
  //   socketIo.current = socket
  //   socket.on("connect", async () => {
  //     setConnected(true)
  //     if (!socket.id) return

  //     const user = await loginToSocket({ socket_id: socket.id })
  //     if (!user?.user_id) return
  //     socket.emit("login", user)

  //     // Listen to friend status
  //     socket.on("login", (user: UserData) => {
  //       roomRef.current?.changeStatusOfRoom({ is_online: true, user_id: user.user_id })
  //     })
  //     socket.on("logout", (user: UserData) => {
  //       roomRef.current?.changeStatusOfRoom({ is_online: true, user_id: user.user_id })
  //     })

  //     // receive message when you currently in room
  //     socket.on(`receive_message`, (data: MessageRes) => {
  //       console.log("receive_message")
  //       roomDetailRef.current?.appendMessage(data)
  //     })
  //     // Listen to message when you are not in, append it as last message in room
  //     socket.on("receive_unread_message", (data: MessageRes) => {
  //       console.log("receive_unread_message")
  //       roomRef.current?.messageUnreadhandler(data)
  //       // roomRef.current?.increaseMessageUnread(data)
  //     })

  //     // Typing listener
  //     socket.on("start_typing", () => {
  //       dispatch(setTyping(true))
  //     })
  //     socket.on("stop_typing", () => {
  //       dispatch(setTyping(false))
  //     })
  //   })

  //   return () => {
  //     socket.emit("logout", "631ac1558f56544cbc01a26d")
  //     socket.off("connect")
  //     socket.off("disconnect")
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const handleSelectRoom = (room: RoomRes) => {
  //   if (roomId === room.room_id) return

  //   setRoomId(room.room_id)

  //   if (!socketIo.current?.id) return
  //   const socket = socketIo.current
  //   if (roomId) {
  //     socket.emit("leave_room", roomId)
  //   }
  //   socket.emit("join_room", room.room_id)
  // }

  if (!isConnected) return <Spinner size={36} />
  return (
    <section className="grid grid-cols-chat-lg gap-24 overflow-hidden flex-1">
      {/* <aside className="block-element p-24 pr-12 flex flex-col">
        <Room ref={roomRef} roomId={roomId} onSelectRoom={handleSelectRoom} />
      </aside>
      <div className="block-element pl-24 pt-12 pr-12 pb-0 flex flex-col">
        {roomId && isConnected ? (
          <RoomDetail socket={socketIo.current} ref={roomDetailRef} roomId={roomId} />
        ) : (
          <div className="flex-1 flex-center text-base">
            Chọn cuộc hội thoại để bắt đầu trò chuyện
          </div>
        )}
      </div> */}
    </section>
  )
}
