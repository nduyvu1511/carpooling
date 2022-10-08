import { Promotion, Seo } from "@/components"
import { CustomerAccountLayout } from "@/layout"

const PromotionPage = () => {
  return (
    <>
      <CustomerAccountLayout title="Ưu đãi">
        <Seo description="Ưu đãi" thumbnailUrl="" title="Ưu đãi" url="c/account/promotion" />
        <div className="px-custom">
          <Promotion />
        </div>
      </CustomerAccountLayout>
    </>
  )
}

export default PromotionPage
