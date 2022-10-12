import { RatingEmptyIcon } from "@/assets"
import { Alert, Modal, RatingForm, RatingItem, Seo, Spinner } from "@/components"
import { toggleBodyOverflow } from "@/helper"
import { useCustomerRating, useRatingActions } from "@/hooks"
import { CustomerAccountLayout } from "@/layout"
import { CreateRatingFormParams, RatingRes } from "@/models"
import { useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

const Rating = () => {
  const { deleteRating, updateRating } = useRatingActions()
  const {
    data: ratingList,
    isValidating,
    mutateDeleteRating,
    mutateUpdateRating,
    hasMore,
    fetchMoreRatings,
    isFetchingMore,
  } = useCustomerRating()

  const [currentDeleteRatingId, setCurrentDeleteRatingId] = useState<number | undefined>()
  const [currentEditRating, setCurrentEditRating] = useState<RatingRes | undefined>()

  const handleDeleteRating = (rating_id: number) => {
    deleteRating({
      params: { rating_id },
      onSuccess: () => {
        mutateDeleteRating(rating_id)
        setCurrentDeleteRatingId(undefined)
        toggleBodyOverflow("unset")
      },
    })
  }

  const handleUpdateRating = (params: CreateRatingFormParams) => {
    if (!currentEditRating?.rating_id || !currentEditRating?.compounding_car_customer_id) return
    updateRating({
      params: {
        rating_id: currentEditRating.rating_id,
        compounding_car_customer_id: currentEditRating?.compounding_car_customer_id,
        ...params,
      },
      onSuccess: (res) => {
        mutateUpdateRating(res)
        toggleBodyOverflow("unset")
        setCurrentEditRating(undefined)
      },
    })
  }

  return (
    <>
      <CustomerAccountLayout title="Đánh giá" desc="Xem đánh giá của bạn tại đây.">
        <Seo description="Đánh giá của bạn" title="Đánh giá của bạn" url="c/rating" />
        <div className="px-custom">
          {isValidating ? (
            <div>
              {Array.from({ length: 3 }).map((_, key) => (
                <RatingItem key={key} rating={null} />
              ))}
            </div>
          ) : (
            <>
              {ratingList?.length > 0 ? (
                <InfiniteScroll
                  dataLength={ratingList.length}
                  hasMore={hasMore}
                  loader={isFetchingMore ? <Spinner size={30} /> : null}
                  next={() => fetchMoreRatings()}
                >
                  <ul className="">
                    {(ratingList?.length || 0) &&
                      ratingList.map((item) => (
                        <li
                          className="border-b border-solid border-border-color last:border-0 last:border-none"
                          key={item.rating_id}
                        >
                          <RatingItem
                            onUpdate={() => {
                              toggleBodyOverflow("hidden")
                              setCurrentEditRating(item)
                            }}
                            onDelete={() => {
                              toggleBodyOverflow("hidden")
                              setCurrentDeleteRatingId(item.rating_id)
                            }}
                            car_account_type="customer"
                            rating={item}
                            showDetail
                          />
                        </li>
                      ))}
                  </ul>
                </InfiniteScroll>
              ) : (
                <div className="flex-center flex-col py-[30px]">
                  <RatingEmptyIcon className="w-[80%] mb-[24px]" />
                  <span className="text-lg font-medium">Bạn chưa có đánh giá nào</span>
                </div>
              )}
            </>
          )}
        </div>
      </CustomerAccountLayout>

      <Modal
        key="rating-modal"
        show={!!currentEditRating}
        heading="Chỉnh sửa đánh giá"
        onClose={() => {
          toggleBodyOverflow("unset")
          setCurrentEditRating(undefined)
        }}
      >
        <div className="w-full p-custom h-full">
          <RatingForm
            defaultValue={currentEditRating}
            onSubmit={(data) => handleUpdateRating(data)}
          />
        </div>
      </Modal>

      <Alert
        show={!!currentDeleteRatingId}
        type="warning"
        title="Bạn có chắc chắn muốn xóa đi đánh giá này "
        onClose={() => {
          toggleBodyOverflow("unset")
          setCurrentDeleteRatingId(undefined)
        }}
        onConfirm={() => currentDeleteRatingId && handleDeleteRating(currentDeleteRatingId)}
      />
    </>
  )
}

export default Rating
