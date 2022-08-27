import { Promotion, PromotionModal, Seo } from "@/components"
import { CustomerAccountLayout } from "@/layout"

const PromotionPage = () => {
  return (
    <>
      <CustomerAccountLayout title="Ưu đãi">
        <Seo
          description="Ưu đãi"
          thumbnailUrl=""
          title="Ưu đãi"
          url="https://exxe.vn/c/account/promotion"
        />
        <PromotionModal onClose={() => {}} />
        <div className="p-custom">
          <Promotion />
        </div>
      </CustomerAccountLayout>
    </>
  )
}

export default PromotionPage
