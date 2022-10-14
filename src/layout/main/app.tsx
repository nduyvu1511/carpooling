import { SpinnerLoading } from "@/components"
import { RootState, useAppDispatch } from "@/core"
import { GOOGLE_MAP_API_KEY } from "@/helper"
import { useAuth, useSocket } from "@/hooks"
import { fetchProvinces, fetchVehicles, setLoadedGoogleMap, setProfile } from "@/modules"
import { useLoadScript } from "@react-google-maps/api"
import "moment/locale/vi"
import { ReactNode, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import NotificationsSystem, { atalhoTheme, dismissNotification, setUpNotifications } from "reapop"
import { Socket } from "socket.io-client"

const libraries: any = ["places", "geometry"]

const App = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const { getUserInfo } = useAuth()
  const socket = useRef<Socket<any>>()
  const notifications = useSelector((state: RootState) => state.notifications)
  const { connectSocket } = useSocket()

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

  useEffect(() => {
    dispatch(fetchProvinces())
    dispatch(fetchVehicles())
    getUserInfo((userInfo) => {
      dispatch(setProfile(userInfo))
    })
    setUpNotifications({
      defaultProps: {
        position: "top-center",
        dismissible: true,
        dismissAfter: 3000,
        status: "success",
      },
    })

    connectSocket()
    const socketIo = socket.current

    return () => {
      if (socketIo) {
        socketIo.off("connect")
        socketIo.off("disconnect")
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
