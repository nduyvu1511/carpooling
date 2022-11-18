import { promotionBanner1 } from "@/assets"
import { PromotionDetail, PromotionSlide, Seo } from "@/components"
import { toImageUrl } from "@/helper"
import { StaticLayout } from "@/layout"
import { PromotionDetailRes } from "@/models"
import { promotionApi } from "@/services"
import { useRouter } from "next/router"
import useSWR from "swr"

const PromotionDetailPage = () => {
  const router = useRouter()
  const { promotion_id } = router.query
  const { isValidating, data } = useSWR<PromotionDetailRes>(
    promotion_id ? `get_detail_promotion_${promotion_id}` : null,
    () =>
      promotionApi
        .getDetailPromotion({ promotion_id: Number(promotion_id) })
        .then((res) => res.result.data),
    {
      dedupingInterval: 1000 * 60 * 10,
    }
  )

  return (
    <StaticLayout
      sticky
      lastNode={<PromotionSlide title="Các tin khuyến mãi khác" />}
      heading={data?.promotion_name}
      bg={
        data?.promotion_banner_url?.image_url
          ? toImageUrl(data?.promotion_banner_url?.image_url)
          : promotionBanner1
      }
    >
      <Seo
        title={data?.promotion_name || "Thông tin chi tiết khuyến mãi"}
        url={`promotion/${data?.promotion_id}`}
      />

      <PromotionDetail data={data} isLoading={isValidating} />
    </StaticLayout>
  )
}

export default PromotionDetailPage
