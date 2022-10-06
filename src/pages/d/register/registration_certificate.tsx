import { ImageFileLoading, InputLoading, RegistrationCetificateForm, Seo } from "@/components"
import { useCertificateInspection } from "@/hooks"
import { DriverEmptyLayout, DriverRegisterLayout } from "@/layout"
import { CertificateInspectionParams } from "@/models"
import { useRouter } from "next/router"

const RegistrationCertificate = () => {
  const router = useRouter()
  const {
    createCertificateInspection,
    data: certificateInspection,
    isValidating,
    updateCertificateInspection,
  } = useCertificateInspection(true)

  const handleSubmit = (data: CertificateInspectionParams) => {
    if (certificateInspection?.periodical_inspection_certificate_id) {
      updateCertificateInspection({
        params: {
          ...data,
          periodical_inspection_certificate_id:
            certificateInspection.periodical_inspection_certificate_id,
        },
        onSuccess: () => {
          router.push("/d/register")
        },
      })
    } else {
      createCertificateInspection({
        params: data,
        onSuccess: () => {
          router.push("/d/register/vehicle_insurance")
        },
      })
    }
  }

  return (
    <DriverRegisterLayout
      onRightBtnClick={() => router.push("/d/register")}
      heading="Giấy Đăng Kiểm"
    >
      <Seo
        description=""
        thumbnailUrl=""
        title="Giấy Đăng Kiểm"
        url="/d/register/registration_certificate"
      />

      {isValidating ? (
        <>
          <ImageFileLoading />
          <ImageFileLoading />
          <InputLoading />
          <InputLoading />
        </>
      ) : (
        <RegistrationCetificateForm
          defaultValues={certificateInspection}
          onSubmit={(data) => handleSubmit(data)}
        />
      )}
    </DriverRegisterLayout>
  )
}

RegistrationCertificate.Layout = DriverEmptyLayout
export default RegistrationCertificate
