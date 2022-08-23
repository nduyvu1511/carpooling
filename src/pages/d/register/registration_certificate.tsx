import { ImageFileLoading, InputLoading, RegistrationCetificateForm } from "@/components"
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
      <div className="content-container px-16 sm:px-0">
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
      </div>
    </DriverRegisterLayout>
  )
}

RegistrationCertificate.Layout = DriverEmptyLayout
export default RegistrationCertificate
