import { InputSearch } from "@/components"
import { useRoom } from "@/hooks"
import { RoomFunctionHandler, RoomRes } from "@/models"
import { ForwardedRef, forwardRef, useImperativeHandle } from "react"
import { RoomItem } from "./roomItem"

export type OnForwaredRoomDetail = ForwardedRef<RoomFunctionHandler>

interface RoomProps {
  onSelectRoom?: (room: RoomRes) => void
  roomId?: string
}

export const Room = forwardRef(function RoomChild(
  { onSelectRoom, roomId }: RoomProps,
  ref: OnForwaredRoomDetail
) {
  const {
    data,
    changeStatusOfRoom,
    messageUnreadhandler,
    increaseMessageUnread,
    setCurrentRoomToFirstOrder,
    appendLastMessage,
  } = useRoom()

  useImperativeHandle(ref, () => ({
    messageUnreadhandler: (mes) => {
      messageUnreadhandler(mes)
    },
    changeStatusOfRoom: (params) => {
      changeStatusOfRoom(params)
    },
    increaseMessageUnread: (params) => {
      increaseMessageUnread(params)
    },
    setCurrentRoomToFirstOrder: (params) => {
      setCurrentRoomToFirstOrder(params)
    },
    appendLastMessage: (params) => {
      appendLastMessage(params)
    },
  }))

  return (
    <div className="chat-room flex-1 flex flex-col">
      <div className="h-[48px] mb-24 pr-12">
        <InputSearch
          onChange={(e) => console.log(e)}
          attributes={{ placeholder: "Tìm kiếm bằng tên hoặc mã chuyến đi" }}
        />
      </div>

      {data && data?.data?.length > 0 ? (
        <div className="flex-1 overflow-auto chat-room-list pr-12">
          <div className="">
            <p className="text-base font-semibold mb-16">Tin nhắn</p>

            <div className="">
              {data.data.map((item) => (
                <RoomItem
                  isActive={item.room_id === roomId}
                  onSelectRoom={onSelectRoom}
                  key={item.room_id}
                  data={item}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
})
