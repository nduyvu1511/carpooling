import { RatingEmptyIcon } from "@/assets"
import { Modal, RatingItem, RatingReport, Seo, Spinner } from "@/components"
import { useDriverRating, useRatingActions } from "@/hooks"
import { AccountLayout, DriverLayout } from "@/layout"
import { ReportRatingParams } from "@/models"
import { useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

const Rating = () => {
  const { reportRating } = useRatingActions()
  const {
    data: ratings,
    isInitialLoading,
    isFetchingMore,
    hasMore,
    fetchMoreRatings,
    mutate,
  } = useDriverRating()

  const [currentReportRatingId, setCurrentReportRatingId] = useState<number | undefined>()

  const handleReportRating = (params: ReportRatingParams) => {
    reportRating({
      params,
      onSuccess() {
        setCurrentReportRatingId(undefined)
        mutate(
          [...ratings].map((item) =>
            item.rating_id === params.rating_id ? { ...item, rating_reported: "waiting" } : item
          ),
          false
        )
      },
    })
  }

  return (
    <DriverLayout>
      <AccountLayout desc="Xem đánh giá về bạn tại đây" title="Đánh giá về bạn">
        <Seo description="Ưu đãi" title="Đánh giá" url="d/account/rating" />

        <div className="px-custom">
          {isInitialLoading ? (
            <div>
              {Array.from({ length: 3 }).map((_, index) => (
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
                  <li
                    className="border-b border-solid border-border-color last:border-none"
                    key={item?.rating_id}
                  >
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

      {currentReportRatingId ? (
        <Modal
          key="report-rating-modal"
          show={true}
          onClose={() => setCurrentReportRatingId(undefined)}
          heading="Báo cáo đánh giá"
        >
          <div className="modal-form">
            <RatingReport
              onSubmit={(params) =>
                currentReportRatingId &&
                handleReportRating({ ...params, rating_id: currentReportRatingId })
              }
            />
          </div>
        </Modal>
      ) : null}
    </DriverLayout>
  )
}

export default Rating
