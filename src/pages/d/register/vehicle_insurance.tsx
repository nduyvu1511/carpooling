import { ImageFileLoading, InputLoading, Seo, VehicleInsuranceForm } from "@/components"
import { useVehicleInsurance } from "@/hooks"
import { DriverEmptyLayout, DriverRegisterLayout } from "@/layout"
import { VehicleInsuranceParams } from "@/models"
import { useRouter } from "next/router"

const VehicleInsurance = () => {
  const router = useRouter()
  const {
    createVehicleInsurance,
    data: vehicleInsurance,
    isValidating,
    updateVehicleInsurance,
  } = useVehicleInsurance(true)

  const handleSubmit = (data: VehicleInsuranceParams) => {
    if (vehicleInsurance?.compulsory_car_insurance_id) {
      updateVehicleInsurance({
        params: {
          ...data,
          compulsory_car_insurance_id: vehicleInsurance.compulsory_car_insurance_id,
        },
        onSuccess: () => {
          router.push("/d/register")
        },
      })
    } else {
      createVehicleInsurance({
        params: data,
        onSuccess: () => {
          router.push("/d/register")
        },
      })
    }
  }

  return (
    <DriverRegisterLayout onRightBtnClick={() => router.push("/d/register")} heading="Bảo Hiểm Xe">
      <Seo title="Bảo Hiểm Xe" url="/d/register/vehicle_insurance" />

      {isValidating ? (
        <>
          <ImageFileLoading />
          <ImageFileLoading />
          <InputLoading />
          <InputLoading />
          <InputLoading />
        </>
      ) : (
        <VehicleInsuranceForm
          defaultValues={vehicleInsurance}
          onSubmit={(data) => handleSubmit(data)}
        />
      )}
    </DriverRegisterLayout>
  )
}

VehicleInsurance.Layout = DriverEmptyLayout
export default VehicleInsurance
