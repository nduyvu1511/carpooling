import { MESSAGES_LIMIT } from "@/helper"
import { ListRes, MessageRes, SendMessage, UseParams } from "@/models"
import { chatApi } from "@/services"
import produce from "immer"
import { useState } from "react"
import useSWR from "swr"

interface UseMessageRes {
  data: ListRes<MessageRes[]> | undefined
  isValidating: boolean
  isFirstLoading: boolean
  getMoreMessages: Function
  sendMessage: (params: UseParams<SendMessage, MessageRes>) => void
  appendMessage: (params: MessageRes) => void
}

interface UseMessageProps {
  roomId: string | undefined
  initialData: ListRes<MessageRes[]> | undefined
}

export const useMessage = ({ initialData, roomId }: UseMessageProps): UseMessageRes => {
  const [offset, setOffset] = useState<number>(0)
  const { isValidating, mutate, data, error } = useSWR<ListRes<MessageRes[]>>(
    `get_messages_in_room_${roomId}`,
    roomId
      ? () =>
          chatApi
            .getMessagesInRoom({ room_id: roomId, limit: MESSAGES_LIMIT, offset: 0 })
            .then((res) => res.data)
      : null,
    {
      fallbackData: initialData,
      revalidateOnMount: false,
    }
  )

  const getMoreMessages = async (roomId: string) => {
    if (!roomId) return
    try {
      const res = await chatApi.getMessagesInRoom({
        offset: offset + MESSAGES_LIMIT,
        limit: MESSAGES_LIMIT,
        room_id: roomId,
      })
      console.log({ messages: res.data })
    } catch (error) {
      console.log(error)
    }
  }

  const appendMessage = (params: MessageRes) => {
    console.log("append message")
    if (!data) return
    setOffset(offset + 1)

    mutate(
      produce(data, (draft) => {
        console.log({ draft: draft.data })
        draft?.data?.push(params)
      }),
      false
    )
  }

  const sendMessage = async (_: UseParams<SendMessage, MessageRes>) => {
    const { onSuccess, params, config, onError } = _
    try {
      const res: any = await chatApi.sendMessage(params)

      if (res?.success) {
        appendMessage(res.data)
        onSuccess?.(res.data)
      } else {
        onError?.()
      }
    } catch (error) {
      onError?.()
      console.log(error)
    }
  }

  return {
    data,
    getMoreMessages,
    isFirstLoading: error === undefined && data === undefined,
    isValidating,
    sendMessage,
    appendMessage,
  }
}
