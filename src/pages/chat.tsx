import { Chat } from "@/components"
import { AuthLayout } from "@/layout"

const ChatPage = () => {
  return (
    <AuthLayout className="md:py-16 lg:py-24 border-t border-border-color border-solid md:border-0 chat-page flex flex-col h-[calc(100vh-61px)] md:h-[calc(100vh-80px)] bg-bg">
      <div className="container px-0 md:px-16 lg:px-24 flex-1 flex flex-col h-full">
        <Chat />
      </div>
    </AuthLayout>
  )
}

export default ChatPage
