import { MessageRes } from "@/models"
import Image from "next/image"
import React from "react"

interface MessageItemProps {
  className?: string
  data: MessageRes
}

export const MessageItem = ({ className, data }: MessageItemProps) => {
  return (
    <div
      className={`flex flex-col ${data?.is_author ? "items-end ml-auto" : "items-start"} ${
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
        className={`p-16 rounded-[8px] w-fit ${
          data.is_author ? "bg-bg-blue text-primary" : "bg-gray-10"
        }`}
      >
        {data?.message_text ? (
          <p className={`text-14 leading-20 font-medium ${data.is_author ? "" : ""}`}>
            {data.message_text}
          </p>
        ) : null}
      </div>
    </div>
  )
}
