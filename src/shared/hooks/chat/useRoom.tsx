import {
  changeUserStatusParams,
  LastMessage,
  ListRes,
  RoomFunctionHandler,
  RoomRes,
  UseQueryListRes,
} from "@/models"
import { chatApi } from "@/services"
import produce from "immer"
import { useQueryList } from "../async"

type UseRoomRes = UseQueryListRes<ListRes<RoomRes[]>> & RoomFunctionHandler

export const useRoom = (): UseRoomRes => {
  const {
    isValidating,
    mutate,
    data,
    error,
    fetchMoreItem,
    filterList,
    hasMore,
    isFetchingMore,
    isInitialLoading,
    offset,
  } = useQueryList<ListRes<RoomRes[]>>({
    fetcher: chatApi.getRoomList,
    initialData: undefined,
    key: "get_room_list",
    limit: 30,
  })

  const messageUnreadhandler = (params: LastMessage) => {
    if (!data?.data?.length) return

    const index = getRoomIndex(params.room_id)
    if (index === -1) {
      mutate()
      return
    }

    mutate(
      produce(data, (draft) => {
        const room = draft.data[index]
        if (data.data?.[0]?.room_id === params.room_id) {
          draft.data[index] = {
            ...room,
            last_message: params,
            message_unread_count: room.message_unread_count + 1,
          }
        } else {
          console.log("change order")
          const newRooms = draft.data.filter((item) => item.room_id !== params.room_id)
          draft.data = [
            { ...room, last_message: params, message_unread_count: room.message_unread_count + 1 },
            ...newRooms,
          ]
        }
      }),
      false
    )

    setTimeout(() => {
      increaseMessageUnread(params)
    }, 0)
    setTimeout(() => {
      if (data?.data?.[0]?.room_id !== params.room_id) {
        setCurrentRoomToFirstOrder(params)
      }
    }, 1)
  }

  const getRoomIndex = (roomId: string): number =>
    data && data?.data?.length > 0 ? data.data.findIndex((item) => item.room_id === roomId) : -1

  const increaseMessageUnread = (params: LastMessage) => {
    if (!data?.data?.length) return
    mutate(
      produce(data, (draft) => {
        const index = getRoomIndex(params.room_id)
        if (index === -1) return
        draft.data[index].message_unread_count += 1
      }),
      false
    )
  }

  const appendLastMessage = (params: LastMessage) => {
    if (!data?.data?.length) return

    mutate(
      produce(data, (draft) => {
        const index = getRoomIndex(params.room_id)
        if (index === -1) return
        draft.data[index].last_message = params
      }),
      false
    )
  }

  const setCurrentRoomToFirstOrder = (params: LastMessage) => {
    if (!data?.data?.length) return
    if (data?.data?.[0]?.room_id === params.room_id) return
    console.log("setCurrentRoomToFirstOrder")
    mutate(
      produce(data, (draft) => {
        const newRooms = draft.data.filter((item) => item.room_id !== params.room_id)
        const room = draft.data.find((item) => item.room_id === params.room_id)
        if (!room) return
        draft.data = [{ ...room, last_message: params }, ...newRooms]
      }),
      false
    )
  }

  const changeStatusOfRoom = (params: changeUserStatusParams) => {
    if (!data?.data?.length) return

    mutate()
    // produce(data, (draft) => {
    //   const rooms = data.data.filter((item) => {
    //     // item.member
    //   })
    // }),
  }

  return {
    data,
    error,
    fetchMoreItem,
    filterList,
    hasMore,
    isFetchingMore,
    isInitialLoading,
    isValidating,
    mutate,
    offset,
    appendLastMessage,
    changeStatusOfRoom,
    messageUnreadhandler,
    setCurrentRoomToFirstOrder,
    increaseMessageUnread,
  }
}
