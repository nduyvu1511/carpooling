import { RootState } from "@/core/store"
import { useChatNotification } from "@/hooks"
import {
  FriendStatusRes,
  MessageRes,
  RoomDetailFunctionHandler,
  RoomDetailRes,
  RoomFunctionHandler,
  RoomRes,
} from "@/models"
import {
  checkForUserDisconnectWhenTyping,
  setCurrentRoomId,
  updateMessageUnreadCount,
} from "@/modules"
import { memo, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Room, RoomDetail } from "../room"

export const Chat = memo(function _Chat() {
  const dispatch = useDispatch()
  const currentRoomId = useSelector((state: RootState) => state.chat.currentRoomId)
  const socket = useSelector((state: RootState) => state.chat.socket)
  const roomDetailRef = useRef<RoomDetailFunctionHandler>(null)
  const roomRef = useRef<RoomFunctionHandler>(null)
  const { createNotification } = useChatNotification()

  useEffect(() => {
    if (!socket?.connected) {
      return
    }

    // Listen to status of friend
    socket.on("friend_login", (user: FriendStatusRes) => {
      roomDetailRef.current?.changeStatusOfRoom({ ...user, type: "login" })
      roomRef.current?.changeStatusOfRoom({ ...user, type: "login" })
    })

    socket.on("friend_logout", (user: FriendStatusRes) => {
      dispatch(checkForUserDisconnectWhenTyping(user.user_id))
      roomDetailRef.current?.changeStatusOfRoom({ ...user, type: "logout" })
      roomRef.current?.changeStatusOfRoom({ ...user, type: "logout" })
    })

    // Message listener
    socket.on("receive_message", (data: MessageRes) => {
      roomDetailRef.current?.appendMessage(data)
      roomRef.current?.changeOrderAndAppendLastMessage(data)

      if (document.hasFocus()) {
        socket.emit("read_message", data)
      } else {
        if (window?.location?.pathname?.includes("/chat")) {
          createNotification(data)
        }
      }
    })

    socket.on("read_all_message", (room_id: string) => {
      roomRef.current?.clearMessagesUnreadFromRoom(room_id)
      dispatch(updateMessageUnreadCount({ room_id: room_id, type: "decrease" }))
    })

    socket.on("partner_read_all_message", (room_id: string) => {
      roomDetailRef.current?.confirmReadAllMessage(room_id)
    })

    socket.on("confirm_read_message", (data: MessageRes) => {
      roomDetailRef.current?.changeMesageStatus(data)
    })

    socket.on("receive_unread_message", (data: MessageRes) => {
      if (window?.location?.pathname?.includes("/chat")) {
        createNotification(data)
      }
      roomRef.current?.messageUnreadhandler(data)
    })

    socket.on("react_message", (payload: MessageRes) => {
      console.log("react message: ", payload)
      roomDetailRef.current?.mutatePartnerReactionMessage(payload)
    })

    socket.on("unreact_message", (payload: MessageRes) => {
      console.log("un react message: ", payload)
      roomDetailRef.current?.mutatePartnerReactionMessage(payload)
    })

    socket.on("create_room", (room: RoomDetailRes) => {
      roomRef.current?.addRoom(room)
      console.log("new room created: ", room)
    })

    socket.on("delete_room", (room_id: string) => {
      roomRef.current?.deleteRoom(room_id)
      console.log("new room deleted: ", room_id)
    })

    socket.on("delete_room_by_compounding_car", (compounding_car_id: number) => {
      roomRef.current?.deleteRoomByCompoundingCarId(compounding_car_id)
      console.log("new room deleted by compounding car: ", compounding_car_id)
    })

    socket.on("member_join_room", (params: any) => {
      // console.log("new member join room: ", params)
    })

    socket.on("member_leave_room", (params: any) => {
      // console.log("new member join room: ", params)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  useEffect(() => {
    return () => {
      dispatch(setCurrentRoomId(undefined))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelectRoom = (room: RoomRes) => {
    dispatch(setCurrentRoomId(room.room_id))
  }

  const handleSendMessage = (params: MessageRes) => {
    roomRef.current?.changeOrderAndAppendLastMessage(params)
  }

  return (
    <section
      className={`chat-wrapper grid md:grid-cols-chat-md lg:grid-cols-chat-lg gap-12 md:gap-16 lg:gap-24 overflow-hidden h-full flex-1`}
    >
      <aside
        className={`chat-room block-element pt-custom pl-custom flex-col ${
          currentRoomId ? "hidden md:flex" : "flex"
        }`}
      >
        <Room ref={roomRef} onSelectRoom={handleSelectRoom} />
      </aside>

      <div
        className={`chat-message block-element overflow-hidden flex-col ${
          !currentRoomId ? "hidden md:flex" : "flex"
        }`}
      >
        <RoomDetail onSendMessage={handleSendMessage} ref={roomDetailRef} />
      </div>
    </section>
  )
})
