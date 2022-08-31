import { PromotionRes } from "@/models"
import { promotionApi } from "@/services/promotionApi"
import { useQueryList } from "../async"

export const usePromotion = () => {
  const { data, error, fetchMoreItem, filterList, hasMore, isFetchingMore, isValidating, offset } =
    useQueryList<PromotionRes>({
      fetcher: promotionApi.getPromotionList,
      initialData: undefined,
      key: "get_promotion_list",
      params: { limit: 12, offset: 0 },
    })

  return <div>usePromotion</div>
}
