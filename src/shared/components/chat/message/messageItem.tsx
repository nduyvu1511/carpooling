import { MessageRes } from "@/models"
import moment from "moment"
import Image from "next/image"
import { MessageItemMenu } from "./messageItemMenu"

interface MessageItemProps {
  className?: string
  data: MessageRes
  lastMessage: MessageRes
}

export const MessageItem = ({ className, data, lastMessage }: MessageItemProps) => {
  return (
    <div
      className={`relative flex flex-col ${data?.is_author ? "items-end ml-auto" : "items-start"} ${
        data.attachments?.length ? "" : "max-w-[60%]"
      } ${className}`}
    >
      {data?.attachments?.length ? (
        <div className="grid grid-cols-2 gap-8 w-full max-w-[60%]">
          {data.attachments.map((item) => (
            <div
              key={item.attachment_id}
              className="relative aspect-[4/3] rounded-[5px] overflow-hidden"
            >
              <Image layout="fill" alt="" objectFit="cover" src={item.thumbnail_url} />
            </div>
          ))}
        </div>
      ) : null}

      <div
        className={`relative p-16 rounded-[8px] w-fit ${
          data.is_author ? "bg-bg-blue" : "bg-gray-10"
        }`}
      >
        {/* <div
          className={`absolute right-[calc(100%+20px)] w-[200px] ${
            lastMessage.room_id === data.room_id ? "" : "hidden"
          }`}
        >
          <MessageItemMenu />
        </div> */}

        {data?.reply_to?.message_id ? (
          <div className="p-12 bg-[#C8DEFF] mb-12 rounded-[8px] min-w-[140px] cursor-pointer flex items-stretch">
            <div className="w-[3px] bg-[#3989FF] mr-8 rounded-[5px]"></div>
            <div className="">
              <p className="text-xs mb-8 line-clamp-1 word-break">
                {data.reply_to.author.author_name}
              </p>
              <p className="text-xs line-clamp-1 word-break">{data.reply_to.message_text}</p>
            </div>
          </div>
        ) : null}

        {data?.message_text ? (
          <p className={`text-14 leading-20 font-medium ${data.is_author ? "text-primary" : ""}`}>
            {data.message_text}
          </p>
        ) : null}
        <div className="flex items-center justify-between mt-12">
          <span className="text-xs text-[10px] mr-12">
            {moment(data.created_at).format("HH:mm")}
          </span>
          {lastMessage.message_id === data.message_id && lastMessage.is_author ? (
            <span className="text-xs text-[10px]"> {data.is_read ? "Đã xem" : "Đã gửi"}</span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
