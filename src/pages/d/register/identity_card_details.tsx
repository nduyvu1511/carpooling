import { IdentityCardForm, ImageFileLoading, InputLoading, Seo } from "@/components"
import { useIdentityCard } from "@/hooks"
import { DriverEmptyLayout, DriverRegisterLayout } from "@/layout"
import { IdCardParams } from "@/models"
import { useRouter } from "next/router"

const IdentityCardDetail = () => {
  const router = useRouter()
  const {
    createIdentityCard,
    updateIdentityCard,
    data: idCard,
    isValidating,
  } = useIdentityCard(true)

  const handleSubmitForm = (data: IdCardParams) => {
    if (idCard?.identity_card_id) {
      updateIdentityCard({
        params: {
          ...data,
          identity_card_id: idCard.identity_card_id,
        },
        onSuccess: () => {
          router.push("/d/register")
        },
      })
    } else {
      createIdentityCard({
        params: data,
        onSuccess: () => {
          router.push("/d/register/driving_license_details")
        },
      })
    }
  }

  return (
    <DriverRegisterLayout
      onRightBtnClick={() => router.push("/d/register")}
      heading="CMND / Thẻ Căn Cước / Hộ Chiếu"
    >
      <Seo title="CMND / Thẻ Căn Cước / Hộ Chiếu" url="d/register/identity_card_details" />

      {!isValidating ? (
        <IdentityCardForm defaultValues={idCard} onSubmit={(data) => handleSubmitForm(data)} />
      ) : (
        <>
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

IdentityCardDetail.Layout = DriverEmptyLayout
export default IdentityCardDetail
