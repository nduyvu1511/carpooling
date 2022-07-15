import { ImageFileLoading, InputLoading, VehicleInsuranceForm } from "@/components"
import { ScreenContainer } from "@/container"
import { useVehicleInsurance } from "@/hooks"
import { DriverEmptyLayout } from "@/layout"
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
    <ScreenContainer heading="Bảo Hiểm Xe">
      <div className="content-container px-24">
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
      </div>
    </ScreenContainer>
  )
}

VehicleInsurance.Layout = DriverEmptyLayout
export default VehicleInsurance
