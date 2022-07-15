  import { IdentityCardForm, ImageFileLoading, InputLoading } from "@/components"
import { ScreenContainer } from "@/container"
import { useIdentityCard } from "@/hooks"
import { DriverEmptyLayout } from "@/layout"
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
          router.push("/d/register")
        },
      })
    }
  }

  return (
    <ScreenContainer heading="CMND / Thẻ Căn Cước / Hộ Chiếu">
      <div className="relative">
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
      </div>
    </ScreenContainer>
  )
}

IdentityCardDetail.Layout = DriverEmptyLayout
export default IdentityCardDetail
