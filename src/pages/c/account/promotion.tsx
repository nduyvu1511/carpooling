import { PromotionItem, Seo, PromotionModal } from "@/components"
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
          <div className="grid grid-cols-1 gap-24">
            <PromotionItem />
            <PromotionItem />
          </div>
        </div>
      </CustomerAccountLayout>
    </>
  )
}

export default PromotionPage
