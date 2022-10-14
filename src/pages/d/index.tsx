import { RideContainer, Seo } from "@/components"
import { isObjectHasValue } from "@/helper"
import { useQueryCompoundingCarDriver, useQueryCompoundingCarParams } from "@/hooks"
import { DriverLayout } from "@/layout"
import { CompoundingFilterParams } from "@/models"
import { useRouter } from "next/router"
import { useEffect } from "react"

const HomeDriver = () => {
  const router = useRouter()
  const { getValueFromQuery } = useQueryCompoundingCarParams()
  const {
    data: ridesList,
    isValidating,
    filterRides,
    hasMore,
    fetchMoreRides,
    isFetchingMore,
    isInitialLoading,
  } = useQueryCompoundingCarDriver()

  useEffect(() => {
    if (router.isReady) {
      filterRides(getValueFromQuery(router.query))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  const handleFilterRides = (params: CompoundingFilterParams | undefined) => {
    if (isObjectHasValue(params)) {
      router.push({
        query: {
          ...router.query,
          ...params,
        },
      })
    } else {
      router.push({})
    }
  }

  return (
    <DriverLayout showHeaderOnMobile>
      <Seo title="Các chuyến đi chưa có tài xế" url={"d"} />

      <RideContainer
        hasMore={hasMore}
        isFetchingMore={isFetchingMore}
        isValidating={isInitialLoading || isValidating}
        list={ridesList}
        carAccountType="car_driver"
        defaultParams={router.query}
        onClickRideItem={(compounding_car_id) =>
          router.push(`/d/ride-detail/confirm/${compounding_car_id}`)
        }
        onFetchMore={() => fetchMoreRides(router.query)}
        onFilterRide={(data) => handleFilterRides(data)}
        key="car_driver"
      />
    </DriverLayout>
  )
}

export default HomeDriver
