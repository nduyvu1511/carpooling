import { EmptyPocketIcon } from "@/assets"
import { Alert, Modal, RatingForm, RatingItem, Spinner, Star } from "@/components"
import { useCustomerRating, useRatingActions } from "@/hooks"
import { AccountLayout, CustomerLayout } from "@/layout"
import { CreateRatingFormParams, RatingRes } from "@/models"
import { useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { notify } from "reapop"

const Rating = () => {
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
  const { deleteRating, updateRating } = useRatingActions()
  const [currentEditRating, setCurrentEditRating] = useState<RatingRes | undefined>()

  const handleDeleteRating = (rating_id: number) => {
    deleteRating({
      params: { rating_id },
      onSuccess: () => {
        mutateDeleteRating(rating_id)
        setCurrentDeleteRatingId(undefined)
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
        setCurrentEditRating(undefined)
      },
    })
  }

  return (
    <>
      <AccountLayout title="Đánh giá" desc="Xem đánh giá của bạn tại đây.">
        <div className="p-24 pt-0">
          {isValidating ? (
            <div>
              {Array.from({ length: 5 }).map((_, key) => (
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
                  <ul className="grid grid-gap-">
                    {(ratingList?.length || 0) &&
                      ratingList.map((item) => (
                        <li
                          className="border-b border-solid border-border-color last:border-0"
                          key={item.rating_id}
                        >
                          <RatingItem
                            onUpdate={() => setCurrentEditRating(item)}
                            onDelete={() => setCurrentDeleteRatingId(item.rating_id)}
                            car_account_type="customer"
                            rating={item}
                          />
                        </li>
                      ))}
                  </ul>
                </InfiniteScroll>
              ) : (
                <div className="flex-center flex-col py-[30px]">
                  <EmptyPocketIcon className="w-[80%] mb-[24px]" />
                  <span className="text-lg font-medium">Bạn chưa có đánh giá nào</span>
                </div>
              )}
            </>
          )}
        </div>
      </AccountLayout>

      {currentEditRating ? (
        <Modal heading="Chỉnh sửa đánh giá" onClose={() => setCurrentEditRating(undefined)}>
          <div className="p-24 h-full">
            <RatingForm
              defaultValue={currentEditRating}
              onSubmit={(data) => handleUpdateRating(data)}
            />
          </div>
        </Modal>
      ) : null}

      {currentDeleteRatingId ? (
        <Alert
          type="warning"
          desc="Bạn có chắc chắn muốn xóa đi đánh giá này "
          onClose={() => setCurrentDeleteRatingId(undefined)}
          onConfirm={() => handleDeleteRating(currentDeleteRatingId)}
        />
      ) : null}
    </>
  )
}

Rating.Layout = CustomerLayout
export default Rating
