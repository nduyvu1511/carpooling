import { Chat } from "@/components"
import { AuthLayout } from "@/layout"
import React from "react"

const ChatPage = () => {
  return (
    <AuthLayout className="min-h-[calc(100vh-80px)] py-24 chat-page">
      <div className="container flex-1 flex flex-col">
        <Chat />
      </div>
    </AuthLayout>
  )
}

export default ChatPage
