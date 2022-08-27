import { promotionBanner2 } from "@/assets"
import { PromotionSlide } from "@/components"
import { StaticLayout } from "@/layout"

const Promotion = () => {
  return (
    <StaticLayout
      bg={promotionBanner2}
      subHeading="Tận hưởng vô vàn khuyến mãi"
      heading="Thế giới ExxeVn mở ra, hàng trăm ưu đãi đang chờ bạn!"
    >
      <div className="">
        <PromotionSlide title="Khuyến mãi từ đối tác" />
      </div>
    </StaticLayout>
  )
}

export default Promotion
