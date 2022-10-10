import { Spinner } from "@/components"
import { RootState } from "@/core/store"
import { getMessageDescription } from "@/helper"
import {
  FriendStatusRes,
  MessageRes,
  RoomDetailFunctionHandler,
  RoomFunctionHandler,
  RoomRes,
  RoomTypingRes,
  UserRes,
} from "@/models"
import {
  checkForUserDisconnectWhenTyping,
  setChatProfile,
  setCurrentRoomId,
  setCurrentTyping,
} from "@/modules"
import { memo, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Room, RoomDetail } from "../room"

export const Chat = memo(function _Chat() {
  const dispatch = useDispatch()
  const roomDetailRef = useRef<RoomDetailFunctionHandler>(null)
  const roomRef = useRef<RoomFunctionHandler>(null)
  const currentRoomId = useSelector((state: RootState) => state.chat.currentRoomId)
  // const access_token = useSelector((state: RootState) => state.chat.accessToken)
  const [isConnected, setConnected] = useState<boolean>(false)
  const socket = useSelector((state: RootState) => state.chat.socket)

  const createNotification = (data: MessageRes) => {
    Notification.requestPermission().then((per) => {
      if (per === "granted") {
        const notification = new Notification(data?.author?.author_name || "Tin nhắn mới", {
          badge: data.author?.author_avatar?.thumbnail_url,
          icon: data.author?.author_avatar?.thumbnail_url,
          body: getMessageDescription(data),
          tag: data.room_id,
        })

        notification.addEventListener("click", () => {
          if (currentRoomId !== data.room_id) {
            dispatch(setCurrentRoomId(data.room_id))
          }
          document.querySelector(`.message-item-${data.message_id}`)?.scrollIntoView()
        })
      }
    })
  }

  useEffect(() => {
    if (!socket) return

    // socket.on("connect", async () => {
    setConnected(true)

    socket.on("login", (res: UserRes) => {
      dispatch(setChatProfile(res))
    })

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
      console.log("receive message")
      roomDetailRef.current?.appendMessage(data)
      roomRef.current?.changeOrderAndAppendLastMessage(data)

      if (document.hasFocus()) {
        socket.emit("read_message", data)
      } else {
        createNotification(data)
      }
    })

    socket.on("confirm_read_message", (data: MessageRes) => {
      roomDetailRef.current?.changeMesageStatus(data)
    })

    socket.on("receive_unread_message", (data: MessageRes) => {
      console.log("receive unread message")
      createNotification(data)
      roomRef.current?.messageUnreadhandler(data)
    })

    socket.on("like_message", (payload: MessageRes) => {
      roomDetailRef.current?.mutatePartnerReactionMessage(payload)
    })

    socket.on("unlike_message", (payload: MessageRes) => {
      roomDetailRef.current?.mutatePartnerReactionMessage(payload)
    })

    // Typing listener
    socket.on("start_typing", (payload: RoomTypingRes) => {
      dispatch(setCurrentTyping(payload))
    })

    socket.on("stop_typing", () => {
      dispatch(setCurrentTyping(undefined))
    })
    // })

    return () => {
      dispatch(setCurrentRoomId(undefined))
      socket.off("connect")
      socket.off("disconnect")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  useEffect(() => {
    return () => {
      dispatch(setCurrentRoomId(undefined))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSendMessage = (params: MessageRes) => {
    roomRef.current?.changeOrderAndAppendLastMessage(params)
  }

  const handleSelectRoom = (room: RoomRes) => {
    dispatch(setCurrentRoomId(room.room_id))
  }

  if (!isConnected) return <Spinner size={36} />

  return (
    <section
      className={`chat-wrapper ${
        currentRoomId ? "chat-joined-room" : ""
      } grid md:grid-cols-chat-md lg:grid-cols-chat-lg gap-12 lg:gap-24 overflow-hidden h-full flex-1`}
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
