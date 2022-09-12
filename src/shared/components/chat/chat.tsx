import { RoomRes } from "@/models"
import { useEffect, useState } from "react"
import io from "socket.io-client"
import { Spinner } from "../loading"
import { Room, RoomDetail } from "./room"

const socket = io(process.env.NEXT_PUBLIC_CHAT_SOCKET_URL as string)

export const Chat = () => {
  const [roomId, setRoomId] = useState<string | undefined>()
  const [isConnected, setConnected] = useState<boolean>(false)

  const handleSelectRoom = (room: RoomRes) => {
    // if (roomId === room.room_id) return
    setRoomId(room.room_id)
  }

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true)
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log({ isConnected })

  if (!isConnected) return <Spinner size={36} />
  return (
    <section className="grid grid-cols-chat-lg gap-24 overflow-hidden flex-1">
      <aside className="block-element p-24 pr-12 flex flex-col">
        <Room roomId={roomId} onSelectRoom={handleSelectRoom} />
      </aside>
      <div className="block-element pl-24 pt-12 pr-12 pb-0 flex flex-col">
        {roomId && isConnected ? (
          <RoomDetail socket={socket} roomId={roomId} />
        ) : (
          <div className="flex-1 flex-center text-base">
            Chọn cuộc hội thoại để bắt đầu trò chuyện
          </div>
        )}
      </div>
    </section>
  )
}
