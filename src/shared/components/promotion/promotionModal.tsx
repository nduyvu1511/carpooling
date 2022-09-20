import { useQueryList } from "@/hooks"
import { PromotionRes } from "@/models"
import { promotionApi } from "@/services"
import { useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { FilterNotFound } from "../common"
import { PromotionForm } from "../form"
import { Spinner } from "../loading"
import { Modal } from "../modal"
import { PromotionItem } from "./promotionItem"

interface PromotionModalProps {
  onClose: Function
  onApply?: (id: PromotionRes) => void
  appliedPromotionId?: number
  compounding_car_customer_id?: number
}

const gridClassName = "grid grid-cols-1 gap-16"

export const PromotionModal = ({
  onClose,
  onApply,
  appliedPromotionId,
  compounding_car_customer_id,
}: PromotionModalProps) => {
  const [promotionCode, setPromotionCode] = useState<string>()
  const [searchPromotions, setSearchPromotions] = useState<PromotionRes[]>([])

  const { data, fetchMoreItem, hasMore, isFetchingMore, offset, isValidating } = useQueryList<
    PromotionRes[]
  >({
    fetcher: promotionApi.getPromotionListCanApply,
    initialData: undefined,
    key: "get_promotion_list_can_apply",
    params: { limit: 12, offset: 0, compounding_car_customer_id },
  })

  const handleSearchPromotion = (value: string) => {
    if (!data) return
    setSearchPromotions(
      [...data].filter((item) =>
        item.promotion_code.trim().toLowerCase().includes(value.trim().toLowerCase())
      )
    )
  }

  return (
    <Modal onClose={onClose} heading="Ưu đãi" show={true}>
      <div className="modal-form-content">
        <div className="promotion-modal-input">
          <PromotionForm
            onChange={(promotion_code) => {
              setPromotionCode(promotion_code)
              handleSearchPromotion(promotion_code)
            }}
            className="mb-24"
          />
        </div>

        {promotionCode ? (
          <div className={gridClassName}>
            {(searchPromotions || [])?.length > 0 ? (
              searchPromotions?.map((item) => (
                <PromotionItem
                  appliedPromotionId={appliedPromotionId}
                  onApply={onApply}
                  key={item.promotion_id}
                  data={item}
                />
              ))
            ) : (
              <FilterNotFound />
            )}
          </div>
        ) : isValidating ? (
          <div className={gridClassName}>
            {Array.from({ length: 4 }).map((_, index) => (
              <PromotionItem data={null} key={index} />
            ))}
          </div>
        ) : (
          <InfiniteScroll
            dataLength={data?.length || 0}
            hasMore={hasMore}
            loader={isFetchingMore ? <Spinner /> : null}
            next={() =>
              fetchMoreItem(
                promotionApi.getSavedPromotionList({
                  limit: 12,
                  offset: offset + 12,
                })
              )
            }
          >
            <div className={gridClassName}>
              {(data || [])?.length > 0 ? (
                data?.map((item) => (
                  <PromotionItem
                    appliedPromotionId={appliedPromotionId}
                    onApply={onApply}
                    key={item.promotion_id}
                    data={item}
                  />
                ))
              ) : (
                <FilterNotFound />
              )}
            </div>
          </InfiniteScroll>
        )}
      </div>

      <div className="modal-form-btn">
        <button type="button" onClick={() => onClose()} className="btn-primary-outline">
          Đóng
        </button>
      </div>
    </Modal>
  )
}
