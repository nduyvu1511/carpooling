import { ActivityItem, Spinner, TagActivityItem } from "@/components"
import { driverActivityFilters, getActiveStringOrListString, STATE_BG_COLOR, STATE_COLOR } from "@/helper"
import { useDriverActivities } from "@/hooks"
import { AccountLayout, DriverLayout } from "@/layout"
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
  } = useDriverActivities()

  return (
    <DriverLayout>
      <AccountLayout desc="Quản lý thông tin hoạt động đặt chuyến." title="Hoạt động">
        <div className="px-24 pb-24">
          <div className="flex items-center mb-24">
            <p className="text-base font-semibold mr-24">Trạng thái:</p>
            <div className="">
              <ul className="flex flex-wrap">
                {driverActivityFilters.map(({ label, value }, index) => (
                  <li className="mr-[16px] last:mr-0" key={index}>
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
          </div>

          {isLoading ? (
            <div>
              {Array.from({ length: 8 }).map((_, index) => (
                <ActivityItem key={index} activity={null} />
              ))}
            </div>
          ) : (
            <>
              {(activities?.length || 0) === 0 ? (
                <div className="text-center text-base py-[20px] font-normal">
                  Chưa có hoạt động nào
                </div>
              ) : (
                <InfiniteScroll
                  dataLength={activities.length}
                  hasMore={hasMore}
                  loader={<Spinner />}
                  next={() => fetchMoreActivities()}
                >
                  <ul className="grid gap-24">
                    {activities.map((item, index) => (
                      <li
                        onClick={() => router.push(`/d/rides/${item.compounding_car_id}`)}
                        key={index}
                        className="block-element transition-all duration-200 rounded-[20px] border border-border-color border-solid hover:border-primary hover:bg-bg-1 cursor-pointer"
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
      </AccountLayout>
    </DriverLayout>
  )
}

export default Activities
