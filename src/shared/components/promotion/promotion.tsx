import { useQueryList } from "@/hooks"
import { PromotionRes } from "@/models"
import { promotionApi } from "@/services/promotionApi"
import InfiniteScroll from "react-infinite-scroll-component"
import { Spinner } from "../loading"
import { PromotionItem } from "./promotionItem"

interface PromotionProps {
  className?: string
  onApply?: (id: number) => void
}

export const Promotion = ({ className, onApply }: PromotionProps) => {
  const { data, fetchMoreItem, hasMore, isFetchingMore, offset, isInitialLoading } =
    useQueryList<PromotionRes>({
      fetcher: promotionApi.getPromotionList,
      initialData: undefined,
      key: "get_promotion_list", 
      params: { limit: 12, offset: 0 },
    })

  if (isInitialLoading)
    return (
      <div className={`${className}`}>
        {Array.from({ length: 4 }).map((_, index) => (
          <PromotionItem data={null} key={index} />
        ))}
      </div>
    )
  return (
    <InfiniteScroll
      dataLength={data?.length || 0}
      hasMore={hasMore}
      loader={isFetchingMore ? <Spinner /> : null}
      next={() => fetchMoreItem(promotionApi.getPromotionList({ limit: 12, offset: offset + 12 }))}
    >
      <div className={`${className}`}>
        {(data || [])?.length > 0
          ? data?.map((item) => (
              <PromotionItem onApply={onApply} key={item.promotion_id} data={item} />
            ))
          : null}
      </div>
    </InfiniteScroll>
  )
}
