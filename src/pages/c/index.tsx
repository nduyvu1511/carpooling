import { RideContainer, Seo } from "@/components"
import { isObjectHasValue } from "@/helper"
import { useQueryCompoundingCarCustomer, useQueryCompoundingCarParams } from "@/hooks"
import { CustomerLayout } from "@/layout"
import { CompoundingFilterParams } from "@/models"
import { useRouter } from "next/router"
import { useEffect } from "react"

const HomeCustomer = () => {
  const router = useRouter()
  const { getValueFromQuery } = useQueryCompoundingCarParams()
  const {
    data: rideList,
    isValidating,
    filterRides,
    hasMore,
    fetchMoreRides,
    isFetchingMore,
    isInitialLoading,
  } = useQueryCompoundingCarCustomer()

  useEffect(() => {
    if (router.isReady) {
      filterRides(getValueFromQuery(router.query))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  const handleFilterRides = (params: CompoundingFilterParams | undefined) => {
    const filter = { ...router.query, ...params }
    if (isObjectHasValue(params)) {
      router.push({
        query: {
          ...filter,
        },
      })
    } else {
      router.push({})
    }
  }

  return (
    <>
      <Seo
        description=""
        thumbnailUrl=""
        title="Các chuyến đi hiện có"
        url={process.env.NEXT_PUBLIC_DOMAIN_URL + "/c"}
      />
      <RideContainer
        hasMore={hasMore}
        isFetchingMore={isFetchingMore}
        isValidating={isInitialLoading || isValidating}
        list={rideList}
        carAccountType="customer"
        defaultParams={router.query}
        onClickRideItem={(compounding_car_id) =>
          router.push(`/c/ride-sharing/${compounding_car_id}`)
        }
        onFetchMore={() => fetchMoreRides(router.query)}
        onFilterRide={(data) => handleFilterRides(data)}
        key="customer"
      />
    </>
  )
}

HomeCustomer.Layout = CustomerLayout
export default HomeCustomer
