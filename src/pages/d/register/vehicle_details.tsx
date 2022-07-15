import { ImageFileLoading, InputLoading, VehicleForm } from "@/components"
import { ScreenContainer } from "@/container"
import { useRegistrationCertificate } from "@/hooks"
import { DriverEmptyLayout } from "@/layout"
import { VehicleDetailFormParams } from "@/models"
import { useRouter } from "next/router"

const VehicleInsurance = () => {
  const router = useRouter()
  const {
    data: regisCertificate,
    createRegistrationCertificate,
    updateRegistrationCertificate,
    isValidating,
  } = useRegistrationCertificate(true)

  const handleSubmit = (data: VehicleDetailFormParams) => {
    if (regisCertificate?.car_registration_certificate_id) {
      updateRegistrationCertificate({
        params: {
          ...data,
          car_registration_certificate_id: regisCertificate.car_registration_certificate_id,
        },
        onSuccess: () => {
          router.push("/d/register")
        },
      })
    } else {
      createRegistrationCertificate({
        params: data,
        onSuccess: () => {
          router.push("/d/register")
        },
      })
    }
  }

  return (
    <ScreenContainer heading="Thông tin xe">
      <div className="">
        {!isValidating ? (
          <VehicleForm defaultValues={regisCertificate} onSubmit={(data) => handleSubmit(data)} />
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
    </ScreenContainer>
  )
}

VehicleInsurance.Layout = DriverEmptyLayout
export default VehicleInsurance
