import { Spinner } from "@/components/loading"
import { useMessage } from "@/hooks"
import { OnResetParams, RoomDetailFunctionHandler, RoomDetailRes, SendMessageForm } from "@/models"
import { chatApi } from "@/services"
import { AxiosResponse } from "axios"
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { Socket } from "socket.io-client"
import useSWR, { mutate } from "swr"
import { Message, MessageForm } from "../message"
import { RoomHeader } from "./roomHeader"
import produce from "immer"

type OnForwaredRoomDetail = ForwardedRef<RoomDetailFunctionHandler>

interface RoomDetailProps {
  roomId: string
  socket: Socket | undefined
}

export const RoomDetail = forwardRef(function RoomChild(
  { roomId, socket }: RoomDetailProps,
  ref: OnForwaredRoomDetail
) {
  const [isTyping, setTyping] = useState<boolean>(false)
  const messageFormRef = useRef<OnResetParams>(null)
  const {
    data,
    isValidating,
    error,
    mutate: mutateRoomDetail,
  } = useSWR(
    roomId ? `get_room_detail_${roomId}` : null,
    roomId
      ? () =>
          chatApi.getRoomDetail(roomId).then((res: AxiosResponse<RoomDetailRes>) => {
            const data = res?.data
            mutate(`get_messages_in_room_${roomId}`, data.messages, false)
            return data
          })
      : null
  )
  const {
    appendMessage,
    sendMessage,
    confirmReadMessage,
    data: messages,
    confirmReadAllMessageInRoom,
  } = useMessage({ roomId, initialData: data?.messages })

  useImperativeHandle(ref, () => ({
    appendMessage: (mes) => {
      appendMessage(mes)
    },
    changeStatusOfRoom: (params) => {
      if (!data) return
      console.log(data.members?.data)
      if (params.type === "logout") {
        if (data.members.data?.length === 2) {
          mutateRoomDetail(
            produce(data, (draft) => {
              draft.is_online = false
              draft.offline_at = new Date()
            }),
            false
          )
        }
      } else {
        mutateRoomDetail(
          produce(data, (draft) => {
            draft.is_online = true
          }),
          false
        )
      }
    },
    changeMesageStatus: async (params) => {
      confirmReadMessage(params)
    },
  }))

  useEffect(() => {
    if (!data?.messages?.data?.length) return
    const lastMessage = data?.messages?.data?.[data?.messages?.data?.length - 1]
    if (lastMessage.is_author || lastMessage.is_read) return

    confirmReadAllMessageInRoom(roomId)
    if (!socket) return
    socket.emit("read_message", lastMessage)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.messages?.data, roomId])

  useEffect(() => {
    ;(document?.querySelector(".message-form-input") as HTMLInputElement)?.focus()
  }, [roomId])

  const handleSendMessage = (val: SendMessageForm) => {
    if (!roomId) return
    sendMessage({
      params: { ...val, room_id: roomId },
      onSuccess: (data) => {
        messageFormRef?.current?.onReset()
        if (socket) {
          socket.emit("send_message", data)
        }
      },
    })
  }

  const typingHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!socket) return

    if (!isTyping) {
      // socket.emit("start_typing", roomId)
      setTyping(true)
    }
    const lastTypingTime = new Date().getTime()
    const timerLength = 3000
    const timeout = setTimeout(() => {
      const timeNow = new Date().getTime()
      const timeDiff = timeNow - lastTypingTime
      if (timeDiff >= timerLength && isTyping) {
        // socket.emit("stop_typing", roomId)
        setTyping(false)
      }
    }, timerLength)

    clearTimeout(timeout)
  }

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
            <MessageForm
              onChange={typingHandler}
              ref={messageFormRef}
              onSubmit={handleSendMessage}
            />
          </div>
        </>
      )}
    </div>
  )
})
