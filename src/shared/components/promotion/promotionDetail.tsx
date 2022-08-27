import { promotionApi } from "@/services"
import useSWR from "swr"

interface PromotionDetailProps {
  promotion_id: number
}

export const PromotionDetail = ({ promotion_id }: PromotionDetailProps) => {
  const { isValidating, mutate, data, error } = useSWR(
    promotion_id ? `get_detail_promotion_${promotion_id}` : null,
    () => promotionApi.getDetailPromotion({ promotion_id }).then((res) => res.result.data),
    {
      dedupingInterval: 10000,
    }
  )

  return <div>PromotionDetail</div>
}
