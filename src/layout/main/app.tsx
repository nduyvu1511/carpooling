import { SpinnerLoading } from "@/components"
import { RootState, useAppDispatch } from "@/core"
import { GOOGLE_MAP_API_KEY } from "@/helper"
import { useAuth, useSocket } from "@/hooks"
import { fetchProvinces, fetchVehicles, setLoadedGoogleMap, setProfile } from "@/modules"
import { useLoadScript } from "@react-google-maps/api"
import "moment/locale/vi"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import { useSelector } from "react-redux"
import NotificationsSystem, { atalhoTheme, dismissNotification, setUpNotifications } from "reapop"

const libraries: any = ["places", "geometry"]

const App = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { getUserInfo } = useAuth()
  const socket = useSelector((state: RootState) => state.chat.socket)
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
    getUserInfo((userInfo) => {
      dispatch(setProfile(userInfo))
    })

    if (router.pathname?.includes("/checking-checkout-status")) return

    dispatch(fetchProvinces())
    dispatch(fetchVehicles())

    setUpNotifications({
      defaultProps: {
        position: "top-center",
        dismissible: true,
        dismissAfter: 3000,
        status: "success",
      },
    })

    connectSocket()

    return () => {
      if (socket) {
        socket.off("connect")
        socket.off("disconnect")
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
