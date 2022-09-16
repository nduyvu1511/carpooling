import { MESSAGES_LIMIT } from "@/helper"
import { ListRes, MessageRes, SendMessage, UseParams } from "@/models"
import { chatApi } from "@/services"
import produce from "immer"
import useSWR from "swr"

interface UseMessageRes {
  data: ListRes<MessageRes[]> | undefined
  isValidating: boolean
  isFirstLoading: boolean
  getMoreMessages: Function
  sendMessage: (params: UseParams<SendMessage, MessageRes>) => void
  appendMessage: (params: MessageRes) => void
  confirmReadMessage: (params: MessageRes) => void
  confirmReadAllMessageInRoom: (params: string) => void
}

interface UseMessageProps {
  roomId: string | undefined
  initialData: ListRes<MessageRes[]> | undefined
}

export const useMessage = ({ initialData, roomId }: UseMessageProps): UseMessageRes => {
  const { isValidating, mutate, data, error } = useSWR<ListRes<MessageRes[]>>(
    `get_messages_in_room_${roomId}`,
    null,
    {
      fallbackData: initialData,
      revalidateOnMount: false,
    }
  )

  const getMoreMessages = async (roomId: string) => {
    if (!roomId) return
    try {
      const res = await chatApi.getMessagesInRoom({
        offset: 0,
        limit: MESSAGES_LIMIT,
        room_id: roomId,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const appendMessage = (params: MessageRes) => {
    mutate(
      produce(data, (draft) => {
        ;(draft?.data || []).push(params)
        ;(draft as any).offset += 1
        ;(draft as any).total += 1
      }),
      false
    )
  }

  const findMessageIndex = (message_id: string): number => {
    const index =
      data && data?.data?.length > 0
        ? data?.data.findIndex((item) => item.message_id === message_id) || -1
        : -1

    if (index === -1) mutate()

    return index
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

  const confirmReadMessage = async (params: MessageRes) => {
    if (!data?.data?.length) return

    const index = findMessageIndex(params.message_id)
    if (index === -1) return
    if (data.data[index].is_read) return

    mutate(
      produce(data, (draft) => {
        draft.data[index].is_read = true
      })
    )
  }

  const confirmReadAllMessageInRoom = async (roomId: string, cb?: Function) => {
    if (!data?.data?.length) return

    const res: any = chatApi.confirmReadAllMessageInRoom(roomId)
    if (res?.success) {
      mutate(
        produce(data, (draft) => {
          draft.data[draft.data.length - 1].is_read = true
        })
      )
    }
  }

  return {
    data,
    getMoreMessages,
    isFirstLoading: error === undefined && data === undefined,
    isValidating,
    sendMessage,
    appendMessage,
    confirmReadMessage,
    confirmReadAllMessageInRoom,
  }
}
