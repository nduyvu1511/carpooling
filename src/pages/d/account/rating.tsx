import { RatingEmptyIcon } from "@/assets"
import { Modal, RatingItem, RatingReport, Spinner } from "@/components"
import { useDriverRating, useRatingActions } from "@/hooks"
import { AccountLayout, DriverLayout } from "@/layout"
import { useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

const Rating = () => {
  const {
    data: ratings,
    isInitialLoading,
    isFetchingMore,
    hasMore,
    fetchMoreRatings,
    mutate,
  } = useDriverRating()
  const { reportRating } = useRatingActions()
  const [currentReportRatingId, setCurrentReportRatingId] = useState<number | undefined>()

  const handleReportRating = (rating_id: number) => {
    reportRating({
      params: { rating_id },
      onSuccess() {
        setCurrentReportRatingId(undefined)
        mutate(
          [...ratings].map((item) =>
            item.rating_id === rating_id ? { ...item, rating_reported: "waiting" } : item
          ),
          false
        )
      },
    })
  }

  return (
    <DriverLayout>
      <AccountLayout desc="Xem đánh giá về bạn tại đây" title="Đánh giá">
        <div className="px-24">
          {isInitialLoading ? (
            <div>
              {Array.from({ length: 8 }).map((_, index) => (
                <RatingItem rating={null} key={index} />
              ))}
            </div>
          ) : ratings?.length > 0 ? (
            <InfiniteScroll
              dataLength={ratings.length}
              next={() => fetchMoreRatings()}
              hasMore={hasMore}
              loader={isFetchingMore ? <Spinner className="py-[30px]" /> : null}
            >
              <ul className="">
                {ratings.map((item) => (
                  <li className="border-b border-solid border-border-color" key={item.rating_id}>
                    <RatingItem
                      showDetail
                      car_account_type="car_driver"
                      onReport={() => setCurrentReportRatingId(item.rating_id)}
                      rating={item}
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
        </div>
      </AccountLayout>

      <Modal
        key="report-rating-modal"
        show={!!currentReportRatingId}
        onClose={() => setCurrentReportRatingId(undefined)}
        heading="Báo cáo đánh giá"
      >
        <div className="p-24 pb-0 flex-1 flex flex-col">
          <p className="text-sm mb-[24px]">Vui lòng chọn lý do để báo cáo:</p>
          <RatingReport
            list={[{ id: 1, label: "Người dùng spam" }]}
            onSubmit={() => currentReportRatingId && handleReportRating(currentReportRatingId)}
          />
        </div>
      </Modal>
    </DriverLayout>
  )
}

export default Rating
