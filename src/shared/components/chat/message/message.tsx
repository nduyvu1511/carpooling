import { ListRes, MessageRes } from "@/models"
import { useEffect, useRef } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { MessageItem } from "./messageItem"

interface MessageProps {
  data: ListRes<MessageRes[]>
}

export const Message = ({ data }: MessageProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isFirstMount = useRef<boolean>(true)

  useEffect(() => {
    let behavior: ScrollBehavior = isFirstMount ? "auto" : "smooth"
    ref.current?.scrollIntoView({ behavior })
    if (isFirstMount.current === false) {
      isFirstMount.current = false
    }
  }, [data])

  return (
    <InfiniteScroll
      className="chat-message-list overflow-y-auto pr-12 flex-1"
      dataLength={100}
      hasMore={true}
      loader={null}
      height={window.innerHeight}
      inverse
      next={() => {
        console.log("next")
      }}
    >
      {data?.data?.length
        ? data.data.map((item) => (
            <div className="mb-10" key={item.message_id} ref={ref}>
              <MessageItem key={item.message_id} data={item} />
            </div>
          ))
        : null}
    </InfiniteScroll>
  )
}
