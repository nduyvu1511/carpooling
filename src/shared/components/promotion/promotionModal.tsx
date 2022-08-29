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
  onApply?: (id: number) => void
}

export const PromotionModal = ({ onClose, onApply }: PromotionModalProps) => {
  const [promotionCode, setPromotionCode] = useState<string>("")
  const { data, fetchMoreItem, hasMore, isFetchingMore, offset, filterList, isValidating } =
    useQueryList<PromotionRes>({
      fetcher: promotionApi.getPromotionList,
      initialData: undefined,
      key: "get_promotion_list",
      params: { limit: 12, offset: 0 },
    })

  return (
    <Modal onClose={onClose} heading="Ưu đãi" show={true}>
      <div className="modal-form-content">
        <div className="promotion-modal-input">
          <PromotionForm
            onChange={(promotion_code) => {
              setPromotionCode
              filterList(promotionApi.searchPromotion({ promotion_code, limit: 12, offset: 0 }))
            }}
            className="mb-24"
            onSubmit={(data) => console.log(data)}
          />
        </div>

        {isValidating ? (
          <div className="grid grid-cols-1 gap-16">
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
                promotionApi.searchPromotion({
                  limit: 12,
                  offset: offset + 12,
                  promotion_code: promotionCode,
                })
              )
            }
          >
            <div className="grid grid-cols-1 gap-16">
              {(data || [])?.length > 0 ? (
                data?.map((item) => (
                  <PromotionItem onApply={onApply} key={item.promotion_id} data={item} />
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
