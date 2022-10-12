import { PromotionDetailRes } from "@/models"
import { promotionApi } from "@/services"
import useSWR from "swr"
import { Seo } from "../common"
import { Spinner } from "../loading"

interface PromotionDetailProps {
  promotion_id: number
}

export const PromotionDetail = ({ promotion_id }: PromotionDetailProps) => {
  const { isValidating, mutate, data, error } = useSWR<PromotionDetailRes>(
    promotion_id ? `get_detail_promotion_${promotion_id}` : null,
    () => promotionApi.getDetailPromotion({ promotion_id }).then((res) => res.result.data),
    {
      dedupingInterval: 100000,
    }
  )

  if (isValidating) return <Spinner size={30} />
  return (
    <>
      <Seo
        title={data?.promotion_name || "Thông tin chi tiết khuyến mãi"}
        url={`promotion/${data?.promotion_id}`}
      />
      <div dangerouslySetInnerHTML={{ __html: data?.description || "" }}></div>
    </>
  )
}
