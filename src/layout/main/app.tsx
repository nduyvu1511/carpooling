import { SpinnerLoading } from "@/components"
import { AppDispatch, RootState } from "@/core"
import { useAuth } from "@/hooks"
import { fetchProvinces, fetchVehicles, setProfile } from "@/modules"
import { ReactNode, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NotificationsSystem, { atalhoTheme, dismissNotification, setUpNotifications } from "reapop"

const App = ({ children }: { children: ReactNode }) => {
  const { getUserInfo } = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const notifications = useSelector((state: RootState) => state.notifications)
  const provinces = useSelector((state: RootState) => state.compoundingCarData.provinces)
  const vehicleTypes = useSelector((state: RootState) => state.compoundingCarData.vehicleTypes)

  useEffect(() => {
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

    if (!provinces?.[0]?.province_id) {
      dispatch(fetchProvinces() as any)
    }

    if (!vehicleTypes?.[0]?.value) {
      dispatch(fetchVehicles() as any)
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
