import { Spinner } from "@/components/loading"
import { useMessage } from "@/hooks"
import { MessageRes, OnResetParams, RoomDetailRes, SendMessageForm } from "@/models"
import { chatApi } from "@/services"
import { AxiosResponse } from "axios"
import { useEffect, useRef } from "react"
import { Socket } from "socket.io-client"
import useSWR from "swr"
import { Message, MessageForm } from "../message"
import { RoomHeader } from "./roomHeader"

interface RoomDetailProps {
  roomId: string
  socket: Socket<any>
}

export const RoomDetail = ({ roomId, socket }: RoomDetailProps) => {
  const messageFormRef = useRef<OnResetParams>(null)
  const { data, isValidating, error, mutate } = useSWR(
    roomId ? `get_room_detail_${roomId}` : null,
    roomId
      ? () => chatApi.getRoomDetail(roomId).then((res: AxiosResponse<RoomDetailRes>) => res?.data)
      : null
  )
  const {
    appendMessage,
    sendMessage,
    data: messages,
  } = useMessage({ roomId, initialData: data?.messages })

  const handleSendMessage = (val: SendMessageForm) => {
    if (!roomId) return
    sendMessage({
      params: { ...val, room_id: roomId },
      onSuccess: (data) => {
        socket.emit("send_message", data)
        messageFormRef?.current?.onReset()
      },
    })
    // socket.emit("client_send_message", val)
  }

  useEffect(() => {
    if (!roomId) return
    // socket.emit(roomId, roomId)

    socket.emit("join_room", roomId)

    socket.on(`receive_message`, (data: MessageRes) => {
      appendMessage({ ...data, is_author: false })
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col flex-1 chat-message">
      {data === undefined && error === undefined ? (
        <Spinner />
      ) : (
        <>
          <div className="h-[46px] mb-12">
            <RoomHeader data={data as any} />
          </div>

          <div className="flex-1">
            {messages?.data?.length ? <Message data={messages} /> : <p>Chưa có tin nhắn nào</p>}
          </div>

          <div className="h-[78px] flex items-center">
            <MessageForm ref={messageFormRef} onSubmit={handleSendMessage} />
          </div>
        </>
      )}
    </div>
  )
}
