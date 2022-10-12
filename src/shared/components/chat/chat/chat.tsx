import { RootState } from "@/core/store"
import { setCurrentRoomId } from "@/modules"
import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Room, RoomDetail } from "../room"

export const Chat = memo(function _Chat() {
  const dispatch = useDispatch()
  const currentRoomId = useSelector((state: RootState) => state.chat.currentRoomId)

  useEffect(() => {
    return () => {
      dispatch(setCurrentRoomId(undefined))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      className={`chat-wrapper grid md:grid-cols-chat-md lg:grid-cols-chat-lg gap-12 md:gap-16 lg:gap-24 overflow-hidden h-full flex-1`}
    >
      <aside
        className={`chat-room block-element pt-custom pl-custom flex-col ${
          currentRoomId ? "hidden md:flex" : "flex"
        }`}
      >
        <Room />
      </aside>

      <div
        className={`chat-message block-element overflow-hidden flex-col ${
          !currentRoomId ? "hidden md:flex" : "flex"
        }`}
      >
        <RoomDetail />
      </div>
    </section>
  )
})
