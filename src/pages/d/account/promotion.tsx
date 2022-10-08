import { Promotion, Seo } from "@/components"
import { DriverAccountLayout } from "@/layout"

const PromotionPage = () => {
  return (
    <>
      <DriverAccountLayout title="Ưu đãi">
        <Seo description="Ưu đãi" thumbnailUrl="" title="Ưu đãi" url="c/account/promotion" />
        <div className="px-custom">
          <Promotion />
        </div>
      </DriverAccountLayout>
    </>
  )
}

export default PromotionPage
