import { promotionBanner2 } from "@/assets"
import { PromotionSlide, Seo } from "@/components"
import { StaticLayout } from "@/layout"

const Promotion = () => {
  return (
    <StaticLayout
      bg={promotionBanner2}
      subHeading="Tận hưởng vô vàn khuyến mãi"
      heading="Thế giới ExxeVn mở ra, hàng trăm ưu đãi đang chờ bạn!"
    >
      <Seo title="Ưu đãi" url="promotion" />

      <div className="mt-[80px]">
        <PromotionSlide titleClassName="mb-[32px] md:mb-[40px]" title="Khuyến mãi từ đối tác" />
      </div>
    </StaticLayout>
  )
}

export default Promotion
