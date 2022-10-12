import { SpinnerLoading } from "@/components"
import { AppDispatch, RootState } from "@/core"
import { GOOGLE_MAP_API_KEY } from "@/helper"
import { useAuth, useChatNotification } from "@/hooks"
import { MessageRes, UserRes } from "@/models"
import {
  fetchProvinces,
  fetchVehicles,
  setChatProfile,
  setLoadedGoogleMap,
  setMessageUnreadCount,
  setProfile,
  setSocketInstance,
} from "@/modules"
import { chatApi, userApi } from "@/services"
import { useLoadScript } from "@react-google-maps/api"
import "moment/locale/vi"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import NotificationsSystem, { atalhoTheme, dismissNotification, setUpNotifications } from "reapop"
import { io, Socket } from "socket.io-client"

const libraries: any = ["places", "geometry"]

const App = ({ children }: { children: ReactNode }) => {
  const { getUserInfo } = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const notifications = useSelector((state: RootState) => state.notifications)
  const provinces = useSelector((state: RootState) => state.compoundingCarData.provinces)
  const vehicleTypes = useSelector((state: RootState) => state.compoundingCarData.vehicleTypes)
  const router = useRouter()
  const { createNotification } = useChatNotification()
  const socketIo = useRef<Socket<any>>()

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    language: "vi",
    libraries,
  })

  useEffect(() => {
    if (isLoaded) {
      dispatch(setLoadedGoogleMap(true))
    }
  }, [dispatch, isLoaded])

  const connectSocket = async () => {
    const res = await userApi.getChatToken()
    const access_token = res.result?.data?.chat_access_token
    if (!access_token) return

    const socket = io(process.env.NEXT_PUBLIC_CHAT_SOCKET_URL as string, {
      query: {
        access_token,
      },
    })

    socket.emit("login")

    socket.on("connect", () => {
      if (socket.connected) {
        socket.on("login", (res: UserRes) => {
          dispatch(setChatProfile(res))
        })

        dispatch(setSocketInstance(socket))

        if (socketIo?.current) {
          socketIo.current = socket
        }

        socket.on("login", (res: UserRes) => {
          dispatch(setChatProfile(res))
        })

        socket.on("receive_unread_message", (data: MessageRes) => {
          if (router.pathname !== "/chat") {
            createNotification(data)
          }
        })
      }
    })

    return socket
  }

  const disconnectSocket = (socket: Socket) => {
    socket.off("connect")
    socket.off("disconnect")
  }

  useEffect(() => {
    getUserInfo((userInfo) => {
      dispatch(setProfile(userInfo))
    })

    connectSocket()

    chatApi
      .getMessageUnreadCount()
      .then((res) => {
        dispatch(setMessageUnreadCount(res.data.message_unread_count))
      })
      .catch((err) => {})

    setUpNotifications({
      defaultProps: {
        position: "top-center",
        dismissible: true,
        dismissAfter: 3000,
        status: "success",
      },
    })

    if (!provinces?.[0]?.province_id) {
      dispatch(fetchProvinces() as any)
    }

    if (!vehicleTypes?.[0]?.value) {
      dispatch(fetchVehicles() as any)
    }

    return () => {
      if (socketIo?.current) {
        disconnectSocket(socketIo.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {children}
      <SpinnerLoading />
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={(id) => dispatch(dismissNotification(id))}
        theme={atalhoTheme}
      />
    </>
  )
}

export { App }
