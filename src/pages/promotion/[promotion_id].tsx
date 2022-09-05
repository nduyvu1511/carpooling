import { promotionBanner1 } from "@/assets"
import { PromotionSlide, PromotionDetail } from "@/components"
import { StaticLayout } from "@/layout"
import { useRouter } from "next/router"

const PromotionDetailPage = () => {
  const router = useRouter()
  const { promotion_id } = router.query

  return (
    <StaticLayout
      lastNode={<PromotionSlide title="Các tin khuyến mãi khác" />}
      heading={"Tặng ngay 100k khi hoàn tất đăng ký tài khoản"}
      sticky
      bg={promotionBanner1}
    >
      <PromotionDetail promotion_id={Number(promotion_id)} />
    </StaticLayout>
  )
}

export default PromotionDetailPage
