import { AuthHeader, Chat, Header, HeaderMobile, Seo } from '@/components'
import { userAPI } from '@/services'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../core'

const ChatPage = () => {
  const router = useRouter()
  const roomId = useSelector((state: RootState) => state.chat.currentRoomId)

  useEffect(() => {
    userAPI.getChatToken().then((res) => {
      if (!res?.result?.data?.chat_access_token) {
        router.push('/login')
      }
    })
  }, [router])

  return (
    <>
      <Header />
      <main className="md:py-16 lg:py-24 border-t border-border-color border-solid md:border-0 chat-page flex flex-col h-screen md:h-[calc(100vh-80px)] bg-bg">
        <Seo title="Chat" url="chat" />
        <HeaderMobile
          className={`${!roomId ? '' : 'hidden'} md:hidden border-none`}
          title="Tin nhắn"
        />
        <div
          className={`container px-0 md:px-16 ${
            roomId ? '' : 'mt-[56px]'
          } md:mt-0 lg:px-24 xl:px-0 flex-1 flex flex-col h-full`}
        >
          <Chat />
        </div>
      </main>
    </>
  )
}

export default ChatPage
