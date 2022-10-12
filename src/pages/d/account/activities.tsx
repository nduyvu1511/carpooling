import { EmptyPocketIcon } from "@/assets"
import { ActivityItem, Seo, Spinner, TagActivityItem } from "@/components"
import {
  driverActivityFilters,
  getActiveStringOrListString,
  STATE_BG_COLOR,
  STATE_COLOR,
} from "@/helper"
import { useDriverActivities } from "@/hooks"
import { DriverAccountLayout } from "@/layout"
import { CompoundingCarDriverState, DriverActivityRes } from "@/models"
import { useRouter } from "next/router"
import InfiniteScroll from "react-infinite-scroll-component"

const Activities = () => {
  const router = useRouter()
  const {
    activityStates,
    data: activities,
    fetchMoreActivities,
    filterCompoundingActivities,
    hasMore,
    isLoading,
    isFetchingMore,
  } = useDriverActivities()

  const activityStateHandler = (activity: DriverActivityRes) => {
    const { state } = activity
    if (state === "start_running" || state === "stop_picking")
      router.push(`/d/ride-detail/in-process/${activity.compounding_car_id}`)
    else if (state === "waiting_deposit")
      router.push(`/d/ride-detail/checkout/${activity.compounding_car_id}`)
    else if (state === "cancel") router.push(`/d/ride-detail/cancel/${activity.compounding_car_id}`)
    // else if (state === "done") router.push(`/d/ride-detail/done/${activity.compounding_car_id}`)
    else router.push(`/d/ride-detail/${activity.compounding_car_id}`)
  }

  return (
    <DriverAccountLayout desc="Quản lý thông tin hoạt động đặt chuyến." title="Hoạt động">
      <Seo title="hoạt động" url="/d/account/activities" />

      <div className="px-custom">
        <div className="mb-24 relative">
          <div className="absolute bottom-0 right-0 top-0 linear-gradient-white w-[200px] pointer-events-none bg-[red]"></div>
          <ul className="flex lg:flex-wrap overflow-auto scrollbar-hide">
            {driverActivityFilters.map(({ label, value }, index) => (
              <li className="mr-12 md:mr-16 last:mr-24 lg:mb-16" key={index}>
                <TagActivityItem<CompoundingCarDriverState[]>
                  bgColor={STATE_BG_COLOR[value?.[0] || ""]}
                  color={STATE_COLOR?.[value?.[0] || ""]}
                  label={label}
                  value={value}
                  isActive={getActiveStringOrListString(activityStates, value)}
                  onChange={(val) =>
                    filterCompoundingActivities(val as CompoundingCarDriverState[])
                  }
                />
              </li>
            ))}
          </ul>
        </div>

        {isLoading ? (
          <ul>
            {Array.from({ length: 8 }).map((_, index) => (
              <li
                className="block-element rounded-[8px] md:rounded-[20px] border border-solid border-border-color mb-12 lg:mb-24"
                key={index}
              >
                <ActivityItem key={index} activity={null} />
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
                loader={isFetchingMore ? <Spinner /> : null}
                next={() => fetchMoreActivities()}
              >
                <ul className="grid gap-12 md:gap-16">
                  {activities.map((item, index) => (
                    <li
                      onClick={() => activityStateHandler(item)}
                      key={index}
                      className="block-element transition-all duration-200 rounded-[8px] md:rounded-[20px] border border-border-color border-solid hover:border-primary hover:bg-bg-1 cursor-pointer"
                    >
                      <ActivityItem<DriverActivityRes> activity={item} />
                    </li>
                  ))}
                </ul>
              </InfiniteScroll>
            )}
          </>
        )}
      </div>
    </DriverAccountLayout>
  )
}

export default Activities
