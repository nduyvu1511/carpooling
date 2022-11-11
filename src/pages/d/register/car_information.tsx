import { ImageFileLoading, InputLoading, Seo } from "@/components"
import { CarInformationForm } from "@/components/form/driver/carInformationForm"
import { useCarInformationn } from "@/hooks"
import { DriverEmptyLayout, DriverRegisterLayout } from "@/layout"
import { CreateCarInformation } from "@/models"
import { useRouter } from "next/router"

const RegistrationCertificate = () => {
  const router = useRouter()
  const {
    data: carData,
    isValidating,
    createCarInformation,
    updateCarInformation,
  } = useCarInformationn(true)

  const handleSubmit = (data: CreateCarInformation) => {
    if (carData?.car_information_id) {
      updateCarInformation({
        params: {
          ...data,
          car_information_id: carData.car_information_id,
        },
        onSuccess: () => {
          router.push("/d/register")
        },
      })
    } else {
      createCarInformation({
        params: data,
        onSuccess: () => {
          router.push("/d/register/vehicle_insurance")
        },
      })
    }
  }

  return (
    <DriverRegisterLayout onRightBtnClick={() => router.push("/d/register")} heading="Thông tin xe">
      <Seo title="Thông tin xe" url="/d/register/car_information" />

      {isValidating ? (
        <>
          <InputLoading />
          <InputLoading />
          <InputLoading />
          <InputLoading />
          <ImageFileLoading />
          <ImageFileLoading />
        </>
      ) : (
        <CarInformationForm defaultValues={carData} onSubmit={(data) => handleSubmit(data)} />
      )}
    </DriverRegisterLayout>
  )
}

RegistrationCertificate.Layout = DriverEmptyLayout
export default RegistrationCertificate
