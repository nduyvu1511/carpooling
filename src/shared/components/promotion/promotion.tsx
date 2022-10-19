import { FilterNotFound, Modal, PromotionDetail, PromotionItem, Spinner } from "@/components"
import { RootState } from "@/core"
import { toggleBodyOverflow } from "@/helper"
import { usePromotionActions, useQueryList } from "@/hooks"
import { PromotionRes } from "@/models"
import { promotionApi } from "@/services"
import { AxiosPromise } from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useSelector } from "react-redux"

interface PromotionProps {
  className?: string
}

const gridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg:grid-cols-2 gap-16"
type PromotionValue = "all" | "saved" | "new"

export const Promotion = ({ className }: PromotionProps) => {
  const router = useRouter()
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)
  const { data, fetchMoreItem, hasMore, isFetchingMore, isValidating, filterList, mutate } =
    useQueryList<PromotionRes[]>({
      fetcher: promotionApi.getPromotionList,
      initialData: undefined,
      key: "get_promotion_list",
      params: { limit: 12, offset: 0 },
    })
  const { savePromotion } = usePromotionActions()

  const [promotionValue, setPromotionValue] = useState<PromotionValue>("all")
  const [promotionId, setPromotionId] = useState<number | undefined>()

  const toggleModal = (id: number | undefined) => {
    setPromotionId(id)
    if (id) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  const handleSavePromotion = (promotion: PromotionRes) => {
    savePromotion({
      params: { promotion_id: promotion.promotion_id },
      onSuccess: () => {
        if (!data) return
        mutate(
          [...data].map((item) =>
            item.promotion_id === promotion.promotion_id ? { ...item, saved_promotion: true } : item
          ),
          false
        )
      },
    })
  }

  const getFetcherApi = (value: PromotionValue): AxiosPromise => {
    return (
      value === "all"
        ? promotionApi.getPromotionList
        : value === "new"
        ? promotionApi.getNewPromotionList
        : promotionApi.getSavedPromotionList
    )({ limit: 12, offset: 0 })
  }

  return (
    <div className="">
      <div className="flex items-center mb-24">
        <p className="text-base font-semibold hidden md:block mr-16">Danh mục:</p>
        <ul className="flex overflow-auto scrollbar-hide">
          {[
            ["Tất cả", "all"],
            ["Ưu đãi đã lưu", "saved"],
            ["Ưu đãi mới", "new"],
          ].map(([label, value]) => (
            <li
              onClick={() => {
                if (value === promotionValue) return
                setPromotionValue(value as PromotionValue)
                filterList(getFetcherApi(value as PromotionValue))
              }}
              className={`py-[6px] px-12 text-xs leading-[20px] whitespace-nowrap text-primary mr-12 rounded-[5px] cursor-pointer border border-solid ${
                promotionValue === value ? "bg-bg-blue border-[transparent]" : "border-bg-blue"
              }`}
              key={value}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>

      {isValidating ? (
        <div className={`${className || gridClassName}`}>
          {Array.from({ length: 4 }).map((_, index) => (
            <PromotionItem data={null} key={index} />
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={data?.length || 0}
          hasMore={hasMore}
          loader={isFetchingMore ? <Spinner /> : null}
          next={() => fetchMoreItem(getFetcherApi(promotionValue))}
        >
          {(data || [])?.length > 0 ? (
            <div className={`${className || gridClassName}`}>
              {data?.map((item) => (
                <PromotionItem
                  onSave={handleSavePromotion}
                  onClick={(id) => {
                    toggleModal(id)
                  }}
                  onApply={() =>
                    router.push(userInfo?.car_account_type === "car_driver" ? "/d" : "/c")
                  }
                  key={item.promotion_id}
                  data={item}
                />
              ))}
            </div>
          ) : (
            <FilterNotFound title="Chưa có mã giảm giá nào được lưu" />
          )}
        </InfiniteScroll>
      )}

      {promotionId ? (
        <Modal heading="Điều kiện sử dụng" onClose={() => toggleModal(undefined)} show={true}>
          <div className="p-custom">
            <PromotionDetail promotion_id={promotionId} />
          </div>
        </Modal>
      ) : null}
    </div>
  )
}
