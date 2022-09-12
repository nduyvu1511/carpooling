import { InputSearch } from "@/components"
import { useRoom } from "@/hooks"
import { RoomRes } from "@/models"
import { RoomItem } from "./roomItem"
import { Socket } from "socket.io-client"
import { useEffect } from "react"

interface RoomProps {
  onSelectRoom?: (room: RoomRes) => void
  roomId?: string
  // socket: Socket<any>
}

export const Room = ({ onSelectRoom, roomId }: RoomProps) => {
  const { data, fetchMoreItem, filterList, mutate } = useRoom()

  // useEffect(() => {
  //   if (!data?.data?.length) return
  //   data.data.forEach((item) => {
  //     socket.emit(item.room_id)
  //   })
  // }, [data?.data])

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
}
