import { ImageFileLoading, InputLoading, Seo, VehicleForm } from "@/components"
import { useRegistrationCertificate } from "@/hooks"
import { DriverEmptyLayout, DriverRegisterLayout } from "@/layout"
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
          router.push("/d/register/registration_certificate")
        },
      })
    }
  }

  return (
    <DriverRegisterLayout onRightBtnClick={() => router.push("/d/register")} heading="Thông tin xe">
      <Seo title="Thông tin xe" url="/d/register/vehicle_details" />

      {!isValidating ? (
        <VehicleForm defaultValues={regisCertificate} onSubmit={(data) => handleSubmit(data)} />
      ) : (
        <>
          <ImageFileLoading />
          <ImageFileLoading />
          <ImageFileLoading />
          <ImageFileLoading />
          <ImageFileLoading />
          <InputLoading />
          <InputLoading />
          <InputLoading />
          <InputLoading />
          <InputLoading />
        </>
      )}
    </DriverRegisterLayout>
  )
}

VehicleInsurance.Layout = DriverEmptyLayout
export default VehicleInsurance
