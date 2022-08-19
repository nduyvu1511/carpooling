import { EmptyPocketIcon } from "@/assets"
import { ActivityItem, Seo, Spinner, Tabs, TagActivityItem } from "@/components"
import {
  customerActivityFilters,
  getActiveStringOrListString,
  STATE_BG_COLOR,
  STATE_COLOR,
} from "@/helper"
import { useCustomerActivities } from "@/hooks"
import { CustomerAccountLayout } from "@/layout"
import { CompoundingCarCustomerState, CustomerActivityRes } from "@/models"
import moment from "moment"
import { useRouter } from "next/router"
import InfiniteScroll from "react-infinite-scroll-component"

const Activities = () => {
  const router = useRouter()

  const {
    data: activities,
    hasMore,
    fetchMoreActivities,
    isFetchingMore,
    activityStates,
    isValidating,
    ratingValue,
    filterCompoundingActivities,
  } = useCustomerActivities()

  const handleRedirect = (params: CustomerActivityRes) => {
    const { state, compounding_car_customer_id, expected_going_on_date } = params
    if (state === "done" || state === "in_process" || state === "customer_pay")
      router.push(
        `/c/ride-sharing/payment-options?compounding_car_customer_id=${compounding_car_customer_id}`
      )
    else if (state === "confirm")
      router.push(`/c/booking/checkout?compounding_car_customer_id=${compounding_car_customer_id}`)
    else if (state === "deposit" || state === "assign")
      router.push(`/c/ride-detail/deposit/${compounding_car_customer_id}`)
    else if (state === "draft") {
      if (moment(expected_going_on_date).isAfter(Date.now()))
        router.push(`/c/booking/confirm?compounding_car_customer_id=${compounding_car_customer_id}`)
      else router.push(`/c/ride-detail/${compounding_car_customer_id}`)
    } else if (state === "cancel")
      router.push(`/c/ride-detail/cancel/${compounding_car_customer_id}`)
    else router.push(`/c/ride-detail/${compounding_car_customer_id}`)
  }

  return (
    <CustomerAccountLayout desc="Quản lý thông tin hoạt động đặt chuyến." title="Hoạt động">
      <Seo
        description="Quản lý hoạt động của bạn"
        thumbnailUrl=""
        title="Hoạt động"
        url="https://exxe.vn/c/account/activities"
      />
      <div className="px-12 md:px-24">
        <div className="mb-24">
          <div className="flex items-center relative">
            <div className="absolute bottom-0 right-0 top-0 linear-gradient-white w-[200px] pointer-events-none bg-[red]"></div>
            <ul className="flex lg:flex-wrap overflow-auto scrollbar-hide w-[calc(100vw-24px)] md:w-[calc(100vw-48px)] lg:w-full">
              {customerActivityFilters.map(({ label, value }, index) => (
                <li className="mr-[12px] lg:mr-[16px] last:mr-0 lg:mb-[16px]" key={index}>
                  <TagActivityItem<CompoundingCarCustomerState[]>
                    bgColor={STATE_BG_COLOR[value?.[0] || ""]}
                    color={STATE_COLOR[value?.[0] || ""]}
                    label={label}
                    value={value as CompoundingCarCustomerState[]}
                    isActive={getActiveStringOrListString(activityStates, value)}
                    onChange={(val) =>
                      filterCompoundingActivities(val as CompoundingCarCustomerState[])
                    }
                  />
                </li>
              ))}
            </ul>
          </div>

          {activityStates?.includes("confirm_paid") ? (
            <div className="mt-[12px]">
              <Tabs
                list={[
                  { label: "Chưa đánh giá", value: "no_rating" },
                  { label: "Đã đánh giá", value: "rated" },
                ]}
                tabActive={ratingValue || ""}
                onChange={(val) => filterCompoundingActivities(activityStates, val as any)}
              />
            </div>
          ) : null}
        </div>
        <div className="">
          {isValidating ? (
            <ul className="">
              {Array.from({ length: 6 }).map((_, index) => (
                <li
                  className="block-element border border-solid border-border-color mb-12 md:mb-24 rounded-[5px] md:rounded-[20px]"
                  key={index}
                >
                  <ActivityItem activity={null} />
                </li>
              ))}
            </ul>
          ) : (
            <>
              {(activities?.length || 0) === 0 ? (
                <div className="flex-center flex-col py-[20px]">
                  <EmptyPocketIcon className="h-[200px]" />
                  <p className="mt-24 text-sm md:text-base">Chưa có hoạt động nào</p>
                </div>
              ) : (
                <InfiniteScroll
                  dataLength={activities.length}
                  hasMore={hasMore}
                  loader={isFetchingMore ? <Spinner className="py-[30px]" size={30} /> : null}
                  next={() => fetchMoreActivities()}
                >
                  <ul className="grid gap-12 md:gap-24">
                    {activities.map((item, index) => (
                      <li
                        onClick={() => handleRedirect(item)}
                        key={index}
                        className="block-element transition-all duration-200 rounded-[8px] md:rounded-[20px] border border-border-color border-solid hover:border-primary hover:bg-bg-1 cursor-pointer"
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
    </CustomerAccountLayout>
  )
}

export default Activities
