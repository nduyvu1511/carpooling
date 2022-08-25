import { SpinnerLoading } from "@/components"
import { RootState } from "@/core"
import { useAuth } from "@/hooks"
import { CarId, ProvinceId, VehicleTypeParams } from "@/models"
import { setProfile, setProvinces, setVehicleTypes } from "@/modules"
import { addressApi, vehicleApi } from "@/services"
import { AxiosResponse } from "axios"
import { ReactNode, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NotificationsSystem, { atalhoTheme, dismissNotification, setUpNotifications } from "reapop"

const App = ({ children }: { children: ReactNode }) => {
  const { getUserInfo } = useAuth()
  const dispatch = useDispatch()
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

    if (!provinces?.length) {
      addressApi
        .getProvinces()
        .then((res: AxiosResponse<ProvinceId[]>) => {
          dispatch(setProvinces(res?.result?.data || []))
        })
        .catch((err) => console.log(err))
    }

    if (!vehicleTypes?.length) {
      vehicleApi
        .getCarTypes()
        .then((res: AxiosResponse<CarId[]>) => {
          dispatch(
            setVehicleTypes(
              (res?.result?.data || []).map((item: VehicleTypeParams) => ({
                label: item.name,
                value: item.car_id,
                number_seat: item.number_seat,
              }))
            )
          )
        })
        .catch((err) => console.log(err))
    }
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
