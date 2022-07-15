import { ActivityFilter, ActivityItem, Spinner } from "@/components"
import { useCustomerActivities } from "@/hooks"
import { AccountLayout, CustomerLayout } from "@/layout"
import { CustomerActivityRes } from "@/models"
import moment from "moment"
import { useRouter } from "next/router"
import InfiniteScroll from "react-infinite-scroll-component"

const Activities = () => {
  const router = useRouter()
  const {
    data: activities,
    hasMore,
    isInitialLoading,
    fetchMoreActivities,
    isFetchingMore,
  } = useCustomerActivities()

  const handleRedirect = (params: CustomerActivityRes) => {
    const { state, compounding_car_customer_id, expected_going_on_date } = params
    if (state === "done" || state === "in_process") {
      router.push(
        `/c/order-done/payment-options?compounding_car_customer_id=${compounding_car_customer_id}`
      )
    } else if (state === "customer_pay") {
      router.push(
        `/c/order-done/checkout?compounding_car_customer_id=${compounding_car_customer_id}`
      )
    } else if (state === "draft") {
      if (moment(expected_going_on_date).isAfter(Date.now())) {
        router.push(`/c/booking/confirm?compounding_car_customer_id=${compounding_car_customer_id}`)
      } else {
        router.push(`/c/rides/${compounding_car_customer_id}`)
      }
    } else {
      router.push(`/c/rides/${compounding_car_customer_id}`)
    }
  }

  return (
    <AccountLayout desc="Quản lý thông tin hoạt động đặt chuyến." title="Hoạt động">
      <div className="px-24 pb-24">
        <div className="mb-24">
          <div className="flex items-center">
            <p className="text-base font-semibold mr-24">Trạng thái: </p>
            <ActivityFilter
              list={[
                { color: "", label: "Tất cả", value: "all" },
                { color: "", label: "Chưa đánh giá", value: "no_rating" },
              ]}
            />
          </div>
        </div>
        <div className="">
          {isInitialLoading ? (
            <div className="">
              {Array.from({ length: 8 }).map((_, index) => (
                <ActivityItem key={index} activity={null} />
              ))}
            </div>
          ) : (
            <>
              {(activities?.length || 0) === 0 ? (
                <div className="text-base font-normal pt-[20pxư text-center">
                  Không tìm thấy hoạt động nào
                </div>
              ) : (
                <InfiniteScroll
                  dataLength={activities.length}
                  hasMore={hasMore}
                  loader={isFetchingMore ? <Spinner className="py-[30px]" size={30} /> : null}
                  next={() => fetchMoreActivities()}
                >
                  <ul className="grid gap-24">
                    {activities.map((item, index) => (
                      <li
                        onClick={() => handleRedirect(item)}
                        key={index}
                        className="block-element transition-all duration-200 rounded-[20px] border border-border-color border-solid hover:border-primary hover:bg-bg-1 cursor-pointer"
                      >
                        <ActivityItem activity={item} />
                      </li>
                    ))}
                  </ul>
                </InfiniteScroll>
              )}
            </>
          )}
        </div>
      </div>
    </AccountLayout>
  )
}

Activities.Layout = CustomerLayout
export default Activities
