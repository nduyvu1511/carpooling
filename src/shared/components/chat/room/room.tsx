import { InputSearch, Spinner } from "@/components"
import { RootState } from "@/core/store"
import { useRoom } from "@/hooks"
import { RoomFunctionHandler, RoomRes } from "@/models"
import { setCurrentRoomId } from "@/modules"
import { useRouter } from "next/router"
import { ForwardedRef, useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useDispatch, useSelector } from "react-redux"
import { RoomItem } from "./roomItem"
import { RoomSearch } from "./roomSearch"

export type OnForwaredRoomDetail = ForwardedRef<RoomFunctionHandler>

export const Room = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const room_id = router.query.room_id?.toString()
  const roomId = useSelector((state: RootState) => state.chat.currentRoomId) as string
  const socket = useSelector((state: RootState) => state.chat.socket)

  const [showSearch, setShowSearch] = useState<boolean>()

  const {
    data,
    clearMessagesUnreadFromRoom,
    fetchMoreRooms,
    isFetchingMore,
    hasMore,
    isFirstLoading,
    socketHandler,
  } = useRoom(roomId)

  useEffect(() => {
    if (!data?.data?.length || !room_id || room_id === roomId) return
    dispatch(setCurrentRoomId(room_id))
  }, [room_id, roomId, dispatch, data])

  useEffect(() => {
    if (!data?.data?.length || !roomId) return
    clearMessagesUnreadFromRoom(roomId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId])

  // Handle with socket
  useEffect(() => {
    if (!socket) return
    socketHandler(socket)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  const handleSelectRoom = (room: RoomRes) => {
    dispatch(setCurrentRoomId(room.room_id))
  }

  return (
    <div className="chat-room h-full flex-1 flex flex-col relative">
      {showSearch ? (
        <div className="bg-white-color z-10 flex flex-col flex-1 pr-12 md:pr-16 lg:pr-24">
          <RoomSearch
            currentRoomSelected={roomId}
            onSelectRoom={handleSelectRoom}
            onClose={() => setShowSearch(false)}
            onOpen={() => setShowSearch(true)}
          />
        </div>
      ) : (
        <>
          <div className="h-[48px] pr-12 md:pr-16 lg:pr-24 mb-12 md:mb-16 lg:mb-24 chat-room-search">
            <InputSearch
              attributes={{ placeholder: "Tìm kiếm" }}
              onFocus={() => setShowSearch(true)}
            />
          </div>

          {isFirstLoading ? (
            <>
              <RoomItem data={null} />
              <RoomItem data={null} />
              <RoomItem data={null} />
              <RoomItem data={null} />
              <RoomItem data={null} />
            </>
          ) : data && data?.data?.length > 0 ? (
            <div className="flex-1 flex flex-col chat-room-list md:pr-12">
              <div className="flex-1 overflow-y-auto pr-12" id="scrollableDiv">
                <InfiniteScroll
                  scrollableTarget="scrollableDiv"
                  loader={isFetchingMore ? <Spinner /> : null}
                  hasMore={hasMore}
                  next={() => fetchMoreRooms()}
                  dataLength={data?.data?.length}
                >
                  {data.data.map((item) => (
                    <RoomItem
                      className="last:mb-12"
                      isActive={item.room_id === roomId}
                      onSelectRoom={handleSelectRoom}
                      key={item.room_id}
                      data={item}
                    />
                  ))}
                </InfiniteScroll>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
