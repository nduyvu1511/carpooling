import { ListRes, RoomRes, UseQueryListRes } from "@/models"
import { chatApi } from "@/services"
import { useQueryList } from "../async"

export const useRoom = (): UseQueryListRes<ListRes<RoomRes[]>> => {
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
  }
}
