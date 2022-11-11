import { ImageFileLoading, InputLoading, Seo, VerifiedPhoneNumberForm } from "@/components"
import { useVerifyPhoneNumber } from "@/hooks"
import { DriverEmptyLayout, DriverRegisterLayout } from "@/layout"
import { CreateVerifiedPhoneNumber } from "@/models"
import { useRouter } from "next/router"

const VerifyPhoneNumberPage = () => {
  const router = useRouter()
  const { data, createVerifiedPhoneNumber, updateVerifiedPhoneNumber, isValidating } =
    useVerifyPhoneNumber(true)

  const handleSubmitForm = (form: CreateVerifiedPhoneNumber) => {
    if (data?.verified_number_phone_id) {
      updateVerifiedPhoneNumber({
        params: {
          ...form,
          verified_number_phone_id: data.verified_number_phone_id,
        },
        onSuccess: () => {
          router.push("/d/register")
        },
      })
    } else {
      createVerifiedPhoneNumber({
        params: form,
        onSuccess: () => {
          router.push("/d/register/vehicle_details")
        },
      })
    }
  }

  return (
    <DriverRegisterLayout
      onRightBtnClick={() => router.push("/d/register")}
      heading="Xác minh số điện thoại"
    >
      <Seo title="Xác thực số điện thoại" url="d/register/verified_phone_number" />

      <p className="text-sm font-medium text-gray-color-6 mb-24">
        Vui lòng soạn tin nhắn theo cú pháp “TTTB” gửi đến 1414 để xác minh sim chính chủ
      </p>

      {!isValidating ? (
        <VerifiedPhoneNumberForm defaultValues={data} onSubmit={(data) => handleSubmitForm(data)} />
      ) : (
        <>
          <InputLoading />
          <ImageFileLoading />
        </>
      )}
    </DriverRegisterLayout>
  )
}

VerifyPhoneNumberPage.Layout = DriverEmptyLayout
export default VerifyPhoneNumberPage
