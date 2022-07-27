import { IdentityCardForm, ImageFileLoading, InputLoading } from "@/components"
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
          router.push("/d/register")
        },
      })
    }
  }

  return (
    <DriverRegisterLayout heading="CMND / Thẻ Căn Cước / Hộ Chiếu">
      <div className="relative px-[16px] sm:px-0">
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
    </DriverRegisterLayout>
  )
}

IdentityCardDetail.Layout = DriverEmptyLayout
export default IdentityCardDetail
