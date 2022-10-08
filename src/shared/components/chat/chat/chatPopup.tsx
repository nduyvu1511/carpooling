import React from "react"
import { Chat } from "./chat"

interface ChatPopupProps {
  className?: string
}

export const ChatPopup = ({ className = "" }: ChatPopupProps) => {
  return (
    <div
      className={`rounded-[16px] bg-white-color shadow-shadow-base w-[400px] h-[620px] ${className}`}
    >
      <div className="py-16 flex-center border-b border-border-color border-solid">
        <p className="text-base font-semibold leading-[22px]">Tin nhắn</p>
      </div>

      <div className="chat-popup">
        <Chat />
      </div>
    </div>
  )
}
