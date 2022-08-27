import { Promotion, Seo } from "@/components"
import { DriverAccountLayout } from "@/layout"

const PromotionPage = () => {
  return (
    <>
      <DriverAccountLayout title="Ưu đãi">
        <Seo
          description="Ưu đãi"
          thumbnailUrl=""
          title="Ưu đãi"
          url="https://exxe.vn/c/account/promotion"
        />
        {/* <PromotionModal onClose={() => {}} /> */}
        <div className="p-custom pt-0">
          <Promotion />
        </div>
      </DriverAccountLayout>
    </>
  )
}

export default PromotionPage
