import { ImageFileLoading, InputLoading } from "@/components"
import DrivingLicenseForm from "@/components/form/driver/drivingLicenseForm"
import { useVehicleDrivingLicense } from "@/hooks"
import { DriverEmptyLayout, DriverRegisterLayout } from "@/layout"
import { DrivingLicenseFormParams } from "@/models"
import { useRouter } from "next/router"

const DrivingLicenseDetail = () => {
  const router = useRouter()
  const {
    data: drivingLicense,
    createVehicleDrivingLicense,
    updateVehicleDrivingLicense,
    isValidating,
  } = useVehicleDrivingLicense(true)

  const handleSubmitForm = (data: DrivingLicenseFormParams) => {
    if (drivingLicense?.car_driving_license_id) {
      updateVehicleDrivingLicense({
        params: {
          ...data,
          car_driving_license_id: drivingLicense.car_driving_license_id,
        },
        onSuccess: () => {
          router.push("/d/register")
        },
      })
    } else {
      createVehicleDrivingLicense({
        params: data,
        onSuccess: () => {
          router.push("/d/register/vehicle_details")
        },
      })
    }
  }

  return (
    <DriverRegisterLayout onRightBtnClick={() => router.push("/d/register")} heading="Bằng Lái Xe">
      <div className="content-container px-16 sm:px-0">
        {!isValidating ? (
          <DrivingLicenseForm
            defaultValues={drivingLicense}
            onSubmit={(data) => handleSubmitForm(data)}
          />
        ) : (
          <>
            <ImageFileLoading />
            <ImageFileLoading />
            <InputLoading />
            <InputLoading />
            <InputLoading />
            <InputLoading />
          </>
        )}
      </div>
    </DriverRegisterLayout>
  )
}

DrivingLicenseDetail.Layout = DriverEmptyLayout
export default DrivingLicenseDetail
